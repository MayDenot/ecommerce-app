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

export interface UserRequestDTO {
    name: string,
    email: string,
}

export interface Product {
    id: number,
    name: string,
    description: string,
    image: string,
    price: number,
    stock: number,
    category: string,
}

export interface Category {
    id: number,
    name: string,
    description: string,
    products: Product[],
}