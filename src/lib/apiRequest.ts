import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://nofashionsfind.up.railway.app/api",
  withCredentials: true,
});

export default apiRequest;
