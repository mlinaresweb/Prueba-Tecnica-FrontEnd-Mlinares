import googleApi from './api/googleApiConfig';
import { AxiosResponse } from 'axios';
import { ImageItem, GoogleCustomSearchResponse } from '../store/types/types';
import { hashString } from '../utils/stringUtils';

export const fetchImages = async (query: string, numImages = 10): Promise<ImageItem[]> => {
  try {
    const response: AxiosResponse<GoogleCustomSearchResponse> = await googleApi.get('', {
      params: {
        q: query,
        num: numImages,
      },
    });

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
