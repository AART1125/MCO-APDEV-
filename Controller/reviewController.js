const review = require('../Model/reviewModel');

function add(server) {
    server.get('/restaurant/:restoname/reviews', (req,resp) => {
        resp.render('review', {
            layout: 'index',
            title: 'Leave a Review',
            js: '/common/js/review.js',
            css: '/common/css/review.css'
        });
    });
}

module.exports = {
    add
}