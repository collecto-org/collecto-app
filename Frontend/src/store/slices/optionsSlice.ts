import { brandsApi } from "@/services/brandsApi";
import { collectionsApi } from "@/services/collectionsApi";
import { conditionsApi } from "@/services/conditionsApi";
import { productTypesApi } from "@/services/productTypesApi";
import { BrandSchema, CollectionSchema, ConditionSchema, ProductTypeSchema, ShippingMethodSchema, statusSchema, TransactionSchema, UniverseSchema } from "@/services/schemas/UniverseSchemas";
import { shippingMethodsApi } from "@/services/shipmentMethodsApi";
import { statusApi } from "@/services/statusApi";
import { transactionsApi } from "@/services/transactionsApi";
import { universesApi } from "@/services/universesApi";
import { createSlice } from "@reduxjs/toolkit";

interface OptionsState {
  universes: UniverseSchema[] | null
  brands:BrandSchema[] | null
  collections:CollectionSchema[] | null
  productsTypes:ProductTypeSchema[] | null
  conditions:ConditionSchema[] | null
  transactions:TransactionSchema[] | null
  shippingMethods:ShippingMethodSchema[] | null
  status:statusSchema[] | null
  loading:boolean
}

const initialState: OptionsState = {
  universes:null,
  brands:null,
  collections:null,
  conditions:null,
  productsTypes:null,
  shippingMethods:null,
  transactions:null,
  status:null,
  loading:false,
};

const isPendingAction = (action: any) => action.type.endsWith('/pending');
const isFulfilledAction = (action: any) => action.type.endsWith('/fulfilled');
const isRejectedAction = (action: any) => action.type.endsWith('/rejected');

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    
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
        universesApi.endpoints.getUniverses.matchFulfilled,
        (state, action) => {
          state.universes = action.payload
        }
      )
      .addMatcher(
        brandsApi.endpoints.getBrands.matchFulfilled,
        (state, action) => {
          state.brands= action.payload
        }
      )
      .addMatcher(
        collectionsApi.endpoints.getCollections.matchFulfilled,
        (state, action) => {
          state.collections= action.payload
        }
      )
      .addMatcher(
        productTypesApi.endpoints.getProductTypes.matchFulfilled,
        (state, action) => {
          state.productsTypes= action.payload
        }
      )
      .addMatcher(
        shippingMethodsApi.endpoints.getshippingMethods.matchFulfilled,
        (state, action) => {
          state.shippingMethods= action.payload
        }
      )
      .addMatcher(
        transactionsApi.endpoints.getTransactions.matchFulfilled,
        (state, action) => {
          state.transactions= action.payload
        }
      )
      .addMatcher(
        conditionsApi.endpoints.getConditions.matchFulfilled,
        (state, action) => {
          state.conditions= action.payload
        }
      )
      .addMatcher(
        statusApi.endpoints.getStatus.matchFulfilled,
        (state, action) => {
          state.status= action.payload
        }
      )
  },
});

export const {
    
  
} = optionsSlice.actions

export default optionsSlice.reducer;