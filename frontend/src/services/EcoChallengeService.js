import http from "../http";

class EcoChallengeDataService {
  // Authentication
  handleLogin(data) {
    return http.post("/login", data);
  }

  handleSignUp(data) {
    return http.post("/signup", data);
  }

  handleLogout() {
    return http.post("/logout");
  }

  // Users
  getUser() {
    return http.get("/get-user");
  }

  getRank(score) {
    return http.get(`/users/${score}`);
  }

  editUser(data) {
    return http.put("/users", data);
  }

  // Teams
  getTeam(id, user_id) {
    return http.get(`/team/${id}/${user_id}`);
  }

  addMember(data) {
    return http.patch("/join-team", data);
  }

  addTeam(data) {
    return http.post("/teams", data);
  }
}

export default new EcoChallengeDataService();
