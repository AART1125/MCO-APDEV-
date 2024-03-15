const schemas = require('./schemaModels');

async function findUserProfile(req, resp, templateName) {
    let query = {_id: req.session.login_user};

    if(req.params.username != req.session.login_username){
        query = {username: req.params.username};
        templateName = 'otherprofile';
    }
    
    let searchModel = schemas.userModel;

    try {
        const profile = await searchModel.findOne(query)
                                         .populate({
                                            path: 'friends',
                                            select: 'profileimg fullname username'
                                        }); 

        if (!profile) {
            console.log('No profiles found');
            return resp.status(404).send('No profiles found');
        }

        console.log('Profile found:', profile);
        console.log('Friends found:', profile.friends);

        const userId = profile._id;

        const reviews = await schemas.reviewModel.find({ users_id: userId })
            .populate({
                path: 'users_id',
                select: 'restoimg restaurant rname review likes dislikes isRecommend',
            });

        resp.render(templateName, {
            layout: 'index',
            title: 'Archer\'s Hunt | Profile',
            js: '/common/js/profile.js',
            css: '/common/css/profile.css',
            islogin: req.session.login_user != undefined,
            username: req.session.login_username,
            userID: req.session.login_user,
            isOwner: false,
            user: {
                profileimg: profile.profileimg,
                fullname: profile.fullname,
                username: profile.username,
                email: profile.email,
                contactnum: profile.contactnum,
                preferences: {
                    isLike: profile.preferences.isLike,
                    isDislike: profile.preferences.isDislike
                },
                friends: profile.friends.map(friend => ({
                    friendpic: friend.profileimg,
                    friendname: friend.fullname,
                    friendusername: friend.username
                })),
                
                // (profile.friends || []).map(friend => ({
                //     friendpic: friend.profileimg,
                //     friendname: friend.fullname,
                //     friendusername: friend.username
                // })),
                reviews: reviews.map(review => ({
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
    } catch (err) {
        console.error('Error finding profile:', err);
        resp.status(500).send('Error finding profile');
    }
}

async function findOwnerProfile(req, resp, templateName) {
    let query = {_id: req.session.login_user};
    if(req.params.username != req.session.username){
        query = {username: req.params.username};
    }

    let searchModel = schemas.ownerModel;

    try {
        const profile = await searchModel.findOne(query)
                              .populate({
                                path: 'restaurants',
                                select: 'restoimg restoname restodesc stars'
                              });

        if (!profile) {
            console.log('No profiles found');
            return resp.status(404).send('No profiles found');
        }

        console.log('Profile found:', profile);

        resp.render(templateName, {
            layout: 'index',
            title: 'Archer\'s Hunt | Profile',
            js: '/common/js/profile.js',
            css: '/common/css/profile.css',
            islogin: req.session.login_user != undefined,
            username: req.session.login_username,
            userID: req.session.login_user,
            isOwner: true,
            owner: {
                profileimg: profile.profileimg,
                fullname: profile.fullname,
                username: profile.username,
                email: profile.email,
                contactnum: profile.contactnum,
                contactinfo: {
                    titles: profile.contactinfo.title,
                    links: profile.contactinfo.links
                },
                restaurants: profile.restaurants.map(restaurants => ({
                    restoimg: restaurants.restoimg[0],
                    restoname: restaurants.restoname,
                    rname: restaurants.restoname.toUpperCase(),
                    restodesc: restaurants.restodesc,
                    restostar: restaurants.stars
                }))
            }
        });
    } catch (err) {
        console.error('Error finding profile:', err);
        resp.status(500).send('Error finding profile');
    }
}

function UserProfileEdit(req, resp) {
    findUserProfile(req, resp, 'editprofile');
}

function OwnerProfileEdit(req, resp) {
    findOwnerProfile(req, resp, 'editprofile');
}

module.exports = {
    findUserProfile,
    findOwnerProfile,
    OwnerProfileEdit,
    UserProfileEdit,
};
