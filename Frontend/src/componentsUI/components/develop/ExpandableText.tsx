import React, { useState } from "react";

interface ExpandableTextProps {
  text: string;
  className?: string;
  maxLength?: number;
}

export default function ExpandableText({
  text,
  className = "",
  maxLength = 100,
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded(prev => !prev);

  const preview = text.slice(0, maxLength);

  return (
    <div className={className}>
      <p className="text-[.7rem] text-gray-700">
        {expanded ? text : `${preview}...`}
      </p>
      <div className="text-right">
        <button
          onClick={toggle}
          className="text-sm text-turquoise hover:underline"
        >
          {expanded ? "Ver menos" : "Ver más"}
        </button>
      </div>
    </div>
  );
}
