export type Product = {
    data: {
        id: string;
        productTitle: string;
        description: string;
        price: string;
        currency: string;
        images: string;
        thumbnail?: string;
        productCondition: string;
        listingType: string;
        location: string;
        deliveryDays: number;
        tags?: string[];
        seller: {
            id: string;
            name: string;
            email: string;
        };
        status: string;
    }
};

export type ProductDetailsProps = {
    productDetails: Product | null;
};
