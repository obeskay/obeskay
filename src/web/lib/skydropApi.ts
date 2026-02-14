import axios from "axios";

const skydropApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SKYDROPX_URL}/`,
  headers: {
    Authorization: `Token token=${process.env.NEXT_PUBLIC_SKYDROPX_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const FetchPaqueterias = async (codigoPostal: string) => {
  try {
    const res = await skydropApi.post("quotations", {
      zip_from: "03600",
      zip_to: codigoPostal,
      parcel: {
        weight: "0.5",
        height: "10",
        width: "1",
        length: "17",
      },
    });
    // console.log(res);
    // TODO: Agregar error handler para cuando no se encuentre el codigo postal
    if (res.status === 200) {
      const datosPaqueterias: [] = res.data;
      datosPaqueterias.sort((a: any, b: any) => {
        return Number(a.total_pricing) - Number(b.total_pricing);
      });
      return datosPaqueterias;
    }
  } catch (error) {
    console.error(error);
  }
};

export default skydropApi;
