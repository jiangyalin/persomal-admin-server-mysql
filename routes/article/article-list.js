const express = require('express');
const router = express.Router();
const Article = require('./../../models/Article');
// const pageList = require('./../../models/page_list');
const moment = require('moment');

//文档数据(分页)
router.get('/findArticlesList', function (req, res) {
    //查询数据
    const criteria = {is_deleted: 1}; // 查询条件
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

//查找文章(搜索功能)(弃用中)
router.post('/findArticle',function (req, res) {
    //查询数据
    let qs = new RegExp(req.body.title);//正则参数
    let criteria = {title: qs, is_deleted: 1}; // 查询条件
    let fields   = {title : 2, description : 1, date : -1,content : 1}; // 待返回的字段
    let options = {sort:[{ date: -1 }]};//排序
    Article.find(criteria, fields, options, function(error, result){
        if (error) {
            console.log(error);
        } else {
            let data = [];
            result.forEach(function (value) {
                let node = {
                    id : value._id,
                    title : value.title,
                    description : value.description,
                    date : moment(value.date).format('YYYY-MM-DD HH:mm:ss'),
                    content : value.content
                };
                data.push(node);
            });
            res.jsonp(data);
        }
    });
});

//删除文章（假删除）
router.get('/removeArticle',function (req, res) {
    //修改数据
    let conditions = {_id: req.query.id};//查找条件
    let update = {$set : {is_deleted : 0}};//修改信息
    let options = {};//排序方式
    Article.update(conditions, update, options, function (error) {
        if (error) {
            console.log(error);
        } else {
            let information = JSON.stringify('success');
            res.jsonp(information);
        }
    });
});

module.exports = router;