import http from "../http";

class EcoChallengeDataService {
  getTeam(id) {
    return http.get(`/team/${id}`);
  }
}

export default new EcoChallengeDataService();
