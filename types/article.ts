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
    avatar: Avatar | null;
};
type Avatar = {
    id: number;
    url: string;
};

export type { ArticleType };
