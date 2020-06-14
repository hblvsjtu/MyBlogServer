export const isLogin = function(userName: string, password: string) {
    return userName === 'hblvsjtu' && password === '12345678';
};

export const isCreateProfile = function(userName: string, password: string) {
    return userName !== 'hblvsjtu';
};
