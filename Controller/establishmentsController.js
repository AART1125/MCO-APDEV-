const establishmentsModel = require('../Model/establishmentsModel');

function add(server) {
    server.get('/establishments', (req, resp) => {
        establishmentsModel.initGen(req).then((dict) => {
            resp.render('establishments.hbs',{
                layout              :   'index',
                title               :   'Archer\'s Hunt',
                js                  :   '/common/js/establishments.js',
                css                 :   '/common/css/establishments.css',
                islogin             :   req.session.login_id != undefined,
                isOwner             :   req.session.login_isOwner,
                username            :   req.session.login_username,
                'search-results'    :   dict
            });
        }).catch();
    });

    server.get('/establishments-owner', (req, resp) => {
        establishmentsModel.ownerGen(req).then((dict) => {
            resp.render('establishments.hbs',{
                layout              :   'index',
                title               :   'Archer\'s Hunt',
                js                  :   '/common/js/establishments.js',
                css                 :   '/common/css/establishments.css',
                islogin             :   req.session.login_id != undefined,
                isOwner             :   req.session.login_isOwner,
                username            :   req.session.login_username,
                islogin             :   true,
                isOwner             :   true,
                'search-results'    :   dict
            });
        }).catch();
    });

    server.get('/search', (req, resp) => {
        establishmentsModel.search(req.query.query).then((dict) => {
            resp.render('establishments.hbs',{
                layout              :   'index',
                title               :   'Archer\'s Hunt',
                js                  :   '/common/js/establishments.js',
                css                 :   '/common/css/establishments.css',
                islogin             :   req.session.login_id != undefined,
                isOwner             :   req.session.login_isOwner,
                username            :   req.session.login_username,
                'search-results'    :   dict,
                isEmpty             :   dict.length === 0
            });
        }).catch()
    });

    server.get('/search/:foodtype', (req, resp) => {
        establishmentsModel.searchFoodType(req.params.foodtype).then((dict) => {
            resp.render('establishments.hbs',{
                layout              :   'index',
                title               :   'Archer\'s Hunt',
                js                  :   '/common/js/establishments.js',
                css                 :   '/common/css/establishments.css',
                islogin             :   req.session.login_id != undefined,
                isOwner             :   req.session.login_isOwner,
                username            :   req.session.login_username,
                'search-results'    :   dict,
                isEmpty             :   dict.length === 0
            });
        }).catch()
    });
};

module.exports = {
    add
};