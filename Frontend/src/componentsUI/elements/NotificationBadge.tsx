import React from "react";

interface NotificationBadgeProps {
  count?: number | string;
  max?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export default function NotificationBadge({
  count,
  max = 99,
  position = "top-right",
  variant = "default",
  className = "",
}: NotificationBadgeProps) {
  if (!count || count === 0) return null;

  let displayValue = count;
  if (typeof count === "number" && count > max) {
    displayValue = `${max}+`;
  }

  const positionClasses: Record<string, string> = {
    "top-right": "-top-1 -right-1",
    "top-left": "-top-1 -left-1",
    "bottom-right": "-bottom-1 -right-1",
    "bottom-left": "-bottom-1 -left-1",
  };

  const variantClasses: Record<string, string> = {
    default: "bg-coral",
    success: "bg-hospitalgreen",
    warning: "bg-pinklight",
    danger: "bg-red-600",
  };

  return (
    <span
      className={`absolute ${positionClasses[position]} ${variantClasses[variant]} text-white text-[10px] font-bold px-[5px] py-[1px] leading-none rounded-full ${className}`}
    >
      {displayValue}
    </span>
  );
}
