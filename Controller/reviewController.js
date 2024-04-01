const review = require('../model/reviewModel');

function add(server) {
    server.get('/restaurant/:restoname/reviews', (req,resp) => {
        resp.render('review', {
            layout: 'index',
            title: 'Leave a Review',
            js: '/common/js/review.js',
            css: '/common/css/review.css',
            restoname: req.params.restoname,
            islogin: req.session.login_id != undefined,
            isOwner: req.session.login_isOwner,
            username: req.session.login_username,
        });
    });

    server.post('/restaurant/:restoname/post-reviews', (req,resp) => {
        console.log('Connection Successful 1');
        review.addReview(req,resp);
    });
}

module.exports = {
    add
}