// profileAPI.js
import axios from 'axios';

const BASE_URL = 'https://ytpaqpikqarnveticqhl.supabase.co/rest/v1/';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cGFxcGlrcWFybnZldGljcWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwNDQ3MzUsImV4cCI6MjAxOTYyMDczNX0.4glNGKdXcHAXUyWuO5fpvcmg4oRyH9TvtTZ7OYMkcfc';
export const fetchTournees = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/tournees`, { headers: { apikey: apiKey } });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch tournees data:', error);
        throw error;
    }
};
