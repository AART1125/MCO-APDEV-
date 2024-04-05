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
        const reviewId = req.body.reviewId;
        reply.addReply(req, resp, reviewId);
    });

    server.get('/restaurant/:restoname/editreply/:replyId', async (req, resp) => {
        const replyDoc = await reply.searchReply(req.params.replyId);
        resp.render('editreply', {
            layout: 'index',
            title: 'Edit Reply',
            js: '/common/js/editReply.js',
            css: '/common/css/review.css',
            restoname: req.params.restoname,
            replyId: req.params.replyId,
            reviewId : req.params.reviewId,
            islogin: req.session.login_id != undefined,
            isOwner: req.session.login_isOwner,
            username: req.session.login_username,
            reply: replyDoc.reply
        });
    });    

    server.post('/restaurant/:restoname/update-replies', (req, resp) => {
        const replyId = req.body.replyId;
        reply.editReply(req, resp, replyId); 
    });

    server.get('/restaurant/:restoname/deletereply/:replyId', async (req, resp) => {
        const replyDoc = await reply.searchReply(req.params.replyId);
        resp.render('deletereply', {
            layout: 'index',
            title: 'Delete Reply',
            js: '/common/js/deleteReply.js',
            css: '/common/css/review.css',
            restoname: req.params.restoname,
            replyId: req.params.replyId,
            reviewId : req.params.reviewId,
            islogin: req.session.login_id != undefined,
            isOwner: req.session.login_isOwner,
            username: req.session.login_username,
            reply: replyDoc.reply
        });
    });  

    server.post('/restaurant/:restoname/delete-replies', async (req, resp) => {
        const replyId = req.body.replyId;
        const success = await reply.deleteReply(replyId);

        if (success) {
            resp.status(200).json({ message: 'Reply deleted successfully' });
        } else {
            resp.status(404).json({ message: 'Reply not found' });
        }
    });
}

module.exports = {
    add
}
