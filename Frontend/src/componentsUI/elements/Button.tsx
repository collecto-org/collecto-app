import React from "react";
import classNames from "classnames"

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "outline" | "turquoise";
    size?: "xs" | "sm" | "md" | "lg";
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?:boolean
  }

  //  button {
  //  background-color: #f9f9f9;
  //}
export default function Button({
    children,
    variant = "primary",
    onClick,
    size,
    className,
    disabled,
    type = "button",
}: ButtonProps){
    
    const sizeClasses = {
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
      };
      
    const baseClasses = 
    "px-4 py-2 rounded-full font-semibold text-sm transition duration-200";

    const variantClasses = {
        primary: "bg-coral text-white hover:bg-[#e4685c]",
        outline: "bg-cream border border-lightgray text-darkblue hover:bg-lightgray",
        turquoise: "bg-cream border border-turquoise text-darkblue hover:bg-[#e0f7f8]",
      };

    return(
        <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={classNames(baseClasses, variantClasses[variant] ,sizeClasses[size || "md"], className, disabled? "opacity-50 cursor-not-allowed" : "")}
        >
            {children}
        </button>
    )
}