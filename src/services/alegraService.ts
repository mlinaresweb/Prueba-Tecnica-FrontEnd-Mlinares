import alegraApi from './api/alegraApiConfig';
import { AlegraSellerResponse, Factura, Client  } from '../store/types/types';

export const getSellers = async (): Promise<AlegraSellerResponse[]> => {
  try {
    const response = await alegraApi.get<AlegraSellerResponse[]>('/sellers');

    if (!response.data || response.data.length === 0) {
      throw new Error('Respuesta vacía del servidor');
    }

    return response.data;
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
    const response = await alegraApi.post('/items', data);
    return response.data.id; 
  } catch (error) {
    console.error("Error al crear ítem:", error);
    throw new Error('Error al crear ítem');
  }
};

export const createFactura = async (data: Factura): Promise<number> => {
  try {
    const response = await alegraApi.post('/invoices', data);
    return response.data.id; 
  } catch (error) {
    console.error("Error al crear factura:", error);
    throw new Error('Error al crear factura');
  }
};

export const getFactura = async (id: string) => {
  try {
    const response = await alegraApi.get(`/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener factura:", error);
    throw new Error('Error al obtener factura');
  }
};
export const createClient = async (data: Client): Promise<number> => {
  try {
    const response = await alegraApi.post('/contacts', data);
    return response.data.id;
  } catch (error) {
    console.error("Error al crear cliente:", error);
    throw new Error('Error al crear cliente');
  }
};

export const getClient = async (id: number | string): Promise<Client> => {
  try {
    const response = await alegraApi.get(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    throw new Error('Error al obtener cliente');
  }
};