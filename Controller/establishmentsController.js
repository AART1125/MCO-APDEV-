const establishmentsModel = require('../Model/establishmentsModel');

// placeholder only 
function add(server) {
    server.get('/establishments', (req, resp) => {
        const dict = establishmentsModel.initGen()
        resp.render('establishments',{
            layout              :   'index',
            title               :   'Archer\'s Hunt',
            js                  :   '/common/js/main.js',
            css                 :   '/common/css/main.css',
            islogin             :   true,
            isOwner             :   false,
            'search-results'    :   dict
        });
    });
}

module.exports = {
    add
};
