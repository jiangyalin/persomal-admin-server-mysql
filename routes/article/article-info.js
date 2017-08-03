const express = require('express');
const router = express.Router();
const Label = require('./../../models/label');
const Article = require('./../../models/article');
const moment = require('moment');

//查询文档
router.get('/findArticleLabel',function (req, res) {
    //查询数据
    const id = req.query.id;
    const criteria = {id: id, is_deleted: 1}; // 查询条件
    const fields = ['id', 'title', 'description', 'content', 'date']; // 待返回的字段
    (async () => {
        var article = await Article.findOne({
            where: criteria,
            attributes: fields
        });
        let data = {
            id: article.id,
            title: article.title,
            description: article.description,
            content: article.content,
            date: article.date
        };
        res.jsonp(data);
    })();
});

//下一篇文档
router.get('/findNextArticle', function (req, res) {
    //查询数据
    let id = req.query.id;
    let criteria = {is_deleted: 1, _id: {$lt: id}}; // 查询条件
    let fields = {title : 2, description : 1, date : -1, content : 1}; // 待返回的字段
    let options = {sort:[{ date: -1 }]}; // 排序方式
    Article.findOne(criteria, fields, options, function(error, result){
        if (error) {
            return console.log(error);
        }
        if (result == null) {
            return res.jsonp('');
        }
        let data = {
            id : result._id || '',
            title : result.title || '',
            description : result.description || '',
            content: result.content || '',
            date : moment(result.date).format('YYYY-MM-DD HH:mm:ss') || ''
        };
        return res.jsonp(data);
    });
});

//上一篇文档
router.get('/findPreviousArticle', function (req, res) {
    //查询数据
    let id = req.query.id;
    let criteria = {is_deleted: 1, _id: {$gt: id}}; // 查询条件
    let fields = {title : 2, description : 1, date : -1, content : 1}; // 待返回的字段
    let options = {sort:[{ date: -1 }]}; // 排序方式
    Article.findOne(criteria, fields, options, function(error, result){
        if (error) {
            return console.log(error);
        }
        if (result == null) {
            return res.jsonp('');
        }
        let data = {
            id : result._id,
            title : result.title,
            description : result.description,
            content: result.content,
            date : moment(result.date).format('YYYY-MM-DD HH:mm:ss')
        };
        return res.jsonp(data);
    });
});

module.exports = router;