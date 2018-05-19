import { StripeObject } from '@shared/interfaces/stripe';

// Stripe subscription object
export interface SubscriptionPlan extends StripeObject {
    id: string;
    status: string;
    current_period_end: number;
    current_period_start: number;
    items: StripeObject;
}
