import React, { useState, useRef, useEffect, ReactElement } from "react";

interface DropdownItemProps {
  children: string;
  onClick?: () => void;
}

interface DropdownProps {
  label: React.ReactNode;
  children: ReactElement<DropdownItemProps>[] | ReactElement<DropdownItemProps>;
  onToggle?: () => void;
  onSelect?: (value: string) => void;
}

export default function Dropdown({
  label,
  children,
  onToggle,
  onSelect,
}: DropdownProps) {
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

  const handleItemClick = (value: string) => {
    onSelect?.(value);
    setOpen(false);
  };

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
        <div className="absolute left-0 -ml-16 mt-3 w-48 bg-white border border-lightgrey rounded shadow-md z-10">
          {React.Children.map(children, (child) => {
            if (React.isValidElement<DropdownItemProps>(child)) {
              return React.cloneElement(child, {
                onClick: () => {
                  child.props.onClick?.();
                  handleItemClick(child.props.children);
                },
              });
            }
            return child;
          })}
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
      className="w-full text-left px-4 py-2 text-sm sm:text-base hover:bg-lightgrey"
    >
      {children}
    </button>
  );
};
