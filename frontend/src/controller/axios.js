import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "http://paradisemotorsnepal.com:60000/",
});
export default instance;
