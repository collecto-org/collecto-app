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
  FaFacebook,
  FaTwitter,
  FaPhone,
  FaInfoCircle,
  FaEye,
  FaEyeSlash,
  FaExclamationTriangle,
} from "react-icons/fa";
import { IconType } from "react-icons";

import { HiOutlineCube } from "react-icons/hi";

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
  list: FaList,
  helpCircle: FaHelicopter,
  calendar: FaCalendar,
  database: FaDatabase,
  Save: FaSave,
  box: HiOutlineCube,
  twitter: FaTwitter,
  facebook: FaFacebook,
  phone: FaPhone,
  info: FaInfoCircle,
  openEye: FaEye,
  closeEye: FaEyeSlash,
  alertTriangle: FaExclamationTriangle,
};

interface IconProps {
  name: keyof typeof icons;
  size?: number;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export default function Icon({
  name,
  size = 20,
  className,
  onClick,
  active,
}: IconProps) {
  const Component =
    active && name === "heart" ? icons["heartFilled"] : icons[name];
  return (
    <Component
      size={size}
      className={`${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    />
  );
}
