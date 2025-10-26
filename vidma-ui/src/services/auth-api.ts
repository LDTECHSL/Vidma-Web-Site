import { getEnv } from "../env";
import axios from "axios";

const api_url = getEnv().API_URL;

export const login = async (body: any) => {
    try {
        const response = await axios.post(`${api_url}auth/login`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
}