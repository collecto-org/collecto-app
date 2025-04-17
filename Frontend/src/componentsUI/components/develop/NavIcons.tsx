import { FaRegEnvelope, FaRegBell, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import React from "react";

export default function NavIcons() {
  return (
    <div className="flex items-center gap-2 text-darkblue text-lg px-5">
      <button className="relative hover:text-coral transition-colors">
        <FaRegEnvelope />
        <span className="absolute -top-1 -right-1 bg-coral text-white text-[10px] font-bold px-[5px] py-[1px] leading-none rounded-full">
            5
        </span>
      </button>

      <button className="relative hover:text-coral transition-colors">
        <FaRegBell />
        <span className="absolute -top-1 -right-1 bg-coral text-white text-[10px] font-bold px-[5px] py-[1px] leading-none rounded-full">
            3
        </span>

      </button>

      <button className="hover:text-coral transition-colors">
        <FaRegHeart />
      </button>

      <button className="hover:text-coral transition-colors">
        <FaRegCommentDots />

      </button>
    </div>
  );
}
