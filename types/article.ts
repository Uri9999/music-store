type ArticleType = {
    id: number;
    title: string;
    content: string;
    status: number;
    user_id: number;
    type: number;
    user: User;
};
type User = {
    id: number;
    name: string;
};

export type { ArticleType };
