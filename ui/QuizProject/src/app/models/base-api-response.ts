import { UserModel } from "./user.model";

export interface BaseApiResponse<T> {
    success: boolean;
    message: string;
    statusCode: number;
    data?: T;
}
