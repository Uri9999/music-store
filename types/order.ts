type Order = {
    id: number;
    name: string;
    status: number;
    type: number;
    total_price: number;
    note: string;
    media_bill: MediaBill;
    user: User;
    order_items: OrderItem[];
    created_at: number,
    approval_date: string|null,
};

type MediaBill = {
    id: number;
    url: string;
};

type User = {
    id: number;
    name: string;
    avatar_url: {
        id: number,
        url: string
    };
};

type OrderItem = {
    id: number;
    order_id: number;
    tab_id: number;
    user_id: number;
    price: number;
    meta: {
        name: string;
        price: number;
    };
    created_at: string;
    updated_at: string;
};

export type { Order };
