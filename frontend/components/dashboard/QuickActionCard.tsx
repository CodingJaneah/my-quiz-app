import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  bgClass?: string;
  emoji?: React.ReactNode;
  title: string;
  desc?: string;
}

export default function QuickActionCard({ href, bgClass = "bg-white", emoji, title, desc }: Props) {
  return (
    <Link href={href} className="block">
      <div className={`${bgClass} border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer`}> 
        <div className="text-3xl mb-2">{emoji}</div>
        <h3 className="font-semibold text-lg">{title}</h3>
        {desc && <p className="text-gray-600 text-sm">{desc}</p>}
      </div>
    </Link>
  );
}
