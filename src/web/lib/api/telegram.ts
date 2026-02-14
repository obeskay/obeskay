import axios from "axios";

const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export async function sendConfirmacionTelegramMsg(data, cart) {
  const { NombreCliente, EmailCliente, TelefonoCliente, medioEnvio } = data;

  // Se desglosa el carrito de compra
  let cartDesglosado = "";
  for (let index = 0; index < cart.length; index++) {
    const item = cart[index];
    cartDesglosado += String(
      "\n-" + item.quantity + "x " + item.attributes.Name
    );
  }

  let direccion;

  if (medioEnvio === "envioDomicilio") {
    const {
      calle,
      numeroExterior,
      numeroInterior,
      referencia,
      colonia,
      ciudad,
      codigoPostal,
      estado,
    } = data;
    direccion =
      "\n\n A la dirección: \n" +
      "*" +
      String(
        calle +
          " " +
          numeroExterior +
          ", " +
          (numeroInterior && String("Interior " + numeroInterior + ", ")) +
          colonia +
          ", " +
          ciudad +
          ", C.P. " +
          codigoPostal +
          " " +
          estado +
          " y con referencia: " +
          referencia +
          "*"
      );
  } else {
    const { estacionMetro } = data;
    direccion = "\n\nCon entrega en metro *" + estacionMetro + "*";
  }

  // Redactamos el mensaje a partir de un template y la información de la compra
  const parsedMessage = encodeURIComponent(
    "¡Hola " +
      String(NombreCliente) +
      "! 😊 Te enviamos este mensaje para confirmar tu pedido: \n" +
      cartDesglosado +
      direccion +
      String(
        "\n\nTu número es: " +
          TelefonoCliente +
          "\nY tu correo es: " +
          EmailCliente
      ) +
      "\n\n ¿Son todos los datos correctos? JEJEJEJE"
  );

  // Enviamos el menaje
  axios
    .get(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${parsedMessage}&parse_mode=markdown&disable_web_page_preview=true`
    )
    .then((res) => {
      const numero = "\n\n https://wa.me/52" + String(TelefonoCliente);
      axios.get(
        `https://api.telegram.org/bot5188359052:AAFHiBA6pwv4OZTbts1nZ-BZzzsMcjkTgUY/sendMessage?chat_id=-777503990&text=${numero}`
      );
    });
}
