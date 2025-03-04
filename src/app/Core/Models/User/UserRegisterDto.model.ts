export interface UserRegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    roleId: number;
    location: string;
    latitude: number;
    longitude: number;
}