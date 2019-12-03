const User = require("../modals/User");
const random = require("random");
// const uuidv1 = require("uuid/v1");

module.exports = function(app) {
  app.get("/users", function(req, res) {
    console.log("get all users service call...");
    User.findAll({
      where: {}
    })
      .then(function(repoUsers) {
        res.json(repoUsers);
      })
      .catch(function(err) {
        console.log(err);
        res.setHeader(
          "resposne-description",
          "Oops, something went wrong #120."
        );
        res.statusCode = 500;
        res.end();
      });
  });
  app.get("/users/:userid", function(req, res) {
    console.log("get single user service call...");
    if (!req.params.userid) {
      res.setHeader("resposne-description", "User id is required.");
      res.statusCode = 400;
      res.end();
    } else {
      User.findOne({
        where: { userid: req.params.userid }
      })
        .then(function(repoUsers) {
          res.json(repoUsers);
        })
        .catch(function(err) {
          console.log(err);
          res.setHeader(
            "resposne-description",
            "Oops, something went wrong #121."
          );
          res.statusCode = 500;
          res.end();
        });
    }
  });
  app.post("/users", function(req, res) {
    console.log("post user service call...");
    if (!req.body.firstname) {
      res.setHeader("resposne-description", "First name is required.");
      res.statusCode = 400;
      res.end();
    } else if (!req.body.lastname) {
      res.setHeader("resposne-description", "Last name is required.");
      res.statusCode = 400;
      res.end();
    } else {
      User.create({
        userid: random.int(1, 1000) * 10 + 1000,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        phone: req.body.phone
      })
        .then(function(repoUsers) {
          res.statusCode = 201;
          res.end();
        })
        .catch(function(err) {
          console.log(err);
          res.setHeader(
            "resposne-description",
            "Oops, something went wrong #121."
          );
          res.statusCode = 500;
          res.end();
        });
    }
  });
  app.put("/users", function(req, res) {
    console.log("update user service call...");
    if (!req.body.userid) {
      res.setHeader("resposne-description", "First name is required.");
      res.statusCode = 400;
      res.end();
    } else {
      User.findOne({
        userid: req.body.userid
      })
        .then(function(repoUsers) {
          if (req.body.firstname) {
            repoUsers.firstname = req.body.firstname;
          }
          if (req.body.lastname) {
            repoUsers.lastname = req.body.lastname;
          }
          if (req.body.address) {
            repoUsers.address = req.body.address;
          }
          if (req.body.phone) {
            repoUsers.phone = req.body.phone;
          }
          repoUsers
            .save()
            .then(function(repo) {
              res.statusCode = 200;
              res.end();
            })
            .catch(function(err) {
              res.setHeader(
                "resposne-description",
                "Oops, something went wrong #123."
              );
              res.statusCode = 500;
              res.end();
            });
        })
        .catch(function(err) {
          console.log(err);
          res.setHeader(
            "resposne-description",
            "Oops, something went wrong #121."
          );
          res.statusCode = 500;
          res.end();
        });
    }
  });
  app.delete("/users", function(req, res) {
    console.log("delete user service call...");
    console.log(req.body);
    console.log(req.params);
    User.destroy({
      where: { userid: req.body.userid }
    })
      .then(function(repoUsers) {
        res.statusCode = 200;
        res.end();
      })
      .catch(function(err) {
        console.log(err);
        res.setHeader(
          "resposne-description",
          "Oops, something went wrong #124."
        );
        res.statusCode = 500;
        res.end();
      });
  });
};
