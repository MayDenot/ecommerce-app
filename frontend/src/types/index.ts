export interface User {
    id: number,
    name: string,
    email: string,
    role: string,
}

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: User,
}

export interface LoginRequest {
    email: string,
    password: string,
}

export interface RegisterRequest {
    name: string,
    email: string,
    password: string,
}

export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number;

    categoryId: number;

    averageRating: number;
    totalReviews: number;
}

export interface Category {
    id: number,
    name: string,
    description: string,
    products: Product[],
}

export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

export interface Review {
    id: number;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface Cart {
    id: number;
    user: User;
    items: CartItem[];
    totalPrice: number;
}

export interface CartItem {
    id: number;
    productId: number;
    productName: string;
    image: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
}