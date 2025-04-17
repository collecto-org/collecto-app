interface AdvertProps {
  slug: string;
  title: string;
  price: number;
  isReserved: boolean;
  isForSale: boolean;
  images: string[];
  author: { username: string };
}

export default function ProductCard({
  title,
  price,
  isReserved,
  isForSale,
  images,
  author
}: AdvertProps) {
  return (
    <div className="border rounded-xl shadow-md overflow-hidden bg-white">
      <img
        src={images[0]}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-gray-600">{isForSale ? "En venta" : "Se busca"}</p>
        <p className="text-gray-800 font-bold">{price.toFixed(2)} €</p>
        {isReserved && <p className="text-yellow-600">Reservado</p>}
        <p className="text-sm text-gray-500 mt-1">Publicado por {author.username}</p>
      </div>
    </div>
  );
}
