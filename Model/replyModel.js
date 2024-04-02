const schemas = require('./schemaModels');

async function addReply(req, resp, reviewId) {
    const resto = await schemas.restaurantModel.findOne({ restoname: req.params.restoname });
    const owner = await schemas.ownerModel.findOne({ restaurants: resto._id });
    const review = await schemas.reviewModel.findOne({ _id : reviewId});
    const replyInstance = schemas.replyModel({
        owner_id: owner._id,
        resto_id: resto._id,
        reviewofR: reviewId, 
        reply: req.body.textReply,
    });

    const res = await replyInstance.save().catch((error) => {
        console.error('Error:', error);
        resp.status(500).json({ message: 'Failed to submit reply', error: error });
    });

    console.log(review)

    if(res){
        owner.replies.push(res._id);
        owner.save();
        review.reply = res._id;
        review.save();
        resp.status(201).json({ message: 'Reply submitted successfully', reply: res });
    }
}

module.exports = {
    addReply
};