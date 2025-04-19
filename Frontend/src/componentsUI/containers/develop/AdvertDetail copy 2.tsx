import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import Title from "@/componentsUI/components/develop/Title";

interface AdvertDetailProps {
  title: string;
  description: string;
  price: number;
  status: "available" | "reserved" | "sold";
  images: string[];
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
  price,
  status,
  images,
  tags,
  universe,
  product_type,
  collection,
  manufacturer,
  condition,
  author,
  onEdit,
  onDelete,
  onAddToFav,
  onRemoveFromFav,
}: AdvertDetailProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-4 pb-10 text-darkblue">
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
          <div className="rounded-xl overflow-hidden border">
            <img
              src={selectedImage}
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
        </div>

        {/* Detalles */}
        <div className="w-full lg:w-1/2 space-y-3">
          <p className="text-coral text-sm font-medium">{manufacturer}</p>
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
          <p className="text-xs text-sage">{collection}// Star Wars: Return of the Jedi</p>
          <p className="text-[.7rem] text-gray-700">
            {description}
            // Conmemora el 40º aniversario de Star Wars: El Retorno del Jedi. Esta línea cuenta con diseño y embalaje clásicos. Esta figura coleccionable viene a escala de 15 cm de la línea The Black Series con diseño premium y múltiples puntos de articulación.
          </p>
          <button
            className="ml-auto text-sm text-turquoise hover:underline"
            >
            Ver más
          </button>
          
          <div className="flex gap-4 mt-4">
            <button 
              className="px-4 py-2 bg-coral text-white rounded-lg font-medium"
              >
                Comprar
            </button>
            <button 
            onClick={() => navigate(`/chat/${author.userId}`)}
            className="px-4 py-2 border border-darkblue text-darkblue rounded-lg font-medium"
            >
              Iniciar Chat
              </button>
          </div>

          {/* Vendedor */}
          <div className="mt-6 p-4 border rounded-xl shadow-sm max-w-sm">
            <h3 className="text-sm font-semibold mb-2">Vendedor:</h3>
            <div className="flex items-center gap-4">
              <img
                src="https://github.com/mdo.png" 
                //src={author.avatarUrl || "/images/default-avatar.png"}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div className="text-sm">
                <p className="font-medium">{author.username}</p>
                <p className="text-xs text-sage">
                  ⭐ {author.rating ?? "4.5"} · 354 valoraciones
                </p>
              </div>
              <button
                onClick={() => navigate(`/ratings/${author.userId}`)}
                className="flex items-center gap-1 text-sage text-sm hover:underline"
              >

                <span className="material-symbols-outlined text-xs">arrow_forward_ios</span>
              </button>
            </div>
          </div>

          {/* Botones de edicion */}
          <div className="flex gap-4 mt-4">
          {onDelete && (
              <button
                onClick={onDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
              >
                Eliminar
              </button>
            )}
              {onEdit && (
              <button
                onClick={onEdit}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-lightgray"
              >
                Editar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
