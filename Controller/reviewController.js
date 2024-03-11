const review = require('../Model/reviewModel');

function add(server) {
    server.get('/restaurant/:restoname/review', (req,resp) => {
        resp.render('review', {

        });
    })
}

module.exports = {
    add
}