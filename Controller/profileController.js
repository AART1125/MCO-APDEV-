const profileDB = require('../Model/profileModel');

function add(server) {
    server.post('/user-profile', (req, resp) => {
        console.log(req.body.owner);
        profileDB.findUserProfile(req, resp);
        resp.redirect("/user-profile");
    });

    server.get('/user-profile', (req, resp) => {
        resp.render('profile', {
            layout: 'index',
            title: 'Archer\'s Hunt',
            js: '/common/js/profileFunc.js',
            css: '/common/css/profile.css',
            islogin: true,
            isUser: true
        });
    });

    server.get('/user-profile/:username', (req, resp) => {
        resp.render('profile', {
            layout: 'index',
            title: 'Archer\'s Hunt',
            js: '/common/js/profileFunc.js',
            css: '/common/css/profile.css',
            islogin: true,
            isUser: true
        });
    });

    server.post('/user-profile/:username', (req, resp) => {
        
    });

    server.post('/user-profile/:username/edit-profile', (req, resp) => {
        resp.render('profile', {
            layout: 'index',
            title: 'Archer\'s Hunt',
            js: '/common/js/profileFunc.js',
            css: '/common/css/profile.css',
            islogin: true,
            isUser: true
        });
    });

    server.get('/owner-profile', (req, resp) => {
        resp.render('profile', {
            layout: 'index',
            title: 'Archer\'s Hunt',
            js: '/common/js/profileFunc.js',
            css: '/common/css/profile.css',
            islogin: true,
            isOwner: true
        });
    });
}

module.exports = {
    add
};
