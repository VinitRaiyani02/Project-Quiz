import { UserModel } from "./user.model";

export interface UsersListModel{
    list?: UserModel[];
    totalCount: number;
}