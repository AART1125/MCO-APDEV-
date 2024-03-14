const {restaurantModel} = require('./schemaModels');

async function getRestaurantData() {
    try {
        const restaurants = await restaurantModel.find({}).
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
        const restaurantDataArray = [];

        restaurants.forEach(restaurant => {
            const restaurantData = {
                'resto-img': restaurant.restoimg[0],
                'resto-name': restaurant.restoname,
                'resto-type': restaurant.restotype,
                'location': restaurant.location,
                'address': restaurant.address,
                'opening-hours': restaurant.openingHours,
                'reviews' : restaurant.reviews.map(review => ({
                    // Assuming `review` has a property `user_id` that's populated
                    'user-profileimg': review.users_id.profileimg,
                    'user-fullname': review.users_id.fullname,
                    'user-username': review.users_id.username,
                    'likes': review.likes,
                    'dislikes': review.dislikes,
                    'is-recommend': review.isRecommend,
                    'review': review.review,
                    'reply': review.reply.reply,
                    // Assuming the owner's data is required per review, which might be redundant
                    'owner-profileimg': restaurant.owner_id.profileimg,
                    'owner-fullname': restaurant.owner_id.fullname,
                    'owner-username': restaurant.owner_id.username,
                })),
            };
            restaurantDataArray.push(restaurantData);
        });
        return restaurantDataArray;
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        throw error;
    }
}

async function getSpecificRestaurantData(restoname) {
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
        let restaurantDataArr = [];
        let reviewDataArr = [];

        restaurants.forEach(restaurant => {
            const restaurantData = {
                'resto-img': restaurant.restoimg2[0],
                'resto-name': restaurant.restoname,
                'resto-type': restaurant.restotype,
                'location': restaurant.location,
                'address': restaurant.address,
                'opening-hours': restaurant.openingHours,
            };

            const reviewData = {
                'reviews' : restaurant.reviews.map(review => ({
                    // Assuming `review` has a property `user_id` that's populated
                    'user-profileimg': review.users_id.profileimg,
                    'user-fullname': review.users_id.fullname,
                    'user-username': review.users_id.username,
                    'likes': review.likes,
                    'dislikes': review.dislikes,
                    'is-recommend': review.isRecommend,
                    'review': review.review,
                    'reply': review.reply.reply,
                    // Assuming the owner's data is required per review, which might be redundant
                    'owner-profileimg': restaurant.owner_id.profileimg,
                    'owner-fullname': restaurant.owner_id.fullname,
                    'owner-username': restaurant.owner_id.username,
                }))
            }

            restaurantDataArr.push(restaurantData);
            reviewDataArr.push(reviewData);
        });

        return [restaurantDataArr, reviewDataArr];
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        throw error;
    }
}

module.exports = {
    getRestaurantData,
    getSpecificRestaurantData
};
