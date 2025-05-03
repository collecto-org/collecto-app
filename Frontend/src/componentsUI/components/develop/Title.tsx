import React from "react";

interface TitleProps {
  headerLabel?: string;
  label?: string;
  centered?: boolean;
}

export default function Title({
  headerLabel,
  label,
  centered = false,
}: TitleProps) {
  const alignment = centered ? "text-center" : "text-left";

  return (
    <div className={`${alignment}`}>
      <p className="text-sage font-semibold text-md">{headerLabel}</p>
      <h1 className="text-3xl font-bold text-darkblue">{label}</h1>
    </div>
  );
}
