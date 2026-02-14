import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import util from "util";
import formidable from "formidable";
import FormData from "form-data";
import { loginPayload, payload } from "@/lib/payload";

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
      error: "Method Not Allowed",
    });
    return;
  }

  try {
    const { files } = await parseForm(req);
    // console.log("files: ", files);
    const image = files.image;

    // Verifica si existe el archivo y lee su contenido
    const readFile = util.promisify(fs.readFile);
    const imageBuffer = await readFile(image.filepath);

    // Create form data
    const formData = new FormData();
    formData.append("file", imageBuffer, `${Date.now()}.jpg`);
    formData.append("altText", "Prueba");

    // Upload to Payload
    const payloadMediaRes = await payload.post("media", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const mediaId = payloadMediaRes?.data?.doc?.id;

    // Crea un nuevo producto
    const productData = {
      name: `Personalizado (${mediaId})`,
      price: 29,
      stock: 0,
      sales: 0,
      isCustom: true,
      isVisible: false,
      cover: mediaId,
    };

    // Hace login en Payload para obtener el token
    let tokenPayload = await loginPayload().then((data) => data.token);

    // Sube el producto a PayloadCMS
    let payloadProductRes = await payload.post("products", productData, {
      headers: {
        Authorization: `JWT ${tokenPayload}`,
      },
    });

    // Extraer y enviar solo datos relevantes
    const dataToSend = {
      mediaId,
      product: payloadProductRes?.data?.doc,
    };

    res.status(200).json({
      error: null,
      data: dataToSend,
    });
  } catch (e: any) {
    console.error(e); // Log the error for server-side debugging
    res.status(500).json({
      data: null,
      error: e?.response?.data?.errors?.[0]?.message || e.toString(),
    });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
