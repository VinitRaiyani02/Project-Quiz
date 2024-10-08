import { ISelectOptions } from "./forms/InputFieldsProps";

export interface UserModel {
    id: number;
    userName: string;
    email: string;
    gender: string;
    languageid: number;
    roleId: number;
    password: string;
    createdOn?: Date;
    isDeleted: boolean;
    userImgPath?: string;
    userScore?: number;
    userImage?: File;
}
