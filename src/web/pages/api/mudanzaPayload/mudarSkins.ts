// path: /pages/api/mudanzaPayload/mudarSkins.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getSkinsPopulares } from "@lib/api";
import { subirMedia, subirProducto } from "@lib/api/payload";
import fs from "fs/promises";
import { loginPayload, payload } from "@lib/payload";

const defaultPrice = 50;
const defaultStock = 1;

export default async function mudarSkins(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const strapiProducts = await getSkinsPopulares();

    // Recorre cada skin
    for (let strapiProduct of strapiProducts) {
      // Extrae los datos del strapiProduct
      let {
        Name: strapiName,
        slug: strapiSlug,
        Cover: strapiCover,
      } = strapiProduct.attributes;

      // Extrae la URL de la portada
      let strapiProductCover = strapiCover?.data.attributes.url;

      // console.log("strapiProductCover: ", strapiProductCover);

      // Descarga el archivo desde la URL
      let responseSticker = await fetch(strapiProductCover);
      let blobSticker = await responseSticker.blob();

      // Crea un nuevo FormMultiPart (file)
      let formMultipart = new FormData();
      formMultipart.append("image", blobSticker, strapiSlug + ".jpg");

      // Obtiene la textura del archivo subido a través del endpoint local /api/armarSticker, este nos devolverá un arrayBuffer
      let stickerRes = await fetch(`http://127.0.0.1:3000/api/armarSticker`, {
        method: "POST",
        body: formMultipart,
        headers: {
          accept: "image/jpg",
        },
      });

      // En caso de error, se detiene la ejecución
      if (!stickerRes) {
        return res.status(500).json({ error: "No se pudo obtener el sticker" });
      }

      // Adapta la respuesta en un formato que pueda ser subido al endpoint /media (en blob)
      let stickerResBlob = await stickerRes.blob();

      // Crea un nuevo FormMultiPart (file)
      const payloadFormMultipart = new FormData();
      payloadFormMultipart.append("file", stickerResBlob, strapiSlug + ".jpg");
      payloadFormMultipart.append("altText", strapiName);

      // console.log("payloadFormMultipart: ", payloadFormMultipart);

      // Sube el archivo a PayloadCMS como un multiForm al endpoint /media
      let payloadMediaRes = await payload.post("media", payloadFormMultipart, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // En caso de error, se detiene la ejecución
      if (!payloadMediaRes) {
        return res
          .status(500)
          .json({ error: "No se pudo subir el archivo de sticker" });
      }

      // Vamos ahora a armar la textura con la imagen del sticker
      // Creamos un nuevo FormMultiPart (file)
      let formMultipartTextura = new FormData();
      formMultipartTextura.append("image", stickerResBlob, strapiSlug + ".jpg");

      // Sube la imagen del sticker a /api/armarTextura para armar la textura
      let texturaRes = await fetch(`http://localhost:3000/api/armarTextura`, {
        method: "POST",
        body: formMultipartTextura,
        headers: {
          accept: "image/jpg",
        },
      });

      // En caso de error, se detiene la ejecución
      if (!texturaRes) {
        console.log("error: ", "No se pudo obtener la textura");
        return;
      }

      // Adapta la respuesta en un formato que pueda ser subido al endpoint /media
      let texturaResBlob = await texturaRes.blob();

      // Crea un nuevo FormMultiPart (file)
      const payloadFormMultipartTextura = new FormData();
      payloadFormMultipartTextura.append(
        "file",
        texturaResBlob,
        strapiSlug + ".jpg"
      );
      payloadFormMultipartTextura.append("altText", strapiName);

      // Sube el archivo a PayloadCMS como un multiForm al endpoint /media
      let payloadMediaResTextura = await payload.post(
        "media",
        payloadFormMultipartTextura,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // En caso de error, se detiene la ejecución
      if (!payloadMediaResTextura) {
        return res
          .status(500)
          .json({ error: "No se pudo subir el archivo de textura" });
      }

      // Extrae el id del archivo de sticker
      let payloadMediaIdSkin = payloadMediaRes.data.doc.id;

      // Extrae el id del archivo de textura
      let payloadMediaIdTextura = payloadMediaResTextura.data.doc.id;

      // console.log("payloadMediaIdSkin: ", payloadMediaIdSkin);
      // console.log("payloadMediaIdTextura: ", payloadMediaIdTextura);

      // Crea un nuevo producto
      const productData = {
        name: strapiName,
        price: defaultPrice,
        stock: defaultStock,
        sales: 0,
        isCustom: false,
        isVisible: true,
        cover: payloadMediaIdSkin,
        texture: payloadMediaIdTextura,
      };

      // Hace login en Payload para obtener el token
      let tokenPayload = await loginPayload().then((data) => data.token);

      // Sube el producto a PayloadCMS
      let payloadProductRes = await payload.post("products", productData, {
        headers: {
          Authorization: `JWT ${tokenPayload}`,
        },
      });

      // En caso de error, se detiene la ejecución
      if (!payloadProductRes) {
        return res
          .status(500)
          .json({ error: "No se pudo subir el producto a PayloadCMS" });
      }

      // Espera 3 segundo para no saturar el servidor
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
}
