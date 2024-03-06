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

function getControllerPaths(pathname = './Controller'){
    let array = []
    try{
        const files = fs.readdirSync(pathname);
        files.forEach(file => {
            array.push(path.join(pathname, file));
            console.log(array);//check paths
        })
    }catch(err){
        console.error(err);
    }

    return array;
}

function getJSPaths(pathname = './public/common'){
    let array = []

    fs.readdir(pathname, (err, files) => {
        if (err) {
            console.error('ERROR', err);
        }

        files.filter(file => path.extname(file) === '.js').forEach(file => {
            array.push(path.join(pathname,file));
            console.log(array);
        })
    });
}

function getCSSPaths(pathname = './public/common'){
    let array = []

    fs.readdir(pathname, (err, files) => {
        if (err) {
            console.error('ERROR', err);
        }

        files.filter(file => path.extname(file) === '.css').forEach(file => {
            array.push(path.join(pathname,file));
            console.log(array);
        })
    });
}

var controllerPaths = getControllerPaths();
var jsPaths = getJSPaths();
var cssPaths = getCSSPaths(); 



for(let path of controllerPaths){
    const controller = require(path);
    controller.add(server);//add controllers to server
}

process.on('SIGTERM',finalClose);  //general termination signal
process.on('SIGINT',finalClose);   //catches when ctrl + c is used
process.on('SIGQUIT', finalClose); //catches other termination commands

const port = process.env.PORT | 3000;
server.listen(port, function(){
    console.log('Listening at port '+ port);
});