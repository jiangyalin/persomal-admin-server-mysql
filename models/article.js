const Sequilize = require('sequelize');
const db = require('./../lib/db');

// 文章模型
let Article = db.define('articles', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true, // 递增
        primaryKey: true // 主键
    },
    title: {
        type: Sequilize.STRING(50),
        comment: '标题'
    },
    description: {
        type: Sequilize.STRING(200),
        allowNull: true,
        comment: '描述'
    },
    content: {
        type: Sequilize.TEXT('long'),
        allowNull: true,
        comment: '内容'
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

Article.sync({ force: false });

module.exports = Article;