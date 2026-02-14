import { loginPayload, payload } from "@lib/payload";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import type { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";
import fs from "fs";

const shadowsOverlayUrl = `https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1701749425/rosatht7z6yqvatfazvk.png`;
const chipUrl = `https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1701749427/jvm0dhlwcjzprejiviwx.png`;

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
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

    // Obtiene el secure_url de la imagen de sticker
    const stickerUrl = payloadProduct?.cover?.cloudinary?.secure_url;

    // En caso de error, se detiene la ejecución
    if (!stickerUrl) {
      return res.status(500).json({
        error: "No se pudo obtener la imagen de sticker de PayloadCMS",
        data: undefined,
      });
    }

    // Cargar la imagen de sticker
    const image = await loadImage(stickerUrl);

    // Cargar la imagen del chip
    const chipImage = await loadImage(chipUrl);

    // Cargar la imagen de la sombra
    const shadowsOverlayImage = await loadImage(shadowsOverlayUrl);

    // Obtener las dimensiones de la imagen recibida
    const { width, height } = image;

    // Obtener el tamaño del lienzo
    const size = 1080;

    // Crear un lienzo cuadrado del mismo tamaño
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    // Dibujar un fondo blanco
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    // Dibujar la imagen de sticker
    // Redimensionar la imagen recibida al 78.27% de su tamaño original
    const scaleFactor = 0.82;
    const resizedWidth = width * scaleFactor;
    const resizedHeight = height * scaleFactor;
    // Posicionar la imagen en el centro del lienzo
    const x = size / 2 - resizedWidth / 2;
    const y = size / 2 - resizedHeight / 2;
    ctx.drawImage(image, x, y, resizedWidth, resizedHeight);

    // Dibujar la imagen del chip
    ctx.drawImage(
      chipImage,
      size - chipImage.width,
      size - chipImage.height,
      size,
      size
    );

    // Dibujar la imagen de la sombra ccon "hard light"
    ctx.globalCompositeOperation = "hard-light";

    ctx.drawImage(
      shadowsOverlayImage,
      size - shadowsOverlayImage.width,
      size - shadowsOverlayImage.height,
      size,
      size
    );

    // Devuelve la imagen a normal para que no afecte a las siguientes
    ctx.globalCompositeOperation = "source-over";

    // Obtener el blob de la imagen
    const textureBuffer = await canvas.toBuffer("image/jpeg", 80);

    // Devuelve la imagen en la res
    res.setHeader("Content-Type", "image/jpeg");
    return res.status(200).send(textureBuffer);

    // Crea un nuevo FormMultiPart (file)
    const payloadFormMultipartTextura = new FormData();

    // Use fs to read the buffer data and append it to the FormData object
    const tempFilePath = "./temp/tempRender.jpg";
    fs.writeFileSync(tempFilePath, textureBuffer);
    payloadFormMultipartTextura.append(
      "file",
      fs.createReadStream(tempFilePath)
    );

    payloadFormMultipartTextura.append(
      "altText",
      "Render de tarjeta de " + slug?.replace(/-/g, " ") + " en Sticky Covers"
    );

    // console.log("payloadFormMultipartTextura: ", payloadFormMultipartTextura);

    // Sube el archivo a PayloadCMS como un multiForm al endpoint /media
    let payloadMediaRes;
    try {
      payloadMediaRes = await payload.post(
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
    let mediaUrl = payloadMediaRes?.data?.doc?.url;

    res.status(200).json({
      data: {
        mediaUrl,
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
