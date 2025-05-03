interface SimpleBannerProps {
  backgroundImages: string[];
  overlayOpacity?: string;
  isBrandBanner?: boolean;
}

export default function SimpleBanner({
  backgroundImages,
  overlayOpacity = "bg-opacity-40",
  isBrandBanner = false,
}: SimpleBannerProps) {
  const banner = backgroundImages[0];

  return (
    <div className="relative w-full h-48 md:h-80 overflow-hidden">
      <img
        src={banner}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Aplica overlay solo si no es banner de marca */}
      {!isBrandBanner && (
        <div className={`absolute inset-0 bg-black ${overlayOpacity} z-10`} />
      )}
    </div>
  );
}
