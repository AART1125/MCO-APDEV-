const reply = require('../Model/replyModel');

function add(server) {
    server.get('/restaurant/:restoname/reply/:reviewId', (req, resp) => {
        resp.render('reply', {
            layout: 'index',
            title: 'Owner Reply',
            js: '/common/js/reply.js',
            css: '/common/css/review.css',
            restoname: req.params.restoname,
            reviewId : req.params.reviewId,
            islogin: req.session.login_id != undefined,
            isOwner: req.session.login_isOwner,
            username: req.session.login_username,
        });
    });

    server.post('/restaurant/:restoname/post-replies', (req, resp) => {
        console.log('Connection Successful 1');
        const reviewId = req.body.reviewId;
        reply.addReply(req, resp, reviewId);
    });
}

module.exports = {
    add
}
