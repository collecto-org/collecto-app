import React from "react";

interface ResponsiveImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

export default function ResponsiveImage({
  src,
  alt = "image",
  width = 160,
  height = 80,
  className = "",
  onClick,
}: ResponsiveImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onClick={onClick}
      className={`object-contain transition-transform duration-200 hover:scale-105 cursor-pointer rounded-md ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
}
