import React from "react";

const Achievements = () => {
  const achievements = [
    { title: "Quiz Master", icon: "✅", date: "2024-06-15", type: "epic" },
    { title: "Cloud Explorer", icon: "☁️", date: "2024-06-12", type: "rare" },
    { title: "Streak Champion", icon: "🔥", date: "2024-06-05", type: "legendary" },
  ];

  return (
    <div className="p-8 bg-transparent w-full text-gray-800">
      <h1 className="text-3xl font-bold mb-6">🏆 Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achieve, i) => (
          <div
            key={i}
            className={`border-2 rounded-lg p-4 shadow bg-white/60 backdrop-blur-md ${
              achieve.type === 'epic' ? 'border-purple-400' :
              achieve.type === 'rare' ? 'border-blue-400' :
              'border-yellow-400'
            }`}
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{achieve.icon}</span>
              <div>
                <h4 className="font-semibold text-gray-800">{achieve.title}</h4>
                <p className="text-sm text-gray-500">{achieve.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
