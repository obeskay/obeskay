import { CollectionConfig } from "payload/types";
import { isAdminOrAPI, isAdminOrAPIFieldLevel } from "../access/isAdminOrAPI";
import { isAdmin } from "../access/isAdmin";

const Clients: CollectionConfig = {
  slug: "clients",
  admin: {
    useAsTitle: "phone",
  },
  fields: [
    {
      type: "text",
      name: "name",
      label: "Nombre",
    },
    {
      type: "text",
      name: "phone",
      label: "Teléfono",
      required: true,
      unique: true,
    },
    {
      type: "text",
      name: "email",
      label: "Correo electrónico",
    },
    {
      // Tabs (Chat, Ordenes, Domicilios)
      type: "tabs",
      // Chat
      tabs: [
        {
          label: "Chat",
          fields: [
            // Array de conversaciones (Conversación)
            {
              type: "array",
              name: "conversations",
              fields: [
                // Chat ID
                {
                  type: "text",
                  name: "chatId",
                  label: "Chat ID",
                },
                // Thread ID
                {
                  type: "text",
                  name: "threadId",
                  label: "Thread ID",
                },
                // Última fecha de mensaje
                {
                  type: "text",
                  name: "lastMessage",
                  label: "Último mensaje",
                },
                // JSON de la conversación
                {
                  type: "json",
                  name: "messages",
                  label: "Mensajes",
                },
              ],
              admin: {
                components: {
                  RowLabel: ({ data }) => {
                    if (!data.threadId) return null;

                    return "-";
                  },
                },
              },
            },
          ],
        },
        // Ordenes
        {
          label: "Ordenes",
          fields: [
            // Orden
            {
              type: "relationship",
              relationTo: "orders",
              name: "order",
              label: "Orden",

              unique: true,
              maxDepth: 1,
            },
          ],
        },
        // Domicilios
        {
          label: "Domicilios",
          fields: [
            // Arreglo de domicilios
            {
              type: "array",
              name: "addresses",
              fields: [
                // Dirección
                {
                  type: "blocks",
                  label: "Domicilio",
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
                              label: "Zócalo",
                              value: "zocalo",
                            },
                            {
                              label: "División del Norte",
                              value: "divisionDelNorte",
                            },
                            {
                              label: "Etiopía",
                              value: "etiopia",
                            },
                            {
                              label: "Allende",
                              value: "allende",
                            },
                            {
                              label: "Bellas Artes",
                              value: "bellasArtes",
                            },
                            {
                              label: "Hidalgo",
                              value: "hidalgo",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
              admin: {
                components: {
                  RowLabel: ({ data }) => {
                    if (!data.address) return null;

                    return "X";
                  },
                },
              },
            },
          ],
        },
      ],
    },
  ],
  access: {
    delete: isAdmin,
    read: isAdminOrAPI,
    update: isAdminOrAPI,
    create: isAdminOrAPI,
  },
  timestamps: true,
};

export default Clients;
