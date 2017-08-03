const Sequilize = require('sequelize');
const db = require('./../lib/db');

//标签模板
var Label = db.define('labels', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true, // 递增
        primaryKey: true // 主键
    },
    name: {
        type: Sequilize.STRING(50),
        comment: '标签名'
    },
    date: {
        type: Sequilize.DATE,
        defaultValue: Sequilize.NOW,
        comment: '创建时间'
    },
    is_deleted: {
        type: Sequilize.INTEGER,
        defaultValue: 1,
        comment: '删除状态'
    }
}, {
    freezeTableName: true // 如果为 true 则表的名称和 model 相同
});

Label.sync({ force: false });

module.exports = Label;