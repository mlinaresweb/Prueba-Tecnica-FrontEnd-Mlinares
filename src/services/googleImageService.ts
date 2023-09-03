import axios, { AxiosResponse } from 'axios';
import { ImageItem } from '../store/types/types';
import { hashString } from '../utils/stringUtils';


const API_KEY = 'AIzaSyCI8Yw0qHCKBZWBSZBURRVuNb9d5JeWyds';
const SEARCH_ENGINE_ID = 'c6249d1709900402d';

// Tipo de respuesta de Google Custom Search
interface GoogleCustomSearchResponse {
  items: ImageItem[];
}

// Función para buscar imágenes
// Función para buscar imágenes
export const fetchImages = async (query: string, numImages = 10): Promise<ImageItem[]> => {
  try {
    const response: AxiosResponse<GoogleCustomSearchResponse> = await axios.get(
      'https://www.googleapis.com/customsearch/v1',
      {
        params: {
          key: API_KEY,
          cx: SEARCH_ENGINE_ID,
          q: query,
          searchType: 'image',
          num: numImages,
        },
      }
    );

    if (!response.data.items) {
      throw new Error('No se encontraron imágenes');
    }

    return response.data.items.map((item) => {
      const id = hashString(item.link);
      return {
        id,
        url: item.link,
        link: item.link, 
        seller: {
          id: '',
          name: '',
          points: 0,
        }, 
      };
    });
  } catch (error) {
    console.error('Error al buscar imágenes:', error);
    throw new Error('Error al buscar imágenes');
  }
};
