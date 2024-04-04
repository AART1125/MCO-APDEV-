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

async function searchReply(replyId) {
    const replyDoc = await schemas.replyModel.findOne({_id : replyId, isDeleted : false});
    return replyDoc;
}

async function editReply(req, resp) {
    const replyId = req.body.replyId;
    const updatedReplyContent = req.body.textReply;

    try {
        const existingReply= await schemas.replyModel.findOne({_id : replyId, isDeleted : false});

        if (!existingReply) {
            return resp.status(404).json({ message: 'Reply not found' });
        }

        existingReply.reply = updatedReplyContent;

        const updatedReply = await existingReply.save();

        resp.status(200).json({ message: 'Reply updated successfully', reply: updatedReply });
    } catch (error) {
        console.error('Error:', error);
        resp.status(500).json({ message: 'Failed to update reply', error: error });
    }
}

async function deleteReply(replyId) {
    try {
        const reply = await schemas.replyModel.findOne({ _id: replyId });

        if (!reply) {
            return false; 
        }

        reply.isDeleted = true;
        await reply.save();
        return true; 
    } catch (error) {
        console.error('Error:', error);
        return false; 
    }
}


module.exports = {
    addReply,
    searchReply,
    editReply,
    deleteReply
};