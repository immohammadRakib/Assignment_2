export const roles = ["contributor", "maintainer"] as const;
export type Role = typeof roles[number];

export type User = {
    id: number;
    name: string;
    email: string;
    password?: string;
    role: Role;
    created_at: Date;
    updated_at: Date;
};

export type Issue = {
    id: number;
    title: string;
    description: string;
    type: "bug" | "feature_request";
    status: "open" | "in_progress" | "resolved";
    reporter_id: number;
    created_at: Date;
    updated_at: Date;
};
