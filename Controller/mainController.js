//server specific functions

function add(server){
    // server.get('/',(req, resp) => {
    //     resp.render('main',{
    //         layout  :   'index',
    //         title   :   'Archer\'s Hunts',
    //         js      :   '../public/common/js/main.js',
    //         css     :   '../public/common/css/main.css',
    //         islogin :   false,
    //         isOwner :   false
    //     });
    // });
    
    server.get('/login',(req, resp) => {
        resp.render('login', {
            layout  :   'index',
            title   :   'Archer\'s Hunts | Login',
            js      :   '../public/common/js/loginFunc.js',
            css     :   '/common/css/login.css',
        });
    });

    server.get('/establishments',(req, resp) => {
        resp.render('Establishments', {
            layout  :   'index',
            title   :   'Archer\'s Hunts | Listings',
            js      :   '/common/js/Establishments.js',
            css     :   '/common/css/Establishments.css',
        });
    });
}

module.exports = {
    add
}