const express = require('express'); // express server
const server = express();

const bodyParser = require('body-parser') // body-parser
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars'); // handlebars compatability
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

server.use(express.static('public')); // static fils in public folder

const mongoose = require('mongoose'); // Database
mongoose.connect('mongodb+srv://serverDB:server@archerhunts.lmgolam.mongodb.net/archer\'s_hunt'); // Database Link

const fs = require('fs'); // File System
const path = require('path'); // Paths System

var controllerPaths = [];// Array of paths

try{
    const files = fs.readdirSync('./Controller');
    files.forEach(file => {
        controllerPaths.push(path.join('./Controller', file));
        console.log(filepath);//check paths
    })
}catch(err){
    console.error(err);
}

for(let path of controllerPaths){
    const model = require(path);
    model.add(server);//add controllers to server
}

process.on('SIGTERM',finalClose);  //general termination signal
process.on('SIGINT',finalClose);   //catches when ctrl + c is used
process.on('SIGQUIT', finalClose); //catches other termination commands

const port = process.env.PORT | 3000;
server.listen(port, function(){
    console.log('Listening at port '+ port);
});