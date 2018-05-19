import { StripeObject } from '@shared/interfaces/stripe';

// Charge to the payment source
export interface Charge extends StripeObject  {
    id: string;
    amount: number;
    currency: string;
    customer: string;
}
