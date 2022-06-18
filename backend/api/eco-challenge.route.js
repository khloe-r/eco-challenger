import express from "express";
import TeamCtrl from "./team.controller.js";
import UserCtrl from "./user.controller.js";
import MemberCtrl from "./member.controller.js";

const router = express.Router();

router.route("/teams").post(TeamCtrl.apiAddTeam).put(TeamCtrl.apiEditTeam).delete(TeamCtrl.apiDeleteTeam);
router.route("/team/:team_code").get(TeamCtrl.apiGetTeamById);
router.route("/users").post(UserCtrl.apiAddUser).put(UserCtrl.apiEditUser).get(UserCtrl.apiGetUserById).delete(UserCtrl.apiDeleteUser);
router.route("/join-team").patch(MemberCtrl.apiAddMember);
router.route("/leave-team").patch(MemberCtrl.apiRemoveMember);

export default router;
