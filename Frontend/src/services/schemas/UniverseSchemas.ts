export type UniverseSchema = {
    _id: string;
    name: string;
    logoUrl: string;
    slug: string;
  };
  

  export type BrandSchema = {
    _id: string;
    name: string;
    logoUrl: string;
    slug: string;
  };

  export type CollectionSchema = {
    _id: string;
    name: string;
    slug: string;
  };

  export type ProductTypeSchema = {
    _id: string;
    name: string;
    slug: string;
    description: string;
  };

  export type ConditionSchema = {
    _id: string;
    value: string;
   
  };

  export type statusSchema = {
    _id: string;
    code: string;
    label: string;
    context:"payment" | "Advert" | "order"   
  }

  export type TransactionSchema = {
    _id: string;
    value: string;
    description: string;
    slug: string;
  };

  export type ShippingMethodSchema = {
    _id: string;
    code: string;
    label: string;
    order: number;
    active: boolean;
  };
