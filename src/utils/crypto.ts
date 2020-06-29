const myCrypto = require('crypto');

const cryptoPassword = (password: string): string => {
    const md5 = myCrypto.createHash('md5'); // 创建 md5
    const md5Sum = md5.update(password); // update 加密
    return md5Sum.digest('hex'); // 获取加密后结果
};

export default cryptoPassword;
