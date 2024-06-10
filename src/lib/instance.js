import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
   baseURL: "http://localhost:5000/api"
})

instance.interceptors.request.use((config) => {
   const accessToken = Cookies.get('accessToken')
   if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
   }
   return config;
}, (error) => {
   return Promise.reject(error);
});

export default instance;
