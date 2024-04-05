const { findUserProfile, findOwnerProfile, findUserProfileEdit, 
    UserProfileEdit, findOwnerProfileEdit, OwnerProfileEdit, 
    getResto, getRestoEdit, 
    addRestaurant, editRestaurant, deleteRestaurant,
    addFriend, deleteFriend} = require('../Model/profileModel');

function add(server) {
    
// ALL GETS

    server.get('/user-profile/:username', async (req, resp) => {
        try {
            await findUserProfile(req, resp, 'profile');
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });

    server.get('/user-profile/:username/edit-user-profile', async (req, resp) => {
        try {
            await findUserProfileEdit(req, resp);
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });

    server.get('/owner-profile/:username/edit-owner-profile', async (req, resp) => {
        try {
            await findOwnerProfileEdit(req, resp);
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

    server.get('/owner-profile/:username/add-restaurant', async (req, resp) => {
        try {
            await getResto(req, resp, 'addresto');
        } catch (error) {
            console.error('Error finding restaurant:', error);
            resp.status(500).send('Error finding restaurant');
        }
    });    

    server.get('/owner-profile/:username/edit-restaurant/:restoname', async (req, resp) => {
        try {
            await getRestoEdit(req, resp, 'editresto');
        } catch (error) {
            console.error('Error editing restaurant:', error);
            resp.status(500).send('Error editing restaurant');
        }
    });

    server.get('/owner-profile/:username/delete-restaurant/:restoname', async (req, resp) => {
        try {
            await getRestoEdit(req, resp, 'deleteresto');
        } catch (error) {
            console.error('Error editing restaurant:', error);
            resp.status(500).send('Error editing restaurant');
        }
    });    

    server.get('/user-profile/:username/add-friend/:friendUsername', async (req, resp) => {
        try {
            await addFriend(req, resp);
        } catch (error) {
            console.error('Error in route handler:', error);
            resp.status(500).send("Internal Server Error");
        }
    }); 

    server.get('/user-profile/:username/delete-friend/:friendUsername', async (req, resp) => {
        try {
            await deleteFriend(req, resp);
        } catch (error) {
            console.error('Error deleting friend:', error);
            resp.status(500).send('Error deleting friend');
        }
    });    

// ALL POSTS

    server.post('/user-profile/:username/edit-user-profile', async (req, resp) => {
        try {
            await UserProfileEdit(req, resp);
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });

    server.post('/owner-profile/:username/edit-owner-profile', async (req, resp) => {
        try {
            await OwnerProfileEdit(req, resp);
        } catch (error) {
            console.error('Error getting profile:', error);
            resp.status(500).send('Error getting profile');
        }
    });

    server.post('/owner-profile/:username/add-restaurant', async (req, resp) => {
        try {
            await addRestaurant(req, resp);
        } catch (error) {
            console.error('Error adding restaurant:', error);
            resp.status(500).send('Error adding restaurant');
        }
    });    

    server.post('/owner-profile/:username/edit-restaurant/:restoname', async (req, resp) => {
        try {
            await editRestaurant(req, resp);
        } catch (error) {
            console.error('Error editing restaurant:', error);
            resp.status(500).send('Error editing restaurant');
        }
    });    

    server.post('/owner-profile/:username/delete-restaurant/:restoname', async (req, resp) => {
        try {
            await deleteRestaurant(req, resp);
        } catch (error) {
            console.error('Error editing restaurant:', error);
            resp.status(500).send('Error editing restaurant');
        }
    });    

    

}

module.exports = {
    add
};
