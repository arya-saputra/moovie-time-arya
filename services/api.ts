import axios from "axios";

const ApiService = axios.create({
  baseURL: import.meta.env.VITE_API_MOVIE_URL+"/3/",
  headers: {
    'Content-Type': 'application/json',
    'accept':'application/json',
  },
});

ApiService.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${import.meta.env.VITE_API_MOVIE_KEY}`
  return config
})

export default ApiService;