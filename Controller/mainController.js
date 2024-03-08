function add(server){
    server.get('/',(req, resp) => {
        resp.render('main',{
            layout  :   'index',
            title   :   'Archer\'s Hunts',
            js      :   '../public/common/js/main.js',
            css     :   '../public/common/css/main.css',
            islogin :   false
        });
    });
    
    server.get('/login',(req, resp) => {
        resp.render('Login', {
            layout  :   'index',
            title   :   'Archer\'s Hunts | Login',
            js      :   '../public/common/js/Login.js',
            css     :   '../public/common/css/Login.css',
        })
    });

    server.get('/establishments',(req, resp) => {
        resp.render('Establishments', {
            layout  :   'index',
            title   :   'Archer\'s Hunts | Listings',
            js      :   '../public/common/js/Establishments.js',
            css     :   '../public/common/css/Establishments.css',
        })
    });
}

module.exports = {
    add
}