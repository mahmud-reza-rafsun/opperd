import { Request, Response } from "express";
import { status } from "http-status";
import { productService } from "./product.service";
import { catchAsync } from "../../shared/utils/catchAsync";
import { sendResponse } from "../../shared/utils/sendResponse";

const createProduct = catchAsync(async (req: Request, res: Response) => {
    const sellerId = req.user.id;
    const payload = req.body;

    const data = await productService.createProduct(sellerId, payload);

    sendResponse(res, {
        status: status.CREATED,
        success: true,
        message: `Product created successfully under category`,
        data,
    });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
    const filter = req.query;

    const data = await productService.getAllProducts(filter);

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Products fetched successfully",
        data,
    });
});

const searchProducts = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const data = await productService.searchProducts(query);
    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Search results fetched successfully",
        data,
    });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await productService.getProductById(id as string);

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Product fetched successfully",
        data,
    });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const data = await productService.updateProduct(id as string, payload);

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Product updated successfully",
        data,
    });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const data = await productService.deleteProduct(id as string);

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Product deleted successfully",
        data,
    });
});

export const productController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts
};
