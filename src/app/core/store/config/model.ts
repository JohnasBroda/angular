export interface FilterCategories {
    category: string[];
    subCategory: string[];
    color: string[];
    size: string[];
}

export interface IProductConfig {
    filterUpdateCount: number;
    filters?: FilterCategories;
}

export interface IConfigState {
    loading: boolean;
    error?: Error | null;
    productsConfig?: IProductConfig;
}
