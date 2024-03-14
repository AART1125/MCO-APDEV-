const mongoose = require('mongoose'); // Database
mongoose.connect('mongodb+srv://serverDB:server@archerhunts.lmgolam.mongodb.net/archer\'s_hunt'); // Database Link

const replySchema = new mongoose.Schema({
    owner_id    :   {type: mongoose.Types.ObjectId, ref: 'owners'},
    resto_id    :   {type: mongoose.Types.ObjectId, ref: 'restaurants'},
    reviewofR   :   {type: mongoose.Types.ObjectId, ref: 'reviews'},
    reply       :   {type: String},
    datemade    :   {type: Date}
},{versionKey: false})

const reviewSchema = new mongoose.Schema({
    users_id    :   {type: mongoose.Types.ObjectId, ref: 'users'},
    restaurant  :   {type: String, ref: 'restaurants'},
    restoimg    :   {type: String},
    review      :   {type: String},
    likes       :   {type: Number, default: 0},
    dislikes    :   {type: Number, default: 0},
    reply       :   {type: mongoose.Schema.ObjectId, ref: 'replies'},
    isRecommend :   {type: Boolean},
    datemade    :   {type: Date, default: null}
},{versionKey: false});

const restaurantSchema = new mongoose.Schema({
    restoimg        :   {type: [String]}, 
    restoimg2       :   {type: [String]},
    restoname       :   {type: String},
    restodesc       :   {type: String},
    location        :   {type: String},
    address         :   {type: String},
    openingHours    :   {type: String},
    owner_id        :   {type: mongoose.Types.ObjectId, ref: 'owners'},
    contactnum      :   {type: Number},
    foodtype        :   {type: [String]},
    restotype       :   {type: String},
    address         :   {type: String},
    likes           :   {type: Number, default: 0},
    dislikes        :   {type: Number, default: 0},
    stars           :   {type: Number, default: 0},
    reviews         :   {type: [mongoose.Types.ObjectId], ref: 'reviews'}
},{versionKey: false});

const userSchema = new mongoose.Schema({
    profileimg  :   {type: String},
    fullname    :   {type: String},
    username    :   {type: String},
    password    :   {type: String},
    email       :   {type: String},
    contactnum  :   {type: Number},
    likedresto  :   {type: [String], default : []}, //names
    preferences : {
        isLike      : { type: [String], default: [] }, 
        isDislike   : { type: [String], default: [] } 
    },
    reviews     :   {type: [mongoose.Types.ObjectId], default : [], ref: 'reviews'},
    friends     :   {type: [mongoose.Types.ObjectId], default : []}
},{versionKey: false});

const ownerSchema = new mongoose.Schema({
    profileimg  :   {type: String},
    fullname    :   {type: String},
    username    :   {type: String},
    password    :   {type: String},
    email       :   {type: String},
    contactnum  :   {type: Number},
    contactinfo : {
        title       : { type: [String], default: [] }, 
        links       : { type: [String], default: [] } 
    },
    replies     :   {type: [mongoose.Types.ObjectId], default : []},
    restaurants :   {type: [mongoose.Types.ObjectId], default: []}
},{versionKey: false});

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
