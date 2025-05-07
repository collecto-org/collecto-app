import { Link, useNavigate } from "react-router-dom";
import Title from "@/componentsUI/components/develop/Title";
import ImageGallery from "./ImageGallery";
import ExpandableText from "../../components/develop/ExpandableText";
import SellerCard from "@/componentsUI/components/develop/SellerCard";
import Tags from "@/componentsUI/elements/tags";
import ActionBar from "@/componentsUI/components/develop/ActionBar";
import Button from "@/componentsUI/elements/Button";
import { Advert } from "@/services/schemas/AdvertsSchemas";
import ShareButtons from "@/componentsUI/components/develop/SharedButtons";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/userSelectors";
import { RootState } from "@/store/store";
import {  setFilter } from "@/store/slices/advertsSlice";

interface AdvertDetailProps {
  advert: Advert;
  isFavorite: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleFav?: () => void;
  onForceLogin: (path?: string) => void;
}

export default function AdvertDetail({
  advert,
  onEdit,
  onDelete,
  onToggleFav,
  isFavorite,
  onForceLogin,
}: AdvertDetailProps) {
  const {
    images,
    createdAt,
    price,
    collection,
    condition,
    tags,
    status,
    transaction,
    title,
    brand,
    description,
    user,
  } = advert;

  const navigate = useNavigate();
  const userMe = useSelector((state: RootState) => selectUser(state));
  const dispatch = useDispatch();

  const handleFilter = (productType: string|undefined) => {
    dispatch(setFilter({ product_type: productType }));
  };


  const slugify = (text: string) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");


  const isSold = advert.status?.code?.toLowerCase?.() === "sold";
  const isReserved = advert.status?.code?.toLowerCase?.() === "reserved";

  return (
    <div className="max-w-4xl mx-auto px-6 pt-4 pb-12 mt-5 text-darkblue">
      <div className="mb-4">
        <Title
          headerLabel="Universo"
          label={advert.universe.name || "universoAPI"}
        />
        <div className="text-md text-gray-500 flex flex-wrap gap-1">
          <Link to={"/"} className="hover:underline cursor-pointer">
            Home
          </Link>{" "}
          /
          <Link
            to={`/universe/${slugify(advert.universe.name)}`}
            className="hover:underline cursor-pointer"
          >
            {advert.universe.name}
          </Link>{" "}
          /
          <Link
            to={`/universe/${slugify(advert.brand.name)}`}
            className="hover:underline cursor-pointer"
          >
            {advert.brand.name}
          </Link>{" "}
          /
          <Link
            to={`/`}
            onClick={() => handleFilter(advert.product_type._id)}
            className="hover:underline cursor-pointer"
          >
            {advert.product_type.name}
          </Link>{" "}
          /<span className="font-medium text-darkblue">{advert.title}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Imagen principal con banners */}
        <div className="w-full lg:w-1/2 relative">
          {(isSold || isReserved) && (
            <div className="absolute top-0 left-0 w-full z-20">
              {isSold && (
                <div className="bg-green-600 text-white text-center py-2 text-sm">
                  Vendido
                </div>
              )}
              {isReserved && !isSold && (
                <div className="bg-turquoise text-white text-center py-2 text-sm">
                  Reservado
                </div>
              )}
            </div>
          )}
          <ImageGallery images={images} title={advert.title} />
        </div>

        {/* Detalles */}
        <div className="w-full lg:w-1/2 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-coral text-md font-bold">{brand.name}</p>
              <p className="text-md text-sage">
                Transacción: {transaction.value} | Estado: {status.label}
              </p>
              <p className="text-xs text-sage">
                Publicado el: {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <ActionBar
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleFav={onToggleFav}
                isFavorite={isFavorite}
              />
            </div>
          </div>

          <h2 className="text-2xl font-black text-darkblue">{title}</h2>
          <p className="text-2xl font-bold text-coral">
            {price.toLocaleString("es-ES", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
            })}
          </p>

          <p className="text-md font-semibold text-darkblue">
            {condition.value}
          </p>
          <p className="text-md text-sage">{collection}</p>

          <ExpandableText text={description} />

          <div className="flex gap-2 flex-wrap">
            <Tags tags={tags} />
          </div>

          <div className="flex gap-4 mt-4">
            <Button
              hidden={
                user.username === userMe.username ||
                status.code === "reserved"||
                status.code === "sold"
              }
              variant="primary"
              onClick={() => {
                if (!userMe.username) {
                  onForceLogin("/orderpage");
                } else {
                  navigate("/orderpage");
                }
              }}
            >
              Comprar
            </Button>

            <Button
              hidden={
                user.username === userMe.username ||
                status.code === "reserved" ||
                status.code === "sold" 
              }
              variant="turquoise"
              onClick={() => {
                if (!userMe.username) {
                  onForceLogin(`/chat/${advert._id}_${userMe.username}`);
                } else {
                  navigate(`/chat/${advert._id}_${userMe.username}`);
                }
              }}
            >
              Iniciar Chat
            </Button>
          </div>
          <div className="flex justify-center lg:justify-start">
            <div className="p-2 bg-white border rounded-lg flex items-center gap-2 text-sm shadow-sm">
              <p className="font-medium text-darkblue">Compartir en:</p>
              <ShareButtons
                title={title}
                price={price}
                slug={advert.slug || advert._id}
              />
            </div>
          </div>

          <Link className="text-black" to={`/users/${user.username}`}>
            <SellerCard
              username={user.username || "Usuario"}
              avatarUrl={user.avatarUrl || "https://res.cloudinary.com/ds6adqnyz/image/upload/v1746387623/sa3ooiwos6owqotkokos.webp"}
              rating={user.rating || 4}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
