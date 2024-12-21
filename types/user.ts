type Profile = {
    id: number;
    name: string;
    email: string;
    status: number;
    dob: Date | null;
    gender: number;
    commission_rate: number;
    referral_code: string;
    role_id: number;
    avatar: Avatar;
    phone: string;
    introduce: string;
    media_avatar: File;
};

type Avatar = {
    id: number;
    url: string;
};

type UserDataError = {
    name: [string];
    email: [string];
    dob: [string];
    status: [string];
    gender: [string];
    role_id: [string];
    media_avatar: [string];
    commission_rate: [string];
    phone: [string];
    introduce: [string];
};

export type { Profile, UserDataError };
