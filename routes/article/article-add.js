const express = require('express');
const router = express.Router();
const Label = new require('./../../models/label');
const Article = new require('./../../models/article');
const ArticleLabel = new require('./../../models/article_label');
const moment = require('moment');

//添加文档
router.post('/addArticle',function (req, res) {
    //插入数据
    let article = {
        title : req.body.title,
        description : req.body.description,
        content : req.body.content
    };
    (async () => {
        await Article.create(article);
    })();
});

//修改文档
router.post('/editArticle',function (req, res) {
    let id = req.body.id;
    let title = req.body.title;
    let description = req.body.description;
    let content = req.body.content;
    let label_id = req.body.label;
    let conditions = {_id: id };//修改对象条件
    let update = {$set: {title: title, description: description, content: content, label_id: label_id}};//修改项
    let options = {};
    //更新数据
    Article.update(conditions, update, options, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            let information = JSON.stringify('success');
            res.jsonp(information);
        }
    });
});

//查询文档
router.get('/findArticle',function (req, res) {
    //查询数据
    const id = req.query.id;
    const criteria = {id: id, is_deleted: 1}; // 查询条件
    const fields = ['id', 'title', 'description', 'content', 'date']; // 待返回的字段
    (async () => {
        var article = await Article.findOne({
            where: criteria,
            attributes: fields
        });
        var label_ids = await ArticleLabel.findAll({
            where: {article_id: article.id},
            attributes: ['label_id']
        });
        var labels = await Label.findAll({
            where: {article_id: article.id},
            attributes: ['label_id']
        });
        let data = {
            id: article.id,
            title: article.title,
            description: article.description,
            content: article.content,
            date: article.date,
            label: []
        };
        console.log('data',data)
        res.jsonp(data);
    })();
});

module.exports = router;