export class IUser {
    anonSessionKeys?: string[];
    creationTime?: Date | string;
    email: string;
    displayName: string;
    emailVerified?: boolean;
    error?: string;
    isAdmin?: boolean;
    isAnonymous?: boolean;
    lastSignInTime?: Date;
    loading?: boolean;
    locale?: string;
    password?: string;
    phoneNumber?: string;
    photoURL?: string;
    provider?: string;
    verificationSent?: boolean;
    uid: string;

    stripeCustomerId?: string;
    subscriptions?: {
      [key: string]: SubscriptionStatus;
    };

    // for Stripe Connect
    accountId?: string;
    refreshToken?: string;
}

enum SubscriptionStatus {
    'active',
    'pastDue',
    'cancelled',
}

export class User implements IUser {

    constructor(
        public uid,
        public email,
        public displayName,
        public provider,
        public error?,
        public loading?,
        public password?,
        public phoneNumber?,
        public photoURL?,
        public isAnonymous?,
        public isAdmin?,
        public creationTime?,
        public lastSignInTime?,
        public emailVerified?,
        public verificationSent?,
        public anonSessionKeys?,
        public locale?,
    ) {}
}


