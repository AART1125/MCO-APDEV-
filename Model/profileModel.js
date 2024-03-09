const schemas = require('./schemaModels');

// to fix pa

function findProfile(req, resp) {
    const { username } = req.body;

    schemas.userModel.findOne({ username })
        .then(user => {
            if (!user) {
                return resp.status(404).send('User not found');
            }

            resp.render('profile', {
                layout: 'index',
                title: 'User Profile',
                js          :   '../common/profile.js',
                css         :   '../common/profile.css',
                user: user,
            });
        })
        .catch(error => {
            console.error(error);
            resp.status(500).send('Internal Server Error');
        });
}

module.exports = {
    findProfile
};