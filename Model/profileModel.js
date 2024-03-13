const schemas = require('./schemaModels');

function findUserProfile(req, resp, templateName, isOwner) {
    let query;
    if (isOwner) {
        query = { owner: req.body.owner };
    } else {
        query = { user: req.body.user };
    }

    let searchModel = isOwner ? schemas.ownerModel : schemas.userModel;

    searchModel.findOne(query)
        .then(profile => {
            if (!profile) {
                console.log('No profiles found');
                return resp.status(404).send('No profiles found');
            }

            console.log('Profile found:', profile);

            resp.render(templateName, {
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
                    friends     : profile.friends.map(friends => ({
                        friendpic       : friends.profileimg,
                        friendid        : friends.id,
                        friendname      : friends.fullname,
                        friendusername  : friends.username
                    })),
                    reviews     : profile.reviews.map(review => ({
                        restaurant      : review.restaurant,
                        rname           : review.restaurant.toUpperCase(),
                        restaurantimg   : review.restoimg,
                        reviewText      : review.review,
                        link            : review.link,
                        likes           : review.likes,
                        dislikes        : review.dislikes,
                        showReco        : review.isRecommend,
                        showLike        : review.likes > 0,
                        showDislike     : review.dislikes > 0,
                    }))
                }
            });
        })
        .catch(err => {
            console.error('Error finding profile:', err);
            resp.status(500).send('Error finding profile');
        });
}

function findOwnerProfile(req, resp, templateName, isOwner) {
    let query;
    if (isOwner) {
        query = { owner: req.body.owner };
    } else {
        query = { user: req.body.user };
    }

    let searchModel = isOwner ? schemas.ownerModel : schemas.userModel;

    searchModel.findOne(query)
        .then(profile => {
            if (!profile) {
                console.log('No profiles found');
                return resp.status(404).send('No profiles found');
            }

            console.log('Profile found:', profile);

            resp.render(templateName, {
                layout: 'index',
                title: 'Archer\'s Hunt | Profile',
                js: '../common/js/profile.js',
                css: '../common/css/profile.css',
                islogin: true,
                isOwner: isOwner,
                owner: {
                    profileimg  : profile.profileimg,
                    fullname    : profile.fullname,
                    username    : profile.username,
                    email       : profile.email,
                    contactnum  : profile.contactnum,
                    contactinfo : {
                        title       : profile.contactinfo.titles,
                        links       : profile.contactinfo.links
                    },
                    restaurants : profile.restaurants.map(restaurants => ({
                        restoimg    : restaurants.restoimg[0],
                        restoname   : restaurants.restoname,
                        rname       : restaurants.restoname.toUpperCase(),
                        restodesc   : restaurants.restodesc,
                        restostar   : restaurants.stars
                    }))
                }
            });
        })
        .catch(err => {
            console.error('Error finding profile:', err);
            resp.status(500).send('Error finding profile');
        });
}

function UserProfileEdit(req, resp) {
    findUserProfile(req, resp, 'editprofile', false);
}

function OwnerProfileEdit(req, resp) {
    findOwnerProfile(req, resp, 'editprofile', true);
}

module.exports = {
    findUserProfile,
    findOwnerProfile,
    OwnerProfileEdit,
    UserProfileEdit
};
