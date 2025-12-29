# Hackademia 2K25 

# Elev8AI

# Problem Statement

Disabled students face barriers to learning due to limited inclusive resources. Deaf students struggle with text and audio, while blind students lack access to visual content. Our platform tackles these issues using AI-powered tools like text-to-sign language, scene descriptions, braille conversion, and personalized learning features to ensure accessible education for all.


# Elev8AI(Solution)

Elev8AI is an inclusive education platform designed to empower both disabled and general users. For deaf users, it offers text-to-sign language teaching by processing uploaded PDFs and audio files. Blind users can benefit from features like scene description with audio output and YouTube-to-braille conversion for accessible content. Additionally, the platform includes tools for all users, such as Generative AI-based career guidance, a "Talk to PDF" feature for interactive document exploration, and an MCQ generator that creates quizzes and evaluates responses using a Large Language Model (LLM). This platform aims to make education universally accessible and engaging for everyone.

## Installation

Cloning the repository

```bash
  git clone https://github.com/Hackademia-2k25/Elev8AI.git
```
API keys needed to run this project(store this in .env file)
```bash
  GROQ_API_KEY = "<your api key>"
  PHIDATA_API_KEY = "<your api key>"
 ```

Run Elev8AI frontend with npm
```bash
  npm install
  npm run build
  npm run dev
```
To create and run a virtual environment using conda
```bash
  conda create -p venv python==3.12 -y
  conda activate venv/
```
Run the backend(flask files)
```bash
  pip install -r requirements.txt
  python <filename.py>
```


## Features of our website

### Text-to-Sign Language for Deaf Users

Converts uploaded PDFs and audio files into sign language to aid learning for deaf students.

### Scene Description for Blind Users

Provides audio descriptions of uploaded images to help blind users understand visual content.


### YouTube-to-Braille Conversion

Converts YouTube video subtitles into braille for tactile reading by blind users.

### Generative AI for Career Guidance

Uses Groq's open-source LLM models to offer personalized career suggestions and roadmaps.

### Talk to PDF

Allows users to interact with uploaded PDFs using conversational AI for better comprehension.

### MCQ Generator with LLM Evaluation

Automatically generates multiple-choice questions from content and evaluates responses using Groq models.
This platform is built using the Phidata framework, ensuring seamless integration of these AI-powered tools for inclusive education.

### Real-Time Hand Gesture and Sign Language Detection

Employs OpenCV to detect hand gestures and sign language in real-time via camera input, enabling users to practice sign language interactively.

# Technology Used 

### GenAI Tech
- GROQ for LLM models
- PhiData for Agentic AI framework

### Backend
- Flask

### Frontend
- Nextjs
- Typescript
- ShadCN
## Acknowledgements  

We extend our heartfelt gratitude to everyone who contributed to the development of this project. A special thanks to **NIT Andhra** for organizing events and providing unwavering support throughout the process.  

### Contributors  
<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; text-align: center;">

  <div>
    <a href="https://github.com/Srijansarkar17">
      <img src="https://github.com/Srijansarkar17.png" width="80" height="80" style="border-radius: 50%; border: 2px solid #ccc;">
    </a>
    <br>
    <strong>Srijan Sarkar</strong>
  </div>
  <div>
    <a href="https://github.com/Adityapratapsingh28">
      <img src="https://github.com/Adityapratapsingh28.png" width="80" height="80" style="border-radius: 50%; border: 2px solid #ccc;">
    </a>
    <br>
    <strong>Aditya Pratap Singh</strong>
  </div>

  <div>
    <a href="https://github.com/kantinilesh">
      <img src="https://github.com/kantinilesh.png" width="80" height="80" style="border-radius: 50%; border: 2px solid #ccc;">
    </a>
    <br>
    <strong>Nilesh Kanti</strong>
  </div>

  <div>
    <a href="https://github.com/VedantSinngh">
      <img src="https://github.com/VedantSinngh.png" width="80" height="80" style="border-radius: 50%; border: 2px solid #ccc;">
    </a>
    <br>
    <strong>Vedant Singh</strong>
  </div>

  

</div>


