// export const role = [ "user", "admin", "super_admin" ] as const

// type Role = typeof role[number]


// export type User = {
//     id: number;
//     name: string;
//     email: string;
//     password_hash: string;
//     age: number;
//     role: Role;
//     createde_at: Date;
//     updated_at: Date;
// }

// export type RUser = Omit<User, "id" | "password_hash" | "created_at" | "updated_at">


// export type Order = {
//     id: number;
//     customer_id: number;
//     quantity: number;
//     food: string;
//     price: number;

//     createde_at: Date;
//     updated_at: Date;
// }




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
