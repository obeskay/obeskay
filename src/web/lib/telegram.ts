import axios from "axios";

const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;

export function sendTelegramMsg(msg: string) {
  const parsedMsg = encodeURIComponent(`${msg}`);
  // Todo!: Ocultar el token de la API de Telegram
  axios.get(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${parsedMsg}&parse_mode=markdown&disable_web_page_preview=true`
  );
}
