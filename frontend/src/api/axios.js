/** @format */

import axios from "axios";

const API = axios.create({
  baseURL: "https://personal-finance-tracker-backend-a7pd.onrender.com",
});

export default API;
