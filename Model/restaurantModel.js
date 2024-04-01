const {restaurantModel} = require('./schemaModels');

async function getRestaurantData() {
    try {
        const restaurants = await restaurantModel.find({});
        const restaurantDataArray = [];

        restaurants.forEach(restaurant => {
            const restaurantData = {
                'resto-img': restaurant.restoimg[0],
                'resto-name': restaurant.restoname,
                'resto-type': restaurant.restotype,
                'location': restaurant.location,
                'address': restaurant.address,
                'opening-hours': restaurant.openingHours,
            };
            restaurantDataArray.push(restaurantData);
        });
        return restaurantDataArray;
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        throw error;
    }
}

async function getSpecificRestaurantData(restoname, req) {
    try {
        const restaurants = await restaurantModel.find({restoname : restoname}).
                            populate({path: 'owner_id',
                                      select : 'profileimg fullname username'
                                    }).
                            populate({path: 'reviews',
                                      populate:[
                                        {path : 'users_id',
                                         select : 'profileimg fullname username'},
                                        {path : 'reply',
                                         select : 'reply'}
                                    ]})

        const restaurantData = {
            'resto-img': restaurants[0].restoimg2[0],
            'resto-name': restaurants[0].restoname,
            'resto-type': restaurants[0].restotype,
            'location': restaurants[0].location,
            'address': restaurants[0].address,
            'opening-hours': restaurants[0].openingHours
        }

        const restaurantDataArr = [restaurantData];

        const reviewData = restaurants[0].reviews.map(review => ({
            // Populate `resto-name` for each review
            'resto-name': restaurants[0].restoname,
            // Assuming `review` has a property `user_id` that's populated
            'user-profileimg': review.users_id.profileimg,
            'user-fullname': review.users_id.fullname,
            'user-username': review.users_id.username,
            'isUser': req.session.login_username === review.users_id.username,
            'likes': review.likes,
            'dislikes': review.dislikes,
            'is-recommend': review.isRecommend,
            'review': review.review,
            'reply': review.reply ? review.reply.reply : null,
            // Assuming the owner's data is required per review, which might be redundant
            'owner-profileimg': review.reply ? restaurants[0].owner_id.profileimg : null,
            'owner-fullname': review.reply ? restaurants[0].owner_id.fullname : null,
            'owner-username': review.reply ? restaurants[0].owner_id.username : null,
            'replyexists' : review.reply ? true:false
        }));

        return [restaurantDataArr, reviewData];
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        throw error;
    }
}

async function addReply(req, resp) {
    console.log("Connection Successful 2");
    const restoname = await schemas.restaurantModel.findOne({ restoname: req.params.restoname });
    const owner = await schemas.ownerModel.findOne({ _id: req.session.login_owner });
    const replyInstance = schemas.restaurantModel({
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
    getRestaurantData,
    getSpecificRestaurantData,
    addReply
};
