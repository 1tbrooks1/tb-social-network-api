const { User } = require("../models");

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "Sorry, no user found with that ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create a user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // update a user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "Sorry, no user found with that ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete user by id
  deleteUser({ params }, res) {
    User.findOneAndUpdate({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "Sorry, no user found with that ID! " });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
