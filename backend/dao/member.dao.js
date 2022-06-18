let users, teams;
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export default class MemberDAO {
  static async injectDB(conn) {
    if (users && teams) {
      return;
    }
    try {
      users = await conn.db(process.env.ECOCHALLENGE_NS).collection("users");
      teams = await conn.db(process.env.ECOCHALLENGE_NS).collection("teams");
    } catch (e) {
      console.error(`Unable to establish a collection handle in userDAO: ${e}`);
    }
  }

  static async addMember(teamID, userID) {
    try {
      await teams.updateOne({ _id: ObjectId(teamID) }, { $push: { members: { user_id: userID, score: 0 } } });
      return await users.updateOne({ _id: ObjectId(userID) }, { $push: { teams: { team_id: teamID, score: 0 } } });
    } catch (e) {
      console.error(`Unable to add user: ${e}`);
      return { error: e };
    }
  }

  static async removeMember(teamID, userID) {
    try {
      await teams.updateOne({ _id: ObjectId(teamID) }, { $pull: { members: { user_id: userID, score: { $gte: 0 } } } });
      return await users.updateOne({ _id: ObjectId(userID) }, { $pull: { teams: { team_id: teamID, score: { $gte: 0 } } } });
    } catch (e) {
      console.error(`Unable to remove user: ${e}`);
      return { error: e };
    }
  }
}
