const User = require('./models/user');
const Label = require('./models/label');
const ArticleLabel = require('./models/article_label');
const Article = require('./models/article');

// (async () => {
//     await User.create({
//         name: 'aaa',
//         password: '21212'
//     });
// })();

// (async () => {
//     await Label.create({
//         name: 'node.js'
//     });
// })();

// (async () => {
//     await ArticleLabel.create({
//         article_id: 1,
//         label_id: 1
//     });
// })();

(async () => {
    let article = await Article.update({
        is_deleted : 0
    }, {
        where: {
            id: {
                $like: '2'
            }
        }
    });
})();

// let user = User.build({
//     name: 'admin',
//     password: '21212'
// });
//
// user.save();

// User.create({
//     name: 'admin',
//     password: '21212'
// }).then(function (p) {
//     console.log('created.' + JSON.stringify(p));
// }).catch(function (err) {
//     console.log('failed:' + err);
// });