import { UserListItem } from "@/types/user";

export type GroupListItem = {
    id: string,
    name: string,
    description?: string | null,
}

export type GroupPageItem = {
    id: string,
    name: string,
    keeper: UserListItem,
    createdAt: string,
    description?: string | null,
}