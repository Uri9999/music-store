type Tab = {
    id: number;
    name: string;
    description: string;
    user_id: number;
    author: string;
    price: number;
    category_id: number;
    youtobe_url: string;
    user: User;
};

type User = {
    id: number;
    name: string;
};

type FilterIndex = {
    orderPrice: string,
}

export type { Tab, FilterIndex };
