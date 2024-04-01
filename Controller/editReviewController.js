const review = require('../model/editReviewModel');

function add(server) {
    server.get('/restaurant/:restoname/editreview', (req,resp) => {
        resp.render('editreview', {
            layout: 'index',
            title: 'Edit a Review',
            js: '/common/js/editreview.js',
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