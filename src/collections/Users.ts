import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 60 * 60, // 1 hour
  },
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      type: "text",
      name: "firstname",
      label: "Nombre",
      required: false,
    },
    {
      type: "select",
      name: "role",
      label: "Rol",
      admin: {
        position: "sidebar",
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "API",
          value: "api",
        },
      ],
    },
  ],
};

export default Users;
