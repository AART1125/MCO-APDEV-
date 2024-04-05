const schemas = require('./schemaModels');

async function initGen(){
    let dict = [];
    
    try {
        const restaurants = await schemas.restaurantModel.find();
        for(const restaurant of restaurants){
            if(!restaurant.isDeleted){
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
        }
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
    
    
    
    return dict;
}

async function ownerGen(req){
    let dict = [];

    try {
        const restaurants = await schemas.restaurantModel.find({owner_id: req.session.login_user, isDeleted : false});
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
            if(restaurant.restoname.toLowerCase().includes(searchQuery.toLowerCase()) && !restaurant.isDeleted){
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
        }

    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }

    return dict;
}

async function searchFoodType(foodtype){
    let dict = [];
    try {
        const restaurants = await schemas.restaurantModel.find();
        for(const restaurant of restaurants){
            if (!restaurant.isDeleted) {
                restaurant.foodtype.forEach((type) => {
                    if(type.toLowerCase() === foodtype.toLowerCase()){
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
    search,
    searchFoodType,
    ownerGen
}