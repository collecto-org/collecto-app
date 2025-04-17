export type FavoriteStatusChange ={    
        advertId: string;
        status: "sold" | "reserved" ;     
}
export type FavoritePriceChange ={    
    advertId: string;         
}
export type FavoriteRemove ={    
    advertId: string;         
}
export type NewChatMessage ={    
    chatid: string;         
}
export type NotificationSchema = {
    _id:string;
    user: string;
    notificationType: string;
    advertId: {
        _id: string,
        title: string
    }
    message: string;
    isRead: boolean;
      createdAt: Date;
}