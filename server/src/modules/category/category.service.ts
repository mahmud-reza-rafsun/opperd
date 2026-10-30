import { prisma } from "../../database/prisma";
import { ICreateCategory, IUpdateCategory } from "../../interface/category.interface";


const createCategory = async (payload: ICreateCategory) => {
    const data = await prisma.category.create({
        data: payload,
    });
    return data;
};

const getAllCategories = async () => {
    const data = await prisma.category.findMany({
        where: { parentId: null, isActive: true },
        include: {
            children: {
                where: { isActive: true },
                include: {
                    children: { where: { isActive: true } },
                },
            },
        },
        orderBy: { name: "asc" },
    });
    return data;
};

const getCategoryById = async (id: string) => {
    const data = await prisma.category.findUnique({
        where: { id },
        include: {
            parent: { select: { id: true, name: true, slug: true } },
            children: { where: { isActive: true } },
        },
    });
    return data;
};

const getCategoryBySlug = async (slug: string) => {
    const data = await prisma.category.findUnique({
        where: { slug },
        include: {
            parent: { select: { id: true, name: true, slug: true } },
            children: { where: { isActive: true } },
        },
    });
    return data;
};

const updateCategory = async (id: string, payload: IUpdateCategory) => {
    const data = await prisma.category.update({
        where: { id },
        data: payload,
    });
    return data;
};

const deleteCategory = async (id: string) => {
    const data = await prisma.category.update({
        where: { id },
        data: { isActive: false },
    });
    return data;
};

export const categoryService = {
    createCategory,
    getAllCategories,
    getCategoryById,
    getCategoryBySlug,
    updateCategory,
    deleteCategory,
};
