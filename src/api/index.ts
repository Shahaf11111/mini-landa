import axios from "axios";
import { LeaderboardResponse, ScoreUpdateResponse, UserResponse } from "../interfaces";

class Api {
    private client = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}`,
        headers: {
            "Content-Type": "application/json",
            "Accept": "*",
        }
    });

    async getUser(name: string): Promise<UserResponse> {
        return this.client
            .get(`/users/${name}`)
            .then((res) => res.data)
            .catch((e) => ({ data: null, message: e.response.data.message }));
    }

    async createUser(username: string): Promise<UserResponse> {
        return this.client
            .post('/users', { username })
            .then((res) => res.data)
            .catch((e) => ({ message: e.response.data.message }));
    }

    async signUpOrLogIn(name: string): Promise<UserResponse> {
        const { data } = await this.getUser(name);
        if (data) {
            return { data, message: 'Welcome back!' };
        }
        const response = await this.createUser(name);
        return { data: response.data, message: 'Nice to meet you for the first time!' };
    }

    async getLeaderboard(): Promise<LeaderboardResponse> {
        return this.client
            .get('/leaderboard')
            .then((res) => res.data)
            .catch((e) => ({ data: [], message: e.response.data.message }));
    }

    async score(username: string): Promise<ScoreUpdateResponse> {
        return this.client
            .put('/leaderboard', { username })
            .then((res) => res.data)
            .catch((e) => ({ data: null, message: e.response.data.message }));
    }
}

export default new Api();
