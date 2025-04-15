import { RootState } from "../store";


export const selectAdverts = (state:RootState) => state.adverts.adverts; //obtener todos los anuncios

export const selectSelectedAdvert = (state:RootState) => state.adverts.selectedAdvert; //obtener el anuncio con el estado seleccionado

export const selectAdvertBySlug = (slug: string | undefined) => (state: RootState) => //obtener el anuncio por su slug
    state.adverts.adverts.adverts.find((advert) => advert.slug === slug);

