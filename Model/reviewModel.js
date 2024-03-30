const { reviewModel } = require('./schemaModels');

async function addReview(req, resp) {
    const reviewInstance = reviewModel({
        users_id: req.body.userid,
        restuarant: req.params.restoname,
        review: req.body.review,
        isRecommend: req.body.isRecommend
    });

    reviewInstance.save()
        .then((savedReview) => {
            resp.status(201).json({ message: 'Review submitted successfully', review: savedReview });
        })
        .catch((error) => {
            console.error('Error:', error);
            resp.status(500).json({ message: 'Failed to submit review', error: error });
        });
}

module.exports = {
    addReview
}
