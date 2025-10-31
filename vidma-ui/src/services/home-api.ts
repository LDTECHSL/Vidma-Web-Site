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

export const createAboutUsMain = async (body:any, token:string) => {
    try {
        const response = await axios.post(`${api_url}about-us`, body , {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAboutUsMain = async () => {
    try {
        const response = await axios.get(`${api_url}about-us`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAboutUsMainLanguage = async (lang:string) => {
    try {
        const response = await axios.get(`${api_url}about-us/by-language?languageCode=${lang}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const createAboutUsSub = async (body:any, token:string) => {
    try {
        const response = await axios.post(`${api_url}about-us/image`, body , {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAboutUsSub = async () => {
    try {
        const response = await axios.get(`${api_url}about-us/image`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAboutUsSubLanguage = async (lang:string) => {
    try {
        const response = await axios.get(`${api_url}about-us/image-by-language?languageCode=${lang}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const createLocation = async (body:any, token:string) => {
    try {
        const response = await axios.post(`${api_url}location`, body , {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getLocations = async () => {
    try {
        const response = await axios.get(`${api_url}location`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteLocation = async (id:string, token:string) => {
    try {
        const response = await axios.delete(`${api_url}location?Id=${id}` , {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const createServices = async (body:any, token:string) => {
    try {
        const response = await axios.post(`${api_url}services`, body , {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getServices = async () => {
    try {
        const response = await axios.get(`${api_url}services`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getServicesByLanguage = async (lang:string) => {
    try {
        const response = await axios.get(`${api_url}services/by-language?languageCode=${lang}`);
        return response;
    } catch (error) {
        throw error;
    }
}
