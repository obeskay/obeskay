/* eslint-disable import/no-anonymous-default-export */
import { payload } from "@lib/payload";

import axios from "axios";
import { exec } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";

// Obtiene el Access Token de la variable de environment
const ACCESS_TOKEN_MP = process.env.NEXT_PUBLIC_MP_TOKEN;

// Obtiene la variable de environment de nuestra url actual
const NEXT_PUBLIC_MP_URL = process.env.NEXT_PUBLIC_MP_URL;

// Instancia de Mercado Pago con nuestro access token
const mp = axios.create({
  baseURL: `${NEXT_PUBLIC_MP_URL}/v1/`,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN_MP}`,
  },
});

// TODO: CONECTAR CON API DE SKYDROP PARA Q SE GENERE EL ENVIO AUTOMATICAMENTE AL HACER EL PAGO
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log("La notificación es:", req.body);

  const id = req.body?.data?.id;

  if (!id) {
    return res.status(200).json({
      message: "No se ha recibido el id de la notificación",
    });
  }

  // console.log(`payments/${id}`);

  const payment = await mp.get(`payments/${id}`);

  if (
    req.body?.action === "payment.created" ||
    req.body?.action === "payment.updated"
  ) {
    // console.log(
    //   "sí tiene req.body?.action === payment.created y  req.body?.action === payment.updated"
    // );
    if (payment.data.status === "approved") {
      // console.log("sí tiene payment.data.status === approved");

      const { data } = await payload.post("/users/login", {
        // Todo: cambiar en producción
        email: "api@mail.com",
        password: "Suction3-Conducive-Colossal-Drainer-Prudishly",
      });

      // Increase the limit of open files
      await exec("ulimit -n 10000");

      await payload.patch(
        `/orders/${payment.data.external_reference}`,
        {
          paid: true,
          status: "awaitingPrinting",
          payment: {
            jsonPayment: payment.data,
          },
        },
        {
          headers: {
            Authorization: `JWT ${data.token}`,
          },
        }
      );
    }
  }

  res.json({ status: 200, message: "OK" });
};
