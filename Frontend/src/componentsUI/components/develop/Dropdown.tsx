import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  label: React.ReactNode;
  children: React.ReactNode;
  onToggle?: () => void;
}

export default function Dropdown({ label, children, onToggle }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => {
          setOpen(!open);
          onToggle?.(); 
        }}
        className="focus:outline-none"
>
        {label}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-lightgray rounded-md shadow-lg z-10">
          {children}
        </div>
      )}
    </div>
  );
}

Dropdown.Item = function DropdownItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-sm  hover:bg-lightgray"
    >
      {children}
    </button>
  );
};