const schemas = require('./schemaModels');

async function addReview(req, resp) {
    console.log("Connection Successful 2");
    const restoname = await schemas.restaurantModel.findOne({restoname : req.params.restoname});
    const user = await schemas.userModel.findOne({_id : req.session.login_user});
    const reviewInstance = schemas.reviewModel({
        users_id: req.session.login_user,
        restaurant: restoname.restoname,
        restoimg: restoname.restoimg[0],
        review: req.body.review,
        isRecommend: req.body.isRecommend,
        reply : null
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

module.exports = {
    addReview
};
