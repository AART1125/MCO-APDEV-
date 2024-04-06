const bcrypt = require('bcrypt');
const schemas = require('./schemaModels');

async function getResto(req, resp, templateName) {
    let query = {_id: req.session.login_user, isDeleted : false};
    if(req.params.username != req.session.username){
        query = {username: req.params.username, isDeleted : false};
    }

    let searchModel = schemas.ownerModel;

    try {
        const profile = await searchModel.findOne(query)
                              .populate({
                                path: 'restaurants',
                                match: {isDeleted : false},
                                select: '',
                                populate: {
                                    path: 'owner_id',
                                    model: 'owners', 
                                    select: 'username'
                                }
                              });

        if (!profile) {
            console.log('No profiles found');
            return resp.status(404).send('No profiles found');
        }

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
                    restoimg2: restaurants.restoimg2[0],
                    restoname: restaurants.restoname,
                    ownerid: restaurants.owner_id,
                    owneruser: restaurants.owner_id.username,
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

async function getRestoEdit(req, resp, templateName) {
    let query = {_id: req.session.login_user, isDeleted : false};
    if(req.params.username != req.session.username){
        query = {username: req.params.username, isDeleted : false};
    }

    let searchModel = schemas.ownerModel;

    try {
        const profile = await searchModel.findOne(query)
                              .populate({
                                path: 'restaurants',
                                match: {isDeleted : false},
                                select: '',
                                populate: {
                                    path: 'owner_id',
                                    model: 'owners', 
                                    select: 'username'
                                }
                              });

        if (!profile) {
            console.log('No profiles found');
            return resp.status(404).send('No profiles found');
        }

        let restaurantToEdit = null;

        if (req.params.restoname) {
            restaurantToEdit = profile.restaurants.find(resto => resto.restoname === req.params.restoname);
        }

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
                restaurantToEdit: {
                    restoimg: restaurantToEdit.restoimg[0],
                    restoname: restaurantToEdit.restoname,
                    restodesc: restaurantToEdit.restodesc,
                    location: restaurantToEdit.location,
                    address: restaurantToEdit.address,
                    openingHours: restaurantToEdit.openingHours,
                    contactnum: restaurantToEdit.contactnum,
                    restotype: restaurantToEdit.restotype,
                    foodtype: restaurantToEdit.foodtype,
                    isDeleted: restaurantToEdit.isDeleted
                }
            }
        });
    } catch (err) {
        console.error('Error finding profile:', err);
        resp.status(500).send('Error finding profile');
    }
}

async function findUserProfile(req, resp, templateName) {
    let query = { _id: req.session.login_user };

    if (req.params.username !== req.session.login_username) {
        query = { username: req.params.username, isDeleted: false };
        templateName = 'otherprofile';
    }

    let searchModel = schemas.userModel;

    try {
        const profile = await searchModel.findOne(query)
            .populate({
                path: 'friends',
                match: { isDeleted: false },
                select: 'profileimg fullname username'
            });

        if (!profile) {
            console.log('No profiles found');
            return resp.status(404).send('No profiles found');
        }

        const userId = profile._id;

        const loginUser = await schemas.userModel.findById(req.session.login_user._id)
        .populate({
            path: 'friends',
            match: { isDeleted: false },
            select: '_id profileimg fullname username'
        });
        
        let isFriend = false;
        if (loginUser.friends) {
            for (let i = 0; i < loginUser.friends.length; i++) {
                if (loginUser.friends[i]._id.equals(userId)) {
                    isFriend = true;
                    break;
                }
            }
        }

        const reviews = await schemas.reviewModel.find({ users_id: userId })
            .populate({
                path: 'users_id',
                match: { isDeleted: false },
                select: 'restoimg restaurant rname review likes dislikes isRecommend',
            });

        resp.render(templateName, {
            layout: 'index',
            title: 'Archer\'s Hunt | Profile',
            js: '/common/js/profile.js',
            css: '/common/css/profile.css',
            islogin: req.session.login_user !== undefined,
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

                reviews: reviews.map(review => ({
                    restaurant: review.restaurant,
                    rname: review.restaurant.toUpperCase(),
                    restaurantimg: review.restoimg,
                    reviewText: review.review,
                    link: review.link,
                    likes: review.likes,
                    dislikes: review.dislikes,
                    showReco: review.isRecommend,
                    showLike: review.likes > 0,
                    showDislike: review.dislikes > 0,
                })),
                isFriend: isFriend
            }
        });

    } catch (err) {
        console.error('Error finding profile:', err);
        resp.status(500).send('Error finding profile');
    }
}


async function findOwnerProfile(req, resp, templateName) {
    let query = {_id: req.session.login_user, isDeleted : false};
    if(req.params.username != req.session.username){
        query = {username: req.params.username, isDeleted : false};
    }

    let searchModel = schemas.ownerModel;

    try {
        const profile = await searchModel.findOne(query)
                              .populate({
                                path: 'restaurants',
                                match: {isDeleted : false},
                                select: 'owner_id restoimg restoname restodesc stars',
                                populate: {
                                    path: 'owner_id',
                                    model: 'owners', 
                                    select: 'username'
                                }
                              });

        if (!profile) {
            console.log('No profiles found');
            return resp.status(404).send('No profiles found');
        }

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
                    ownerid: restaurants.owner_id,
                    owneruser: restaurants.owner_id.username,
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

function findUserProfileEdit(req, resp) {
    findUserProfile(req, resp, 'editprofile');
}

async function UserProfileEdit(req, resp) {
    try {
        const userModel = schemas.userModel;

        let user = await userModel.findOne({ _id: req.session.login_user });

        if (!user) {
            return resp.status(404).send("User not found.");
        }

        user.fullname = req.body.fullname;
        user.username = req.body.username;
        user.email = req.body.email;
        user.reviews = [];

        user.preferences.isLike = req.body.likes.split(',').map(item => item.trim());
        user.preferences.isDislike = req.body.dislikes.split(',').map(item => item.trim());

        if (req.body.password) {
            user.password = req.body.password;
        }

        req.session.login_username = user.username;

        await user.save();

        resp.redirect(`/user-profile/${user.username}`);
    } catch (error) {
        console.error('Error updating profile:', error);
        resp.status(500).send("Error updating profile.");
    }
}


function findOwnerProfileEdit(req, resp) {
    findOwnerProfile(req, resp, 'editprofile');
}

async function OwnerProfileEdit(req, resp) {
    try {
        const ownerModel = schemas.ownerModel;

        let owner = await ownerModel.findOne({ _id: req.session.login_user });

        if (!owner) {
            return resp.status(404).send("User not found.");
        }

        owner.fullname = req.body.fullname;
        owner.username = req.body.username;
        owner.email = req.body.email;
        owner.contactnum = req.body.cnum;

        if (req.body.password) {
            owner.password = req.body.password;
        }


        req.session.login_username = owner.username;

        await owner.save();

        resp.redirect(`/owner-profile/${owner.username}`);
    } catch (error) {
        console.error('Error updating profile:', error);
        resp.status(500).send("Error updating profile.");
    }
}

async function addRestaurant(req, resp) {
    try {
        const owner = await schemas.ownerModel.findOne({ _id: req.session.login_user });

        if (!owner) {
            return resp.status(404).send("Owner not found.");
        }

        console.log("Owner found:", owner);

        const newRestaurant = new schemas.restaurantModel({
            restoimg: req.body.restoimg || [],
            restoimg: req.body.restoimg2 || [],
            restoname: req.body.restoname,
            restodesc: req.body.restodesc,
            location: req.body.location,
            address: req.body.address,
            openingHours: req.body.openingHours,
            owner_id: owner._id,
            contactnum: req.body.contactnum,
            foodtype: req.body.foodtype || [],
            restotype: req.body.restotype,
        });

        const savedRestaurant = await newRestaurant.save();


        if (!savedRestaurant) {
            return resp.status(500).send("Failed to add new restaurant.");
        }

        owner.restaurants.push(savedRestaurant._id);
        await owner.save();

        console.log("Owner after saving restaurant:", owner);

        resp.redirect(`/owner-profile/${owner.username}`);
    } catch (error) {
        console.error('Error adding restaurant:', error);
        resp.status(500).send("Error adding restaurant.");
    }
}

async function editRestaurant(req, resp) {
    try {
        const userID = req.session.login_user;

        const owner = await schemas.ownerModel.findOne({
            _id: userID,
            isDeleted: false
        });

        if (!owner) {
            return resp.status(404).send("Owner not found.");
        }

        const restoname = req.params.restoname;

        const restaurant = await schemas.restaurantModel.findOne({
            owner_id: owner._id,
            restoname: restoname
        });

        if (!restaurant) {
            return resp.status(404).send("Restaurant not found.");
        }

        restaurant.restoimg = req.body.restoimg;
        restaurant.restoimg2 = req.body.restoimg2;
        restaurant.restoname = req.body.restoname;
        restaurant.restodesc = req.body.restodesc;
        restaurant.location = req.body.location;
        restaurant.address = req.body.address;
        restaurant.openingHours = req.body.openingHours;
        restaurant.contactnum = req.body.contactnum;
        restaurant.foodtype = req.body.foodtype;
        restaurant.restotype = req.body.restotype;

        const updatedRestaurant = await restaurant.save();

        if (!updatedRestaurant) {
            return resp.status(500).send("Failed to update restaurant.");
        }

        resp.redirect(`/owner-profile/${owner.username}`);
    } catch (error) {
        console.error('Error updating restaurant:', error);
        resp.status(500).send("Error updating restaurant.");
    }
}

async function deleteRestaurant(req, resp) {
    try {
        const userID = req.session.login_user;

        const owner = await schemas.ownerModel.findOne({
            _id: userID,
            isDeleted: false
        });

        if (!owner) {
            return resp.status(404).send("Owner not found.");
        }

        const restoname = req.params.restoname;

        const restaurant = await schemas.restaurantModel.findOne({
            owner_id: owner._id,
            restoname: restoname
        });

        if (!restaurant) {
            return resp.status(404).send("Restaurant not found.");
        }

        restaurant.isDeleted = true;

        const updatedRestaurant = await restaurant.save();

        if (!updatedRestaurant) {
            return resp.status(500).send("Failed to delete restaurant.");
        }

        resp.redirect(`/owner-profile/${owner.username}`);
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        resp.status(500).send("Error deleting restaurant.");
    }
}

async function addFriend(req, resp) {
    try {
        const { username, friendUsername } = req.params;

        const friend = await schemas.userModel.findOne({ username: friendUsername });
        if (!friend) {
            return resp.status(404).send("Friend not found.");
        }

        const user = await schemas.userModel.findOneAndUpdate(
            { username: username, isDeleted: false },
            { $push: { friends: friend._id } },
            { new: true }
        );

        if (!user) {
            return resp.status(404).send("User not found.");
        }

        await schemas.userModel.findOneAndUpdate(
            { username: friendUsername, isDeleted: false },
            { $push: { friends: user._id } },
            { new: true }
        );

        resp.redirect(`/user-profile/${user.username}`);
    } catch (error) {
        console.error('Error adding friend:', error);
        resp.status(500).send("Error adding friend.");
    }
}


async function deleteFriend(req, resp) {
    try {
        const { username, friendUsername } = req.params;

        const friend = await schemas.userModel.findOne({ username: friendUsername });
        if (!friend) {
            return resp.status(404).send("Friend not found.");
        }

        const user = await schemas.userModel.findOneAndUpdate(
            { username: username, isDeleted: false },
            { $pull: { friends: friend._id } },
            { new: true }
        );

        if (!user) {
            return resp.status(404).send("User not found.");
        }

        await schemas.userModel.findOneAndUpdate(
            { username: friendUsername, isDeleted: false },
            { $pull: { friends: user._id } },
            { new: true }
        );

        resp.redirect(`/user-profile/${user.username}`);
    } catch (error) {
        console.error('Error deleting friend:', error);
        resp.status(500).send("Error deleting friend.");
    }
}


module.exports = {
    findUserProfile,
    findOwnerProfile,
    OwnerProfileEdit,
    UserProfileEdit,
    findUserProfileEdit,
    findOwnerProfileEdit,
    addRestaurant,
    editRestaurant,
    deleteRestaurant,
    getRestoEdit,
    getResto,
    addFriend,
    deleteFriend
};
