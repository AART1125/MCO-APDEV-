const { findUserProfile, findOwnerProfile, UserProfileEdit, OwnerProfileEdit, deleteUserProfile, deleteOwnerProfile } = require('../Model/profileModel');

function add(server) {
    server.get('/user-profile/:username', async (req, resp) => {
        try {
            await findUserProfile(req, resp, 'profile', false);
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });

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

    server.get('/user-profile/:username/delete-user-account', async (req, resp) => {
        try {
            await deleteUserProfile(req, resp, 'delete_account', false);
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });

    server.get('/user-profile/:username/delete-owner-account', async (req, resp) => {
        try {
            await deleteOwnerProfile(req, resp, 'delete_account', true);
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });

    // server.get('/user-profile/:username', (req, resp) => {
    //     resp.render('profile', {
    //         layout: 'index',
    //         title: 'Archer\'s Hunt',
    //         js: '/common/js/profileFunc.js',
    //         css: '/common/css/profile.css',
    //         islogin: true,
    //         isUser: true
    //     });
    // });

    // server.post('/user-profile/:username', (req, resp) => {
        
    // });

    // server.post('/user-profile/:username/edit-profile', (req, resp) => {
    //     resp.render('profile', {
    //         layout: 'index',
    //         title: 'Archer\'s Hunt',
    //         js: '/common/js/profileFunc.js',
    //         css: '/common/css/profile.css',
    //         islogin: true,
    //         isUser: true
    //     });
    // });

    server.get('/owner-profile', async (req, resp) => {
        try {
            await findOwnerProfile(req, resp, 'profile', true);
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });
}

module.exports = {
    add
};
