
export enum StoreType {
    Farmer = 'فلاح',
    Wholesaler = 'تاجر جملة',
    Retailer = 'تاجر تجزئة',
    Transport = 'نقل'
}

export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    description?: string;
}

export interface Store {
    id: string;
    name: string;
    type: StoreType;
    ownerId: string;
    products: Product[];
    subscriptionEnd: Date;
}

export interface User {
    id: string;
    email: string;
    phone: string;
    type: 'customer' | 'owner';
    subscriptionEnd?: Date;
}
