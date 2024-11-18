type MenuType = {
    label: string;
    icon: string | null;
    toRoute: string | null;
    items: MenuType | null;
};

export type { MenuType };
