import { prisma } from "../../database/prisma";
import { ICreateProduct, IProductFilter, IUpdateProduct } from "../../interface/product.interface";

const createProduct = async (payload: ICreateProduct) => {
    const data = await prisma.product.create({
        data: payload,
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

const getProductById = async (id: string) => {
    const data = await prisma.product.findUnique({
        where: { id, isDeleted: false },
        include: {
            seller: { select: { id: true, name: true, email: true } },
            category: { select: { id: true, name: true } },
        },
    });
    return data;
};

const getProductBySlug = async (slug: string) => {
    const data = await prisma.product.findUnique({
        where: { slug, isDeleted: false },
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
    getProductBySlug,
    updateProduct,
    deleteProduct,
};
