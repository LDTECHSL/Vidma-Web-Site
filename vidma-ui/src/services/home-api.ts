import { getEnv } from "../env";
import axios from "axios";

const api_url = getEnv().API_URL;

export const createHeroData = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}hero`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getHeroData = async (lang: string) => {
  try {
    const response = await axios.get(`${api_url}hero?languageCode=${lang}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getHeroAllData = async (token: string) => {
  try {
    const response = await axios.get(`${api_url}hero/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getContactUsData = async () => {
  try {
    const response = await axios.get(`${api_url}contact-us`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createContactUsData = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}contact-us`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createAboutUsMain = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}about-us`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAboutUsMain = async () => {
  try {
    const response = await axios.get(`${api_url}about-us`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAboutUsMainLanguage = async (lang: string) => {
  try {
    const response = await axios.get(
      `${api_url}about-us/by-language?languageCode=${lang}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createAboutUsSub = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}about-us/image`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAboutUsSub = async () => {
  try {
    const response = await axios.get(`${api_url}about-us/image`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAboutUsSubLanguage = async (lang: string) => {
  try {
    const response = await axios.get(
      `${api_url}about-us/image-by-language?languageCode=${lang}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createLocation = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}location`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getLocations = async () => {
  try {
    const response = await axios.get(`${api_url}location`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteLocation = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${api_url}location?Id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createServices = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}services`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getServices = async () => {
  try {
    const response = await axios.get(`${api_url}services`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getServicesByLanguage = async (lang: string) => {
  try {
    const response = await axios.get(
      `${api_url}services/by-language?languageCode=${lang}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createTopProducts = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}top-products`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getTopProducts = async () => {
  try {
    const response = await axios.get(`${api_url}top-products`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createVideoSection = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}video-section`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getVideoSection = async () => {
  try {
    const response = await axios.get(`${api_url}video-section`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getVideoSectionByLanguage = async (lang: string) => {
  try {
    const response = await axios.get(
      `${api_url}video-section/by-language?languageCode=${lang}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createVideoSectionVideos = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}video-section/video`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getVideoSectionVideos = async () => {
  try {
    const response = await axios.get(`${api_url}video-section/video`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteVideoSectionVideo = async (id: string, token: string) => {
  try {
    const response = await axios.delete(
      `${api_url}video-section/video?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createStats = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}stats`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getStats = async () => {
  try {
    const response = await axios.get(`${api_url}stats`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createGallery = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}gallery`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateGallery = async (body: any, token: string) => {
  try {
    const response = await axios.put(`${api_url}gallery`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getGallery = async () => {
  try {
    const response = await axios.get(`${api_url}gallery/all`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getGalleryById = async (id: string) => {
  try {
    const response = await axios.get(`${api_url}gallery/by-id?GalleryId=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteGalleryById = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${api_url}gallery?GalleryId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteGalleryImageById = async (id: string, token: string) => {
  try {
    const response = await axios.delete(
      `${api_url}gallery/image?GalleryImageId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createGalleryImage = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}gallery/image`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createAchievements = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}achievements`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateAchievements = async (body: any, token: string) => {
  try {
    const response = await axios.put(`${api_url}achievements`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAchievements = async () => {
  try {
    const response = await axios.get(`${api_url}achievements`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteAchievements = async (id: string, token: string) => {
  try {
    const response = await axios.delete(
      `${api_url}achievements?achievementId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createTeams = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}teams`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateTeams = async (body: any, token: string) => {
  try {
    const response = await axios.put(`${api_url}teams`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTeams = async () => {
  try {
    const response = await axios.get(`${api_url}teams`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteTeams = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${api_url}teams?MemberId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createForm = async (body: any) => {
  try {
    const response = await axios.post(`${api_url}form`, body);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getForms = async () => {
  try {
    const response = await axios.get(`${api_url}form`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}products/add`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProducts = async (page: any) => {
  try {
    const response = await axios.get(
      `${api_url}products/paginated?page=${page}&pageSize=10`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${api_url}products`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const searchProducts = async (query: string) => {
  try {
    const response = await axios.get(
      `${api_url}products/search?query=${query}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${api_url}products?ProductId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (body: any, token: string) => {
  try {
    const response = await axios.post(`${api_url}products/update`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const placeOrder = async (body: any) => {
  try {
    const response = await axios.post(`${api_url}products/place-order`, body);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async (token: string) => {
  try {
    const response = await axios.get(`${api_url}products/customer-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDomainInfo = async () => {
  try {
    const response = await axios.get(`${api_url}footer`);
    return response;
  } catch (error) {
    throw error;
  }
};
