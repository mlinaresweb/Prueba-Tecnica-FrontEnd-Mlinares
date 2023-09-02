import axios, { AxiosResponse } from 'axios';
import { AlegraSellerResponse } from '../store/types/types'; // Importa la interfaz desde donde corresponda

const ALEGRA_API = 'https://api.alegra.com/api/v1/sellers';
const ALEGRA_AUTH = {
  Authorization: `Basic ${btoa('ghaedesigns@gmail.com:c4c82a34039d777b63c4')}`,
};

export const getSellers = async (): Promise<AxiosResponse<AlegraSellerResponse[]>> => {
  try {
    const response = await axios.get<AlegraSellerResponse[]>(ALEGRA_API, {
      headers: ALEGRA_AUTH,
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('Respuesta vacía del servidor');
    }

    return response;
  } catch (error) {
    console.error("Error al obtener vendedores:", error);
    throw new Error('Error al obtener vendedores');
  }
};
