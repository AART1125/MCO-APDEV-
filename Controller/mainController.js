//server specific functions

function add(server){
    server.get('/',(req, resp) => {
        resp.render('main',{
            layout  :   'index',
            title   :   'Archer\'s Hunts',
            js      :   '../common/js/mainFunc.js',
            css     :   '../common/css/main.css',
            islogin :   false
        });
    });
    
    server.get('/login',(req, resp) => {
        resp.render('login', {
            layout  :   'index',
            title   :   'Archer\'s Hunts | Login',
            js      :   '..common/js/Login.js',
            css     :   '..common/css/Login.css',
        })
    });

    server.get('/establishments',(req, resp) => {
        resp.render('Establishments', {
            layout  :   'index',
            title   :   'Archer\'s Hunts | Listings',
            js      :   '..common/js/Establishments.js',
            css     :   '..common/css/Establishments.css',
        })
    });

    server.get('/profile',(req, resp) => {
        resp.render('Profile', {
            layout  :   'index',
            title   :   'Archer\'s Hunts | Profile',
            js      :   '..common/js/profile.js',
            css     :   '..common/css/profile.css',
        })
    });
}

module.exports = {
    add
}