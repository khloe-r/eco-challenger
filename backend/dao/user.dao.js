let users;
import mongodb from "mongodb";
import bcrypt from "bcryptjs";
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

  static async verifyPassword(user, password) {
    if (password === user.password) {
      return true;
    }
    return false;
  }

  static async addUser(teams, username, password, pfp, total_points, goals, owns) {
    try {
      const userDoc = {
        teams: teams,
        name: username,
        password: password,
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

  static async editUser(userID, pfp) {
    try {
      const updateResponse = await users.updateOne({ _id: ObjectId(userID) }, { $set: { profile_photo: pfp } });
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

  static async getUserByUsername(username) {
    try {
      const getResponse = await users.find({ name: { $eq: username } }).next();
      return getResponse;
    } catch (e) {
      return { error: e };
    }
  }

  static async getFullUserInfo(userID, points) {
    try {
      const pipeline = [
        {
          $match: {
            _id: ObjectId(userID),
          },
        },
        {
          $addFields: {
            timestamp: {
              $toDate: ObjectId(userID),
            },
          },
        },
        {
          $lookup: {
            from: "teams",
            let: {
              user: "$_id",
            },
            pipeline: [
              {
                $unwind: "$members",
              },
              {
                $match: {
                  $expr: {
                    $eq: ["$members", "$$user"],
                  },
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: {
                    team_id: "$team_code",
                  },
                  pipeline: [
                    {
                      $unwind: "$teams",
                    },
                    {
                      $match: {
                        $expr: {
                          $and: [
                            {
                              $eq: ["$teams.team_id", "$$team_id"],
                            },
                          ],
                        },
                      },
                    },
                    {
                      $match: {
                        total_points: {
                          $gte: points,
                        },
                      },
                    },
                    {
                      $count: "rank",
                    },
                  ],
                  as: "scores",
                },
              },
            ],
            as: "team_info",
          },
        },
        {
          $lookup: {
            from: "teams",
            localField: "_id",
            foreignField: "owner",
            as: "owns",
          },
        },
      ];
      return await users.aggregate(pipeline).next();
    } catch (e) {
      console.log(`error in UserCtrl: ${e}`);
      return { error: e };
    }
  }

  static async getRank(points) {
    try {
      const pipeline = [
        {
          $match: {
            total_points: {
              $gte: points,
            },
          },
        },
        {
          $count: "rank",
        },
      ];
      return await users.aggregate(pipeline).next();
    } catch (e) {
      console.log(`error in UserCtrl: ${e}`);
    }
  }
}
