// Stripe responds with an object https://stripe.com/docs/api
// Partial interfaces to API responses
// Default Stripe response object

enum objectType {
    'list',
    'charge',
    'customer',
    'source',
    'subscription'
}

export interface StripeObject {
    object: objectType;
    [key: string]: any;
}
