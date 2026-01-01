import React from "react";

interface Props {
  name: string;
  taken: number;
  avgScore: number;
  colorClass?: string;
}

export default function TopicProgress({ name, taken, avgScore, colorClass = "orange" }: Props) {
  const colorMap: Record<string, { text: string; bg: string }> = {
    orange: { text: "text-orange-500", bg: "bg-orange-500" },
    blue: { text: "text-blue-500", bg: "bg-blue-500" },
    yellow: { text: "text-yellow-500", bg: "bg-yellow-500" },
  };
  const selected = colorMap[colorClass] || colorMap.orange;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className={`font-semibold ${selected.text}`}>{name}</span>
        <span className="text-sm text-gray-500">{taken} quizzes taken</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className={`${selected.bg} h-3 rounded-full transition-all duration-300`} style={{ width: `${avgScore}%` }}></div>
      </div>
      <p className="text-right text-sm text-gray-500 mt-1">Avg: {avgScore}%</p>
    </div>
  );
}
