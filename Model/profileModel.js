const schemas = require('./schemaModels');

function findProfile(req, resp) {
    const query = req.body.user;

    schemas.userModel.findOne(query)
        .then(user => {
            console.log('Finding user');
            if (!user) {
                return schemas.ownerModel.findOne(query)
                    .then(owner => {
                        console.log('Finding owner');
                        if (!owner) {
                            console.log('Account not found');
                            return resp.status(404).send('User or owner not found');
                        } else {
                            resp.render('profile', {
                                layout: 'index',
                                title: 'Archer\'s Hunt | Profile',
                                js: '../common/profile.js',
                                css: '../common/profile.css',
                                islogin: true,
                                isOwner: true,
                                user: user
                            });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        resp.status(500).send('Internal Server Error');
                    });
            } else {
                resp.render('profile', {
                    layout: 'index',
                    title: 'Archer\'s Hunt | Profile',
                    js: '../common/profile.js',
                    css: '../common/profile.css',
                    islogin: true,
                    isUser: true,
                    user: user
                });
            }
        })
        .catch(error => {
            console.error(error);
            resp.status(500).send('Internal Server Error');
        });
}

module.exports = {
    findProfile
};
