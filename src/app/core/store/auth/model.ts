export class IUser {
    public anonSessionKeys?: string[];
    public creationTime?: Date | string;
    public email: string;
    public displayName: string;
    public emailVerified?: boolean;
    public error?: string;
    public isAdmin?: boolean;
    public isAnonymous?: boolean;
    public lastSignInTime?: Date;
    public loading?: boolean;
    public locale?: string;
    public password?: string;
    public phoneNumber?: string;
    public photoURL?: string;
    public provider?: string;
    public verificationSent?: boolean;
    public uid: string;

    public stripeCustomerId?: string;
    public subscriptions?: {
      [key: string]: SubscriptionStatus;
    };

    // for Stripe Connect
    public accountId?: string;
    public refreshToken?: string;
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
