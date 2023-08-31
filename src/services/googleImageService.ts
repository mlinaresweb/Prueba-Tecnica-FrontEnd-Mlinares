import axios from 'axios';

const API_KEY = 'AIzaSyCI8Yw0qHCKBZWBSZBURRVuNb9d5JeWyds';
const SEARCH_ENGINE_ID = 'c6249d1709900402d';

export const fetchImages = async (query: string, numImages = 5) =>  {
  const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
    params: {
      key: API_KEY,
      cx: SEARCH_ENGINE_ID,
      q: query,
      searchType: 'image',
      num: numImages
    }
  });
  return response.data.items.map((item: any) => ({
    id: item.cacheId,
    url: item.link
  }));
};
