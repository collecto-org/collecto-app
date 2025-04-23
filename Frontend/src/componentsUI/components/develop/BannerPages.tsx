import React from "react";

interface SimpleBannerProps {
  backgroundImages: string[];
  height?: string;
  overlayOpacity?: string;
}

export default function SimpleBanner({
  backgroundImages,
  height = "h-72",
  overlayOpacity = "bg-opacity-40",
}: SimpleBannerProps) {
  const banner = backgroundImages[0];

  return (
    <div className={`relative w-full ${height} overflow-hidden`}>
      <img
        src={banner}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className={`absolute inset-0 bg-black ${overlayOpacity} z-10`} />
    </div>
  );
}
