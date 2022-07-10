import TeamDAO from "../dao/team.dao.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export default class TeamCtrl {
  static async apiAddTeam(req, res, next) {
    try {
      const teamOwner = ObjectId(req.body.owner);
      const teamName = req.body.name;
      const goals = [];
      const members = [];

      const date = new Date();
      const buff = new Buffer(date);
      let teamId = buff.toString("base64").substring(26, 31);

      let teamCodeName = teamName.replace(/ /g, "-").toLowerCase().substring(0, 5);

      const teamCode = `${teamCodeName}-${teamId}`;

      const TeamResponse = await TeamDAO.addTeam(teamOwner, teamName, teamCode, goals, members);
      res.json({ status: "success" });
    } catch (e) {
      console.log(`error in TeamCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiEditTeam(req, res, next) {
    try {
      const teamID = req.body.team_id;
      const goals = req.body.goals;
      const members = req.body.members;

      const EditResponse = await TeamDAO.editTeam(teamID, goals, members);
      res.json({ status: "success" });
    } catch (e) {
      console.log(`error in TeamCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetTeamById(req, res, next) {
    try {
      const teamCode = req.params.team_code || {};

      const getTeam = await TeamDAO.getTeamByCode(teamCode);
      res.json(getTeam);
    } catch (e) {
      console.log(`error in TeamCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiDeleteTeam(req, res, next) {
    try {
      const teamID = req.body.team_id;

      const getTeam = await TeamDAO.deleteTeam(teamID);
      res.json({ status: "success" });
    } catch (e) {
      console.log(`error in TeamCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
