type Profile = {
    id: number;
    name: string;
    email: string;
    status: number;
    dob: Date|null;
    gender: number;
    role_id: number;
    avatar: Avatar;
    media_avatar: File;
};

type Avatar = {
    id: number;
    url: string;
};

type UserDataError = {
    name: [string],
    email: [string],
    dob: [string],
    status: [string],
    gender: [string],
    role_id: [string],
    media_avatar: [string],
}

export type { Profile, UserDataError };
