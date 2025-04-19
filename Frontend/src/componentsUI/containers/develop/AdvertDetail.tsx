import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
//import { MessageCircle, Pencil, Edit, Heart, Trash2 } from "lucide-react";
import Title from "@/componentsUI/components/develop/Title";
import ImageGallery from "./ImageGallery"
import ExpandableText from "../../components/develop/ExpandableText"
import SellerCard from "@/componentsUI/components/develop/SellerCard";
import Tags from "@/componentsUI/elements/tags"
import ActionBar from "@/componentsUI/components/develop/ActionBar";
import Button from "@/componentsUI/elements/Button";

interface AdvertDetailProps {
  title: string;
  description: string;
  price: number;
  status: "available" | "reserved" | "sold";
  images: string[];
  transaction: string;
  tags: string[];
  universe: string;
  product_type: string;
  collection?: string;
  manufacturer?: string;
  condition: "new" | "used" | "broken";
  author: {
    username: string;
    avatarUrl?: string;
    rating?: number;
    userId?: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
  onAddToFav?: () => void;
  onRemoveFromFav?: () => void;
}

export default function AdvertDetail({
  title,
  description,
  images,
  price,
  transaction,
  status,
  product_type,
  universe,
  condition,
  collection,
  manufacturer,
  tags,
  author,
  onEdit,
  onDelete,
  onAddToFav,
  onRemoveFromFav,
}: AdvertDetailProps) {
  const descriptionExample = description + "// Conmemora el 40º aniversario de Star Wars: El Retorno del Jedi. Esta línea cuenta con diseño y embalaje clásicos. Esta figura coleccionable viene a escala de 15 cm de la línea The Black Series con diseño premium y múltiples puntos de articulación."
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleToggleFav  = () => {
    setIsFavorite(!isFavorite);
   // onAddToFav?.();
   if (!isFavorite){
      alert("Anuncio agregado a favoritos");
   }else{
      alert("Anuncio afuera de favoritos");
   }
    
  };


  return (
    <div className="max-w-3xl mx-auto px-6 pt-4 pb-10, mt-5 text-darkblue">
      <div className="mb-4">
        <Title headerLabel="Universo" label={universe.toUpperCase()} />
        <div className="text-sm text-gray-500 flex flex-wrap gap-1">
          <span className="hover:underline cursor-pointer">Inicio</span> /
          <span className="hover:underline cursor-pointer">{universe}</span> /
          <span className="hover:underline cursor-pointer">{manufacturer}</span> /
          <span className="hover:underline cursor-pointer">{product_type}</span> /
          <span className="font-medium text-darkblue">{title}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Imagen principal y miniaturas */}
        <div className="w-full lg:w-1/2">
          <ImageGallery images={images} title={title} />
        </div>

        {/* Detalles */}
        <div className="w-full lg:w-1/2 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-coral text-sm font-medium">{manufacturer}</p>
              <p className="text-xs text-sage">Transacción: {transaction} / Estado: {status}</p>
            </div>
            <div>
            <ActionBar 
              onEdit={onEdit} 
              onDelete={onDelete} 
              onToggleFav={handleToggleFav} 
              isFavorite={isFavorite}
            />
            </div>

          </div>

          <h1 className="text-2xl font-bold text-darkblue">{title}</h1>
          <p className="text-xl font-semibold text-[#f24e4e]">
            {price.toLocaleString("es-ES", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
            })}
          </p>

          <p className="text-sm font-semibold text-darkblue">{condition} // Nuevo con empaque perfecto</p>
          <p className="text-sm font-semibold text-darkblue">{universe} // The Black Series</p>
          <p className="text-xs text-sage">{collection} // Star Wars: Return of the Jedi</p>

          <ExpandableText text={descriptionExample} />

          <div className="flex gap-2 flex-wrap">
              <Tags tags={tags}/>
          </div>

          <div className="flex gap-4 mt-4">
            <Button 
              variant="primary"
              onClick={()=> navigate(`/Orderpage`)}
            >
              Comprar
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate(`/chat/${author.userId}`)}
            >
              Iniciar Chat
            </Button>
          </div>

          {/* Vendedor */}
          <SellerCard 
              username={author.username}
              avatarUrl={author.avatarUrl}
              rating={author.rating}
              userId={author.userId}
            />

        </div>
      </div>
    </div>
  );
}
