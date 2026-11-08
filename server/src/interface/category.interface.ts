export interface ICreateCategory {
    name: string;
    slug: string;
    image: string;
}

export interface IUpdateCategory {
    name?: string;
    slug?: string;
    image?: string;
}
