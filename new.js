var http = require("http");

var data = {id:1};
data = JSON.stringify(data);
//
var opt = {
    url: 'localhost:8082/label/findAllLabel',
    headers:{
        "Content-Type": 'application/json'
    }
};

// var body = '';
// var req = http.request(opt, function(res) {
//     res.on('data',function(data){
//         body += data;
//     }).on('end', function(){
//         console.log('kk',body)
//     });
// }).on('error', function(e) {
//     console.log("error: " + e.message);
// });
//
// req.write(require('querystring').stringify(data));
// req.end();

var request = require('request');
request(opt, function (error, response, body) {
    console.log(body);
    if (!error && response.statusCode == 200) {
        console.log("ppp")
        console.log(body) // IT笔录主页的HTML
    }
})