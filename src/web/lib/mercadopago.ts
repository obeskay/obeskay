import axios from "axios";

interface Item {
  id: string;
  title: string;
  description?: string;
  picture_url?: string;
  category_id?: string;
  quantity: number;
  currency_id: "ARS" | "BRL" | "CLP" | "MXN" | "COP" | "PEN" | "UYU";
  unit_price: number;
}

interface Payer {
  name?: string;
  surname?: string;
  email?: string;
  phone?: {
    area_code: string;
    number: string;
  };
  identification?: {
    type: string;
    number: string;
  };
  address?: {
    zip_code: string;
    street_name: string;
    street_number: number;
  };
  date_created?: string;
}

interface Track {
  type: string;
  values: string;
}

interface Back_Urls {
  success: string;
  pending?: string;
  failure?: string;
}

interface Payment_Methods {
  excluded_payment_methods: string[];
  excluded_payment_types: string[];
  default_payment_method_id: string;
  installments: number;
  default_installments: number;
}

interface Shipments {
  mode?: string;
  local_pickup?: boolean;
  dimensions?: string;
  default_shipping_method?: number;
  free_methods?: number[];
  cost: number;
  free_shipping?: boolean;
  receiver_address?: {
    zip_code: string;
    street_name: string;
    city_name: string;
    state_name: string;
    street_number: number;
    floor: string;
    apartment: string;
  };
}

interface Create_Preference_Args {
  aditional_info?: string;
  auto_return?: string;
  back_urls?: Back_Urls;
  date_of_expiration?: string;
  differential_pricing?: {
    id: number;
  };
  expiration_date_from?: string;
  expiration_date_to?: string;
  expires?: boolean;
  external_reference?: string;
  items: Item[];
  marketplace?: string;
  marketplace_fee?: number;
  metadata?: object;
  notification_url?: string;
  payer?: Payer;
  payment_methods?: Payment_Methods;
  shipments?: Shipments;
  statement_descriptor?: string;
  tracks?: Track[];
}

interface Create_Preference_Response {
  //TODO: Faltan campo
  collector_id: number;
  operation_type: string;
  items: Item[];
  payer: Payer;
  back_urls: Back_Urls;
  auto_return: string;
  payment_methods: Payment_Methods;
  client_id: string;
  id: string;
}

interface Get_Preference_Response {
  additional_info: string;
  auto_return: string;
  back_urls: Back_Urls;
  client_id: string;
  collector_id: number;
  date_created: string;
  expiration_date_from: string;
  expiration_date_to: string;
  expires: boolean;
  external_reference: string;
  id: string;
  init_point: string;
  items: Item[];
  marketplace: string;
  marketplace_fee: number;
  notification_url: string;
  statement_descriptor: string;
  operation_type: "regular_payment" | "money_transfer";
  payer: Payer;
  payment_methods: Payment_Methods;
  sandbox_init_point: string;
  shipments: Shipments;
}

interface GetAll_Preference_Response {
  elements: Get_Preference_Response[];
}

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_MP_URL}`,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MP_TOKEN}`,
  },
});

export const mercadopago = {
  // Preferences
  preferences: {
    // Create
    create: async (
      props: Create_Preference_Args
    ): Promise<Create_Preference_Response> => {
      return await api
        .post(`/checkout/preferences`, props)
        .then((res) => res.data);
    },
    // Obtener uno
    getAll: async (): Promise<GetAll_Preference_Response> => {
      return await api.get("/checkout/preferences/").then((res) => res.data);
    },
    // Obtener todos
    getOne: async (id: string): Promise<Get_Preference_Response> => {
      return await api
        .get(`/checkout/preferences/${id}`)
        .then((res) => res.data);
    },
  },
};
