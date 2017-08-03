const express = require('express');
const router = express.Router();
// const pageList = require('./../../models/page_list');
const Label = require('./../../models/Label');

//查询所有标签
router.get('/findAllLabel', function (req, res) {
    //查询数据
    const criteria = {is_deleted: 1}; // 查询条件
    const fields = ['id','name']; // 待返回的字段
    (async () => {
        var labels = await Label.findAll({
            where: criteria,
            attributes: fields
        });
        let data = [];
        labels.forEach(function (value) {
            let node = {
                id: value.id,
                name: value.name
            };
            data.push(node);
        });
        res.jsonp(data);
    })();
});

//标签数据(分页)
router.get('/findLabelList', function (req, res) {
    //查询数据
    const page = Number(req.query.pageIndex)+1;//当前页码
    const pageSize = Number(req.query.pageSize);//每页条数
    const qs = new RegExp(req.query.name);//标题正则参数
    const Model = Label;//模板
    const populate = '';
    const criteria = {is_deleted: 1, $or: [{name: qs}]};//查询条件
    let fields = {name : 1, date : -1}; // 待返回的字段
    const options = {sort:[{ date: -1 }]};//排序
    pageList.pageQuery(page, pageSize, Model, populate, criteria, fields, options, function (err, $page) {
        if (err){
            next(err);
        } else{
            var data = {
                "total": $page.count,
                "rows": $page.results
            };
            res.jsonp(data);
        }
    });
});

module.exports = router;