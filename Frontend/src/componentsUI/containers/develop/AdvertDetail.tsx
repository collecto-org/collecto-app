import { useNavigate } from "react-router-dom";
import Title from "@/componentsUI/components/develop/Title";
import ImageGallery from "./ImageGallery"
import ExpandableText from "../../components/develop/ExpandableText"
import SellerCard from "@/componentsUI/components/develop/SellerCard";
import Tags from "@/componentsUI/elements/tags"
import ActionBar from "@/componentsUI/components/develop/ActionBar";
import Button from "@/componentsUI/elements/Button";
import { Advert } from "@/services/schemas/AdvertsSchemas";

interface AdvertDetailProps {
  advert:Advert;
  isFavorite:boolean;
  onEdit?: () => void ;
  onDelete?: () => void;
  onToggleFav?: () => void;
 
}

export default function AdvertDetail({
  advert,
  onEdit,
  onDelete,
  onToggleFav,
  isFavorite,
}: AdvertDetailProps) {

  const {
    images,
    universe,
    product_type,
    title,
    transaction,
    brand,

    price,
    collection,
    status,
    condition,
    tags,
    description,
    user
} = advert
  const navigate = useNavigate();




  return (
    <div className="max-w-3xl mx-auto px-6 pt-4 pb-10, mt-5 text-darkblue">
      <div className="mb-4">
        <Title headerLabel="Universo" label={universe.name || "universoAPI"} />
        <div className="text-sm text-gray-500 flex flex-wrap gap-1">
          <span className="hover:underline cursor-pointer">Inicio</span> /
          <span className="hover:underline cursor-pointer">{universe.name}</span> /
          <span className="hover:underline cursor-pointer">{brand.name}</span> /
          <span className="hover:underline cursor-pointer">{product_type.name}</span> /
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
              <p className="text-coral text-sm font-medium">{brand.name}</p>
              <p className="text-xs text-sage">Transacción: {transaction.label} / Estado: {status.label}</p>
            </div>
            <div>
            <ActionBar 
              onEdit={onEdit} 
              onDelete={onDelete} 
              onToggleFav={ onToggleFav} 
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

          <p className="text-sm font-semibold text-darkblue">{condition.value} </p>
          <p className="text-sm font-semibold text-darkblue">{universe.name} </p>
          <p className="text-xs text-sage">{collection}</p>

          <ExpandableText text={description} />

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
              onClick={() => navigate(`/chat/${user._id}`)}
            >
              Iniciar Chat
            </Button>
          </div>

          {/* Vendedor */}
          <SellerCard 
              username={user.username || "autor API"}
              avatarUrl={user.avatar|| "IMAGEAPI"}
              rating={user.rating|| 4}
            />

        </div>
      </div>
    </div>
  );
}
