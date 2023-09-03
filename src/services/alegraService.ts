import axios, { AxiosResponse } from 'axios';
import { AlegraSellerResponse, Factura } from '../store/types/types'; // Importa la interfaz desde donde corresponda

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
export const createItem = async (name: string, price: number): Promise<number> => {
  try {
    const data = {
      name,
      price: [{ price }]
    };
    const response = await axios.post('https://api.alegra.com/api/v1/items', data, { headers: ALEGRA_AUTH });
    return response.data.id; // Devuelve la ID del ítem recién creado
  } catch (error) {
    console.error("Error al crear ítem:", error);
    throw new Error('Error al crear ítem');
  }
};

export const createFactura = async (data: Factura): Promise<number> => {
  try {
    const response = await axios.post('https://api.alegra.com/api/v1/invoices', data, { headers: ALEGRA_AUTH });
    return response.data.id; // Devuelve la ID de la factura recién creada
  } catch (error) {
    console.error("Error al crear factura:", error);
    throw new Error('Error al crear factura');
  }
};

export const getFactura = async (id: string) => {
  try {
    const response = await axios.get(`https://api.alegra.com/api/v1/invoices/${id}`, { headers: ALEGRA_AUTH });
    return response.data;
  } catch (error) {
    console.error("Error al obtener factura:", error);
    throw new Error('Error al obtener factura');
  }
};
