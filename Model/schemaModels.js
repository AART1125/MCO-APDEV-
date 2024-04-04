const mongoose = require('mongoose'); // Database
const bcrypt = require("bcrypt");

const replySchema = new mongoose.Schema({
    owner_id    :   {type: mongoose.Types.ObjectId, ref: 'owners'},
    resto_id    :   {type: mongoose.Types.ObjectId, ref: 'restaurants'},
    reviewofR   :   {type: mongoose.Types.ObjectId, ref: 'reviews'},
    reply       :   {type: String, default: ""},
    datemade    :   {type: Date, default: Date.now},
    isDeleted   :   {type: Boolean, default: false}
},{versionKey: false})

const reviewSchema = new mongoose.Schema({
    reviewnum   :   {type: Number},
    users_id    :   {type: mongoose.Types.ObjectId, ref: 'users'},
    restaurant  :   {type: String, ref: 'restaurants'},
    restoimg    :   {type: String},
    review      :   {type: String},
    likes       :   {type: Object, default: 0},
    dislikes    :   {type: Object, default: 0},
    reply       :   {type: mongoose.Schema.ObjectId, ref: 'replies'},
    isRecommend :   {type: Boolean},
    datemade    :   {type: Date, default: Date.now},
    isDeleted   :   {type: Boolean, default: false}
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
    stars           :   {type: Number, default: 0},
    reviews         :   {type: [mongoose.Types.ObjectId], ref: 'reviews'},
    isDeleted       :   {type: Boolean, default: false}
},{versionKey: false});

const userSchema = new mongoose.Schema({
    profileimg  :   {type: String},
    fullname    :   {type: String},
    username    :   {type: String,
                    required: true,
                    unique: true},
    password    :   {type: String,
                    required: true},
    email       :   {type: String,
                    required: true},
    contactnum  :   {type: Number},
    likedresto  :   {type: [String], default : []}, //names
    preferences :   {
        isLike      : { type: [String], default: [] }, 
        isDislike   : { type: [String], default: [] } 
    },
    reviews     :   {type: [mongoose.Types.ObjectId], ref: 'reviews'},
    friends     :   {type: [mongoose.Types.ObjectId], ref: 'users'},
    isDeleted   :   {type: Boolean, default: false}
},{versionKey: false});

const ownerSchema = new mongoose.Schema({
    profileimg  :   {type: String},
    fullname    :   {type: String},
    username    :   {type: String},
    password    :   {type: String},
    email       :   {type: String},
    contactnum  :   {type: Number},
    // contactinfo : {
    //     title       : { type: [String], default: [] }, 
    //     links       : { type: [String], default: [] } 
    // },
    contactinfo :   {type : [Object], default: []},
    replies     :   {type: [mongoose.Types.ObjectId], ref: 'replies'},
    restaurants :   {type: [mongoose.Types.ObjectId], ref: 'restaurants'},
    isDeleted   :   {type: Boolean, default: false}
},{versionKey: false});

const replyModel = mongoose.model('replies', replySchema);
const reviewModel = mongoose.model('reviews', reviewSchema);
const restaurantModel = mongoose.model('restaurants', restaurantSchema);
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash; // Update the 'password' field, not 'user.password'
    next();
  } catch (err) {
    return next(err);
  }
});
ownerSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash; // Update the 'password' field, not 'user.password'
    next();
  } catch (err) {
    return next(err);
  }
});
const userModel = mongoose.model('users', userSchema);
const ownerModel = mongoose.model('owners', ownerSchema);

module.exports = {
    replyModel,
    reviewModel,
    restaurantModel,
    userModel,
    ownerModel,
}
