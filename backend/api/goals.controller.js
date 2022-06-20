import GoalDAO from "../dao/goals.dao.js";

export default class GoalCtrl {
  static async apiAddGoalset(req, res, next) {
    try {
      const teamID = req.body.team_id || "none";
      const category = req.body.name;
      const goals = req.body.goals;

      const GoalResponse = await GoalDAO.addGoalset(teamID, category, goals);
      res.json({ status: "success" });
    } catch (e) {
      console.log(`error in GoalCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiEditGoalset(req, res, next) {
    try {
      const goalID = req.body.goal_id;
      const goals = req.body.goals;

      const GoalResponse = await GoalDAO.editGoalset(goalID, goals);
      res.json({ status: "success" });
    } catch (e) {
      console.log(`error in GoalCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
