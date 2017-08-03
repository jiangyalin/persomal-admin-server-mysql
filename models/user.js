const Sequilize = require('sequelize');
const db = require('./../lib/db');

// 用户模型
let User = db.define('users', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true, // 递增
        primaryKey: true // 主键
    },
    name: {
        type: Sequilize.STRING(50),
        comment: '用户名' // 注释
    },
    password: {
        type: Sequilize.STRING(50),
        comment: '密码'
    }
}, {
    freezeTableName: true // 如果为 true 则表的名称和 model 相同
});

User.sync({ force: false }); // 如没有此表就创建一个

module.exports = User;