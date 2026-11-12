import { prisma } from "../../database/prisma";
import { ICreateProduct, IProductFilter, IUpdateProduct } from "../../interface/product.interface";

const createProduct = async (sellerId: string, payload: ICreateProduct) => {
    const data = await prisma.product.create({
        data: {
            ...payload,
            sellerId,
        },
    });
    return data;
};

const getAllProducts = async (filter: IProductFilter = {}) => {
    const data = await prisma.product.findMany({
        where: {
            ...filter,
            isDeleted: false,
        },
        include: {
            seller: { select: { id: true, name: true, email: true } },
            category: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: "desc" },
    });
    return data;
};

const searchProducts = async (query: Record<string, any>) => {
    const { searchTerm, ...filterData } = query;

    const andConditions: any[] = [{ isDeleted: false }];

    if (searchTerm) {
        const cleanSearchTerm = (searchTerm as string).trim();

        andConditions.push({
            OR: [
                {
                    productTitle: {
                        contains: cleanSearchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: cleanSearchTerm,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }

    if (Object.keys(filterData).length > 0) {
        for (const [key, value] of Object.entries(filterData)) {
            if (value) {
                andConditions.push({
                    [key]: value,
                });
            }
        }
    }

    const whereConditions = { AND: andConditions };

    const result = await prisma.product.findMany({
        where: whereConditions,
        select: {
            id: true,
            productTitle: true,
            thumbnail: true,
            price: true,
            currency: true,
        },
        take: 10,
        orderBy: { createdAt: "desc" },
    });

    // ডাটা না পেলে null না পাঠিয়ে সবসময় খালি অ্যারে [] রিটার্ন করবে
    return result && result.length > 0 ? result : [];
};

const getProductById = async (id: string) => {
    if (!id) {
        throw new Error("Product ID is required");
    }

    const data = await prisma.product.findFirst({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            seller: { select: { id: true, name: true, email: true } },
            category: { select: { id: true, name: true } },
        },
    });

    return data;
};

const updateProduct = async (id: string, payload: IUpdateProduct) => {
    const data = await prisma.product.update({
        where: { id },
        data: payload,
    });
    return data;
};

const deleteProduct = async (id: string) => {
    const data = await prisma.product.update({
        where: { id },
        data: { isDeleted: true, deletedAt: new Date() },
    });
    return data;
};

export const productService = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts
};
