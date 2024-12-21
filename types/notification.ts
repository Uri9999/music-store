type NotificationType = {
    id: number;
    title: string;
    body: string;
    status: number;
    type: number;
    user_id: number;
    send_at: string | null;
    meta: any;
};

export type { NotificationType };
