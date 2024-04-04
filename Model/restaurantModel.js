const {restaurantModel} = require('./schemaModels');

async function getRestaurantData() {
    try {
        const restaurants = await restaurantModel.find({isDeleted : false});
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
        const restaurants = await restaurantModel.find({restoname : restoname, isDeleted : false}).
                            populate({path: 'owner_id',
                                      match: {isDeleted : false},
                                      select : 'profileimg fullname username'
                                    }).
                            populate({path: 'reviews',
                                      match: {isDeleted : false},
                                      populate:[
                                        {path : 'users_id',
                                         match: {isDeleted : false},
                                         select : 'profileimg fullname username'},
                                        {path : 'reply',
                                         match: {isDeleted : false},
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
            'reviewId': review._id , // To track the reviewId for edit/delete review
            // Assuming `review` has a property `user_id` that's populated
            'user-profileimg': review.users_id.profileimg,
            'user-fullname': review.users_id.fullname,
            'user-username': review.users_id.username,
            'isUser': req.session.login_username === review.users_id.username,
            'likes': review.likes,
            'dislikes': review.dislikes,
            'action': review.action,
            'is-recommend': review.isRecommend,
            'review': review.review,
            'reply': review.reply ? review.reply.reply : null,
            'replyId': review.reply ? review.reply._id : null,
            // Assuming the owner's data is required per review, which might be redundant
            'owner-profileimg': review.reply ? restaurants[0].owner_id.profileimg : null,
            'owner-fullname': review.reply ? restaurants[0].owner_id.fullname : null,
            'owner-username': review.reply ? restaurants[0].owner_id.username : null,
            'replyexists' : (review.reply && !review.reply.isDeleted) ? true:false,
            'isDeleted': review.reply ? review.reply.isDeleted : false
        }));

        return [restaurantDataArr, reviewData];
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        throw error;
    }
}

module.exports = {
    getRestaurantData,
    getSpecificRestaurantData
};
