const establishmentsModel = require('../Model/establishmentsModel');

function add(server) {
    server.get('/establishments', (req, resp) => {
        establishmentsModel.initGen().then((dict) => {
            resp.render('establishments',{
                layout              :   'index',
                title               :   'Archer\'s Hunt',
                js                  :   '/common/js/establishments.js',
                css                 :   '/common/css/establishments.css',
                islogin             :   false,
                isOwner             :   false,
                'search-results'    :   dict
            });
        }).catch();
    });

    server.get('/search', (req, resp) => {
        establishmentsModel.search(req.query.searchlist).then((dict) => {
            resp.render('establishments',{
                layout              :   'index',
                title               :   'Archer\'s Hunt',
                js                  :   '/common/js/establishments.js',
                css                 :   '/common/css/establishments.css',
                islogin             :   false,
                isOwner             :   false,
                'search-results'    :   dict,
                isEmpty             :   dict.length === 0
            });
        }).catch()
    });

    server.get('/search/:foodtype', (req, resp) => {
        establishmentsModel.searchFoodType(req.params.foodtype).then((dict) => {
            resp.render('establishments',{
                layout              :   'index',
                title               :   'Archer\'s Hunt',
                js                  :   '/common/js/establishments.js',
                css                 :   '/common/css/establishments.css',
                islogin             :   false,
                isOwner             :   false,
                'search-results'    :   dict,
                isEmpty             :   dict.length === 0
            });
        }).catch()
    });
};

module.exports = {
    add
};