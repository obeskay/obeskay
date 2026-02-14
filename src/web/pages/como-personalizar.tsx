import React from "react";
import ItemAnimation from "../components/animations/ItemAnimation";

const comoPersonalizar = () => {
  return (
    <div className="layout">
      <div className="container flex flex-col max-w-2xl space-y-12">
        <h3 className="text-center">¿Cómo personalizar tu sticker?</h3>
        <h6>Para personalizar tu sticker, solo debes seguir estos pasos:</h6>
        {[
          {
            title: "Envíanos un WhatsApp",
            content: (
              <>
                Envíanos la imagen de tu diseño a nuestro{" "}
                <a
                  href={`https://wa.me/+525543897027`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  WhatsApp:
                  <br /> {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
                </a>
              </>
            ),
          },
          {
            title: "Recibe un link de pago",
            content: `Recibirás un link de pago para realizar tu compra. Ten en consideración que el costo de un sticker personalizado es de $29 MXN`,
          },
          {
            title: "Recibe tu sticker",
            content: `Recibirás tu sticker en la puerta de tu casa`,
          },
        ].map((item, i) => (
          <ItemAnimation key={item.title} type="item" initialinview={true}>
            <div className="flex items-center space-x-4 ">
              <h2
                className={`text-[6.5rem] leading-none ${
                  (i + 1) % 2 === 0 ? "text-primary" : "text-secondary"
                } w-16`}
              >
                {i + 1}
              </h2>
              <div className="space-y-4">
                <h2>{item.title}</h2>
                <p className="text-xl">{item.content}</p>
              </div>
            </div>
          </ItemAnimation>
        ))}
        <hr />
        <h3 className="text-center">
          ¡Así de fácil es personalizar tu tarjeta!
        </h3>
      </div>
    </div>
  );
};

export default comoPersonalizar;
