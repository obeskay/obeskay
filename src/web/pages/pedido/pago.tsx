/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useOrderStore } from "@lib/zustand";
import { mercadopago } from "@lib/mercadopago";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

const LayoutPedido = dynamic(() => import("../../components/LayoutPedido"), {
  ssr: false,
});

type Props = {};

const Pago = ({}: Props) => {
  // Si el modal de mercadoPago no abre, se pone como true
  const [showError, setShowError] = useState(false);

  const router = useRouter();
  // Perferencia de mercadopago
  const [preference, setPreference] = useState<any>();

  // Orden
  const { items, email, name, id, shipping } = useOrderStore();

  // Hook para cargar la pantalla de MP después de crear la preferencia
  useEffect(() => {
    if (preference) {
      router.push(preference.init_point);
    }
  }, [preference]);

  // Hook para crear la preferencia
  useEffect(() => {
    // Si no hay un carrito, entonces regresamos al inicio
    if (!items || items.length === 0) {
      router.replace("/");
      return;
    }
    // Si hay un carrito, entonces creamos la preferencia

    const preferenceObject = {
      external_reference: `${id}`,
      items: items.map((item) => ({
        id: item.id,
        title: item.product.name,
        description: `Sticker para tarjeta con diseño ${item.product.name}`,
        quantity: item.quantity,
        currency_id: "MXN" as const,
        unit_price: item.product.price,
      })),
      back_urls: {
        success: `${NEXT_PUBLIC_URL}/gracias`,
        failure: `${NEXT_PUBLIC_URL}/reintentar-compra`,
        pending: `${NEXT_PUBLIC_URL}/pago-pendiente`,
      },
      payer: {
        name,
        email,
      },
      shipments: {
        cost: shipping?.shipment?.total_pricing || 0,
      },
      statement_descriptor: "STICKYCOVERS",
      auto_return: "approved",
      notification_url: `${NEXT_PUBLIC_URL}/api/mercadopago/notification`,
    };

    // console.log(preferenceObject);

    mercadopago.preferences
      .create(preferenceObject)
      .then((preference) => {
        setPreference(preference);
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
      });
  }, [items]);

  return (
    <LayoutPedido>
      {/* <div className="modalMP"></div> */}
      {showError ? (
        <div className="space-y-6">
          <h2>¿Aún no ves nada? Posiblemente ocurrió un problema.</h2>
          <p>
            ¡Pero no te preocupes! Puedes contactarnos vía WhatsApp para hacer
            la compra directamente con nosotros:{" "}
          </p>
          <a
            className="block text-2xl font-bold text-primary link"
            href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.trim()}`}
          >
            {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
          </a>
        </div>
      ) : (
        <h2>
          Espera unos segundos, estás siendo redirigido a una{" "}
          <span className="text-primary">pantalla de pago</span>.
        </h2>
      )}
    </LayoutPedido>
  );
};

export default Pago;
