import React from "react";

interface TitleProps {
  headerLabel?: string;
  label?: string;
}

export default function Title({ headerLabel, label }: TitleProps) {
  return (
    <div className={`ml-2 pl-2 pt-2 mr-2`}>
        <p className="text-sage font-semibold text-xl mb-1">{headerLabel}</p>
        <h1 className="text-lg font-bold text-darkblue">{label}</h1>
    </div>

  );
}
