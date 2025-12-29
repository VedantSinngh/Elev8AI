export function BlindFeatures() {
  const features = [
    {
      title: "Scene Description",
      description: "Advanced AI-powered scene descriptions providing detailed audio explanations of visual content.",
      link: "http://localhost:3005"
    },
    {
      title: "Braille Conversion",
      description: "Seamless conversion of text and video content into braille format for tactile learning.",
      link: "http://localhost:3001/braille-conversion" 
    }
  ];

  return (
    <>
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
      <div className="grid gap-6 md:grid-cols-2">
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