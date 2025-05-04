export type Advert = {
   
  title: string;
  slug: string;
  description: string;
  mainImage: string;
  price: number;
  transaction: { _id: string; code: string; value: string };
  status: { _id: string; code: string; label: string };
  isVisible: string; 
  isFavorite?:boolean                    
  product_type: { _id: string; name: string,slug:string };
  universe: { _id: string; name: string ,slug:string};
  condition:  { _id: string; value: string,slug:string };
  collection: string;                                  
  brand: { _id: string; name: string,slug:string };
  tags: string[],
  user:  {
    username?: string;
    avatarUrl?: string;
    rating?: number;
  };
  createdAt: Date;
  updatedAt?: Date;
  images: string[],
  _id:string

}
export type AdvertFormData = {
  title: string;
  description: string;
  price: number;
  transaction: string;
  status: string;
  product_type: string;
  universe: string;
  condition: string;
  collection?: string;
  brand: string;
  tags: string[];
}


export type InputAdvert = {

title: string;
description: string;
price: number;
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
advert: Advert
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
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: number
  searchTerm?:string
}

export type listingId = string
export type Username = string

export type AdvertId = string

export type ApiError ={
status:string
data:{message:string
}
}
