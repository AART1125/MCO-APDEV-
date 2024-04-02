const schemas = require('./schemaModels');

async function addReply(req, resp) {
    console.log("Connection Successful 2");
    const restoname = await schemas.restaurantModel.findOne({ restoname: req.params.restoname });
    const owner = await schemas.ownerModel.findOne({ restaurant: restoname._id });
    const replyInstance = schemas.replyModel({
        owner_id: owner._id,
        resto_id: restoname._id,
        reviewofR: req.params.reviewId, 
        reply: req.body.reply,
        isDeleted : false
    });

    const res = await replyInstance.save().catch((error) => {
        console.error('Error:', error);
        resp.status(500).json({ message: 'Failed to submit reply', error: error });
    });;

    if(res){
        owner.reply.push(res._id);
        owner.save();
        resp.status(201).json({ message: 'Reply submitted successfully', reply: res });
    }
}

module.exports = {
    addReply
};