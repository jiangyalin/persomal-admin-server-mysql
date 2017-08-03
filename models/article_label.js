const Sequilize = require('sequelize');
const db = require('./../lib/db');

// 文章_标签关系 模型
let ArticleLabel = db.define('article_label', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true, // 递增
        primaryKey: true // 主键
    },
    article_id: {
        type: Sequilize.INTEGER,
        allowNull: true,
        model: 'Article',
        key: 'id'
    },
    label_id: {
        type: Sequilize.INTEGER,
        allowNull: true,
        model: 'Label',
        key: 'id'
    }
}, {
    freezeTableName: true // 如果为 true 则表的名称和 model 相同
});

ArticleLabel.sync({ force: false });

module.exports = ArticleLabel;