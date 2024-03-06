const userSchema = new mongoose.Schema({
    user : {type:'string'},
    pass : {type:'string'}
},{ versionKey: false });

const userModel = mongoose.model('users', userSchema);

function loginToWebsite(){
    const query = {user : req.body.user, pass : req.body.pass};

    userModel.findOne(query).then((login) => {
        console.log('Finding user');
        if (login != undefined && login._id != null) {
            resp.render('result',{
                layout      :   'index',
                title       :   'Result page',
                islogin     :   true,
                username    :   req.body.user,
                password    :   req.body.pass
            });
        } else {
            window.alert('Wrong Password or Username');
        };

    }).catch(errorFn)
}

module.exports = {
    loginToWebsite
};