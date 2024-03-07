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

const fs = require('fs'); // File System
const path = require('path'); // Paths System

function getControllerPaths(pathname = './Controller'){ // function to get controllers
    let array = []
    
    try{
        const files = fs.readdirSync(pathname);
        files.forEach(file => {
            array.push(file);
        })
    }catch(err){
        console.error('error',err);
    }

    return array;
}

function getJSPaths(pathname = './public/common'){ // function to get js files
    let array = []

    fs.readdir(pathname, (err, files) => {
        if (err) {
            console.error('ERROR', err);
        }

        files.filter(file => path.extname(file) === '.js').forEach(file => {
            array.push(path.join(pathname,file));
        })
    });

    return array;
}

function getCSSPaths(pathname = './public/common'){ // function to get css files
    let array = []

    fs.readdir(pathname, (err, files) => {
        if (err) {
            console.error('ERROR', err);
        }

        files.filter(file => path.extname(file) === '.css').forEach(file => {
            array.push(path.join(pathname,file));
        })
    });

    return array;
}

var controllerPaths = getControllerPaths();
var jsPaths = getJSPaths();
var cssPaths = getCSSPaths(); 



for(let path of controllerPaths){
    console.log('Processing Controllers: ' + path);
    const controller = require('./Controller/' + path);
    controller.add(server);//add controllers to server
}

const port = process.env.PORT | 3000;
server.listen(port, function(){
    console.log('Listening at port '+ port);
});