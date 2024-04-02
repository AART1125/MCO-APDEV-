const review = require('../Model/reviewModel');

function add(server) {
    server.get('/restaurant/:restoname/reviews', (req, resp) => {
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

    server.post('/restaurant/:restoname/post-reviews', (req, resp) => {
        console.log('Connection Successful 1');
        review.addReview(req, resp);
    });

    server.get('/restaurant/:restoname/editreview/:reviewId', async (req, resp) => {
        const reviewDoc = await review.searchReview(req.params.reviewId);
        console.log(reviewDoc.isRecommend);
        console.log(reviewDoc.review);
        resp.render('editreview', {
            layout: 'index',
            title: 'Edit a Review',
            js: '/common/js/editreview.js',
            css: '/common/css/review.css',
            islogin: req.session.login_id !== undefined,
            isOwner: req.session.login_isOwner,
            username: req.session.login_username,
            reviewId: req.params.reviewId,
            restoname: req.params.restoname,
            review: reviewDoc.review,
            isRecommend: reviewDoc.isRecommend
        });
    });

    server.post('/restaurant/:restoname/update-reviews', (req, resp) => {
        const reviewId = req.body.reviewId;
        review.editReview(req, resp, reviewId); 
    });
}

module.exports = {
    add
}
