const schemas = require('./schemaModels');

async function initGen(){
    let dict = [];

    try {
        const restaurants = await schemas.restaurantModel.find();
        for(const restaurant of restaurants){
            let stars = [];
            for (let i = 0; i < 5; i++) {
                stars.push({
                    isStar: i < restaurant.stars
                });
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

async function search(searchQuery){
    let dict = [];
    try {
        const restaurants = await schemas.restaurantModel.find();
        for(const restaurant of restaurants){
            let stars = [];
            for (let i = 0; i < 5; i++) {
                stars.push({
                    isStar: i < restaurant.stars
                });
            }
            if(restaurant.restoname.toLowerCase().includes(searchQuery.toLowerCase())){
                dict.push({
                    'resto-img'     : restaurant.restoimg[0],
                    'resto-name'    : restaurant.restoname,
                    'resto-desc'    : restaurant.restodesc,
                    star            : stars
                });
            }
        }

    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }

    return dict;
}

module.exports = {
    initGen,
    search
}