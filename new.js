const MyRequest = require('./my_node_modules/my-request');
const ApiServer = require('./config/api-server');

const data = {id: 2};
MyRequest.get(ApiServer.mysqlServer, '/article/findArticlesList', data, function (value) {
    console.log('value',value);
});