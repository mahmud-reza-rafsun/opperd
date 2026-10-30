import { prisma } from "../../database/prisma";
import { IAddToCart, ICartIdentifier } from "../../interface/cart.interface";

const addToCart = async (payload: IAddToCart, identifier: ICartIdentifier) => {
    const { productId, quantity = 1 } = payload;
    const { userId, sessionId } = identifier;

    const where = userId
        ? { userId_productId: { userId, productId } }
        : { sessionId_productId: { sessionId: sessionId!, productId } };

    const data = await prisma.cartItem.upsert({
        where,
        update: { quantity: { increment: quantity } },
        create: {
            productId,
            quantity,
            ...(userId ? { userId } : { sessionId }),
        },
    });

    return data;
};

const getCart = async (identifier: ICartIdentifier) => {
    const { userId, sessionId } = identifier;

    const data = await prisma.cartItem.findMany({
        where: userId ? { userId } : { sessionId },
        include: {
            product: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    thumbnail: true,
                    price: true,
                    currency: true,
                },
            },
        },
    });

    return data;
};

const mergGuestCart = async (sessionId: string, userId: string) => {
    const guestItems = await prisma.cartItem.findMany({ where: { sessionId } });

    for (const item of guestItems) {
        await prisma.cartItem.upsert({
            where: { userId_productId: { userId, productId: item.productId } },
            update: { quantity: { increment: item.quantity } },
            create: { userId, productId: item.productId, quantity: item.quantity },
        });
    }

    await prisma.cartItem.deleteMany({ where: { sessionId } });
};

const removeFromCart = async (cartItemId: string, identifier: ICartIdentifier) => {
    const { userId, sessionId } = identifier;

    const data = await prisma.cartItem.delete({
        where: {
            id: cartItemId,
            ...(userId ? { userId } : { sessionId }),
        },
    });

    return data;
};

const clearCart = async (identifier: ICartIdentifier) => {
    const { userId, sessionId } = identifier;

    const data = await prisma.cartItem.deleteMany({
        where: userId ? { userId } : { sessionId },
    });

    return data;
};

export const cartService = {
    addToCart,
    getCart,
    mergGuestCart,
    removeFromCart,
    clearCart,
};
