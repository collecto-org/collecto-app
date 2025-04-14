// src/components/ProductGrid.tsx
import ProductCard from "./AdvertCard";

const mockProducts = [
  {
    imageUrl: "/adverts/ventress.png",
    brand: "Hot Toys",
    name: "Asajj Ventress",
    price: "1.099,99€",
  },
  {
    imageUrl: "/adverts/rebel-trooper-stormtrooper.png",
    brand: "Hasbro",
    name: "Rebel Trooper & Stormtrooper",
    price: "49,99€",
  },
  {
    imageUrl: "/adverts/obi-wan-kenobi.png",
    brand: "Hot Toys",
    name: "Obi-Wan Kenobi",
    price: "388,00€",
  },
  {
    imageUrl: "/adverts/boba-fett.png",
    brand: "Hot Toys",
    name: "Boba Fett Repaint Armor",
    price: "216,99€",
  },
];

export default function ProductGrid() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 px-4 mx-2 sm:px-6 py-4">
        {mockProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
        {mockProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}
