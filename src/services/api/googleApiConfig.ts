import axios from 'axios';

const googleApi = axios.create({
  baseURL: process.env.VUE_APP_GOOGLE_API_URL,
  params: {
    key: process.env.VUE_APP_GOOGLE_API_KEY,
    cx: process.env.VUE_APP_GOOGLE_SEARCH_ENGINE_ID,
    searchType: 'image',
  },
});

export default googleApi;
