const establishmentsModel = require('../Model/profileModel');

// placeholder only 
function add(server) {
    server.get('/establishments', (req, res) => {
        establishmentsModel.find()
            .then(establishments => {
                res.render('establishments', { establishments: establishments });
            })
            .catch(err => {
                console.error('Error fetching establishments:', err);
                res.status(500).send('Internal Server Error');
            });
    });
}

module.exports = {
    add: add
};
