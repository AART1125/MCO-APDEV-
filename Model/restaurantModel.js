const { restaurantModel } = require('./schemaModels');

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
                'reviews': restaurant.reviews.map(review => ({
                    'user-profileimg': review.users_id.profileimg,
                    'user-fullname': review.users_id.fullname,
                    'user-username': review.users_id.username,
                    'likes': review.likes,
                    'dislikes': review.dislikes,
                    'is-recommend': review.isRecommend,
                    'review': review.review,
                    'reply': review.reply, 
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
        const restaurants = await restaurantModel.find({restoname : restoname});
        let restaurantDataArr = [];
        let reviewDataArr = [];

        restaurants.forEach(restaurant => {
            const restaurantData = {
                'resto-img': restaurant.restoimg[0],
                'resto-name': restaurant.restoname,
                'resto-type': restaurant.restotype,
                'location': restaurant.location,
                'address': restaurant.address,
                'opening-hours': restaurant.openingHours,
            };

            const reviewData = {
                'reviews': restaurant.reviews.map(review => ({
                    'user-profileimg': review.users_id.profileimg,
                    'user-fullname': review.users_id.fullname,
                    'user-username': review.users_id.username,
                    'likes': review.likes,
                    'dislikes': review.dislikes,
                    'is-recommend': review.isRecommend,
                    'review': review.review,
                    'reply': review.reply, 
                    'owner-profileimg': restaurant.owner_id.profileimg,
                    'owner-fullname': restaurant.owner_id.fullname,
                    'owner-username': restaurant.owner_id.username,
                }))
            };
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
