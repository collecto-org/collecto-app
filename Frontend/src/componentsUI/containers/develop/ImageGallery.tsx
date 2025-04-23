import { useEffect, useState } from "react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    setSelectedImage(images[0]); 
  }, [images]);

if(selectedImage){
  return (
    <>
      <div className="rounded-xl overflow-hidden border">
        <img
          src={selectedImage } 
          alt={title}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="flex gap-2 mt-2 overflow-x-auto">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`thumb-${idx}`}
            onClick={() => setSelectedImage(img)}
            className={`w-12 h-12 object-cover rounded border cursor-pointer flex-shrink-0 ${
              selectedImage === img ? "ring-2 ring-coral" : ""
            }`}
          />
        ))}
      </div>
    </>
  );}
}
