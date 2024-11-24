type Selection = {
    categories: Item[],
    user_status: Item[],
    user_role: Item[],
    user_gender: Item[],
};

type Item = {
    label: string,
    value: number,
    description: string
};


export type { Selection, Item };
