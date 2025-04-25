// src/components/elements/ShareButtons.tsx
import React from "react";
import Icon from "@/componentsUI/elements/Icon";

interface ShareButtonsProps {
  title: string;
  price: number;
  slug: string; // o ID si no usas slugs aún
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, price, slug }) => {
  const serverUrl = "http://collecto.es"
  const shareUrl = encodeURIComponent(`${serverUrl}/api/adverts/og/${slug}`);
  const text = encodeURIComponent(`${title} por €${price}`);

  return (
    <div className="flex gap-4 mt-2">
    <a
      href={`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Compartir en Twitter"
    >
      <Icon name="twitter" size={24} className="text-blue-500 hover:text-blue-700" />
    </a>
    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Compartir en Facebook"
    >
      <Icon name="facebook" size={24} className="text-blue-700 hover:text-blue-900" />
    </a>
  </div>
  
  );
};

export default ShareButtons;
