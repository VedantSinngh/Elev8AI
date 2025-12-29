from flask import Flask, request, jsonify, send_file
import os
import PyPDF2
import json
import requests
from werkzeug.utils import secure_filename
from io import BytesIO

app = Flask(__name__)

# Configure Groq API
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

def extract_text_from_pdf(pdf_file):
    """Extract text content from uploaded PDF file"""
    try:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        print(f"PDF extraction error: {str(e)}")
        raise Exception("Error extracting text from PDF")

def generate_mcqs(text):
    """Generate MCQs using Groq API with improved JSON handling"""
    prompt = f"""Generate 10 multiple choice questions based on the following text.
    For each question, provide 4 options where only one is correct.
    Your response MUST be a valid JSON array containing exactly 10 question objects.
    Each object must have exactly these fields: "question", "options" (array of 4 strings), and "correct_answer" (string matching one option).
    Example format:
    [
        {{
            "question": "What is the capital of France?",
            "options": ["London", "Paris", "Berlin", "Madrid"],
            "correct_answer": "Paris"
        }}
    ]
    
    Text: {text[:4000]}"""

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {
                "role": "system", 
                "content": "You are a helpful assistant that generates multiple choice questions. Always respond with valid JSON arrays containing question objects."
            },
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.3  # Lower temperature for more consistent JSON formatting
    }

    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=data)
        response.raise_for_status()
        
        content = response.json()["choices"][0]["message"]["content"]
        
        # Clean the content string to ensure it only contains the JSON part
        content = content.strip()
        if content.startswith("```json"):
            content = content.split("```json")[1]
        if content.startswith("```"):
            content = content.split("```")[1]
        content = content.strip()
        
        # Parse and validate the JSON structure
        questions = json.loads(content)
        
        # Validate the structure of each question
        for question in questions:
            if not isinstance(question, dict):
                raise ValueError("Each question must be a dictionary")
            
            required_keys = {"question", "options", "correct_answer"}
            if not all(key in question for key in required_keys):
                raise ValueError(f"Question missing required keys: {required_keys}")
            
            if not isinstance(question["options"], list) or len(question["options"]) != 4:
                raise ValueError("Options must be a list of exactly 4 items")
            
            if question["correct_answer"] not in question["options"]:
                raise ValueError("Correct answer must be one of the options")
        
        return questions

    except requests.exceptions.RequestException as e:
        print(f"Groq API error: {str(e)}")
        raise Exception("Error generating questions: API request failed")
    except json.JSONDecodeError as e:
        print(f"JSON parsing error: {str(e)}")
        print(f"Problematic content: {content}")
        raise Exception("Error parsing questions: Invalid JSON format")
    except ValueError as e:
        print(f"Validation error: {str(e)}")
        raise Exception(f"Error validating questions: {str(e)}")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise Exception("Error generating questions: Unexpected error occurred")

def evaluate_answers(user_answers, questions):
    """Evaluate user answers using Groq API"""
    evaluation_prompt = "Evaluate the following answers and provide detailed feedback:\n\n"
    
    for q_idx, question in enumerate(questions):
        user_answer = user_answers.get(str(q_idx))
        correct_answer = question["correct_answer"]
        evaluation_prompt += f"Question: {question['question']}\n"
        evaluation_prompt += f"User's answer: {user_answer}\n"
        evaluation_prompt += f"Correct answer: {correct_answer}\n\n"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant that evaluates quiz answers and also provide scores based on the correct answers. Also provide a final score and some insights on the student performance. Also provide a pathway to ace this type of exam."},
            {"role": "user", "content": evaluation_prompt}
        ],
        "temperature": 0.7
    }

    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=data)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
    except requests.exceptions.RequestException as e:
        print(f"Groq API error: {str(e)}")
        raise Exception("Error evaluating answers")

@app.route('/')
def index():
    return send_file('templates/mcq.html')

@app.route('/upload', methods=['POST'])
def upload_pdf():
    # Debug print
    print("Files received:", request.files)
    
    if 'pdf' not in request.files:
        return jsonify({'error': 'No PDF file uploaded'}), 400
    
    pdf_file = request.files['pdf']
    if pdf_file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        # Extract text from PDF
        text = extract_text_from_pdf(pdf_file)
        
        # Generate MCQs using Groq
        questions = generate_mcqs(text)
        
        # Store the complete questions (including correct answers) in session
        client_questions = []
        complete_questions = []
        
        for q in questions:
            client_q = {
                'question': q['question'],
                'options': q['options']
            }
            client_questions.append(client_q)
            complete_questions.append({
                'question': q['question'],
                'options': q['options'],
                'correct_answer': q['correct_answer']
            })
        
        # Store complete questions for later evaluation
        app.config['COMPLETE_QUESTIONS'] = complete_questions
        
        return jsonify({'questions': client_questions})
    
    except Exception as e:
        print(f"Error in upload_pdf: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    if not data or 'answers' not in data:
        return jsonify({'error': 'Invalid request data'}), 400

    try:
        # Get the complete questions from app config
        complete_questions = app.config.get('COMPLETE_QUESTIONS', [])
        if not complete_questions:
            return jsonify({'error': 'Questions not found'}), 400

        feedback = evaluate_answers(data['answers'], complete_questions)
        return jsonify({'feedback': feedback})
    
    except Exception as e:
        print(f"Error in evaluate: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.config['COMPLETE_QUESTIONS'] = []  # Initialize the questions storage
    app.run(host='0.0.0.0', port=3003, debug=True)
