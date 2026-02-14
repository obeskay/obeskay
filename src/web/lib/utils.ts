import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchAiImage(prompt: string) {
  // Primero, obtenemos la salida del modelo finetunning de OpenAI
  const openAiResponse = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "ft:gpt-3.5-turbo-0125:personal:sc-es-to-sd3-v2:9SH1oqt3",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
    }
  );

  const translatedPrompt =
    openAiResponse.data.choices[0].message.content.trim();

  const payload = {
    cfg_scale: 7,
    height: 1344,
    width: 768,
    sampler: "K_DPM_2_ANCESTRAL",
    samples: 1,
    steps: 30,
    text_prompts: [{ text: translatedPrompt }],
  };

  // Luego, pasamos esa salida a la API de StabilityAI para generar la imagen usando SDXL 1.0
  const stabilityAiResponse = await axios.post(
    `https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STABILITY_AI_API_KEY}`,
      },
    }
  );

  if (stabilityAiResponse.status === 200) {
    return stabilityAiResponse.data.artifacts[0].base64; // Ajuste basado en el formato de respuesta de la API
  } else {
    throw new Error(
      `${stabilityAiResponse.status}: ${stabilityAiResponse.data.toString()}`
    );
  }
}

export const phoneRegExp = /^\d{10}$/;
