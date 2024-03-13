// profileAPI.js
import axios from 'axios';

const BASE_URL = 'https://ytpaqpikqarnveticqhl.supabase.co/rest/v1';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cGFxcGlrcWFybnZldGljcWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwNDQ3MzUsImV4cCI6MjAxOTYyMDczNX0.4glNGKdXcHAXUyWuO5fpvcmg4oRyH9TvtTZ7OYMkcfc';
export const fetchTournees = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/tournees`, { headers: { apikey: apiKey } });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch tournees data:', error);
        throw error;
    }
};

export const fetchDistributionByTournee = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/distributions`, { headers: { apikey: apiKey }, params: { tournee_id: 'eq.' + id } });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch distribution data:', error);
        throw error;
    }
};

export const fetchDepotById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/depots`, { headers: { apikey: apiKey }, params: { depot_id: 'eq.' + id } });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch depot data:', error);
        throw error;
    }
};

export const fetchAdresseById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/adresses`, { headers: { apikey: apiKey }, params: { adresse_id: 'eq.' + id } });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch adresse data:', error);
        throw error;
    }
};
