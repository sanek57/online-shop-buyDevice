

export const ADMIN_ROUTE = '/admin';
export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';

export const SHOP_ROUTE = '/';
export const BASKET_ROUTE = '/basket';
export const DEVICE_ROUTE = '/device';


export type AUTH_ROUTE = typeof ADMIN_ROUTE | typeof BASKET_ROUTE

export type NO_AUTH_ROUTE = typeof LOGIN_ROUTE | typeof REGISTRATION_ROUTE | typeof SHOP_ROUTE | typeof DEVICE_ROUTE

export type ROUTES = AUTH_ROUTE | NO_AUTH_ROUTE