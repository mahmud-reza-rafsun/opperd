export interface ICreateCategory {
    name: string;
    slug: string;
    icon?: string;
    description?: string;
    parentId?: string;
    isActive?: boolean;
}

export interface IUpdateCategory extends Partial<ICreateCategory> { }
