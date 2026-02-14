import axios from "axios";
import {
  OrderResponse,
  Shipping,
  useApiAuthStore,
  useOrderStore,
} from "./zustand";
import type { Cart } from "./zustand";
const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const payload = axios.create({
  baseURL,
  withCredentials: true,
});

payload.interceptors.request.use((config) => {
  const token = useApiAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return config;
});

// Refrescamos el token antes de cada request
const interceptor = payload.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Si el error no es 403 (token expirado), lo rechazamos
    if (error.response.status !== 403) {
      return Promise.reject(error);
    }

    // Rechazamos el interceptor para evitar un loop infinito
    payload.interceptors.response.eject(interceptor);

    // Refrescamos el token
    await loginPayload();
    // Reintentamos el request
    return payload.request(error.response.config);
  }
);

export async function loginPayload({
  serverSide,
}: { serverSide?: boolean } = {}) {
  try {
    const { data } = await payload.post("/users/login", {
      // Todo: cambiar en producción
      email: "api@mail.com",
      password: "Suction3-Conducive-Colossal-Drainer-Prudishly",
    });

    if (serverSide) {
      return data;
    }

    // Guardamos el token en el store
    const setApiAuth = useApiAuthStore.getState().setApiAuth;
    setApiAuth(data.token, data.exp);

    return data;
  } catch (error) {
    console.log("Login error", error);
    return error;
  }
}

export async function createOrderPayload(
  orderData: Cart
): Promise<OrderResponse> {
  try {
    const { data } = await payload.post("/orders", {
      ...orderData,
      status: "unfinished",
    });

    // console.log("Order created", data.id);

    // Guardamos la orden en el store
    const setCart = useOrderStore.getState().setCart;
    setCart(data.doc);

    return data;
  } catch (error) {
    console.log("Create order error", error);
  }
}

export async function addItemToCartPayload(
  orderId: number,
  items: {
    product: string;
    quantity: number;
  }[]
): Promise<OrderResponse> {
  const { data } = await payload.patch(`/orders/${orderId}`, {
    items,
  });

  return data;
}

export async function updateContactPayload(
  orderId: number,
  contact: {
    name: string;
    email: string;
    phone: string;
  }
): Promise<OrderResponse> {
  const { data } = await payload.patch(`/orders/${orderId}`, {
    ...contact,
  });

  return data;
}

export async function updateShippingPayload(
  orderId: number,
  shipping: Shipping
): Promise<OrderResponse> {
  const { data } = await payload.patch(`/orders/${orderId}`, {
    shipping,
  });

  return data;
}
