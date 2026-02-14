import { GlobalConfig } from "payload/types";

const MinimumStock: GlobalConfig = {
  slug: "minimumStock",
  admin: {
    description: "El número mínimo de stock para enviar un mensaje de telegram",
  },
  fields: [
    {
      type: "number",
      name: "minimumStock",
      label: "Stock mínimo",
      required: true,
    },
  ],
};

export default MinimumStock;
