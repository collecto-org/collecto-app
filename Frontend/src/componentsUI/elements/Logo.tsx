import React from "react";

interface LogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  rounded?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Logo({
  src,
  alt,
  width = 48,
  height,
  rounded = false,
  className = "",
  onClick,
}: LogoProps) {
  const finalHeight = height || width;

  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      className={`object-cover ${rounded ? "rounded-full" : ""} ${className}`}
      style={{ width: `${width}px`, height: `${finalHeight}px` }}
    />
  );
}
