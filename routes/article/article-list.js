const express = require('express');
const router = express.Router();
const Article = require('./../../models/Article');
// const pageList = require('./../../models/page_list');
const moment = require('moment');

//文档数据(分页)
router.get('/findArticlesList', function (req, res) {
    //查询数据
    const title = req.query.title || '';
    const criteria = {is_deleted: 1, $or: [{title: {$like: '%' + title + '%'}}]}; // 查询条件
    const fields = ['id', 'title', 'description', 'content', 'date']; // 待返回的字段
    (async () => {
        var articles = await Article.findAll({
            where: criteria,
            attributes: fields
        });
        let data = {
            rows: [],
            total: articles.length
        };
        articles.forEach(function (value) {
            let node = {
                id: value.id,
                title: value.title,
                description: value.description,
                content: value.content,
                date: value.date
            };
            data.rows.push(node);
        });
        res.jsonp(data);
    })();
});

//删除文章（假删除）
router.get('/removeArticle',function (req, res) {
    //修改数据
    let criteria = {id: {$like: req.query.id}};//查找条件
    let update = {is_deleted : 0};//修改信息
    (async () => {
        let article = await Article.update(update, {
            where: criteria
        });
        const information = JSON.stringify('success');
        res.jsonp(information);
    })();
});

module.exports = router;