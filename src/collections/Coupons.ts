import { CollectionConfig } from "payload/types";
import payload from "payload";
import { isAdmin } from "../access/isAdmin";

const Coupons: CollectionConfig = {
  slug: "coupons",
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: "id",
  },
  fields: [
    {
      name: "id",
      type: "text",
      label: "Código",
    },
    {
      name: "type",
      type: "radio",
      label: "Tipo",
      required: true,
      defaultValue: "percentage",
      options: [
        {
          label: "Porcentage",
          value: "percentage",
        },
        {
          label: "Fijo",
          value: "absolute",
        },
      ],
    },
    {
      name: "discount",
      type: "number",
      label: "Descuento",
      required: true,
      defaultValue: 0,
      min: 0,
    },

    // Sidebar panel
    {
      name: "uses",
      type: "number",
      label: "Usos",
      required: true,
      defaultValue: 0,
      min: 0,
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "checkbox",
      name: "active",
      label: "Activo",
      required: true,
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};

export default Coupons;
