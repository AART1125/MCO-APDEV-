const {reviewModel} = require('./schemaModels');

async function addReview(req, resp){
    const reviewInstance = reviewModel({
        users_id    :   req.body.userid,
        restuarant  :   req.params.restoname,
        review      :   req.body.review,
        isRecommend :   req.body.isRecommend
    });

    reviewInstance.save().then((req, resp) => {
        resp.send('created');
    });
}

module.exports = {
    addReview
}