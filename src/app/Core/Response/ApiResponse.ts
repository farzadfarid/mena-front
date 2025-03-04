export interface ApiResponse<T> {
    isSuccess: boolean;
    data?: T;
    messages: string;
    token?: string
    roleName?: string;

    totalPages?: number;
    currentPage?: number;
    pageSize?: number;
    fcmToken?: string;
}