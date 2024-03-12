const schemas = require('./schemaModels');

function findProfile(req, resp) {
    let isOwner = req.query.isOwner === 'true';

    let query;
    if (isOwner) {
        query = { owner: req.body.owner };
    } else {
        query = { user: req.body.user };
    }

    let searchModel = isOwner ? schemas.ownerModel : schemas.userModel;       // check if it's flagged as an owner or user

    searchModel.findOne(query)
        .then(profile => {
            if (!profile) {
                console.log('No profiles found');
                return resp.status(404).send('No profiles found');
            }

            console.log('Profile found:', profile);         // check what profile is being checked, can be removed naman

            resp.render('profile', {
                layout: 'index',
                title: 'Archer\'s Hunt | Profile',
                js: '../common/js/profile.js',
                css: '../common/css/profile.css',
                islogin: true,
                isOwner: isOwner,
                user: {
                    profileimg  : profile.profileimg,
                    fullname    : profile.fullname,
                    username    : profile.username,
                    email       : profile.email,
                    contactnum  : profile.contactnum,
                    preferences : {
                        isLike      : profile.preferences.isLike,
                        isDislike   : profile.preferences.isDislike
                    },
                    reviews     : profile.reviews.map(review => ({
                        restaurant      : review.restaurant.toUpperCase(),
                        restaurantimg   : review.restoimg,
                        reviewText      : review.review,
                        link            : review.link,
                        likes           : review.likes,
                        dislikes        : review.dislikes,
                        reco            : review.isRecommend,
                        showLike        : review.likes > 0,
                        showDislike     : review.dislikes > 0,
                        showReco        : review.reco = true
                    }))
                }
            });
        });
}

module.exports = {
    findProfile
};
