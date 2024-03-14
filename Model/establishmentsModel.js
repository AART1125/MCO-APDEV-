const schemas = require('./schemaModels');

async function initGen(req){
    let dict = [];
    if(req.session.login_isOwner){
        console.log(req.session.login_user)
        try {
            const restaurants = await schemas.restaurantModel.find({owner_id: req.session.login_user});
            console.log("results of find" + restaurants);
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
    } else {
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
    
    }
    
    return dict;
}

async function ownerGen(){
    let dict = [];

    

    return dict;
}

async function search(searchQuery){
    let dict = [];
    try {
        const restaurants = await schemas.restaurantModel.find();
        for(const restaurant of restaurants){
            if(restaurant.restoname.toLowerCase().includes(searchQuery.toLowerCase())){
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