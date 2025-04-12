export type Advert = {
   
      title: string;
      slug: string;
      description: string;
      mainImage: string;
      price: number;
      transaction: string;
      status: string;
      isVisible: string;                      
      product_type: string;
      universe: string;
      condition: string;
      collection: string;                                  
      brand: string;
      tags: [String],
      user:string;
      createdAt: Date;
      updatedAt?: Date;
      images: [String],
    
}

export type InputAdvert = {

    title: string;
    description: string;
    price: string;
    transaction: string;
    status: string;
    product_type: string;
    universe: string;
    condition: string;
    collection: string;
    brand: string;
    tags: string;
    images: string;
}

export type NewAdvertInput = {
  token: string;
  data: InputAdvert
}

export type NewAdvertResponse = {
  message: string;
  anuncio: Advert
}

export type EditAdvertInput = {
  token: string;
  id:string;
  data: InputAdvert
}

export type FilterAdverts = {
  title?: string;
      priceMin?: string;
      priceMax?: string;
      tags?: string;
      status?: string;
      transaction?: string;
      collection?: string;
      createdAtMin?: string;
      createdAtMax?: string;
      brand?: string;
      product_type?: string;
      universe?: string;
      condition?: string;
      slug?: string;
      page?: string;
      limit?: string;
      sortBy?: string;
      sortOrder?: string;
}
export type ApiError ={
    status:string
    data:{message:string
    }
}

