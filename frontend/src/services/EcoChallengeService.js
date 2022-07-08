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
}

export default new EcoChallengeDataService();
