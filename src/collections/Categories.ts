import { CollectionConfig } from "payload/types";
import { sendTelegramMsgWithImage } from "../functions/telegram";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrAPI, isAdminOrAPIFieldLevel } from "../access/isAdminOrAPI";

import slugify from "slugify";

const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    read: () => true,
    update: isAdminOrAPI,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      type: "text",
      name: "slug",
      unique: true,
      defaultValue: "slug",
      access: {
        read: () => true,
        create: () => false,
        update: () => false,
      },
    },
    {
      type: "upload",
      relationTo: "media",
      name: "cover",
      required: true,
      maxDepth: 3,
    },
    {
      type: "text",
      name: "name",
      label: "Nombre",
      required: true,
      localized: true,
    },
    {
      type: "richText",
      name: "description",
      label: "Descripción",
    },
    {
      type: "checkbox",
      name: "isVisible",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "relationship",
      relationTo: "products",
      name: "products",
      hasMany: true,
      required: true,
    },
  ],
  hooks: {
    beforeValidate: [
      // Crea un slug a partir del nombre
      async ({ req: { payload }, data, operation }) => {
        if (operation === "create") {
          let slug = slugify(data.name, {
            lower: true,
          });

          // Verificamos que el slug no exista
          const slugExists = await payload.find({
            collection: "categories",
          });

          if (slugExists.docs.length > 0) {
            slug += `-${slugExists.docs.length + 1}`;
          }

          data.slug = slug;

          console.log("Slug", data);
        }

        return data;
      },
    ],
    afterChange: [
      async ({
        req, // request object
        doc, // full document data
        operation, // name of the operation ie. 'create', 'update'
        previousDoc, // previous state of the doc for 'update' operations
      }) => {
        // Si el stock es bajo (menos del mínimo establecido en el global) enviar un mensaje de telegram
        if (operation === "update" && doc.stock !== previousDoc.stock) {
          // Obtenemos la imagen
          const media = await req.payload.findByID({
            collection: "media",
            id: doc.cover,
          });

          // Obtenemos el mínimo de stock
          const minimumStock = await req.payload.findGlobal({
            slug: "minimumStock",
          });

          // Si el stock es menor al mínimo
          if (doc.stock < minimumStock.minimumStock) {
            // Enviamos mensaje de telegram
            await sendTelegramMsgWithImage(
              `⚠️ ¡Alerta! \n\nLa box: *${
                doc.name
              }* está por agotarse. \n\nSolo queda${
                doc.stock > 1 ? "n" : ""
              } *${doc.stock}* unidad${doc.stock > 1 ? "es" : ""}.`,
              media?.cloudinary?.secure_url
            );
          }
        }

        return doc;
      },
    ],
  },
};

export default Categories;
