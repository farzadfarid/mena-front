export interface UserLoginDto {
    id?: number;
    email: string;
    password: string;
    fcmToken?: string;
}