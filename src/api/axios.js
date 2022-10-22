import axios from "axios";



const BASE_URL="https://ethereum-wallet-api.herokuapp.com/api/v1/";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials:true
});

export const axiosPrivate= axios.create({
  baseURL: BASE_URL,
  headers:{'Content-type':'application/json'},
  withCredentials:true
});
