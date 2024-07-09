import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
   baseURL: "http://localhost:5000/api",
   withCredentials: true
})

instance.interceptors.request.use((config) => {
   const accessToken = Cookies.get('accessToken')
   const refreshToken = Cookies.get('refreshToken')

   if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
   }

   if (refreshToken) {
      config.headers['refreshToken'] = refreshToken;
   }
   return config;
}, (error) => {
   return Promise.reject(error);
});

export default instance;
