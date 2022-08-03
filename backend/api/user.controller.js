import UserDAO from "../dao/user.dao.js";
import mongodb from "mongodb";
import bcrypt from "bcryptjs";
const ObjectId = mongodb.ObjectId;

export default class UserCtrl {
  static async apiAddUser(req, res, next) {
    try {
      const teams = [];
      const username = req.body.username;

      let json, user;
      const response = await UserDAO.getUserByUsername(username)
        .then((response) => {
          json = JSON.stringify(response);
          user = JSON.parse(json);
          if (user) {
            throw "Username is already taken!";
          }
        })
        .catch((e) => {
          console.log("err");
          throw "User could not be created!";
        });

      const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/g;
      const pword = req.body.password;
      if (pword.length < 8) {
        throw "Password is not long enough!";
      } else if (!regex.test(pword)) {
        throw "Password does not meet requirements!";
      }
      const password = bcrypt.hashSync(req.body.password);

      const pfp = "";
      const total_points = 0;
      const goals = [];
      const owns = [];

      req.session.username = username;

      const UserReponse = await UserDAO.addUser(teams, username, password, pfp, total_points, goals, owns);
      var userInfo = {
        _id: UserReponse.insertedId.toString(),
        username: req.body.username,
      };
      req.login(userInfo, function (err) {
        if (err) {
          return next(err);
        } else {
          res.json(UserReponse);
        }
      });
    } catch (e) {
      console.log(`error in UserCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiEditUser(req, res, next) {
    try {
      const userID = req.body.user_id;
      const pfp = req.body.pfp;

      const EditResponse = await UserDAO.editUser(userID, pfp);
      res.json({ status: "success" });
    } catch (e) {
      console.log(`error in UserCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetUser(req, res, next) {
    try {
      const user_id = req.params.user_id || {};
      const getTeam = await UserDAO.getFullUserInfo(user_id, 0);
      res.json(getTeam);
    } catch (e) {
      console.log(`error in UserCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetUserById(user_id, points) {
    try {
      const getTeam = await UserDAO.getFullUserInfo(user_id, points);
      return getTeam;
    } catch (e) {
      console.log(`error in UserCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetRank(req, res, next) {
    try {
      const points = parseInt(req.params.score);
      const rank = await UserDAO.getRank(points);
      res.json(rank);
    } catch (e) {
      console.log(`error in UserCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
