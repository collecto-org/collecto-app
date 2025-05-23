import { createSelector } from "reselect";
import { RootState } from "../store";


export const selectUniverses = (state:RootState) => state.options.universes

export const selectBrands = (state:RootState) => state.options.brands

export const selectProductTypes = (state:RootState) => state.options.productTypes

export const selectCollections = (state:RootState) => state.options.collections

export const selectConditions = (state:RootState) => state.options.conditions

export const selectTransactions = (state:RootState) => state.options.transactions

export const selectStatus = (state:RootState) => state.options.statuses

export const selectShipmentMethods = (state:RootState) => state.options.shippingMethods

export const selectUniverseBySlug = (slug: string | undefined) => (state: RootState) => 
    state.options.universes?.find((universe) => universe.slug === slug);

export const selectbrandBySlug = (slug: string | undefined) => (state: RootState) => 
    state.options.brands?.find((brand) => brand.slug === slug);

export const selectUniverseOrBrandBySlug = createSelector(
  (_state: RootState, slug: string | undefined) => slug,
  selectUniverses,
  selectBrands,
  (slug, universes, brands) => {
    if (!slug) return null;

    const universe = universes?.find((u) => u.slug === slug);
    if (universe) {
      return { universe, type: "universe" };
    }

    const brand = brands?.find((b) => b.slug === slug);
    if (brand) {
      return { universe: brand, type: "brand" };
    }

    return null;
  }
);
  

export const selectPaymentStatus = createSelector(
  [selectStatus],
  (status) => status?.filter(s => s.context === "payment")
);

export const selectAdvertStatus = createSelector(
  [selectStatus],
  (status) => status?.filter(s => s.context === "Advert")
);

export const selectOrderStatus = createSelector(
  [selectStatus],
  (status) => status?.filter(s => s.context === "order")
);