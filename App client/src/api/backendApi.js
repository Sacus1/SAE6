import axios from 'axios';

const BASE_URL = "http://51.91.76.245:3001";
export const sendToken = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/validation`, data);
        return response.data;
    } catch (error) {
        console.error('Failed to send token:', error);
        throw error;
    }
}
