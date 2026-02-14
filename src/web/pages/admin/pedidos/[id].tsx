import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { payload } from "@/lib/payload";
import React from "react";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/layouts/admin";
import StickersStack from "@/components/StickersStack";
import { motion } from "framer-motion";

const Pedido = ({ order }: any) => (
  <AdminLayout>
    <div className="pt-24 container space-y-2 text-left text-balance">
      <div className="flex flex-row gap-3 items-center justify-between">
        <p className="text-xl font-bold">Orden #{order?.id}</p>
        <div
          className={`rounded-full px-3 py-1 ${
            order?.paid ? "bg-lime-500" : "bg-red-500"
          }`}
        >
          <p className="font-bold uppercase text-sm tracking-widest text-white">
            {order?.paid ? "Pedido Pagado" : "Pendiente de Pago"}
          </p>
        </div>
      </div>
      <p>
        Fecha:{" "}
        {new Date(order?.createdAt).toLocaleDateString("es-ES", {
          dateStyle: "long",
        })}
      </p>

      <StickersStack stickers={order.items as any} />

      <Accordion type="multiple" className="space-y-6">
        <div className="space-y-6">
          <AccordionItem
            className="border-0 shadow-transparent bg-transparent"
            value={"Información del Cliente"}
          >
            <div className="card">
              <AccordionTrigger
                value={`Información del Cliente`}
                className="text-lg font-bold"
              >
                Información del Cliente
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Nombre: <b>{order?.name}</b>
                </p>
                <p>
                  Teléfono: <b>{order?.phone}</b>
                </p>
                <p>
                  Email: <b>{order?.email}</b>
                </p>
                <hr className="my-2" />
                <motion.a
                  className="block pt-4"
                  layoutId="FloatingWhatsApp"
                  href={`https://wa.me/+521${
                    order?.phone
                  }?text=${encodeURIComponent(
                    "¡Hola! Muchas gracias por tu compra. Ya estamos trabajando en tu pedido. En breve te enviaremos un mensaje con el número de guía de tu envío."
                  )}`}
                  aria-label="Contacto de Whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex gap-2 items-center justify-center">
                    <Image
                      src="/images/WhatsApp.svg"
                      alt="Logo Whatsapp"
                      width={32}
                      height={32}
                      priority
                    />
                    <span className="font-bold">Contactar vía WhatsApp</span>
                  </div>
                </motion.a>
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem className="border-0" value={"Envío"}>
            <div className="card">
              <AccordionTrigger value={`Envío`} className="text-lg font-bold">
                Envío
              </AccordionTrigger>
              <AccordionContent>
                {order?.shipping?.shippingMethod !== "metro" ? (
                  <>
                    <p>
                      Dirección: <b>{order?.shipping?.lineAddress} </b>
                    </p>
                    <p>
                      Número interior: <b>{order?.shipping?.interiorNumber}</b>
                    </p>
                    <p>
                      Referencias: <b>{order?.shipping?.references}</b>
                    </p>
                    <p>
                      Paquetería:{" "}
                      <b>
                        {order?.shipping?.shipment?.provider} -{" "}
                        {order?.shipping?.shipment?.service_level_name}
                      </b>
                    </p>
                    <p>
                      Costo de envío:{" "}
                      <b>${order?.shipping?.shipment?.total_pricing}</b>
                    </p>
                  </>
                ) : (
                  <p>
                    Entrega en metro <b>{order?.shipping.references}</b>
                  </p>
                )}
                {/* {
  "shipment": {
    "status": "pending",
    "provider": "IVOY",
    "service_level_name": "Same Day",
    "service_level_code": "SAME_DAY",
    "days": 1,
    "total_pricing": 73,
    "label": {}
  },
  "shippingMethod": "domicilio",
  "lineAddress": "Lorenzo Boturini 638, Jardín Balbuena, Venustiano Carranza, 15900 Ciudad de México, CDMX, México",
  "references": "Frente a Telmex",
  "interiorNumber": "2"
} */}
              </AccordionContent>
            </div>
          </AccordionItem>
          <AccordionItem className="border-0" value={"Resumen Financiero"}>
            <div className="card">
              <AccordionTrigger
                value={`Resumen Financiero`}
                className="text-lg font-bold"
              >
                Pago
              </AccordionTrigger>
              <AccordionContent>
                <p className="flex justify-between">
                  Subtotal: <b>${order?.subtotal}</b>
                </p>
                <p className="flex justify-between">
                  Envío: <b>${order?.shipping?.shipment?.total_pricing}</b>
                </p>
                <p className="flex justify-between">
                  Descuento: <b>${order?.discount || 0}</b>
                </p>
                <hr className="my-2" />
                <p className="flex justify-between">
                  Total: <b>${order?.total}</b>
                </p>
              </AccordionContent>
            </div>
          </AccordionItem>
        </div>
      </Accordion>
    </div>
  </AdminLayout>
);

export const getServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  // Fetch additional data for the pedido using the id from the query
  const { id } = context.query;
  const response = await payload.get(`/orders/${id}`);
  const order = response.data;

  return {
    props: {
      order,
    },
  };
};

export default Pedido;
