import axios from 'axios';

const BASE_URL = "https://51.91.76.245:3000";
export const sendQRcode = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/qrcode`, data);
        return response.data;
    } catch (error) {
        console.error('Failed to send qrcode:', error.toString());
        throw error;
    }
};

export const sendBarcode = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/barcode`, data);
        return response.data;
    } catch (error) {
        console.error('Failed to send barcode:', error);
        throw error;
    }
};
