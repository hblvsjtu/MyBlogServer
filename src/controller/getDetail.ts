const getDetail = ({authod, keyword}: DetailRequestParams): List => {
    return [
        {
            id: 0,
            title: '标题',
            content: 'content',
            creatTime: new Date().toISOString(),
            authod: 'authod'
        }
    ];
};

export default getDetail;
