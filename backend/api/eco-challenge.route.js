import express from "express";
import TeamCtrl from "./team.controller.js";
import UserCtrl from "./user.controller.js";
import MemberCtrl from "./member.controller.js";
import GoalCtrl from "./goals.controller.js";

const router = express.Router();

router.route("/teams").post(TeamCtrl.apiAddTeam).put(TeamCtrl.apiEditTeam).delete(TeamCtrl.apiDeleteTeam);
router.route("/team/:team_code").get(TeamCtrl.apiGetTeamById);
router.route("/users").put(UserCtrl.apiEditUser).get(UserCtrl.apiGetUserById).delete(UserCtrl.apiDeleteUser);
router.route("/join-team").patch(MemberCtrl.apiAddMember);
router.route("/leave-team").patch(MemberCtrl.apiRemoveMember);
router.route("/goals").post(GoalCtrl.apiAddGoalset).patch(GoalCtrl.apiEditGoalset);
router.route("/signup").post(UserCtrl.apiAddUser);
router.route("/users/join").get(UserCtrl.getCreationDate);

export default router;
