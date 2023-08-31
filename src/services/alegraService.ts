import axios from 'axios';

const ALEGRA_API = 'https://api.alegra.com/api/v1/sellers';
const ALEGRA_AUTH = { Authorization: `Basic ${btoa('ghaedesigns@gmail.com:c4c82a34039d777b63c4')}` };

export const createSeller = async (data: any) => {
    try {
      const response = await axios.post(ALEGRA_API, data, { headers: ALEGRA_AUTH });
      return response;
    } catch (error) {
      console.error("Error al crear vendedor:", error);
      throw error;
    }
  };
  
  export const getSellers = async () => {
    try {
      const response = await axios.get(ALEGRA_API, { headers: ALEGRA_AUTH });
      return response;
    } catch (error) {
      console.error("Error al obtener vendedores:", error);
      throw error;
    }
  };
  
