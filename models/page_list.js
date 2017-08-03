const express = require('express');
const router = express.Router();
const settings = require('../settings.js');
const mysql = require('mysql');

router.get('/', function(req, res, next) {
    var current_page = 1; //默认为1
    var num = 9; //一页条数
    if (req.query.page) {
        current_page = parseInt(req.query.page);
    }

    var last_page = current_page - 1;
    if (current_page <= 1) {
        last_page = 1;
    }
    var next_page = current_page + 1;
    var str = 'SELECT left(paragraph,50) as paragraph,date,id FROM notice limit ' + num + ' offset ' + num * (current_page - 1);
    var conn = mysql.createConnection(settings.db);

    conn.connect();
    conn.query(str, function(err, rows, fields) {
        if (err) {
            req.flash('error', '数据查询有误');
        }
        if (!err) {
            if (!rows[0]) {
                req.flash('error', '已到最后一页,请返回');
            }
            res.render('notice', {
                last_page: last_page,
                next_page: next_page,
                current_page: current_page,
                mes: rows,
                error: req.flash('error').toString()
            });

        }
    });
    conn.end();
});

module.exports = router;