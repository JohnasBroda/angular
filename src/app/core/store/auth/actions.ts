import { Action } from '@ngrx/store';
import { User } from '@store/auth';
import { AuthProvider } from '@services/auth/auth.service';

export enum AuthActionTypes {
    AUTHENTICATED = '[AUTH] Authenticated',
    NOT_AUTHENTICATED = '[AUTH] Not Authenticated',
    GET_USER = '[AUTH] Get User',
    LOGIN_EMAIL = '[AUTH] Login Email',
    LOGIN_GOOGLE = '[AUTH] Login Google',
    LOGIN_FACEBOOK = '[AUTH] Login Facebook',
    LOGIN_SUCCESS = '[AUTH] Login Success',
    LOGIN_ERROR = '[AUTH] Login Error',
    REGISTER_EMAIL = '[AUTH] Register Email',
    UPDATE_USER = '[AUTH] Update User',
    VERIFY_REGISTRATION = '[AUTH] Verify Registration',
    LOGOUT = '[AUTH] Logout',
}

export class GetUser implements Action {
    readonly type = AuthActionTypes.GET_USER;
    constructor(public payload?: User) {}
}

export class Authenticated implements Action {
    public readonly type = AuthActionTypes.AUTHENTICATED;
    constructor(public payload?: any) {}
}

export class NotAuthenticated implements Action {
    public readonly type = AuthActionTypes.NOT_AUTHENTICATED;
    constructor(public payload?: any) {}
}

export class LoginEmail implements Action {
    readonly type = AuthActionTypes.LOGIN_EMAIL;
    constructor(public payload?: { email: string, password: string, provider: AuthProvider }) {}
}

export class LoginGoogle implements Action {
    readonly type = AuthActionTypes.LOGIN_GOOGLE;
    constructor(public payload?: { provider: AuthProvider.google }) {}
}

export class LoginFacebook implements Action {
    readonly type = AuthActionTypes.LOGIN_FACEBOOK;
    constructor(public payload?: { provider: AuthProvider.facebook }) {}
}

export class RegisterEmail implements Action {
    readonly type = AuthActionTypes.REGISTER_EMAIL;
    constructor(public payload?: User) {}
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload?: User) {}
}

export class LoginError implements Action {
    readonly type = AuthActionTypes.LOGIN_ERROR;
    constructor(public payload?: { error: any }) {}
}

export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export class UpdateUser implements Action {
    readonly type = AuthActionTypes.UPDATE_USER;
    constructor(public payload?: User) {}
}

export class VerifyRegistration implements Action {
    readonly type = AuthActionTypes.VERIFY_REGISTRATION;
    constructor(public payload?: User) {}
}

export type All = LoginEmail
    | GetUser
    | Authenticated
    | NotAuthenticated
    | LoginGoogle
    | LoginFacebook
    | LoginSuccess
    | LoginError
    | Logout
    | RegisterEmail
    | UpdateUser
    | VerifyRegistration;
