import { StripeObject } from '@shared/interfaces/stripe';

// Payment source, i.e credit or debit card
export interface Source extends StripeObject {
    id: string;
    type: string;
    status: string;
}
