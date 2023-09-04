import unsplashApi from './api/unplashApiConfig';
import { ImageItem,UnsplashImage } from '../store/types/types';

export const fetchUnsplashImages = async (query: string, numImages = 10): Promise<ImageItem[]> => {
    try {
      const response = await unsplashApi.get('/search/photos', {
        params: {
          query,
          per_page: numImages,
        },
      });
  
      if (!response.data.results) {
        throw new Error('No se encontraron imágenes');
      }
  
      return response.data.results.map((item:UnsplashImage) => {
        const id = item.id;
        return {
          id,
          url: item.urls.small,
          link: item.links.html,
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