//Database Functions
const schemas = require('./schemaModels');


function loginToWebsite(req, resp){
    const query = {username : req.body.username, password : req.body.password};
    let response = {doesExist : true, isOwner : false};

    console.log('Trying to Login');
    schemas.userModel.findOne(query).then((login) => {
        console.log('Finding user');
        if (login != undefined && login._id != null) {
            console.log("User found!");
            resp.send(response);
        } else {
            console.log("User not found!");
            schemas.ownerModel.findOne(query).then((owner) => {
                console.log('Finding owner');
                if (owner != undefined && owner._id != null) {
                    console.log("Owner found!");
                    response = {doesExist : true, isOwner : true};
                    resp.send(response);
                } else {
                    console.log('Owner not found!');
                    console.log('No information in Database!');
                    response = {doesExist : false};
                    resp.send(response);
                };
            }).catch();
        };
    }).catch();
}

module.exports = {
    loginToWebsite
};