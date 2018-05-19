import { StripeObject } from '@shared/interfaces/stripe';

export interface Customer extends StripeObject {
    id: string;
    type: string;
    sources: StripeObject;
    subscriptions: StripeObject;
}
