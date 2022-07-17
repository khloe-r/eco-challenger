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

  static async getTeamByCode(teamCode, userId) {
    try {
      const pipeline = [
        {
          $lookup: {
            from: "users",
            localField: "members",
            foreignField: "_id",
            as: "members",
          },
        },
        {
          $match: {
            team_code: teamCode,
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
                $set: {
                  score: "$teams.score",
                },
              },
              {
                $sort: {
                  score: -1,
                },
              },
              {
                $set: {
                  password: "XXXX",
                },
              },
            ],
            as: "members",
          },
        },
        {
          $set: {
            owner: {
              $eq: ["$owner", new ObjectId(userId)],
            },
          },
        },
      ];

      return await teams.aggregate(pipeline).next();
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
