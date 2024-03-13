//Database Functions
const schemas = require('./schemaModels');

async function loginToWebsite(req, resp){
    const query = {username : req.body.username, password : req.body.password};
    let response = {doesExist : true, isOwner : false};

    const user = await schemas.userModel.findOne(query);
    const owner = await schemas.ownerModel.findOne(query);

    if(user && !owner){
        console.log("User found!");
        
    } else if (!user && owner){
        console.log("Owner found!");
        response = {doesExist : true, isOwner : true};
    } else {
        console.log('No information in Database!');
        response = {doesExist : false, isOwner : false};
    }

    resp.send(response);

}

module.exports = {
    loginToWebsite
};