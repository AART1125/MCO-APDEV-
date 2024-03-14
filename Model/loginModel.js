//Database Functions
const schemas = require('./schemaModels');

async function loginToWebsite(req, resp){
    const query = {username : req.body.username, password : req.body.password};
    let response = {doesExist : true, isOwner : false};

    const user = await schemas.userModel.findOne(query);
    const owner = await schemas.ownerModel.findOne(query);

    if(user && !owner){
        req.session.login_user = user._id;
        req.session.login_username = user.username;
        req.session.login_id = req.sessionID;
        console.log("User found!");
        
    } else if (!user && owner){
        req.session.login_user = owner._id;
        req.session.login_username = owner.username;
        req.session.login_id = req.sessionID;
        console.log("Owner found!");
        response = {doesExist : true, isOwner : true};
    } else {
        console.log('No information in Database!');
        response = {doesExist : false};
    }

    resp.send(response);

}

module.exports = {
    loginToWebsite
};