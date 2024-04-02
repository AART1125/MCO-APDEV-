const schemas = require('./schemaModels');

async function addReply(req, resp) {
    console.log("Connection Successful 2");
    const restoname = await schemas.restaurantModel.findOne({ restoname: req.params.restoname });
    const owner = await schemas.ownerModel.findOne({ _id: req.session.login_owner });
    const replyInstance = schemas.replyModel({
        owner_id: req.session.login_owner,
        resto_id: restoname._id,
        reviewofR: req.body.reviewId, 
        reply: req.body.reply,
    });

    const res = await replyInstance.save().catch((error) => {
        console.error('Error:', error);
        resp.status(500).json({ message: 'Failed to submit reply', error: error });
    });;

    if(res){
        restoname.reply.push(res._id);
        restoname.save()
        owner.reply.push(res._id);
        owner.save();
        resp.status(201).json({ message: 'Reply submitted successfully', reply: res });
    }
}

module.exports = {
    addReply
};