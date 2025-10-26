import { getEnv } from "../env";
import axios from "axios";

const api_url = getEnv().API_URL;

export const createHeroData = async (body:any) => {
    try {
        const response = await axios.post(`${api_url}hero`, body , {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getHeroData = async (lang:string) => {
    try {
        const response = await axios.get(`${api_url}hero?languageCode=${lang}`);
        return response;
    } catch (error) {
        throw error;
    }
}