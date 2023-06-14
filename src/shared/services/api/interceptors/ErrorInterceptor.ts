export const errorInterceptor = async (error: any) => {
    return Promise.reject(error);
};
