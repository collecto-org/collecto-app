import advertsReducer, {
    setAdverts,
    setSelectedAdvert,
    clearSelectedAdvert,
    setFilter,
    clearFilter,
    setEditMode,
    toggleDeleteModal,
    setSelectedAdvertAndLoad,
  } from "@/store/slices/advertsSlice";
  import { Advert } from "@/services/schemas/AdvertsSchemas";

  import { describe, it, expect } from 'vitest'

  const exampleAdvert: Advert = {
    _id: "1",
    title: "Ejemplo",
    slug: "ejemplo",
    description: "Un anuncio de prueba",
    mainImage: "url",
    price: 100,
    transaction: "venta",
    status: "disponible",
    isVisible: "true",
    product_type: "figura",
    universe: "starwars",
    condition: "nuevo",
    collection: "2024",
    brand: "Hasbro",
    tags: ["colección", "figura"],
    user: "123",
    createdAt: new Date(),
    images: ["img1"],
  };
  
  describe("advertsSlice", () => {
    it("debe establecer anuncios", () => {
      const state = advertsReducer(undefined, setAdverts({ adverts: [exampleAdvert], total: "1" }));
      expect(state.adverts.adverts.length).toBe(1);
      expect(state.adverts.total).toBe("1");
    });
  
    it("debe seleccionar un anuncio", () => {
      const state = advertsReducer(undefined, setSelectedAdvert(exampleAdvert));
      expect(state.selectedAdvert).toEqual(exampleAdvert);
    });
  
    it("debe limpiar el anuncio seleccionado", () => {
      const initial = { ...advertsReducer(undefined, setSelectedAdvert(exampleAdvert)) };
      const state = advertsReducer(initial, clearSelectedAdvert());
      expect(state.selectedAdvert).toBeNull();
    });
  
    it("debe establecer filtros", () => {
      const state = advertsReducer(undefined, setFilter({ brand: "Hasbro" }));
      expect(state.filter.brand).toBe("Hasbro");
    });
  
    it("debe limpiar filtros", () => {
      const initial = { ...advertsReducer(undefined, setFilter({ brand: "Hasbro" })) };
      const state = advertsReducer(initial, clearFilter());
      expect(state.filter).toEqual({});
    });
  
    it("debe activar/desactivar modo edición", () => {
      const state = advertsReducer(undefined, setEditMode(true));
      expect(state.isEditMode).toBe(true);
    });
  
    it("debe activar/desactivar modal", () => {
      const state = advertsReducer(undefined, toggleDeleteModal(true));
      expect(state.showDeleteModal).toBe(true);
    });
  
    it("debe establecer anuncio seleccionado y agregarlo al array", () => {
      const state = advertsReducer(undefined, setSelectedAdvertAndLoad(exampleAdvert));
      expect(state.selectedAdvert).toEqual(exampleAdvert);
      expect(state.adverts.adverts[0]).toEqual(exampleAdvert);
    });
  });
  