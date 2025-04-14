import "@material/web/button/filled-button.js";
import "@material/web/button/outlined-button.js";
import "@material/web/button/filled-tonal-button.js";
import React from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type MaterialVariant = "filled" | "outlined" | "tonal" | "filledDark";

interface MaterialButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: MaterialVariant;
  className?: string;
}

const stylesByVariant: Record<MaterialVariant, React.CSSProperties> = {
  filled: {
    "--md-sys-color-primary": "#e8796e", // coral
    "--md-sys-color-on-primary": "#ffffff",
  } as React.CSSProperties,
  outlined: {
    "--md-sys-color-outline": "#e8796e",
    "--md-sys-color-primary": "#e8796e",
  } as React.CSSProperties,
  tonal: {
    "--md-sys-color-surface-container-low": "#1d313c", // fondo
    "--md-sys-color-on-surface": "#ffffff", // texto
    "--md-sys-color-primary": "#e8796e", // ripple y focus
  } as React.CSSProperties,
  filledDark: {
    "--md-sys-color-primary": "#1d313c", // darkblue
    "--md-sys-color-on-primary": "#ffffff", // text color
  } as React.CSSProperties,
};

export default function MaterialButton({
  children,
  variant = "filled",
  className = "",
  ...props
}: MaterialButtonProps) {
  const tagName =
    variant === "outlined"
      ? "md-outlined-button"
      : variant === "tonal"
      ? "md-filled-tonal-button"
      : "md-filled-button";

  return React.createElement(
    tagName,
    {
      className,
      style: stylesByVariant[variant],
      ...props,
    },
    children
  );
}
