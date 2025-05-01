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
import { slugify } from "@/utils/slugify";
import { setFilter } from "@/store/slices/advertsSlice";

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
    universe,
    product_type,
    title,
    transaction,
    brand,
    createdAt,

    price,
    collection,
    status,
    condition,
    tags,
    description,
    user,
  } = advert;
  const navigate = useNavigate();
  const userMe = useSelector((state: RootState) => selectUser(state));
  const dispatch = useDispatch()
  const handleFilter = (productType:string) =>{
    dispatch(setFilter({product_type:productType}))
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pt-4 pb-10, mt-5 text-darkblue">
      <div className="mb-4">
        <Title
          headerLabel="Universo"
          label={advert.universe.name || "universoAPI"}
        />
        <div className="text-sm text-gray-500 flex flex-wrap gap-1">
          <Link to={"/"} className="text-sm text-gray-500 ">
          <span className="hover:underline cursor-pointer">Inicio</span> /
          </Link>
          <Link to={`/universe/${slugify(advert.universe.name)}`} className="text-sm text-gray-500 ">
          <span className="hover:underline cursor-pointer">
            {advert.universe.name}
          </span>{" "}
          </Link>
          /
          <Link to={`/universe/${slugify(advert.brand.name)}`} className="text-sm text-gray-500 ">
          <span className="hover:underline cursor-pointer">
            {advert.brand.name}
          </span>{" "}
          </Link>

          /
          <Link to={`/universe/${slugify(advert.universe.name)}`} onClick={()=>{handleFilter(slugify(advert.product_type._id))}} className="text-sm text-gray-500 ">
          <span className="hover:underline cursor-pointer">
            {advert.product_type.name}
          </span>{" "}
          </Link>
          /<span className="font-medium text-darkblue">{advert.title}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Imagen principal y miniaturas */}
        <div className="w-full lg:w-1/2">
          <ImageGallery images={images} title={advert.title} />
        </div>

        {/* Detalles */}
        <div className="w-full lg:w-1/2 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-coral text-sm font-medium">
                {advert.brand.name}
              </p>
              <p className="text-xs text-sage">
                Transacción: {advert.transaction.label} / Estado:{" "}
                {advert.status.label}
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

          <h1 className="text-2xl font-bold text-darkblue">{advert.title}</h1>
          <p className="text-xl font-semibold text-[#f24e4e]">
            {advert.price.toLocaleString("es-ES", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
            })}
          </p>

          <p className="text-sm font-semibold text-darkblue">
            {condition.value}{" "}
          </p>
          <p className="text-sm font-semibold text-darkblue">
            {universe.name}{" "}
          </p>
          <p className="text-xs text-sage">{collection}</p>

          <ExpandableText text={description} />

          <div className="flex gap-2 flex-wrap">
            <Tags tags={tags} />
          </div>

          <div className="flex gap-4 mt-4">
            <Button
              hidden={advert.user.username === userMe.username || advert.status.label === "Reservado"}
              variant="primary"
              onClick={() => {
                if(!userMe.username){
                  onForceLogin?.("/orderpage");
                } else{
                  navigate("/orderpage")
                }
              }}
            >
              Comprar
            </Button>

            <Button
              hidden={advert.user.username === userMe.username || advert.status.label === "Reservado"}
              variant="outline"
              onClick={() => {
                if(!userMe.username){
                  onForceLogin?.(`/chat/${advert._id}_${userMe.username}`);
                } else{
                  navigate(`/chat/${advert._id}_${userMe.username}`)
                }
              }}
            >
              Iniciar Chat
            </Button>
          </div>
          <ShareButtons
            title={advert.title}
            price={advert.price}
            slug={advert.slug || advert._id}
          />
          {/* Vendedor */}
          <Link className="text-black" to={`/users/${user.username}`}>
            <SellerCard
              username={user.username || "Usuario"}
              avatarUrl={user.avatarUrl || ""}
              rating={user.rating || 4}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
