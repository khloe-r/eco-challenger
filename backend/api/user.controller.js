import UserDAO from "../dao/user.dao.js";
import mongodb from "mongodb";
import bcrypt from "bcryptjs";
const ObjectId = mongodb.ObjectId;

export default class UserCtrl {
  static async apiAddUser(req, res, next) {
    try {
      const teams = [];
      const username = req.body.username;
      const password = bcrypt.hashSync(req.body.password);
      const pfp = "";
      const total_points = 0;
      const goals = [];
      const owns = [];

      req.session.username = username;

      const UserReponse = await UserDAO.addUser(teams, username, password, pfp, total_points, goals, owns);
      res.json({ status: "success" });
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

  static async apiGetUserById(user_id, points) {
    try {
      console.log(points);
      const getTeam = await UserDAO.getFullUserInfo(user_id, points);
      return getTeam;
    } catch (e) {
      console.log(`error in UserCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiDeleteUser(req, res, next) {
    try {
      const userID = req.body.user_id;

      const getTeam = await UserDAO.deleteUser(userID);

      res.json({ status: "success" });
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
