import { Request, Response } from "express";
import { status } from "http-status";
import { catchAsync } from "../../shared/utils/catchAsync";
import { sendResponse } from "../../shared/utils/sendResponse";
import { categoryService } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const data = await categoryService.createCategory(payload);

    sendResponse(res, {
        status: status.CREATED,
        success: true,
        message: "Category created successfully",
        data,
    });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
    const data = await categoryService.getAllCategories();

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Categories fetched successfully",
        data,
    });
});

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const data = await categoryService.getCategoryById(id);
    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Category fetched successfully",
        data,
    });
});

const getCategoryBySlug = catchAsync(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const data = await categoryService.getCategoryBySlug(slug as string);
    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Category fetched successfully",
        data,
    });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const payload = req.body;

    const data = await categoryService.updateCategory(id, payload);

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Category updated successfully",
        data,
    });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const data = await categoryService.deleteCategory(id);

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Category deleted successfully",
        data,
    });
});

export const categoryController = {
    createCategory,
    getAllCategories,
    getCategoryById,
    getCategoryBySlug,
    updateCategory,
    deleteCategory,
};
