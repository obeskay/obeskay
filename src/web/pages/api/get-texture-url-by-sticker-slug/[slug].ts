import { loginPayload, payload } from "@lib/payload";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import type { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";
import fs from "fs";

const defaultTextureUrl = `https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1685061078/Plane-min_hp02r0.jpg`;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data: any | null; error: string | null }>
) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({
      data: null,
      error: "Método no permitido",
    });
    return;
  }

  try {
    const slug = req.query.slug as string;

    // Consulta el producto en payload
    const payloadProductsRes = await payload.get("products", {
      params: {
        where: {
          slug: {
            equals: slug,
          },
        },
      },
    });

    const payloadProduct = payloadProductsRes?.data?.docs[0];

    // En caso de error, se detiene la ejecución
    if (!payloadProduct) {
      return res.status(500).json({
        error: "No se pudo obtener el producto de PayloadCMS",
        data: undefined,
      });
    }

    // Identifica si ya existe una textura para el producto
    let textureUrl = payloadProduct?.texture?.cloudinary?.secure_url;

    // En caso de que ya exista una textura, se detiene la ejecución
    if (textureUrl) {
      return res.status(200).json({
        data: {
          textureUrl,
        },
        error: null,
      });
    }

    // Obtiene el secure_url de la imagen de sticker
    const stickerUrl = payloadProduct?.cover?.cloudinary?.secure_url;

    // En caso de error, se detiene la ejecución
    if (!stickerUrl) {
      return res.status(500).json({
        error: "No se pudo obtener la imagen de sticker de PayloadCMS",
        data: undefined,
      });
    }

    // Carga la imagen de sticker
    const image = await loadImage(stickerUrl);

    const baseTexturePath = defaultTextureUrl;
    const baseTexture = await loadImage(baseTexturePath);

    // Obtener las dimensiones de la imagen recibida
    const { width, height } = image;

    // Calcular el tamaño del cuadrado basado en la dimensión más grande
    const size = Math.max(width, height);

    // Crear un lienzo cuadrado del mismo tamaño
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    // Dibujar la imagen de base en el lienzo
    ctx.drawImage(baseTexture, 0, 0, size, size);

    // Redimensionar la imagen recibida al 78.27% de su tamaño original
    const resizedWidth = width * 0.781;
    const resizedHeight = height * 0.781;
    const x = 0;
    const y = size - resizedHeight;
    ctx.drawImage(image, x, y, resizedWidth, resizedHeight);

    // Obtener el blob de la imagen
    const textureBuffer = await canvas.toBuffer("image/jpeg");

    // Crea un nuevo FormMultiPart (file)
    const payloadFormMultipartTextura = new FormData();

    // Use fs to read the buffer data and append it to the FormData object
    const tempFilePath = "./temp/tempTexture.jpg";
    fs.writeFileSync(tempFilePath, textureBuffer);
    payloadFormMultipartTextura.append(
      "file",
      fs.createReadStream(tempFilePath)
    );

    payloadFormMultipartTextura.append(
      "altText",
      "Textura 3D de tarjeta de " +
        slug?.replace(/-/g, " ") +
        " en Sticky Covers"
    );

    // console.log("payloadFormMultipartTextura: ", payloadFormMultipartTextura);

    // Sube el archivo a PayloadCMS como un multiForm al endpoint /media
    let payloadMediaResTextura;
    try {
      payloadMediaResTextura = await payload.post(
        "media",
        payloadFormMultipartTextura,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "No se pudo subir la textura a PayloadCMS",
        data: undefined,
      });
    }

    // console.log("payloadMediaResTextura: ", payloadMediaResTextura);

    // Obtiene la URL de la textura
    textureUrl = payloadMediaResTextura?.data?.doc?.url;

    try {
      // Hace login en Payload para obtener el token
      let tokenPayload = await loginPayload({
        serverSide: true,
      }).then((data) => data.token);

      await payload.patch(
        `products/${payloadProduct?.id}`,
        {
          texture: payloadMediaResTextura?.data?.doc?.id,
        },
        {
          headers: {
            Authorization: `JWT ${tokenPayload}`,
          },
        }
      );
    } catch (error) {
      console.error(error.response.data.errors);
      return res.status(500).json({
        error: "No se pudo vincular la textura al producto en PayloadCMS",
        data: undefined,
      });
    }
    res.status(200).json({
      data: {
        textureUrl,
      },
      error: null,
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({
      data: null,
      error: e.message,
    });
  }
};

export default handler;
