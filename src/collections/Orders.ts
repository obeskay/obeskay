import { CollectionConfig } from "payload/types";
import { sendTelegramMsg } from "../functions/telegram";
import payload from "payload";
import { isAdmin, isAdminFieldLevel } from "../access/isAdmin";
import { isAdminOrAPI, isAdminOrAPIFieldLevel } from "../access/isAdminOrAPI";
import { sendEmail } from "../functions/email";
import { constructEmailGraciasPorTuCompra } from "../functions/constructEmailGraciasPorTuCompra";

const Order: CollectionConfig = {
  slug: "orders",
  access: {
    delete: isAdmin,
    read: isAdminOrAPI,
    update: isAdminOrAPI,
    create: isAdminOrAPI,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        // Carrito
        {
          label: "Carrito",
          fields: [
            // Productos
            {
              type: "array",
              name: "items",
              label: "Productos",
              fields: [
                // Item
                {
                  type: "relationship",
                  relationTo: "products",
                  label: "Productos",
                  name: "product",
                  required: true,
                  unique: false,
                  maxDepth: 3,
                },
                // Cantidad
                {
                  type: "number",
                  name: "quantity",
                  required: true,
                  label: "Cantidad",
                  defaultValue: 1,
                  min: 0,
                },
              ],
              admin: {
                components: {
                  RowLabel: ({ data }) => {
                    if (!data.product) return null;

                    // Return null even if product exists to satisfy type
                    return null;
                  },
                },
              },
            },
          ],
        },
        // Contacto
        {
          label: "Contacto",
          fields: [
            {
              type: "text",
              name: "name",
              label: "Nombre",
            },
            {
              type: "row",
              fields: [
                {
                  type: "text",
                  name: "phone",
                  label: "Teléfono",
                },
                {
                  type: "text",
                  name: "email",
                  label: "Email",
                },
              ],
            },
            {
              type: "array",
              name: "interactionHistory",
              label: "Historial de Interacciones",
              fields: [
                {
                  type: "text",
                  name: "interactionType",
                  label: "Tipo de Interacción",
                },
                {
                  type: "textarea",
                  name: "interactionSummary",
                  label: "Resumen de la Interacción",
                },
                {
                  type: "date",
                  name: "interactionDate",
                  label: "Fecha de Interacción",
                },
              ],
            },
            {
              type: "checkbox",
              name: "subscriptionStockNotification",
              label: "Suscripción a Notificación de Stock",
            },
            {
              type: "array",
              name: "productCustomizationOptions",
              label: "Opciones de Personalización del Producto",
              fields: [
                {
                  type: "select",
                  name: "tipoDeSticker",
                  label:
                    "Tipo de Sticker (Para metro, para tarjeta de débito, etc.)",
                  options: [
                    {
                      label: "Para tarjeta de movilidad",
                      value: "paraMetro",
                    },
                    {
                      label: "Para tarjeta de débito/crédito",
                      value: "paraTarjetaDeDebito",
                    },
                    {
                      label: "Corte personalizado",
                      value: "cortePersonalizado",
                    },
                  ],
                },
              ],
            },
            {
              type: "textarea",
              name: "postSaleFeedback",
              label: "Feedback Post-Venta",
            },
          ],
        },
        // Cupón
        {
          label: "Cupón",
          fields: [
            {
              type: "relationship",
              name: "coupon",
              label: "Cupón",
              relationTo: "coupons",
              hasMany: false,
              admin: {
                condition: (data) => data.coupon,
              },
            },
          ],
        },
        // Pago
        {
          label: "Pago",
          fields: [
            {
              type: "group",
              name: "payment",
              label: "Datos de pago",
              admin: {
                condition: (data) => data.paid,
              },
              fields: [
                {
                  type: "json",
                  name: "jsonpayment",
                },
                {
                  type: "text",
                  name: "paymentMethod",
                  label: "Método de pago",
                },
                {
                  type: "text",
                  name: "paymentId",
                  label: "ID de pago",
                },
                {
                  type: "text",
                  name: "paymentStatus",
                  label: "Estado de pago",
                },
                {
                  type: "date",
                  name: "paymentDate",
                  label: "Fecha de pago",
                },
                {
                  type: "json",
                  name: "jsonPayment",
                  label: "JSON de pago",
                },
              ],
            },
          ],
        },
        // Envío
        {
          label: "Envío",
          fields: [
            {
              type: "group",
              name: "shipping",
              label: "Método de envío",
              fields: [
                // Shipments (para skydropx)
                {
                  type: "group",
                  name: "shipment",
                  label: "Envío",
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          type: "text",
                          name: "status",
                          defaultValue: "pending",
                        },
                        {
                          type: "text",
                          name: "id",
                          label: "ID de envío",
                        },
                      ],
                    },
                    {
                      type: "row",
                      fields: [
                        {
                          type: "text",
                          name: "provider",
                          label: "Proveedor",
                        },
                        {
                          type: "text",
                          name: "service_level_name",
                          label: "Servicio",
                        },
                        {
                          type: "text",
                          name: "service_level_code",
                          label: "Código de servicio",
                        },
                      ],
                    },
                    {
                      type: "row",
                      fields: [
                        {
                          type: "number",
                          name: "days",
                          label: "Días",
                        },
                        {
                          type: "number",
                          name: "total_pricing",
                          label: "Precio",
                        },
                      ],
                    },
                    {
                      type: "group",
                      name: "label",
                      label: "Etiqueta",
                      fields: [
                        {
                          type: "text",
                          name: "id",
                          label: "ID de etiqueta",
                        },
                        {
                          type: "text",
                          name: "tracking_number",
                          label: "Número de rastreo",
                        },
                        {
                          type: "text",
                          name: "label_url",
                        },
                        {
                          type: "text",
                          name: "tracking_url_provider",
                        },
                        {
                          type: "text",
                          name: "status",
                          label: "Estado",
                        },
                        {
                          type: "text",
                          name: "tracking_status",
                          label: "Estado de rastreo",
                        },
                        {
                          type: "number",
                          name: "rate_id",
                          label: "ID de tarifa",
                        },
                      ],
                    },
                  ],
                },
                // Método de envío
                {
                  type: "radio",
                  name: "shippingMethod",
                  label: "Método de envío",
                  options: [
                    {
                      label: "Entrega en Metro",
                      value: "metro",
                    },
                    {
                      label: "Entrega en domicilio",
                      value: "domicilio",
                    },
                  ],
                },
                {
                  type: "text",
                  name: "lineAddress",
                  label: "Dirección complete",
                },
                {
                  type: "text",
                  name: "references",
                  label: "Referencias",
                },
                {
                  type: "text",
                  name: "interiorNumber",
                  label: "Número interior",
                },
                {
                  type: "blocks",
                  label: "Dirección",
                  name: "address",
                  maxRows: 1,
                  blocks: [
                    {
                      slug: "address",
                      fields: [
                        {
                          type: "row",
                          fields: [
                            {
                              type: "text",
                              name: "street",
                              label: "Calle",
                              required: true,
                              admin: {
                                width: "60%",
                              },
                            },
                            {
                              type: "text",
                              name: "exteriorNumber",
                              label: "Número ext.",
                              required: true,
                              admin: {
                                width: "20%",
                              },
                            },
                            {
                              type: "text",
                              name: "interiorNumber",
                              label: "Número int.",
                              required: false,
                              admin: {
                                width: "20%",
                              },
                            },
                          ],
                        },
                        {
                          type: "row",
                          fields: [
                            {
                              type: "text",
                              name: "colony",
                              label: "Colonia",
                              required: true,
                              admin: {
                                width: "80%",
                              },
                            },
                            {
                              type: "text",
                              name: "zipCode",
                              label: "Código postal",
                              required: true,
                              admin: {
                                width: "20%",
                              },
                            },
                          ],
                        },
                        {
                          type: "row",
                          fields: [
                            {
                              type: "text",
                              name: "city",
                              label: "Ciudad / Delegación",
                              required: true,
                            },
                            {
                              type: "text",
                              name: "state",
                              label: "Estado",
                              required: true,
                            },
                          ],
                        },
                        {
                          type: "text",
                          name: "references",
                          label: "Referencias",
                          required: true,
                        },
                      ],
                    },
                    {
                      slug: "metroStation",
                      fields: [
                        {
                          type: "select",
                          name: "metroStation",
                          label: "Estación de metro",
                          required: true,
                          options: [
                            {
                              label: "Barranca del Muerto",
                              value: "barrancaDelMuerto",
                            },
                            {
                              label: "División del Norte",
                              value: "divisionDelNorte",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    // Sidebar
    {
      name: "id",
      label: "ID",
      type: "number",
      admin: {
        position: "sidebar",
      },
      // Solo se puede leer, ya que se actualiza automáticamente tras una compra
      access: {
        read: () => true,
        create: () => false,
        update: () => false,
      },
    },
    {
      type: "number",
      name: "subtotal",
      label: "Subtotal",
      defaultValue: 0,
      min: 0,
      admin: {
        position: "sidebar",
      },
      // Solo se puede leer, ya que se actualiza automáticamente tras una compra
      access: {
        read: () => true,
        create: () => false,
        update: () => false,
      },
    },
    {
      type: "number",
      name: "total",
      label: "Total",
      defaultValue: 0,
      min: 0,
      admin: {
        position: "sidebar",
      },
      // Solo se puede leer, ya que se actualiza automáticamente tras una compra
      access: {
        read: () => true,
        create: () => false,
        update: () => false,
      },
    },
    {
      type: "checkbox",
      name: "paid",
      label: "Pagado",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
      access: {
        read: () => true,
        update: isAdminOrAPIFieldLevel,
        create: isAdminOrAPIFieldLevel,
      },
    },
    // Estado
    {
      type: "select",
      name: "status",
      label: "Estado",
      admin: {
        position: "sidebar",
      },
      defaultValue: "unfinished",
      options: [
        {
          label: "Sin terminar",
          value: "unfinished",
        },
        {
          label: "En espera de pago",
          value: "awaitingPayment",
        },
        {
          label: "En espera para ser impreso",
          value: "awaitingPrinting",
        },
        {
          label: "En espera para recibir impresión",
          value: "awaitingPrintDelivery",
        },
        {
          label: "En espera para ser enviado",
          value: "awaitingShipping",
        },
        {
          label: "En espera para ser entregado",
          value: "awaitingDelivery",
        },
        {
          label: "Entregado",
          value: "delivered",
        },
        {
          label: "Cancelado",
          value: "cancelled",
        },
        {
          label: "Reembolsado",
          value: "refunded",
        },
        {
          label: "Error",
          value: "error",
        },
      ],
    },
    {
      type: "date",
      name: "deliveryDate",
      label: "Fecha de entrega",
      admin: {
        position: "sidebar",
        condition: ({ status }) => status === "delivered",
      },
    },
  ],
  hooks: {
    beforeOperation: [
      // Asignamos un ID al carrito
      async ({ args, operation }) => {
        // Si se crea el carrito
        if (operation === "create") {
          // Obtenemos el total de carritos
          const highest = await payload.find({
            collection: args.collection?.config?.slug,
            limit: 1,
            sort: "-" + "id",
          });

          const id = parseInt(highest.docs[0]?.id || 0) + 1;

          return {
            ...args,
            data: {
              ...args.data,
              id: id.toString(),
            },
          };
        }
      },
    ],
    beforeChange: [
      // Si la cantidad de un item es 0, eliminarlo del carrito.
      async ({ data }) => {
        // Checamos si la data trae el campo de items
        if (data.items) {
          for (const item of data.items) {
            if (item.quantity === 0) {
              // Obtenemos el index del item
              const index = data.items.indexOf(item);
              // Lo eliminamos
              data.items.splice(index, 1);
            }
          }
        }

        return data;
      },

      // Actualización del total del carrito.
      async ({ data, req: { payload }, originalDoc }) => {
        // Checamos si la data trae el campo de items
        if (data.items && data.items !== originalDoc?.items) {
          // Inicializamos el total
          let subtotal = 0;
          // Recorremos los items
          for (const item of data.items) {
            // Obtenemos el producto
            const product = await payload.findByID({
              collection: "products",
              id: item.product,
            });

            // Sumamos el total
            subtotal += product.price * item.quantity;
          }
          // Actualizamos el total
          data.subtotal = subtotal;

          // Si hay costo de envío, lo sumamos
          if (data.shippingCost) {
            data.total = subtotal + data.shipping.shipment.total_pricing;
          } else {
            data.total = subtotal;
          }

          // Si hay un cupón
          if (data.coupon) {
            // Obtenemos la información del cupón
            const coupon = await payload.findByID({
              collection: "coupons",
              id: data.coupon,
            });

            if (coupon.type === "percentage") {
              // Obtenemos el porcentaje
              const percentage = 1 - coupon.discount / 100;

              // Actualizamos el total
              data.total = subtotal * percentage;
            } else if (coupon.type === "fixed") {
              // Actualizamos el total
              data.total = subtotal - coupon.discount;
            }
          }
        }

        return data;
      },

      // Si el pago se realiza, aumentamos las ventas de cada producto comprado.
      async ({ data, req: { payload }, originalDoc }) => {
        if (data.paid && !originalDoc?.paid) {
          // Recorremos los items
          originalDoc?.items.map(async (item) => {
            // Obtenemos el producto
            const product = await payload.findByID({
              collection: "products",
              id: item.product,
            });

            // Aumentamos las ventas
            product.sales += item.quantity;
          });
        }

        return data;
      },
    ],
    afterChange: [
      // Notificación a n8n
      async ({ operation, doc, previousDoc }) => {
        try {
          const response = await fetch(
            "https://n8n.app.obeskay.com/webhook/stickycovers-venta-exitosa",
            {
              method: "POST",
              body: JSON.stringify({
                operation,
                doc,
                previousDoc,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          // if (!response.ok) {
          //   throw new Error("Failed to send notification to n8n");
          // }
        } catch (error) {
          console.error(error);
        }
      },

      // Notificación de carrito pagado.
      async ({ doc, previousDoc }) => {
        if (doc.paid && !previousDoc?.paid) {
          // Ponemos los items en una lista
          const items = doc?.items
            .map((item) => {
              return `• ${item?.quantity} x ${item?.product?.name}`;
            })
            .join("\n");

          // Enviamos el correo
          sendEmail(
            {
              email: doc.email,
              name: doc.name,
            },
            `¡Gracias por tu compra ${doc.name.split(" ")[0]}!`,
            constructEmailGraciasPorTuCompra(doc)
          ).catch((err) => {
            console.log(err);
            // We stringify the error and send it as a message to telegram
            const text = `Error al enviar el correo de confirmación: ${JSON.stringify(
              err
            )}`;
            sendTelegramMsg(text);
          });
        }
      },
    ],
  },
};

export default Order;
