import React from "react";
import {
  FaRegHeart,
  FaRegBell,
  FaRegCommentDots,
  FaRegEnvelope,
  FaHeart,
  FaEdit,
  FaTrash,
  FaUser,
  FaMapPin,
  FaCreditCard,
  FaFileArchive,
  FaList,
  FaHelicopter,
  FaCalendar,
  FaDatabase,
  FaSave,
} from "react-icons/fa";
import { IconType } from "react-icons";

const icons: Record<string, IconType> = {
  heart: FaRegHeart,
  heartFilled: FaHeart,
  bell: FaRegBell,
  chat: FaRegCommentDots,
  mail: FaRegEnvelope,
  Edit: FaEdit, 
  Trash: FaTrash,
  user: FaUser,
  mapPin: FaMapPin, 
  creditCard: FaCreditCard,
  fileText: FaFileArchive, 
  list:FaList, 
  helpCircle:FaHelicopter, 
  calendar: FaCalendar,
  database: FaDatabase,
  Save:FaSave,
};

interface IconProps {
  name: keyof typeof icons;
  size?: number;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export default function Icon({ name, size = 20, className, onClick, active }: IconProps) {

  const Component = active && name === "heart" ? icons["heartFilled"] : icons[name];
  return (
  <Component 
    size={size} 
    className={className} 
    onClick={onClick} 
    style={{ cursor: onClick ? "pointer" : "default"}}
    />);
}