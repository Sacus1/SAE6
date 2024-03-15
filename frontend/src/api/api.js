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
export const fetchDepotsByTourneeId = async (tourneeId) => {
    try {
        const response = await axios.get(`${BASE_URL}/distributions`, {
            headers: { apikey: apiKey },
            params: {
                tournee_id: 'eq.' + tourneeId,
                select: 'ordre,depot_id,depots(depot),livraisons(abonnement_id,abonnements(panier_id,nombre))'
            }
        });
        const data = response.data;
        let depots = [];

        data.forEach((distribution) => {
            const ordreDistribution = distribution.ordre;
            const depotName = distribution.depots.depot;
            let nombreSimple = 0,
                nombreFamilial = 0,
                nombreFruite = 0;

            const uniqueAbonnements = new Set();

            distribution.livraisons.forEach((livraison) => {
                const abonnement_id = livraison.abonnement_id;
                if (!uniqueAbonnements.has(abonnement_id)) {
                    const { panier_id, nombre } = livraison.abonnements;
                    if ([1, 2, 5].includes(panier_id)) nombreSimple += nombre;
                    if ([3, 4, 6].includes(panier_id)) nombreFamilial += nombre;
                    if ([7, 8, 9].includes(panier_id)) nombreFruite += nombre;
                    uniqueAbonnements.add(abonnement_id);
                }
            });

            const nombrePaniers = nombreSimple + nombreFamilial + nombreFruite;
            depots.push({
                ordre: ordreDistribution,
                depot: depotName,
                nombrePaniers: nombrePaniers,
                nombreSimple: nombreSimple,
                nombreFamilial: nombreFamilial,
                nombreFruite: nombreFruite
            });
        });

        return depots;
    } catch (error) {
        console.error('Optimized fetch failed:', error);
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

export const GetLocalisationsByTournee = async (tourneeId) => {
    try {
        // Hypothetical API call that fetches distributions with nested depot and address information
        const response = await axios.get(`${BASE_URL}/distributions`, {
            headers: { apikey: apiKey },
            params: {
                tournee_id: 'eq.' + tourneeId,
                select: 'depots(depot_id,adresses(adresse_id,localisation))'
            }
        });
        const distributions = response.data;
        let points = [];

        distributions.forEach((distribution) => {
            if (distribution.depots && distribution.depots.adresses) {
                const adresse = distribution.depots.adresses;

                // Assuming 'localisation' is a structure containing 'coordinates'
                if (adresse.localisation && adresse.localisation.coordinates) {
                    const [long, lat] = adresse.localisation.coordinates;
                    points.push([lat, long]); // Adjust based on how your coordinates are structured
                }
            }
        });
        return points;
    } catch (error) {
        console.error('Optimized data fetch and processing failed:', error);
        throw error;
    }
};
