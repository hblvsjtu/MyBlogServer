export const updateBlog = (id: number, content: any): Blog => {
    return {
        id,
        title: '标题',
        content,
        creatTime: new Date().toISOString(),
        authod: 'authod'
    };
};
