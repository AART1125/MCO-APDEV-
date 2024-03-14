const restaurantModel = require('../Model/restaurantModel'); 

function add(server) {
    server.get('/restaurant/:restoname', async (req, resp) => {
        try {
            const [restodata, reviewdata] = await restaurantModel.getSpecificRestaurantData(req.params.restoname);
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
};
