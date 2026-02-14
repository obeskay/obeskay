import ItemAnimation from "./animations/ItemAnimation";
import Image from "next/image";
import Icon from "./Icon";
import WhatsappLogo from "@phosphor-icons/react/dist/icons/WhatsappLogo";
import CreditCard from "@phosphor-icons/react/dist/icons/CreditCard";
import Truck from "@phosphor-icons/react/dist/icons/Truck";
import Sticker from "@phosphor-icons/react/dist/icons/Sticker";
import { cn } from "@/lib/utils";

const itemsBeneficios = [
  {
    title: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    description:
      "Mándanos una imágen por WhatsApp para personalizar tu tarjeta",
    icon: (
      <a
        href={`https://wa.me/+525543897027`}
        aria-label="Contacto de Whatsapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/WhatsApp.svg"
          alt="Logo Whatsapp"
          width={80}
          height={80}
        />
      </a>
    ),
    className: "",
    image: null,
  },
  {
    title: "Stickers de alta calidad",
    description: "No se raya, aguanta agua y todo el uso que le des",
    icon: <Sticker className="text-secondary" size={96} />,
    className: "",
    image: null,
  },
  {
    title: "¡Tu tarjeta sigue funcionando!",
    description: "No afecta el chip, ni la banda magnética de tu tarjeta",
    icon: <CreditCard className="text-primary" size={96} />,
    className: "",
    image: null,
  },
  {
    title: "Envíos a todo México",
    description: "Pregunta por nuestras entregas en metro de CDMX",
    icon: <Truck className="text-secondary" size={96} />,
    className: "",
    image: null,
  },
];

const Beneficios = ({ direction = "horizontal", size = "md" }) => {
  return (
    <div
      className={cn(
        `grid items-center gap-4 md:gap-12`,
        direction == "horizontal" ? "md:grid-cols-4" : "md:grid-rows-4"
      )}
    >
      {itemsBeneficios?.map((item, i) => (
        <div
          key={i}
          className={cn(`relative group rounded-2xl h-full`, item?.className)}
        >
          <ItemAnimation type="item" i={i}>
            <div className="flex items-center justify-start w-full gap-x-2 gap-y-4 md:flex-col ">
              <div
                className={cn(
                  `shrink-0  relative flex items-center justify-center bg-gradient-to-b from-card/100 to-card/0 rounded-full`,
                  size === "sm" ? "w-24 h-24" : "w-32 h-32"
                )}
              >
                {item?.image && (
                  <Image
                    src={item.image.src}
                    height={item.image.height}
                    width={item.image.width}
                    alt="Métodos de pago"
                    blurDataURL={item.image.src}
                    placeholder="blur"
                    quality={100}
                    className="md:absolute z-[1] md:min-w-[150%] md:h-auto"
                  />
                )}

                {item?.icon}
              </div>
              <div className="flex flex-col md:items-center gap-1 md:justify-center text-balance">
                <h4
                  className={cn(
                    `md:text-center font-bold`,
                    size === "sm" ? "text-lg" : "text-xl"
                  )}
                >
                  {item.title}
                </h4>

                {item?.description && (
                  <p className="leading-none mt-0 text-base md:text-center">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </ItemAnimation>
        </div>
      ))}
    </div>
  );
};

export default Beneficios;
