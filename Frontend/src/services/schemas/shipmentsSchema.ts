export type CreateShipmentSchema = {
  orderId: string;
  shippingProviderId: string;
  trackingCode: string;
  estimatedDate: string;
};

export type ShipmentHistorySchema = {
  shipmentId: string;
  status: string;
  details: string;
};

export type CreateShipmentResponseSchema = {
  message: string;
  shipment: {
    orderId: string;
    shippingProviderId: string;
    trackingCode: string;
    currentStatus: string;
    estimatedDate: string;
    deliveredAt: string;
    history: ShipmentHistorySchema[];
    trackingUrl: string;
  };
};

export type ShipmentSchema = {
  shipment: {
    orderId: string;
    shippingProviderId: string;
    trackingCode: string;
    currentStatus: string;
    estimatedDate: string;
    deliveredAt: string;
    history: ShipmentHistorySchema[];
    trackingUrl: string;
  };
};

export type ShipmentStatuschema = {
    id:string
  status: string;
};
