const profileDB = require('../Model/profileModel');

function add(server) {
    server.post('/user-profile', (req, resp) => {
        profileDB.findProfile(req, resp);
        resp.redirect("/user-profile");
    });

    server.get('/user-profile', (req, resp) => {
        resp.render('main', {
            layout: 'index',
            title: 'Archer\'s Hunt',
            js: '/common/js/mainFunc.js',
            css: '/common/css/main.css',
            islogin: true,
            isUser: true
        });
    });

    server.get('/owner-profile', (req, resp) => {
        resp.render('main', {
            layout: 'index',
            title: 'Archer\'s Hunt',
            js: '/common/js/mainFunc.js',
            css: '/common/css/main.css',
            islogin: true,
            isOwner: true
        });
    });
}

module.exports = {
    add
};
