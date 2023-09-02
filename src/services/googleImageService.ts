import axios from 'axios';
import { ImageItem } from "../store/types/types";



const API_KEY = 'AIzaSyBLJJpZRnr2Ig48B7JCAr5n4zbukbRkzA8';
const SEARCH_ENGINE_ID = 'c6249d1709900402d';
// const API_KEY = 'AIzaSyD9dne1BnygPKist4MK4sJJlTn3LkCyP1E';
// const SEARCH_ENGINE_ID = '715c3e4a3ac3f4c6a';

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return hash.toString();
}

export const fetchImages = async (query: string, numImages = 10) =>  {
  const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
    params: {
      key: API_KEY,
      cx: SEARCH_ENGINE_ID,
      q: query,
      searchType: 'image',
      num: numImages
    }
  });
  return response.data.items.map((item: ImageItem) => {
    const id = hashString(item.link);
    return {
      id: id,
      url: item.link
    };
  });
};
