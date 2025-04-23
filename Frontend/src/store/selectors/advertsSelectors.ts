import { RootState } from "../store";


export const selectFilterAdverts = (state:RootState) => state.adverts.totalFilterAdverts; //obtener todos los anuncios
//obtener el anuncio con el estado seleccionado


export const selectFilters = (state:RootState) => state.adverts.filter; 


