export const sendTelegramMsg = async (msg: string) => {
  const text = encodeURIComponent(msg)
    .replaceAll("!", "\\!")
    .replaceAll(".", "\\.");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${text}&parse_mode=MarkdownV2`
    );
    const response = await res.json();
    console.log("-----Mensaje enviado-----");
    console.log({
      ok: response.ok,
      result: response.result.text,
    });
    console.log("-----END OF: Mensaje enviado-----");
    console.log("\n\n\n");
  } catch (error) {
    console.log("-----Error al enviar mensaje-----");
    console.log(error);
    console.log("-----END OF: Error al enviar mensaje-----");
  }
};

export const sendTelegramMsgWithImage = async (msg: string, image: string) => {
  const text = encodeURIComponent(msg)
    .replaceAll("!", "\\!")
    .replaceAll(".", "\\.");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto?chat_id=${process.env.TELEGRAM_CHAT_ID}&caption=${text}&photo=${image}&parse_mode=MarkdownV2`
    );
    const response = await res.json();
    console.log("-----Mensaje enviado-----");
    console.log({
      ok: response.ok,
      result: response.result.text,
    });
    console.log("-----END OF: Mensaje enviado-----");
    console.log("\n\n\n");
  } catch (error) {
    console.log("-----Error al enviar mensaje-----");
    console.log(error);
    console.log("-----END OF: Error al enviar mensaje-----");
  }
};
