import React from "react";

interface TitleProps {
  headerLabel?: string;
  label?: string;
  centered?: boolean;
}

export default function Title({ headerLabel, label, centered = false }: TitleProps) {
  const alignment  = centered ? "text-center": "text-left";

  return (
    <div className={`ml-2 pl-2 pt-2 mr-2 ${alignment}`}>
        <p className="text-sage font-semibold text-xl mb-1">{headerLabel}</p>
        <h1 className="text-lg font-bold text-darkblue">{label}</h1>
    </div>

  );
}
