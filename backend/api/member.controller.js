import MemberDAO from "../dao/member.dao.js";

export default class MemberCtrl {
  static async apiAddMember(req, res, next) {
    try {
      const teamID = req.body.team_id;
      const userID = req.body.user_id;

      const MemberResponse = await MemberDAO.addMember(teamID, userID);
      res.json({ status: "success" });
    } catch (e) {
      console.log(`error in MemberCtrl: ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
