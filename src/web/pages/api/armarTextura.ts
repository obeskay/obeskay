import { parseForm } from "@/pages/api/armarSticker";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";

const defaultTextureUrl = `https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1685061078/Plane-min_hp02r0.jpg`;

export const FormidableError = formidable.errors.FormidableError;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data: any | null; error: string | null }>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      data: null,
      error: "Método no permitido",
    });
    return;
  }

  try {
    const { fields, files } = await parseForm(req);
    const image = await loadImage(files.image.filepath);
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

    const jpgData: any = await sharp(canvas.toBuffer("image/jpeg"))
      .jpeg({ quality: 82 })
      .toBuffer();

    // Configurar la respuesta para devolver la imagen cuadrada resultante
    res.setHeader("Content-Type", "image/jpeg");
    res.send(jpgData);
  } catch (e: any) {
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ data: null, error: e.message });
    } else {
      console.error(e);
      res.status(500).json({ data: null, error: e.message });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
