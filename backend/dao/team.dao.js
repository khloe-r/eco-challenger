let teams;
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export default class TeamDAO {
  static async injectDB(conn) {
    if (teams) {
      return;
    }
    try {
      teams = await conn.db(process.env.ECOCHALLENGE_NS).collection("teams");
    } catch (e) {
      console.error(`Unable to establish a collection handle in teamDAO: ${e}`);
    }
  }

  static async addTeam(teamOwner, teamName, teamCode, goals, members) {
    try {
      const teamDoc = {
        owner: teamOwner,
        team_name: teamName,
        team_code: teamCode,
        goals: goals,
        members: members,
      };
      return await teams.insertOne(teamDoc);
    } catch (e) {
      console.error(`Unable to create team: ${e}`);
      return { error: e };
    }
  }

  static async editTeam(teamID, goals, members) {
    try {
      const updateResponse = await teams.updateOne({ _id: ObjectId(teamID) }, { $set: { goals: goals, members: members } });
      return updateResponse;
    } catch (e) {
      return { error: e };
    }
  }

  static async getTeamByCode(teamCode) {
    try {
      const getResponse = await teams.find({ team_code: { $eq: teamCode } }).next();
      return getResponse;
    } catch (e) {
      return { error: e };
    }
  }

  static async deleteTeam(teamID) {
    try {
      const updateResponse = await teams.deleteOne({ _id: ObjectId(teamID) });
      return updateResponse;
    } catch (e) {
      return { error: e };
    }
  }
}
