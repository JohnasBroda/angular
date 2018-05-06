export class IProduct {
    id: string | number;
    name: string;
    category?: string;
    subCategory: string;
    price: number;
    amount: number;
    size: string;
    color: string;
    images: string[];
}

export class Product implements IProduct {
    public id = null;
    public name: string;
    public category?: string;
    public subCategory: string;
    public price: number;
    public amount: number;
    public size: string;
    public color: string;
    public images: string[];
    constructor() {}
}
