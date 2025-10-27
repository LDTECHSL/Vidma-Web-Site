import { getEnv } from "../env";
import axios from "axios";

const api_url = getEnv().API_URL;

export const createHeroData = async (body:any, token:string) => {
    try {
        const response = await axios.post(`${api_url}hero`, body , {
            headers: {
                'Content-Type' : 'multipart/form-data',
                'Authorization': `Bearer ${token}`
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

export const getHeroAllData = async (token:string) => {
    try {
        const response = await axios.get(`${api_url}hero/all`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getContactUsData = async () => {
    try {
        const response = await axios.get(`${api_url}contact-us`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const createContactUsData = async (body:any, token:string) => {
    try {
        const response = await axios.post(`${api_url}contact-us`, body , {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}