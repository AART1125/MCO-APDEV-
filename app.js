const express = require("express"); // express server
const server = express();

const bodyParser = require("body-parser"); // body-parser
server.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
server.use(express.json({ limit: "50mb" }));

const handlebars = require("express-handlebars"); // handlebars compatability
server.set("view engine", "hbs");
server.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
  })
);

server.use(express.static("public")); // static fils in public folder

const fs = require("fs"); // File System
const path = require("path"); // Paths System
server.use("/assets", express.static(path.join(__dirname, "assets")));

function getControllerPaths(pathname = "./Controller") {
  // function to get controllers
  let array = [];

  try {
    const files = fs.readdirSync(pathname);
    files.forEach(file => {
      array.push(file);
    });
  } catch (err) {
    console.error("error", err);
  }

  return array;
}

let controllerPaths = getControllerPaths();

for (let path of controllerPaths) {
  console.log("Processing Controllers: " + path);
  const controller = require("./Controller/" + path);

  for (const [key, value] of Object.entries(controller)) {
    console.log("Processing Controllers: " + key);
    controller[key](server); //add server to controllers
  }
  //   controller.add(server); //add server to controllers
}

const port = process.env.PORT | 3000;
server.listen(port, function () {
  console.log("Listening at port " + port);
});
