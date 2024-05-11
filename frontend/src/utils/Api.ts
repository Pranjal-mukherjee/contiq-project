

import axios from "axios";
import { BACKEND_URL } from "./constants";
const Api = axios.create({
    baseURL: BACKEND_URL,
  });
  Api?.interceptors.request.use(
    async (config) => {
      const bearerToken = sessionStorage.getItem("token");
      if (bearerToken) {
        config.headers["Authorization"] = `Bearer ${bearerToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default Api;

