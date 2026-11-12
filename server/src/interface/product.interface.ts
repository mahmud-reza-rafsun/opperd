import { Currency, ListingType, ProductCondition, ProductStatus } from "@prisma/client";


export interface ICreateProduct {
    productTitle: string;
    description: string;
    categoryId: string;
    thumbnail?: string;
    images: string;
    price: number;
    currency?: Currency;
    location: string;
    tags?: string[];
    productCondition?: ProductCondition;
    listingType?: ListingType;
    deliveryDays: number;
}


export interface IUpdateProduct extends Partial<ICreateProduct> { }

export interface IProductFilter {
    sellerId?: string;
    categoryId?: string;
    status?: ProductStatus;
    listingType?: ListingType;
    condition?: ProductCondition;
    isFeatured?: boolean;
    isDeleted?: boolean;
}
