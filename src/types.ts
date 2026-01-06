export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

export interface CartItem extends Product {
    quantity: number;
}

// export interface AppState {
//     products: Product[];
//     cart: CartItem[];
//     currentView: 'products' | 'cart';
// }