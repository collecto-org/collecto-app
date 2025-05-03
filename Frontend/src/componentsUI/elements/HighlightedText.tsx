import React from "react";

interface HighlightedTextProps {
  text: string;
  highlights: string | string[];
}

export default function HighlightedText({
  text,
  highlights,
}: HighlightedTextProps) {
  const terms = Array.isArray(highlights) ? highlights : [highlights];

  const regex = new RegExp(`(${terms.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        terms.includes(part) ? (
          <span key={i} className="text-coral font-black">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
