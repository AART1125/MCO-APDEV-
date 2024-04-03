const Entity = require("../Model/schemaModels");
const fs = require("fs");

function add(server) {
  server.get("/register", (req, res) => {
    res.render("register", {
      layout: "index",
      title: "Archer's Hunts",
      js: "/common/js/register.js",
      css: "/common/css/register.css",
      islogin: false,
    });
  });

  server.get("/deleteProfile/:id", (req, resp) => {
    resp.render("delete_account", {
      layout: "index",
      title: "Archer's Hunts",
      islogin: req.session.login_id != undefined,
      isOwner: req.session.login_isOwner,
      username: req.session.login_username,
      js: "/common/js/delete_account.js",
      css: "/common/css/delete_account.css",
      islogin: false,
    });
  });

  server.post("/register", (req, res) => {
    console.log(req.body.role);
    if (req.body.role === "owner") {
      Entity.ownerModel
        .create(req.body)
        .then(item => {
          const url = `/common/assets/avatars/owner`;
          if (!fs.existsSync(url)) {
            fs.mkdirSync(url, { recursive: true });
          }
          try {
            fs.writeFileSync(
              `${url}/${item.email}.png`,
              req.body.base64,
              "base64"
            );
          } catch (error) {}
          res.status(201).json({
            success: "Created Successfully",
            isOwner: true,
            payload: item,
          });
        })
        .catch(error => res.status(400).json({ error: error }));
    } else {
      Entity.userModel
        .create(req.body)
        .then(item => {
          const url = `/common/assets/avatars/users`;
          if (!fs.existsSync(url)) {
            fs.mkdirSync(url, { recursive: true });
          }
          try {
            fs.writeFileSync(
              `${url}/${item.email}.png`,
              req.body.base64,
              "base64"
            );
          } catch (error) {}
          res.status(201).json({
            success: "Created Successfully",
            isOwner: false,
            payload: item,
          });
        })
        .catch(error => res.status(400).json({ error: error }));
    }
  });
  server.delete("/deleteProfile/:id", async (req, res) => {
    const user = Entity.userModel.findById(req.params.id);
    if (user) {
      await Entity.userModel
        .findByIdAndUpdate(
          req.params.id,
          { deleted: true },
          {
            new: true,
          }
        )
        .then(() => {
          res.status(204).json({
            status: "Deleted",
          });
        })
        .catch(() => res.status(400).json({ error: "Error" }));
    } else {
      await Entity.ownerModel
        .findByIdAndUpdate(req.params.id, { deleted: true }, { new: true })
        .then(() => {
          res.status(204).json({
            success: "Deleted",
          });
        })
        .catch(() => res.status(400).json({ error: "Error" }));
    }
  });
}

module.exports = {
  add,
};
