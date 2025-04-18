import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-darkblue hover:text-coral"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
