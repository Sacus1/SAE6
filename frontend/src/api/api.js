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

export const fetchDepotsByTourneeId = async (id) => {
    try {
        const distributions = await axios.get(`${BASE_URL}/distributions`, { headers: { apikey: apiKey }, params: { tournee_id: 'eq.' + id, select: 'depot_id' } });
        let depots = [];
        const depotIdsSet = new Set(distributions.data.map((item) => item.depot_id));
        for (const depotId of depotIdsSet) {
            const depot = await axios.get(`${BASE_URL}/depots`, { headers: { apikey: apiKey }, params: { depot_id: 'eq.' + depotId, select: 'depot' } });
            const depotName = depot.data[0].depot;
            const distributionsDepot = await axios.get(`${BASE_URL}/distributions`, { headers: { apikey: apiKey }, params: { depot_id: 'eq.' + depotId, select: 'distribution_id' } });
            const distributionIdsSet = new Set(distributionsDepot.data.map((item) => item.distribution_id));
            let nombreSimple = 0;
            let nombreFamilial = 0;
            let nombreFruite = 0;
            for (const distributionId of distributionIdsSet) {
                const livraisonsDistrib = await axios.get(`${BASE_URL}/livraisons`, { headers: { apikey: apiKey }, params: { distribution_id: 'eq.' + distributionId, select: 'abonnement_id' } });
                const abonnementIdsSet = new Set(livraisonsDistrib.data.map((item) => item.abonnement_id));
                for (let abonnementId of abonnementIdsSet) {
                    const abonnementDistrib = await axios.get(`${BASE_URL}/abonnements`, { headers: { apikey: apiKey }, params: { abonnement_id: 'eq.' + abonnementId, select: 'panier_id,nombre' } });
                    const panierId = abonnementDistrib.data[0].panier_id;
                    const nombre = abonnementDistrib.data[0].nombre;
                    //[1, 2, 5] : simple
                    if (panierId == 1 || panierId == 2 || panierId == 5) nombreSimple += nombre;
                    //[3, 4, 6] : familial
                    if (panierId == 3 || panierId == 4 || panierId == 6) nombreFamilial += nombre;
                    //[7, 8, 9] : fruite
                    if (panierId == 7 || panierId == 8 || panierId == 9) nombreFruite += nombre;
                }
            }
            const nombrePaniers = nombreSimple + nombreFamilial + nombreFruite;
            depots.push({
                depot: depotName,
                nombrePaniers: nombrePaniers,
                nombreSimple: nombreSimple,
                nombreFruite: nombreFruite,
                nombreFamilial: nombreFamilial
            });
        }
        return depots;
    } catch (error) {
        console.error('Failed to fetch depots data:', error);
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
