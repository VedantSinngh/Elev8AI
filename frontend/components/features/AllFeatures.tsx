export function AllFeatures() {
  const features = [
    {
      title: "Talk to Pdf",
      description: "Automated generation of comprehensive lecture notes with key points and summaries.",
      link: "http://localhost:3006"  // Flask backend URL
    },
    {
      title: "Career Roadmap Generator",
      description: "AI-driven career recommendations and skill development roadmaps based on your interests.",
      link: "http://localhost:3019"  // Flask backend URL for career roadmap
    },
    {
      title: "MCQ Generator",
      description: "Smart creation of multiple-choice questions with instant grading and feedback.",
      link: "http://localhost:3003"  // Flask backend URL for MCQ Generator
    }
  ];

  return (
    <>
      {/* Inline styles for fade-in animation */}
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fadeInUp 0.5s ease-out forwards;
          }
        `}
      </style>

      {/* Feature Cards Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card p-6 border border-gray-200 rounded-lg bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 animate-fade-in"
            style={{ opacity: 0 }} // Start with opacity 0 to allow animation to work
          >
            {/* Feature Title */}
            <h3 className="mb-2 text-xl font-bold text-white-800">{feature.title}</h3>

            {/* Feature Description */}
            <p className="mb-4 text-gray-400">{feature.description}</p>

            {/* Learn More Button */}
            <a
              href={feature.link}
              className="inline-block px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-md hover:bg-purple-600 hover:text-white transition-all duration-300 ease-in-out"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </>
  );
}