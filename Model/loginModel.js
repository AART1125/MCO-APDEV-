//Database Functions
const schemas = require('./schemaModels');
const bcrypt = require('bcrypt');

async function loginToWebsite(req, resp){
    const query = {username : req.body.username};
    let response = {doesExist : true, isOwner : false};

    const user = await schemas.userModel.findOne(query);
    const owner = await schemas.ownerModel.findOne(query);

    if(user && !owner){
        const out = bcrypt.compare(req.body.password, user.password);

        if (!out) {
            console.log("Wrong Password!");
        } else {
            req.session.login_user = user._id;
            req.session.login_username = user.username;
            req.session.login_isOwner = false;
            req.session.login_id = req.sessionID;
            console.log("Status: Success");
        }
    
    } else if (!user && owner){
        const out = bcrypt.compare(req.body.password, owner.password);

        if (!out) {
            console.log("Wrong Password!");
        } else {
            req.session.login_user = owner._id;
            req.session.login_username = owner.username;
            req.session.login_isOwner = true;
            req.session.login_id = req.sessionID;
            console.log("Owner found!");
            response = {doesExist : true, isOwner : true};
        }
    } else {
        console.log('No information in Database!');
        response = {doesExist : false};
    }

    resp.send(response);

}

module.exports = {
    loginToWebsite
};