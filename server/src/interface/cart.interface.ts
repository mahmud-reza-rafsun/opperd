export interface IAddToCart {
    productId: string;
    quantity?: number;
}

export interface ICartIdentifier {
    userId?: string;
    sessionId?: string;
}
