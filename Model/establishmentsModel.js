const schemas = require('./schemaModels');

async function initGen(){
    let dict = [];

    try {
        const restaurants = await schemas.restaurantModel.find();
        for(const restaurant of restaurants){
            let stars = [];
            for (let i = 0; i < 5; i++) {
                if(i < restaurant.stars){
                    stars.push({
                        isStar: true
                    });
                } else {
                    stars.push({
                        isStar: false
                    });
                }
            }
            dict.push({
                'resto-img'     : restaurant.restoimg[0],
                'resto-name'    : restaurant.restoname,
                'resto-desc'    : restaurant.restodesc,
                star            : stars
            });
        }
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }

    return dict;
}

module.exports = {
    initGen
}