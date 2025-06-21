import React from "react";

const CourseActivity = () => {
  const activities = [
    { title: "Completed Quiz: Arrays", type: "quiz", timestamp: "2 hours ago", score: "88%" },
    { title: "Watched Lecture: React Basics", type: "video", timestamp: "1 day ago" },
    { title: "Submitted Assignment: SQL Joins", type: "assignment", timestamp: "2 days ago" },
  ];

  return (
    <div className="p-8 bg-transparent w-full text-gray-800">
      <h1 className="text-3xl font-bold mb-6">📊 Course Activity</h1>
      <div className="space-y-4">
        {activities.map((activity, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-md border border-gray-200 rounded-lg shadow-sm"
          >
            <div>
              <h4 className="font-semibold text-indigo-600">{activity.title}</h4>
              <p className="text-sm text-gray-600">{activity.timestamp}</p>
            </div>
            {activity.score && (
              <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">{activity.score}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseActivity;
