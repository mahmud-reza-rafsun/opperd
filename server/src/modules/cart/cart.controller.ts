import { Request, Response } from "express";
import { status } from "http-status";
import { v4 as uuidv4 } from "uuid";
import { catchAsync } from "../../shared/utils/catchAsync";
import { sendResponse } from "../../shared/utils/sendResponse";
import { cartService } from "./cart.service";

const getIdentifier = (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (userId) return { userId };

    let sessionId = req.cookies?.sessionId;
    if (!sessionId) {
        sessionId = uuidv4();
        res.cookie("sessionId", sessionId, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }

    return { sessionId };
};

const addToCart = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const identifier = getIdentifier(req, res);

    const data = await cartService.addToCart(payload, identifier);

    sendResponse(res, {
        status: status.CREATED,
        success: true,
        message: "Product added to cart",
        data,
    });
});

const getCart = catchAsync(async (req: Request, res: Response) => {
    const identifier = getIdentifier(req, res);

    const data = await cartService.getCart(identifier);

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Cart fetched successfully",
        data,
    });
});

const removeFromCart = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const identifier = getIdentifier(req, res);

    const data = await cartService.removeFromCart(id as string, identifier);

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Product removed from cart",
        data,
    });
});

const clearCart = catchAsync(async (req: Request, res: Response) => {
    const identifier = getIdentifier(req, res);

    const data = await cartService.clearCart(identifier);

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Cart cleared successfully",
        data,
    });
});

export const cartController = {
    addToCart,
    getCart,
    removeFromCart,
    clearCart,
};
