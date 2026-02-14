import axios from "axios";

const strapiApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

export default strapiApi;
