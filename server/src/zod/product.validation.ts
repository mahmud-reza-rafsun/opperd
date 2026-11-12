import { z } from "zod";
import { Currency, ListingType, ProductCondition, ProductStatus } from "@prisma/client";

export const createProductSchema = z.object({
    body: z.object({
        productTitle: z.string().min(3, "Title must be at least 3 characters").max(255),
        description: z.string().min(10, "Description must be at least 10 characters"),
        categoryId: z.string().min(1, "Category is required"),
        thumbnail: z.string().url().optional(),
        images: z.string().min(1, "Image is required"),
        price: z.number().positive("Price must be a positive number"),
        location: z.string().min(1, "Location is required"),
        tags: z.array(z.string().min(1, "Tag cannot be empty")).optional(),
        currency: z.nativeEnum(Currency).optional(),
        productCondition: z.nativeEnum(ProductCondition).optional(),
        listingType: z.nativeEnum(ListingType).optional(),
        deliveryDays: z.number().int().positive("Delivery days must be a positive number"),
        status: z.nativeEnum(ProductStatus).optional(),
        isFeatured: z.boolean().optional(),
    }),
});

const updateProductSchema = z.object({
    body: z.object({
        productTitle: z.string().min(3).max(255).optional(),
        description: z.string().min(10).optional(),
        categoryId: z.string().optional(),
        thumbnail: z.string().url().optional(),
        images: z.array(z.string().url()).optional(),
        price: z.number().positive().optional(),
        location: z.string().optional(),
        tags: z.array(z.string().min(1)).optional(),
        currency: z.nativeEnum(Currency).optional(),
        condition: z.nativeEnum(ProductCondition).optional(),
        listingType: z.nativeEnum(ListingType).optional(),
        deliveryDays: z.number().int().positive().optional(),
        revisions: z.number().int().positive().optional(),
        status: z.nativeEnum(ProductStatus).optional(),
        isFeatured: z.boolean().optional(),
        expiresAt: z.string().datetime().optional(),
    }),
});

export const productValidation = {
    createProductSchema,
    updateProductSchema,
};
