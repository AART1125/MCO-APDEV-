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

let controllerPaths = getControllerPaths(); 

for(let path of controllerPaths){
    console.log('Processing Controllers: ' + path);
    const controller = require('./Controller/' + path);
    controller.add(server);//add server to controllers
}

function finalClose(){
    console.log('Close connection at the end!');
    mongoose.connection.close();
    process.exit();
}

process.on('SIGTERM',finalClose);
process.on('SIGINT',finalClose);
process.on('SIGQUIT', finalClose);

const port = process.env.PORT | 3000;
server.listen(port, function(){
    console.log('Listening at port '+ port);
});