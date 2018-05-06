import { Product } from '@store/products';

export interface Order {
    id: string;
    userId: string;
    price: number;
    currency: Currency;
    products: Product[];
    date: Date;
}

export enum Currency {
    HUF = 'HUF',
    GBP = 'GBP',
    EUR = 'EUR',
    USD = 'USD',
}
