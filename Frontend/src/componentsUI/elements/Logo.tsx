import { useNavigate } from "react-router-dom";

interface LogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  rounded?: boolean;
  className?: string;
  onClick?: () => void;
  redirectTo?: string;
}

export default function Logo({
  src,
  alt,
  width = 48,
  height,
  rounded = false,
  className = "",
  onClick,
  redirectTo,
}: LogoProps) {
  const navigate = useNavigate();
  const finalHeight = height || width;

  const handleClick = () => {
    if (redirectTo) {
      navigate(redirectTo);
    } else {
      onClick?.();
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      onClick={handleClick}
      className={`object-cover ${
        rounded ? "rounded-full" : ""
      } ${className} cursor-pointer`}
      style={{ width: `${width}px`, height: `${finalHeight}px` }}
    />
  );
}
