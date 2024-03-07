const mongoose = require('mongoose'); // Database
mongoose.connect('mongodb+srv://serverDB:server@archerhunts.lmgolam.mongodb.net/archer\'s_hunt'); // Database Link

const replySchema = new mongoose.Schema({
    resto_id    :   {type: Number},
    reply       :   {type: String},
    likes       :   {type: Number, default: 0},
    dislikes    :   {type: Number, default: 0},
    datemade    :   {type: Date}
},{ versionKey: false})

const reviewSchema = new mongoose.Schema({
    users_id    :   {type: Number},
    restuarant  :   {type: String},
    review      :   {type: String},
    likes       :   {type: Number, default: 0},
    dislikes    :   {type: Number, default: 0},
    datemade    :   {type: Date}
},{ versionKey: false});

const restaurantSchema = new mongoose.Schema({
    restoname   :   {type: String},
    owner_id    :   {type: Number},
    contactnum  :   {type: Number},
    address     :   {type: String},
    likes       :   {type: Number, default: 0},
    dislikes    :   {type: Number, default: 0},
    reviews     :   {type: [reviewSchema], default: []}
},{ versionKey: false});

const userSchema = new mongoose.Schema({
    fullname    :   {type: String},
    username    :   {type: String},
    password    :   {type: String},
    email       :   {type: String},
    contactnum  :   {type: Number},
    likedresto  :   {type: [String], default : []},//names
    preferences :   {type: [String], default : []},//preferences
    reviews     :   {type: [reviewSchema], default : []},//[['resto','reviews'],['resto''reviews']]
    friends     :   {type: [String], default : []}//
},{ versionKey: false});

const ownerSchema = new mongoose.Schema({
    fullname    :   {type: String},
    username    :   {type: String},
    password    :   {type: String},
    email       :   {type: String},
    contactnum  :   {type: Number},
    replies     :   {type: [String], default : []},
    restaurants :   {type: [restaurantSchema], default: []}
},{ versionKey: false});

const replyModel = mongoose.model('replies', replySchema);
const reviewModel = mongoose.model('reviews', reviewSchema);
const restaurantModel = mongoose.model('restaurants', restaurantSchema);
const userModel = mongoose.model('users', userSchema);
const ownerModel = mongoose.model('owners', ownerSchema);

module.exports = {
    replyModel,
    reviewModel,
    restaurantModel,
    userModel,
    ownerModel
}