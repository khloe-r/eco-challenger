import UserDAO from "../dao/user.dao.js";

export default class UserCtrl {
  static async apiAddUser(req, res, next) {
    try {
      const teams = [];
      const name = req.body.name;
      const email = req.body.email;
      const pfp = `https://emojiapi.dev/api/v1/${req.body.emoji_name}.svg`;
      const total_points = 0;
      const goals = [];
      const owns = [];

      const UserReponse = await UserDAO.addUser(teams, name, email, pfp, total_points, goals, owns);
      res.json({ status: "success" });
    } catch (e) {
      console.log(`error in UserCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiEditUser(req, res, next) {
    try {
      const userID = req.body.user_id;
      const email = req.body.email;

      const EditResponse = await UserDAO.editUser(userID, email);
      res.json({ status: "success" });
    } catch (e) {
      console.log(`error in UserCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetUserById(req, res, next) {
    try {
      const userID = req.body.user_id;

      const getTeam = await UserDAO.getUserById(userID);
      res.json(getTeam);
    } catch (e) {
      console.log(`error in UserCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiDeleteUser(req, res, next) {
    try {
      console.log("hello");
      const userID = req.body.user_id;

      const getTeam = await UserDAO.deleteUser(userID);
      res.json({ status: "success" });
    } catch (e) {
      console.log(`error in UserCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
