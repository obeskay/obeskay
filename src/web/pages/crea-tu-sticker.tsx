import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect } from "react";

const Editor = dynamic(() => import("../components/canvas/Editor"), {
  ssr: false,
});

const Index = () => {
  // desactiva el elastic scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.body.style.position = "fixed";

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
      document.body.style.position = "relative";
    };
  }, []);

  return (
    <>
      <Head>
        <title
          key={"title"}
        >{`Crea tu sticker para tarjeta | Sticky Covers`}</title>
        <meta
          name="description"
          content={`Personaliza tu TARJETA del metro o de débito cun tu FOTO o diseño personalizado 💳`}
        />
        <meta
          name="keywords"
          content={`sticky covers, tarjetas personalizadas, calcomanías para tarjetas, stickers para tarjetas, tunea tu tarjeta, tarjetas metro personalizadas`}
        />
        <meta
          property="og:title"
          content={`CREA GRATIS tu sticker para tarjeta | Sticky Covers`}
        />
        <meta
          property="og:description"
          content={`Personaliza tu TARJETA del metro o de débito cun tu FOTO o diseño personalizado 💳`}
        />

        <meta
          property="og:url"
          content={`https://www.stickycovers.com/crea-tu-sticker`}
        />
      </Head>
      <div className="fixed z-20 w-screen h-[100dvh]">
        <Editor />
      </div>
    </>
  );
};

export default Index;
