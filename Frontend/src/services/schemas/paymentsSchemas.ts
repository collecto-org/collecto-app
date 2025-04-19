export type CreatePaymentSchema = {
    orderId: string;
    paymentMethodID: string;
    amount: 0;
    currency: string;
  }

export type PaymentSchema = {
    pago: {
        orderId: string;
        userId: string;
        providersId: string;
        transactionId: string;
        statusId: "pending" | "succeeded" | "failed"; 
        paymentMethodID: string;
        amount: number;
        currency: string;
        paidAt: string; 
        receiptUrl: string;
        rawResponse: object;
        createdAt: string; 
    };
};

export type PaymentResponseSchema = {
    message: string;
    pago: {
        orderId: string;
        userId: string;
        providersId: string;
        transactionId: string;
        statusId: string;
        paymentMethodID: string;
        amount: number;
        currency: string;
        paidAt: string;
        receiptUrl: string;
        rawResponse: object;
        createdAt: string;
    };
};

export type PaymentStatus = {
    status: string;
    message: string;
};

export type PaymentConfirmationSchema = {
    paymentId: string;
    transactionId: string;
    paymentStatus: "succeeded";
};