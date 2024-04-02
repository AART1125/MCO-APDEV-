const review = require('../Model/reviewModel');

function add(server) {
    server.get('/restaurant/:restoname/reply/:reviewId', (req, resp) => {
        resp.render('reply', {
            layout: 'index',
            title: 'Reply to a Review',
            js: '/common/js/reply.js',
            css: '/common/css/review.css',
            restoname: req.params.restoname,
            islogin: req.session.login_id != undefined,
            isOwner: req.session.login_isOwner,
            username: req.session.login_username,
        });
    });
}

module.exports = {
    add
}
