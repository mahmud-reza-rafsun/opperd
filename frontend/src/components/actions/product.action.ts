"use server";

import { productService } from "@/service/product.service";
import { revalidatePath } from "next/cache";

export async function sellProducts(payloadData: any) {
    try {
        const payload = {
            productTitle: String(payloadData.productTitle ?? "").trim(),
            description: String(payloadData.description ?? ""),
            categoryId: payloadData.categoryId,
            price: Number(payloadData.price) || 0,
            currency: payloadData.currency ?? "EUR",
            productCondition: payloadData.productCondition ?? "GOOD",
            listingType: payloadData.listingType ?? "SELL",
            location: String(payloadData.location ?? ""),
            deliveryDays: Number(payloadData.deliveryDays) || 0,
            tags: Array.isArray(payloadData.tags) ? payloadData.tags : [],
            images: payloadData.images || "",
            ...(payloadData.thumbnail ? { thumbnail: String(payloadData.thumbnail) } : {}),
        };

        const res = await productService.sellsProducts(payload);

        if (!res.error) {
            revalidatePath("/");
            return { success: true, data: res.data };
        }

        return { success: false, error: res.error };
    } catch (error: any) {
        return { success: false, error: error.message || "An error occurred" };
    }
}
