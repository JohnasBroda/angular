export class User {
    creationTime: Date;
    email?: string;
    emailVerified?: boolean;
    firstName?: string;
    isAdmin?: boolean;
    isAnonymous: boolean;
    lastName?: string;
    lastSignInTime?: Date;
    locale?: string;
    password?: string;
    phoneNumber?: string;
    photoURL?: string;
    provider: string;
    uid: string;
    verificationSent?: boolean;
}
