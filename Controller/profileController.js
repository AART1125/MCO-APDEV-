const { findUserProfile, findOwnerProfile, UserProfileEdit, OwnerProfileEdit, deleteUserProfile, deleteOwnerProfile } = require('../model/profileModel');

function add(server) {
    
    server.get('/user-profile/:username', async (req, resp) => {
        try {
            await findUserProfile(req, resp, 'profile');
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });

    // server.get('/other-profile/:username', async (req, resp) => {
    //     try {
    //         await findUserProfile(req, resp, 'otherprofile');
    //     } catch (error) {
    //         console.error('Error getting profile:', error);
    //         resp.status(500).send('Error getting profile');
    //     }
    // });

    server.get('/user-profile/:username/edit-user-profile', async (req, resp) => {
        try {
            await UserProfileEdit(req, resp, 'editprofile');
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });

    server.get('/user-profile/:username/edit-owner-profile', async (req, resp) => {
        try {
            await OwnerProfileEdit(req, resp, 'editprofile');
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });

    server.get('/owner-profile/:username', async (req, resp) => {
        try {
            await findOwnerProfile(req, resp, 'profile');
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });
}

module.exports = {
    add
};
