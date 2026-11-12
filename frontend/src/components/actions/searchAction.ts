"use server";

import { productService } from "@/service/product.service";

export async function searchAction({
    searchTerm,
}: {
    searchTerm: string;
}) {
    const result = await productService.searchProducts({ searchTerm });

    return result;
}
