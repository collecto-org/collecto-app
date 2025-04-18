import { ordersApi } from "@/services/ordersApi";
import { Order } from "@/services/schemas/OrderSchemas";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrdersState {
  orders: Order[] | null
  loading:boolean
  selectedOrder:Order | null
}

const initialState: OrdersState= {
  orders: null,
  loading:false,
  selectedOrder:null
};

const isPendingAction = (action: any) => action.type.endsWith('/pending');
const isFulfilledAction = (action: any) => action.type.endsWith('/fulfilled');
const isRejectedAction = (action: any) => action.type.endsWith('/rejected');

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (
      state,
      action: PayloadAction<{ orders: Order[]; loading:boolean }>
    ) => {
      state.orders = action.payload.orders
    },
    setSelectedOrder: (
        state,
        action
    ) =>{
        state.selectedOrder = action.payload
    }
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
        ordersApi.endpoints.getMyOrders.matchFulfilled,
        (state, action) => {
          state.orders = action.payload
        }
      )
  },
});

export const {
    setOrders
  
} = ordersSlice.actions

export default ordersSlice.reducer;