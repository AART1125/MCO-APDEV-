const review = require('../Model/reviewModel');
const schema = require('../Model/schemaModels.js');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

function add(server) {
    // Handle create review
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

    server.post('/restaurant/:restoname/post-reviews', upload.single('myFile'), (req, resp) => {
        review.addReview(req, resp);
        review.computeRatings(req);
    });

    // server.get('/reviewimage/:imagename', async (req,resp) =>  {
    //     try {
    //         const review = await schema.reviewModel.findOne({'image.name' : req.params.imagename});
    //         console.log(review);
    //         if (!review) {
    //             return resp.status(404).send('Image not found');
    //           }
    //           resp.contentType(review.image.contentType).send(review.image.data);
    //     } catch (error) {
    //           resp.status(500).send('Server error');
    //     }
    // });

    // Handle edit review
    server.get('/restaurant/:restoname/editreview/:reviewId', async (req, resp) => {
        const reviewDoc = await review.searchReview(req.params.reviewId);
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

    // Handle delete review
    server.get('/restaurant/:restoname/deletereview/:reviewId', async (req, resp) => {
        const reviewDoc = await review.searchReview(req.params.reviewId);
        resp.render('deletereview', {
            layout: 'index',
            title: 'Delete a Review',
            js: '/common/js/deleteReview.js',
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

    server.post('/restaurant/:restoname/delete-reviews', async (req, resp) => {
        const reviewId = req.body.reviewId;
        const success = await review.deleteReview(reviewId);

        if (success) {
            resp.status(200).json({ message: 'Review deleted successfully' });
        } else {
            resp.status(404).json({ message: 'Review not found' });
        }
    });

    // Handle like action
    server.post('/restaurant/:restoname/reviews/:reviewnum/like', async (req, resp) => {
        console.log("Likes : " + req.body.likes);
        try {
            const reviewfind = await schema.reviewModel.findOne({restaurant : req.params.restoname, reviewnum: req.params.reviewnum});
            reviewfind.likes = req.body.likes; 
            const updatedReview = await reviewfind.save();
            console.log("update successful")
            resp.status(200).json({ message: 'Review liked successfully'});
        } catch (error) {
            console.error('Error:', error);
            resp.status(500).json({ message: 'Failed to like review', error: error });
        }
    });

    // Handle dislike action
    server.post('/restaurant/:restoname/reviews/:reviewnum/dislike', async (req, resp) => {
        console.log("Dislikes : " + req.body.dislikes);
        try {
            const reviewfind = await schema.reviewModel.findOne({restaurant : req.params.restoname, reviewnum: req.params.reviewnum});
            reviewfind.dislikes = req.body.dislikes; 
            const updatedReview = await reviewfind.save();
            console.log("update successful")
            resp.status(200).json({ message: 'Review disliked successfully', review: updatedReview });
        } catch (error) {
            console.error('Error:', error);
            resp.status(500).json({ message: 'Failed to dislike review', error: error });
        }
    });
}

module.exports = {
    add
}
