import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Advert, FilterAdverts } from "../../services/schemas/AdvertsSchemas";
import { advertsApi } from "../../services/advertsApi";
import { userApi } from "@/services/usersApi";

interface AdvertsState {
  selectedAdvert: Advert | null;
  filter: FilterAdverts;
  isEditMode: boolean;
  showDeleteModal: boolean;
  adverts: { adverts: Advert[]; total: string };
  loading: boolean;
}

const initialState: AdvertsState = {
  selectedAdvert: null,
  filter: {},
  isEditMode: false,
  showDeleteModal: false,
  adverts: { adverts: [], total: "0" },
  loading: false,
};

const isPendingAction = (action: any) => action.type.endsWith('/pending');
const isFulfilledAction = (action: any) => action.type.endsWith('/fulfilled');
const isRejectedAction = (action: any) => action.type.endsWith('/rejected');

const advertsSlice = createSlice({
  name: "adverts",
  initialState,
  reducers: {
    setAdverts: (
      state,
      action: PayloadAction<{ adverts: Advert[]; total: string }>
    ) => {
      state.adverts.adverts = action.payload.adverts;
      state.adverts.total = action.payload.total;
    },
    setSelectedAdvert: (state, action: PayloadAction<Advert>) => {
      state.selectedAdvert = action.payload;
    },
    setSelectedAdvertAndLoad: (state, action: PayloadAction<Advert>) => {
      state.selectedAdvert = action.payload;
      state.adverts.adverts = [...state.adverts.adverts, action.payload];
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
    .addMatcher(isPendingAction, (state) => {
      state.loading = true;
    })
    .addMatcher(isFulfilledAction, (state) => {
      state.loading = false;
    })
    .addMatcher(isRejectedAction, (state) => {
      state.loading = false;
    })
      .addMatcher(
        // carga de adverts
        advertsApi.endpoints.getAllAdverts.matchFulfilled,
        (state, action) => {
          state.adverts.adverts = action.payload.adverts;
          state.adverts.total = action.payload.total;
          state.loading = false;
        }
      )
      .addMatcher(
        advertsApi.endpoints.editAdvert.matchFulfilled,
        (state, action) => {
          const updated = action.payload.advert;

          state.selectedAdvert = updated;
          const index = state.adverts.adverts.findIndex(
            (adv) => adv._id === updated._id
          );
          if (index !== -1) {
            state.adverts.adverts[index] = updated;
          }
          state.selectedAdvert = updated;
        }
      )
      .addMatcher(
        advertsApi.endpoints.deleteAdvert.matchFulfilled,
        (state) =>{
          state.adverts.adverts = state.adverts.adverts.filter((adv) => adv._id != state.selectedAdvert?._id);
          state.selectedAdvert = null 
        }
      )
      .addMatcher(
        userApi.endpoints.getMyadverts.matchFulfilled,
        (state,action) =>{
          state.adverts.adverts = action.payload.adverts
          state.adverts.total = action.payload.total
          state.selectedAdvert = null 
        }
      ) 
      .addMatcher(
        userApi.endpoints.getMyFavAdverts.matchFulfilled,
        (state,action) =>{
          state.adverts.adverts = action.payload.adverts
          state.adverts.total = action.payload.total
          state.selectedAdvert = null 
        }
      ) 
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
  setSelectedAdvertAndLoad,
} = advertsSlice.actions;

export default advertsSlice.reducer;
