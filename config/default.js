// 配置文件
const config = {
    port: 8082,
    mysql: {
        database: 'personal',
        username: 'root',
        password: '123456',
        host: 'localhost',
        port: 3306
    },
    session: {
        database: 'personal',
        username: 'root',
        password: '123456',
        host: 'localhost',
        port: 3306,
        secret: 'personal',
        key: 'personal',
        maxAge: 2592000000
    }
};

module.exports = config;