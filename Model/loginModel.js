//Database Functions
const schemas = require('./schemaModels');
const bcrypt = require('bcrypt');

async function loginToWebsite(req, resp){
    const query = {username : req.body.username, isDeleted : false};
    let response = {doesExist : true, isOwner : false};

    const user = await schemas.userModel.findOne(query);
    const owner = await schemas.ownerModel.findOne(query);

    if(user && !owner){
        bcrypt.compare(req.body.password, user.password).then(out => {
            if (!out) {
                resp.send({doesExist : false});
                console.log("Wrong Password!");
            } else {
                req.session.login_user = user._id;
                req.session.login_username = user.username;
                req.session.login_isOwner = false;
                req.session.login_id = req.sessionID;
                resp.send(response);
            }
        }).catch();

        
    
    } else if (!user && owner){
        bcrypt.compare(req.body.password, owner.password).then(out => {
            if (!out) {
                resp.send({doesExist : false});
                console.log("Wrong Password!");
            } else {
                req.session.login_user = owner._id;
                req.session.login_username = owner.username;
                req.session.login_isOwner = true;
                req.session.login_id = req.sessionID;
                console.log("Owner found!");
                resp.send({doesExist : true, isOwner : true});
            }
        }).catch();

        
    } else {
        console.log('No information in Database!');
        resp.send({doesExist : false});
        
    }

}

module.exports = {
    loginToWebsite
};