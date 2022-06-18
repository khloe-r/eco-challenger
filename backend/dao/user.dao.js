let users;
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export default class TeamDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.ECOCHALLENGE_NS).collection("users");
    } catch (e) {
      console.error(`Unable to establish a collection handle in userDAO: ${e}`);
    }
  }

  static async addUser(teams, name, email, pfp, total_points, goals, owns) {
    try {
      const userDoc = {
        teams: teams,
        name: name,
        email: email,
        profile_photo: pfp,
        goals: goals,
        total_points: total_points,
        owns: owns,
      };
      return await users.insertOne(userDoc);
    } catch (e) {
      console.error(`Unable to create user: ${e}`);
      return { error: e };
    }
  }

  static async editUser(userID, email) {
    try {
      const updateResponse = await users.updateOne({ _id: ObjectId(userID) }, { $set: { email: email } });
      return updateResponse;
    } catch (e) {
      return { error: e };
    }
  }

  static async getUserById(userID) {
    try {
      const getResponse = await users.find({ _id: { $eq: ObjectId(userID) } }).next();
      return getResponse;
    } catch (e) {
      return { error: e };
    }
  }

  static async deleteUser(userID) {
    try {
      const deleteResponse = await users.deleteOne({ _id: { $eq: ObjectId(userID) } });
      return deleteResponse;
    } catch (e) {
      return { error: e };
    }
  }
}
