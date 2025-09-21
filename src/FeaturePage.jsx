import React from "react";
import { useParams, Link } from "react-router-dom";
import starry from "./assets/starry.svg";
import sunset from "./assets/sunset.svg";

const featureTitles = {
  "memory-tree": "Memory Tree 🌳",
  notes: "Notes 📝",
  "date-ideas": "Date Ideas 💡",
  quizzes: "Quizzes 🎯",
};

export default function FeaturePage() {
  const { id } = useParams();
  const title = featureTitles[id] || "Feature";

  return (
    <div
      style={{ backgroundImage: `url(${starry})`, backgroundSize: "cover" }}
      className="min-h-screen w-full flex flex-col items-center justify-center text-center p-12"
    >
      <h1 className="text-5xl font-dancing mb-6">{title}</h1>
      <p className="text-xl font-dancing text-white/90 mb-8">
        This feature is coming soon! 🚀
      </p>
      <Link
        to="/home"
        className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-md text-white font-dancing hover:scale-105 transition-all"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
