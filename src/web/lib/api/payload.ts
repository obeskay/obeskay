import axios, { AxiosResponse } from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://stickycoverspayload.app.obeskay.com";

// Instancia de PayloadCMS
export const payload = axios.create({
  baseURL: `${API_URL}/api`,
});

export const subirMedia = async (
  formMultipart: FormData,
  config?: any
): Promise<AxiosResponse> => {
  let res = await payload.post("media", formMultipart, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...config?.headers,
    },
    ...config,
  });

  // console.log("res.data de subirMedia: ", res.data);

  return res;
};

export const subirProducto = async (data: any): Promise<AxiosResponse> => {
  let res = await payload.post("productos", {
    data,
  });

  return res;
};
