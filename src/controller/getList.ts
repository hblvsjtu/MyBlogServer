const getList = ({authod, keyword}: ListRequestParams): List => {
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

export default getList;
