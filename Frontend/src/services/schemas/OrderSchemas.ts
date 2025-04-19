export type Order = {
    buyerId: string,
        sellerId: string,
        advertId: {_id:string,
            title:string,
            price:number
        }
        price: number,
        commission: number,
        paymentStatus: "pending" | "completed",
        paymentID: string,
        shippingMethod: string,
        shippingAddress: string,
        trackingCode: string,
        notes: "string",
        createdAt: Date,
        updatedAt: Date
    }
    
    export type NewOrder = {
        order:Order,
        message:string
    }
    
    export type OrderId = {
        _id:string
    }
    
    export type UpdateOrder = {
        _id:OrderId
        status: "pending" | "completed" | "rejected" 
    }
    
    export type DeleteOrder = {
        order:Order,
        message:string
    }