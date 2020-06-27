const setCookie = (cookie: CookieObject, res: Res): void => {
    const cookies: Array<string> = [];
    Object.entries(cookie).forEach(([key, data]) => {
        const {value, path = '/', isHttpOnly = true, expires} = data;
        let cookie = `${key}=${value}; `;
        if (path) {
            cookie += `path=${path}; `;
        }
        if (isHttpOnly) {
            cookie += `httpOnly; `;
        }
        if (expires) {
            cookie += `expires=${expires}; `;
        }
        cookies.push(cookie.trim());
    });
    res.setHeader('Set-Cookie', cookies);
};

export default setCookie;
