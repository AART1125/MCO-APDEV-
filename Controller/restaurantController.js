const restaurantModel = require('../Model/restaurantModel'); 

function add(server) {
    server.get('/restaurant/:restoname', async (req, resp) => {
        try {
            const [restodata, reviewdata] = await restaurantModel.getSpecificRestaurantData(req.params.restoname, req);
            console.log(reviewdata);
            if (restodata) {
                resp.render('restaurant', {
                    layout: 'index',
                    title: 'Archer\'s Hunt',
                    js: '/common/js/restaurant.js', 
                    css: '/common/css/restaurant.css', 
                    islogin: req.session.login_id != undefined,
                    isOwner: req.session.login_isOwner,
                    username: req.session.login_username,
                    restaurant: restodata,
                    reviewsdata: reviewdata,
                    isReviewEmpty: reviewdata.length === 0
                });
            } else {
                resp.status(404).send('Restaurant not found'); 
            }
        } catch (error) {
            console.error('Error in /restaurant/:restoname route:', error);
            resp.status(500).send('Internal Server Error');
        }
    });

    server.get('/restaurant/:restoname/editreview', (req,resp) => {
        resp.render('editreview', {
            layout: 'index',
            title: 'Edit a Review',
            js: '/common/js/editreview.js',
            css: '/common/css/review.css',
            islogin: req.session.login_id != undefined,
            isOwner: req.session.login_isOwner,
            username: req.session.login_username,
        });
    });

    server.post('/restaurant/:restoname/post-replies', (req,resp) => {
        console.log('Connection Successful 1');
        review.addReply(req,resp);
    });
}

module.exports = {
    add
};
