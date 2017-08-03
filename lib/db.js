// 连接数据库
const Sequelize = require('sequelize');
const config = require('../config/default');

let sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
    host: config.mysql.host,
    protocol: 'TCP',
    dialect: 'mysql',
    logging: false, // 控制台提示
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    define: {
        timestamps: false
    }
});

module.exports = sequelize;