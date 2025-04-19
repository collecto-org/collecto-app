import { Advert } from "@/services/schemas/AdvertsSchemas";

const base: Advert[] = [
    {
      _id: "1",
      slug: "asajj-ventress",
      title: "Asajj Ventress",
      description: "Figura coleccionable de Star Wars",
      price: 1099.99,
      mainImage: "ventress.png",
      images: ["ventress.png"],
      transaction: "venta",
      status: "available",
      isVisible: "true",
      product_type: "Figura",
      universe: "Star Wars",
      condition: "new",
      collection: "The Black Series",
      brand: "Hot Toys",
      tags: ["goku"],
      user: "user1",
      createdAt: new Date(),
    },
    {
      _id: "2",
      slug: "stormtrooper-pack",
      title: "Rebel Trooper & Stormtrooper",
      description: "Paquete de figuras Hasbro",
      price: 49.99,
      mainImage: "rebel-trooper-stormtrooper.png",
      images: ["rebel-trooper-stormtrooper.png"],
      transaction: "venta",
      status: "available",
      isVisible: "true",
      product_type: "Figura",
      universe: "Star Wars",
      condition: "new",
      collection: "The Black Series",
      brand: "Hasbro",
      tags: ["trooper"],
      user: "user1",
      createdAt: new Date(),
    },
    // ...añade más como estos
  ];
  
  export const mockProducts = Array.from({ length: 10 }, (_, i) => base[i % base.length]);