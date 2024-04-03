const schemas = require('./schemaModels');

async function addReview(req, resp) {
    const restoname = await schemas.restaurantModel.findOne({restoname : req.params.restoname, isDeleted : false});
    const user = await schemas.userModel.findOne({_id : req.session.login_user});
    const reviewInstance = schemas.reviewModel({
        users_id: req.session.login_user,
        restaurant: restoname.restoname,
        restoimg: restoname.restoimg[0],
        review: req.body.review,
        isRecommend: req.body.isRecommend,
        reply : null,
        isDeleted : false
    });

    const res = await reviewInstance.save().catch((error) => {
        console.error('Error:', error);
        resp.status(500).json({ message: 'Failed to submit review', error: error });
    });;

    if(res){
        restoname.reviews.push(res._id);
        restoname.save()
        user.reviews.push(res._id);
        user.save();
        resp.status(201).json({ message: 'Review submitted successfully', review: res });
    }     
}

async function searchReview(reviewId) {
    const reviewDoc = await schemas.reviewModel.findOne({_id : reviewId, isDeleted : false});
    return reviewDoc;
}

async function editReview(req, resp) {
    const reviewId = req.body.reviewId;
    const updatedReviewContent = req.body.textReview;
    const updatedRecommendation = req.body.isRecommend; 

    try {
        const existingReview = await schemas.reviewModel.findOne({_id : reviewId, isDeleted : false});

        if (!existingReview) {
            return resp.status(404).json({ message: 'Review not found' });
        }

        existingReview.review = updatedReviewContent;
        existingReview.isRecommend = updatedRecommendation;

        const updatedReview = await existingReview.save();

        resp.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    } catch (error) {
        console.error('Error:', error);
        resp.status(500).json({ message: 'Failed to update review', error: error });
    }
}

async function likeReview(req, resp) {
    const reviewId = req.params.reviewId;

    try {
        const existingReview = await schemas.reviewModel.findOne({ _id: reviewId, isDeleted: false });

        if (!existingReview) {
            return resp.status(404).json({ message: 'Review not found' });
        }

        existingReview.likes += 1;
        existingReview.action = 'like'; 
        const updatedReview = await existingReview.save();

        resp.status(200).json({ message: 'Liked review successfully', review: updatedReview });
    } catch (error) {
        console.error('Error:', error);
        resp.status(500).json({ message: 'Failed to like review', error: error });
    }
}

async function dislikeReview(req, resp) {
    const reviewId = req.params.reviewId;

    try {
        const existingReview = await schemas.reviewModel.findOne({ _id: reviewId, isDeleted: false });

        if (!existingReview) {
            return resp.status(404).json({ message: 'Review not found' });
        }

        existingReview.dislikes += 1;
        existingReview.action = 'dislike'; 
        const updatedReview = await existingReview.save();

        resp.status(200).json({ message: 'Disliked review successfully', review: updatedReview });
    } catch (error) {
        console.error('Error:', error);
        resp.status(500).json({ message: 'Failed to dislike review', error: error });
    }
}

module.exports = {
    addReview,
    editReview,
    searchReview,
    likeReview,
    dislikeReview
};
