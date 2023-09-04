import axios from 'axios';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    'Authorization': `Client-ID ${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}`
  },
});

export default unsplashApi;
