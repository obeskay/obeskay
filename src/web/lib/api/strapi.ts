import axios from "axios";

// Instancia de strapi
export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/`,
});

interface InformacionEnvio {
  // Dependiendo del componente, será el tipo de información que se envíe
  __component: "envio.entrega-en-metro" | "envio.envio";

  // En caso de que sea una entrega en metro
  Metro?: string;

  // En caso de envío
  Calle?: string;
  NumeroExterior?: string;
  NumeroInterior?: string;
  Colonia?: string;
  Ciudad?: string;
  Estado?: string;
  CP?: string;
  Referencia?: string;
  RateId?: string;
  UrlGuia?: string;
}

export interface StrapiSaleData {
  // Datos sobre el pedido
  Pagado?: boolean;
  Impreso?: boolean;
  Entregado?: boolean;
  CantidadDeCompra?: number;
  CantidadDeEnvio?: number;
  Total?: number;

  // Array de items
  products?: number[];

  // Datos sobre el usuario
  NombreCliente?: string;
  EmailCliente?: string;
  TelefonoCliente?: string;

  // Datos sobre la entrega
  medioEnvio?: "entregaMetro" | "envioDomicilio";
  InformacionEnvio?: InformacionEnvio[];
  Envio?: boolean;
}

// Objeto de acceso a la API
export const strapiApi = () => {
  return {
    // Crea un nuevo ingreso
    create: async function (data: StrapiSaleData = {}) {
      let res = await instance.post("sales", {
        data,
      });

      // Devuelve únicamente el ID del ingreso
      return res.data.data.id as string;
    },

    // Actualiza o crea un ingreso
    upsert: async function (id: string, data: StrapiSaleData = {}) {
      // Si no existe un id, entonces crea un nuevo ingreso con la data enviada
      if (!id) {
        return await this.create(data);
      }
      // Si ya existe, lo actualiza con la data enviada
      else {
        return await instance.put(`sales/${id}`, {
          data,
        });
      }
    },
    // Obtiene la información de un sale
    get: async function (id: string) {
      return await instance.get(`sales/${id}`);
    },
  };
};
