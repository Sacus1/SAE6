// profileAPI.js
import axios from 'axios';

const BASE_URL = 'https://ytpaqpikqarnveticqhl.supabase.co/rest/v1/';

export const fetchTournees = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/tournees`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch tournees data:', error);
        throw error;
    }
};
