import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import TeamDAO from "./dao/team.dao.js";
import UserDAO from "./dao/user.dao.js";
import MemberDAO from "./dao/member.dao.js";
import GoalDAO from "./dao/goals.dao.js";
dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.ECOCHALLENGE_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await TeamDAO.injectDB(client);
    await UserDAO.injectDB(client);
    await MemberDAO.injectDB(client);
    await GoalDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
