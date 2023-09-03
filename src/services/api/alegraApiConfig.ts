import axios from 'axios';

const alegraApi = axios.create({
  baseURL: process.env.VUE_APP_ALEGRA_API,
  headers: {
    Authorization: `Basic ${btoa(
      `${process.env.VUE_APP_ALEGRA_EMAIL}:${process.env.VUE_APP_ALEGRA_TOKEN}`
    )}`,
  },
});

export default alegraApi;
