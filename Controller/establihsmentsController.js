const establishmentsModel = require('../Model/establishmentsModel');

function add(server) {

    server.get('/establishments', (req, resp) => {
        establishmentsModel.initGen().then((dict) => {
            resp.render('establishments',{
                layout              :   'index',
                title               :   'Archer\'s Hunt',
                js                  :   '/common/js/establishments.js',
                css                 :   '/common/css/establishments.css',
                islogin             :   true,
                isOwner             :   false,
                'search-results'    :   dict
            });
        }).catch();
    });
}

module.exports = {
    add
};