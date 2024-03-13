const { findUserProfile, findOwnerProfile, UserProfileEdit, OwnerProfileEdit } = require('../Model/profileModel');

function add(server) {
    server.get('/user-profile', async (req, resp) => {
        try {
            await findUserProfile(req, resp, 'profile', false);
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });

    server.get('/owner-profile', async (req, resp) => {
        try {
            await findOwnerProfile(req, resp, 'profile', true);
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });


    server.get('/edit-user-profile', async (req, resp) => {
        try {
            await UserProfileEdit(req, resp, 'editprofile');
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });

    server.get('/edit-owner-profile', async (req, resp) => {
        try {
            await OwnerProfileEdit(req, resp, 'editprofile');
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });
}

module.exports = {
    add
};
