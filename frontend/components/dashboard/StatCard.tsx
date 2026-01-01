import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
}

export default function StatCard({ title, value, icon, href, className = "" }: Props) {
  const content = (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold text-(--secondary-color)">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );

  if (href) return <Link href={href} className="block">{content}</Link>;
  return content;
}
