export type UniverseSchema = {
    _id: string;
    name: string;
    logoUrl: string;
    slug: string;
  };
  

  export type BrandSchema = {
    name: string;
    logoUrl: string;
    slug: string;
  };

  export type CollectionSchema = {
    name: string;
    slug: string;
  };

  export type ProductTypeSchema = {
    name: string;
    slug: string;
    description: string;
  };

  export type ConditionSchema = {
    value: string;
   
  };

  export type TransactionSchema = {
    value: string;
    description: string;
    slug: string;
  };

  export type ShippingMethodSchema = {
    code: string;
    label: string;
    order: number;
    active: boolean;
  };
