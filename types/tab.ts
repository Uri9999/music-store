type Tab = {
    id: number;
    name: string;
    description: string;
    user_id: number;
    author: string;
    price: number;
    category_id: number;
    youtobe_url: string;
    images_url: Image[];
    user: User;
    total_order_items: number;
};

type User = {
    id: number;
    name: string;
    avatar: null | Avatar;
};
type Avatar = {
    id: number;
    url: string;
};
type Image = {
    id: number;
    url: string;
};

type FilterIndex = {
    orderPrice: string;
};

export type { Tab, FilterIndex };
