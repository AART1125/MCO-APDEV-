const review = require('../Model/reviewModel');

function add(server) {
    server.get('/restaurant/:restoname/reviews', (req,resp) => {
        resp.render('review', {
            layout: 'index',
            title: 'Leave a Review',
            js: '/common/js/review.js',
            css: '/common/css/review.css',
            islogin: req.session.login_id != undefined,
            isOwner: req.session.login_isOwner,
            username: req.session.login_username,
        });
    });
}

module.exports = {
    add
}