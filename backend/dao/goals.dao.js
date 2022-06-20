let goals;
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export default class GoalDAO {
  static async injectDB(conn) {
    if (goals) {
      return;
    }
    try {
      goals = await conn.db(process.env.ECOCHALLENGE_NS).collection("goals");
    } catch (e) {
      console.error(`Unable to establish a collection handle in goalsDAO: ${e}`);
    }
  }

  static async addGoalset(teamID, category, goalList) {
    try {
      const goalDoc = {
        team_id: teamID,
        category: category,
        goals: goalList,
      };
      return await goals.insertOne(goalDoc);
    } catch (e) {
      console.error(`Unable to add goalset: ${e}`);
      return { error: e };
    }
  }

  static async editGoalset(goalID, goalList) {
    try {
      return await goals.updateOne({ _id: ObjectId(goalID) }, { $set: { goals: goalList } });
    } catch (e) {
      console.error(`Unable to edit goalset: ${e}`);
      return { error: e };
    }
  }
}
