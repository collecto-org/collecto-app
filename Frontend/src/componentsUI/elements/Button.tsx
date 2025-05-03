import React from "react";
import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outlined" | "turquoise" | "danger" | "tonal";
  size?: "xs" | "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  hidden?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  size,
  className,
  disabled,
  hidden,
  type = "button",
}: ButtonProps) {
  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const baseClasses =
    "px-4 py-2 rounded-full font-semibold text-sm transition duration-200";

  const variantClasses = {
    primary: "bg-coral text-white hover:bg-[#e4685c] hover:text-darkblue",
    outlined:
      "bg-white border border-coral text-coral hover:bg-cream hover:text-darkblue",
    turquoise:
      "bg-white border-2 border-turquoise text-turquoise hover:bg-turquoise hover:text-darkblue",
    danger: "bg-red-500 border text-white hover:bg-lightgrey",
    tonal: "bg-darkblue text-white hover:bg-turquoise",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      hidden={hidden}
      onClick={onClick}
      className={classNames(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size || "md"],
        className,
        disabled ? "opacity-50 cursor-not-allowed" : ""
      )}
    >
      {children}
    </button>
  );
}
