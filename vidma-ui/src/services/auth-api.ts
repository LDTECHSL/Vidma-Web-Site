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

export const createUser = async (body: any) => {
    try {
        const response = await axios.post(`${api_url}auth/register`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUsers = async () => {
    try {
        const response = await axios.get(`${api_url}user/list`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (id: number) => {
    try {
        const response = await axios.delete(`${api_url}user?Id=${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const changePassword = async (body: any) => {
    try {
        const response = await axios.put(`${api_url}user/change-password`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
}