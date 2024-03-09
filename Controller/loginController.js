const loginModel = require('../Model/loginModel');

function add(server){
    server.post('/post-login', (req, resp) => {
        loginModel.loginToWebsite(req, resp);
    });

    server.get('/main-user', (req,resp) => {
        resp.render('main',{
            layout      :   'index',
            title       :   'Archer\'s Hunt',
            js          :   '/common/js/main.js',
            css         :   '/common/css/main.css',
            islogin     :   true,
            isOwner     :   false
        });
    });

    server.get('/main-owner', (req,resp) => {
        resp.render('main',{
            layout      :   'index',
            title       :   'Archer\'s Hunt',
            js          :   '/common/js/main.js',
            css         :   '/common/css/main.css',
            islogin     :   true,
            isOwner     :   true
        });
    });
}

module.exports = {
    add
}