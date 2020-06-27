export const getExpiresTime = (time: number): string => {
    return new Date(Date.now() + time).toUTCString();
};
