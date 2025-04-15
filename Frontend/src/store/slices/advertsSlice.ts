import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Advert, FilterAdverts } from "../../services/schemas/AdvertsSchemas";
import { advertsApi } from "../../services/advertsApi";

interface AdvertsState {
    selectedAdvert: Advert | null;
    filter: FilterAdverts;
    isEditMode: boolean;
    showDeleteModal: boolean;
    adverts: Advert[];  
    loading: boolean;  
  }
  
  const initialState: AdvertsState = {
    selectedAdvert: null,
    filter: {},
    isEditMode: false,
    showDeleteModal: false,
    adverts: [],
    loading: false,
  };
  
  const advertsSlice = createSlice({
    name: "adverts",
    initialState,
    reducers: {
        setAdverts: (state, action: PayloadAction<Advert[]>) => {
        state.adverts = action.payload;
      },
      setSelectedAdvert: (state, action: PayloadAction<Advert>) => {
        state.selectedAdvert = action.payload;
      },
      setSelectedAdvertAndLoad: (state, action: PayloadAction<Advert>) => {
        state.selectedAdvert = action.payload;
        state.adverts = [...state.adverts , action.payload];
      },
      clearSelectedAdvert: (state) => {
        state.selectedAdvert = null;
      },
      setFilter: (state, action: PayloadAction<FilterAdverts>) => {
        state.filter = action.payload;
      },
      clearFilter: (state) => {
        state.filter = {};
      },
      setEditMode: (state, action: PayloadAction<boolean>) => {
        state.isEditMode = action.payload;
      },
      toggleDeleteModal: (state, action: PayloadAction<boolean>) => {
        state.showDeleteModal = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addMatcher( // carga de adverts
          advertsApi.endpoints.getAllAdverts.matchFulfilled,
          (state, action) => {
            state.adverts = action.payload;  
            state.loading = false;  }
        )
        .addMatcher(
          advertsApi.endpoints.getAllAdverts.matchPending,
          (state) => {
            state.loading = true;  
          }
        )
        .addMatcher(
          advertsApi.endpoints.getAllAdverts.matchRejected,
          (state) => {
            state.loading = false;  
          }
        );
    },
  });
  
  export const {
    setAdverts,
    setSelectedAdvert,
    clearSelectedAdvert,
    setFilter,
    clearFilter,
    setEditMode,
    toggleDeleteModal,
    setSelectedAdvertAndLoad
  } = advertsSlice.actions;

  export default advertsSlice.reducer;
