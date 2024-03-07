function add(server){
    server.get('/',(req, resp) => {
        resp.render('main',{
            layout  :   'index',
            title   :   'Archer\'s Hunts | Login',
            js      :   '../public/common/main.js',
            css     :   '../public/common/main.css',
            islogin :   false
        });
    });
}

module.exports = {
    add
}