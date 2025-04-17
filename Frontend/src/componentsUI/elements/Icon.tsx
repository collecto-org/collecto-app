import React from "react";
import {
  FaRegHeart,
  FaRegBell,
  FaRegCommentDots,
  FaRegEnvelope,
  FaHeart,
} from "react-icons/fa";
import { IconType } from "react-icons";

const icons: Record<string, IconType> = {
  heart: FaRegHeart,
  heartFilled: FaHeart,
  bell: FaRegBell,
  chat: FaRegCommentDots,
  mail: FaRegEnvelope,
};

interface IconProps {
  name: keyof typeof icons;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export default function Icon({ name, size = 20, className, onClick }: IconProps) {
  const Component = icons[name];
  return <Component size={size} className={className} onClick={onClick} />;
}