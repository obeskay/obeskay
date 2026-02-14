import Head from "next/head";
import { ScriptSchema } from "../preguntas-frecuentes";
import { useRouter } from "next/router";
import ItemAnimation from "@/components/animations/ItemAnimation";
import Button from "@/components/Button";
import { useOrderStore } from "@/lib/zustand";
// import Editor from "@/components/Editor";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/canvas/Editor"), {
  ssr: false,
});

const NovFin2023 = () => {
  const router = useRouter();
  const addItemToCart = useOrderStore((state) => state.addItemToCart);

  return (
    <div className="space-y-10 py-20 md:space-y-12">
      <Head>
        <ScriptSchema />
        <link
          rel="canonical"
          href={`https://www.stickycovers.com${router.pathname}`}
        />
      </Head>
      <div className="container space-y-12 max-w-lg">
        <div className="flex flex-col items-center justify-center w-full gap-12 mx-auto text-balance">
          <div className="flex w-full flex-col gap-4 ">
            <h1 className="text-center font-bold text-displayMobile-xs md:text-displayDesktop-xs text-primary">
              ¡Stickers para tu tarjeta GRATIS!
            </h1>
            <p className="text-center text-lg">
              Personaliza tu tarjeta, compra 1 sticker (desde $29) o más y
              recibe <b>1 GRATIS</b> .
            </p>
          </div>

          <ul className="text-left text-sm max-w-xs mx-auto list-disc">
            <li>Promoción válida del 18 al 21 de noviembre de 2023.</li>
            <li>
              El sticker gratis puede ser de nuestro catálogo o personalizado
              con tu propia imagen.
            </li>
            <li>
              Solo aplica 1 solo sticker gratis en la compra mínima de $29.
            </li>
            <li>
              Aplica en compras hechas en la tienda en línea y en WhatsApp.
            </li>
          </ul>
          <hr />
          <ItemAnimation
            type="item"
            initialinview={true}
            className="w-full group"
          >
            <div className="flex items-center space-x-4 w-full">
              <span
                className={`text-[6.5rem] leading-none group-odd:text-primary group-even:text-secondary w-16`}
              >
                1
              </span>
              <div className="space-y-4">
                <h2>Añade a tu carrito</h2>
                <p className="text-xl">
                  Canjea 1 sticker gratis añadiéndolo a tu carrito:
                </p>
                <div className="w-[220px] rounded-2xl bg-secondary/25 aspect-sticker flex items-center justify-center text-displayMobile md:text-displayDesktop">
                  <span className="mt-4">🎁</span>
                </div>
                <div
                  className="inline-block"
                  onClick={() => {
                    // addItemToCart(skin);
                  }}
                >
                  <Button
                    className="w-auto"
                    color="primary"
                    variant="filled"
                    data-test-id="Lo quiero"
                  >
                    Añadir al carrito
                  </Button>
                </div>
              </div>
            </div>
          </ItemAnimation>
          <ItemAnimation
            type="item"
            initialinview={true}
            className="w-full group"
          >
            <div className="flex items-center space-x-4 w-full">
              <span
                className={`text-[6.5rem] leading-none group-odd:text-primary group-even:text-secondary w-16`}
              >
                2
              </span>
              <div className="space-y-4">
                <h2>Crea tu primer sticker</h2>
                <div className="relative w-full">
                  <Editor />
                </div>
              </div>
            </div>
          </ItemAnimation>
        </div>
      </div>

      <div className="w-full"></div>
    </div>
  );
};

export default NovFin2023;
