const schemas = require('./schemaModels');

function loginToWebsite(req, resp){
    const query = {username : req.body.user, password : req.body.pass};

    var found = true;

    schemas.userModel.findOne(query).then((login) => {
        console.log('Finding user');
        if (login != undefined && login._id != null) {
            resp.render('main',{
                layout      :   'index',
                title       :   'Archer\'s Hunt',
                js          :   '../public/common/js/main.js',
                css         :   '../public/common/css/main.css',
                islogin     :   true,
                isOwner     :   false
            });
        } else {
            console.log('User Not Found');
            found = false;
        };
    }).catch(errorFn)

    if (!found) {
        schemas.ownerModel.findOne(query).then((login) => {
            console.log('Finding owner');
            if (login != undefined && login._id != null) {
                resp.render('main',{
                    layout      :   'index',
                    title       :   'Archer\'s Hunt',
                    js          :   '../public/common/js/main.js',
                    css         :   '../public/common/css/main.css',
                    islogin     :   true,
                    isOwner     :   true
                });
            } else {
                console.log('Owner Not Found');
                const response = {doesExist : false}
                resp.send(response);
            };
        }).catch(errorFn)
    }
}

module.exports = {
    loginToWebsite
};