const schemas = require('./schemas');

function loginToWebsite(req, resp){
    const query = {username : req.body.user, password : req.body.pass};

    schemas.userModel.findOne(query).then((login) => {
        console.log('Finding user');
        if (login != undefined && login._id != null) {
            resp.render('/main',{
                layout      :   'index',
                title       :   'Archer\'s Hunt',
                islogin     :   true,
            });
        } else {
            const response = {isSame : false};
            resp.send(response);
        };

    }).catch(errorFn)
}

module.exports = {
    loginToWebsite
};