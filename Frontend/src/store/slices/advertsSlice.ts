import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterAdverts } from "../../services/schemas/AdvertsSchemas";
import { advertsApi } from "../../services/advertsApi";

interface AdvertsState {
  filter: FilterAdverts;
  showDeleteModal: boolean;
  totalFilterAdverts: number;
  loading: boolean;
}

const initialState: AdvertsState = {
  filter: { page: 1, limit: 12 },
  showDeleteModal: false,
  totalFilterAdverts: 0,
  loading: false,
};

const isPendingAction = (action: any) => action.type.endsWith("/pending");
const isFulfilledAction = (action: any) => action.type.endsWith("/fulfilled");
const isRejectedAction = (action: any) => action.type.endsWith("/rejected");

const advertsSlice = createSlice({
  name: "adverts",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterAdverts>) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
    clearFilter: (state) => {
      state.filter = {page:1,limit:12};
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
      .addMatcher(advertsApi.endpoints.filterAdverts.matchRejected, (state) => {
        state.totalFilterAdverts = 0;
        state.loading = false;
      })
      .addMatcher(
        advertsApi.endpoints.filterAdverts.matchFulfilled,
        (state, action) => {
          const parsed = parseInt(action.payload.total, 10);
          state.totalFilterAdverts = isNaN(parsed) ? 0 : parsed;
          state.loading = false;
        }
      )
      .addMatcher(
        advertsApi.endpoints.getMyFavAdverts.matchFulfilled,
        (state, action) => {
          const parsed = parseInt(action.payload.total, 10);
          state.totalFilterAdverts = isNaN(parsed) ? 0 : parsed;
        }
      )
      .addMatcher(
        advertsApi.endpoints.getMyadverts.matchFulfilled,
        (state, action) => {
          const parsed = parseInt(action.payload.total, 10);
          state.totalFilterAdverts = isNaN(parsed) ? 0 : parsed;
        }
      )
      .addMatcher(
        advertsApi.endpoints.getUserAdverts.matchFulfilled,
        (state, action) => {
          const parsed = parseInt(action.payload.total, 10);
          state.totalFilterAdverts = isNaN(parsed) ? 0 : parsed;
        }
      );
  },
});

export const { setFilter, clearFilter, toggleDeleteModal } =
  advertsSlice.actions;

export default advertsSlice.reducer;
