import http from "../http";

class EcoChallengeDataService {
  getTeam(id) {
    return http.get(`/team/${id}`);
  }

  handleLogin(data) {
    return http.post("/login", data);
  }

  handleSignUp(data) {
    return http.post("/signup", data);
  }

  getUser() {
    return http.get("/get-user");
  }

  getUserJoin(data) {
    return http.get("/users/join", data);
  }

  editUser(data) {
    return http.put("/users", data);
  }
}

export default new EcoChallengeDataService();
