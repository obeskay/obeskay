import { GlobalConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";

const Metro: GlobalConfig = {
  slug: "metro",
  admin: {
    description: "Configuración de entrega en metro.",
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      type: "array",
      name: "metroStations",
      label: "Estaciones de metro",
      fields: [
        {
          type: "text",
          name: "name",
          label: "Nombre",
          required: true,
        },
        {
          type: "text",
          name: "line",
          label: "Línea",
          required: true,
          defaultValue: "Línea 2",
        },
        {
          type: "text",
          name: "id",
          label: "Valor",
          admin: {
            description:
              "Valor que se guarda en la base de datos como ID. Usa el nombre en formato slug.",
          },
        },
        {
          type: "checkbox",
          name: "active",
          label: "Activo",
          required: true,
          defaultValue: true,
        },
        {
          type: "relationship",
          name: "image",
          label: "Imagen",
          relationTo: "media",
          required: true,
        },
      ],
    },

    // Sidebar position
    {
      type: "number",
      name: "metroPrice",
      label: "Precio de entrega en metro",
      required: true,
      min: 0,
      defaultValue: 20,
      admin: {
        position: "sidebar",
      },
    },
  ],
};

export default Metro;
