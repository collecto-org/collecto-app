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
  product_type:string;
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
  collection,
  product_type,
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
    <div className="max-w-6xl mx-auto px-6 pt-6 pb-2  text-darkblue border ">
        <div className="px-0 pb-6 font-semibold border">
            <Title 
            headerLabel="Universo" 
            label="STAR WARS" 
             />

          <div className="text-sm text-gray-500 border border-red-600">
            <span className="hover:underline cursor-pointer">Inicio</span> /{" "}
            <span className="hover:underline cursor-pointer">{universe}</span> /{" "}
            <span className="hover:underline cursor-pointer">{manufacturer}</span> /{" "}
            <span className="hover:underline cursor-pointer">{product_type}</span> /{" "}
            <span className="font-medium text-darkblue">{title}</span>
          </div>
        </div>

      <div className="flex flex-col lg:flex-row gap-8 border border-blue-800">
        {/* Renderizado de imágenes */}
        <div className="w-full lg:w-1/2 border border-red-700">
          <img
            src={selectedImage}
            alt={title}
            className="w-full h-auto rounded-xl object-cover mb-4 border"
          />
          <div className="flex gap-2 overflow-x-auto pb-2 border border-orange-700">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded border flex-shrink-0 cursor-pointer ${
                  selectedImage === img ? "ring-2 ring-coral" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Detalles del producto */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between gap-4 border border-blue-800">
            {/* Marca */}
            <p className="text-coral font-semibold mb-1">
              {manufacturer || "Sin marca"}
            </p>

            {/* Título */}
            <h1 className="text-3xl font-bold text-darkblue mb-1">
              {title}
            </h1>

            {/* Precio */}
            <p className="text-2xl font-bold text-[#f24e4e] mb-2">
              {price.toLocaleString("es-ES", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 2,
              })}
            </p>

            {/* Estado del producto */}
            <p className="text-base text-darkblue font-semibold mb-2 capitalize">
              Estado: {condition}
            </p>

            {/* Disponibilidad */}
            <p className="text-sm text-sage mb-2 capitalize">
              Disponibilidad: {status}
            </p>

            {/* Colección */}
            {collection && (
              <p className="text-sm text-sage mb-2">
                Colección: {collection}
              </p>
            )}

            {/* Descripción */}
            <p className="text-sm text-gray-700 leading-5 mb-4">
              {description}
            </p>

            {/* Leer más (puede usarse más adelante si expandes la descripción) */}
            <div className="text-right border border-red-800">
              <button className="text-sm text-turquoise hover:underline">
                Leer más
              </button>
            </div>



          {/* Datos del vendedor */}
          <div className="border rounded-xl p-4 mt-8 shadow-sm w-full max-w-sm border border-red-500">
            <h3 className="text-darkblue text-sm font-semibold mb-2">Vendedor:</h3>
            <div className="flex items-center gap-4 border border-violet-700">
              <img
                //src={author.avatarUrl || "/images/default-avatar.png"}
                src="https://github.com/mdo.png"
                alt="avatar"
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div className="flex flex-col border border-yellow-500">
                <span className="text-darkblue font-medium">@{author.username}</span>
                <span className="text-xs text-sage">
                    ⭐ {author.rating ?? "4.5"} / 5
                  </span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 border border-black">
            <button
                onClick={() => navigate(`/chat/${author.userId}`)}
                className="p-2 rounded-full border border-coral hover:bg-coral hover:text-white transition-colors"
                title="Iniciar chat"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate(`/ratings/${author.userId}`)}
                className="flex items-center gap-1 text-sage text-sm hover:underline"
              >
                <span>Ver valoraciones</span>
                <span className="material-symbols-outlined text-xs">arrow_forward_ios</span>
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-3 mt-6 border border-red-500">
            {onEdit && (
              <button
                onClick={onEdit}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-lightgray"
              >
                Editar
              </button>
            )}

            {onDelete && (
              <button
                onClick={onDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
              >
                Eliminar
              </button>
            )}

            {onAddToFav && (
              <button
                onClick={onAddToFav}
                className="px-4 py-2 bg-hospitalgreen text-white rounded-lg text-sm hover:bg-green-700"
              >
                Añadir a favoritos
              </button>
            )}

            {onRemoveFromFav && (
              <button
                onClick={onRemoveFromFav}
                className="px-4 py-2 bg-lightgray text-darkblue rounded-lg text-sm hover:bg-gray-300"
              >
                Quitar de favoritos
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
