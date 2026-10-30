import { z } from "zod";
import { Currency, ListingType, ProductCondition, ProductStatus } from "@prisma/client";

const createProductSchema = z.object({
    body: z.object({
        sellerId: z.string().min(1, "Seller ID is required"),
        title: z.string().min(3, "Title must be at least 3 characters").max(255),
        slug: z.string().min(3, "Slug must be at least 3 characters").max(255),
        description: z.string().min(10, "Description must be at least 10 characters"),
        categoryId: z.string().min(1, "Category ID is required"),
        thumbnail: z.string().url().optional(),
        images: z.array(z.string().url()).optional(),
        price: z.number().positive("Price must be a positive number"),
        currency: z.nativeEnum(Currency).optional(),
        condition: z.nativeEnum(ProductCondition).optional(),
        listingType: z.nativeEnum(ListingType).optional(),
        deliveryDays: z.number().int().positive("Delivery days must be a positive number"),
        revisions: z.number().int().positive("Revisions must be a positive number").optional(),
        status: z.nativeEnum(ProductStatus).optional(),
        isFeatured: z.boolean().optional(),
        expiresAt: z.string().datetime().optional(),
    }),
});

const updateProductSchema = z.object({
    body: z.object({
        title: z.string().min(3).max(255).optional(),
        slug: z.string().min(3).max(255).optional(),
        description: z.string().min(10).optional(),
        categoryId: z.string().optional(),
        thumbnail: z.string().url().optional(),
        images: z.array(z.string().url()).optional(),
        price: z.number().positive().optional(),
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
