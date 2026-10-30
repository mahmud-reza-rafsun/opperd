import { Currency, ListingType, ProductCondition, ProductStatus } from "@prisma/client";

export interface ICreateProduct {
    sellerId: string;
    title: string;
    slug: string;
    description: string;
    categoryId: string;
    thumbnail?: string;
    images?: string[];
    price: number;
    currency?: Currency;
    condition?: ProductCondition;
    listingType?: ListingType;
    deliveryDays: number;
    revisions?: number;
    status?: ProductStatus;
    isFeatured?: boolean;
    expiresAt?: Date;
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
