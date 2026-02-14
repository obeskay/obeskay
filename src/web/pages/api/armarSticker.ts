import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import formidable from "formidable";
import { createCanvas, loadImage } from "@napi-rs/canvas";

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};

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
    const { files } = await parseForm(req);
    const imageFile = files.image.filepath;

    // Obtener metadatos para detectar orientación y dimensiones
    const metadata: any = await sharp(files.image.filepath).metadata();

    const isHorizontal = metadata?.width > metadata?.height;

    // Calcular las dimensiones deseadas basadas en la orientación
    const [targetWidth, targetHeight] = [1080, Math.round(1080 * 1.588)];

    let transform = sharp(files.image.filepath);

    if (isHorizontal) {
      // Rotar la imagen si es horizontal
      transform = transform.rotate(-90);
    }

    const imageBuffer = await transform
      .resize(targetWidth, targetHeight, {
        // Escalar la imagen para llenar el espacio manteniendo el aspecto
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy, // o 'centre' si quieres centrar
      })
      .toBuffer();

    // Asegúrate de que las dimensiones del canvas coincidan con las dimensiones de salida deseadas
    const canvas = createCanvas(targetWidth, targetHeight);
    const ctx = canvas.getContext("2d");

    // Cargar la imagen escalada en el canvas
    const img = await loadImage(imageBuffer);

    // Fondo blanco
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, targetWidth, targetHeight);
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    const jpgData: any = await sharp(canvas.toBuffer("image/jpeg"))
      .jpeg({ quality: 90 })
      .toBuffer();

    // Configurar la respuesta para devolver la imagen cuadrada resultante
    res.setHeader("Content-Type", "image/jpeg");
    res.send(jpgData);
  } catch (e: any) {
    if (e instanceof formidable.errors.FormidableError) {
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
