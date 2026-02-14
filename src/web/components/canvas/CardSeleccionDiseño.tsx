import { useThreeStore } from "@lib/store";
import { motion } from "framer-motion";
import { memo } from "react";
import { useMediaQuery } from "react-responsive";
import useMeasure from "react-use-measure";
import { SwiperSlide, Swiper } from "swiper/react";
import { Keyboard, Pagination, Virtual, Mousewheel, Autoplay } from "swiper";
// require("swiper/css");
// require("swiper/css/pagination");
import Image from "next/image";
import Icon from "@components/Icon";
// import DiseñadorDeStickers from "@components/canvas/";

const CardSeleccionDiseño = ({ diseños }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });

  const [
    setTextureUrl,
    setIsLoadingTexture,
    getTexture,
    showStickerSelector,
    setShowStickerSelector,
  ]: any = useThreeStore(
    // Modificamos el nombre del estado
    "setTextureUrl, setIsLoadingTexture, getTexture, showStickerSelector, setShowStickerSelector"
  );

  const [menuStickersRef, menuStickersBounds] = useMeasure();
  // Función que se encarga de recibir una imagen  de sticker prediseñado y devolver la textura
  const getTextureFromSticker = async (image: string) => {
    // Si el usuario hace click en un skin popular, se carga la imagen en el canvas
    setIsLoadingTexture(true);

    // Se crea un archivo de tipo File con la imagen del skin popular
    const blob = await fetch(image).then((r) => r.blob());
    const file = new File([blob], "skin.png", {
      type: "image/png",
    });

    // Se obtiene la textura
    const textureImageUrl = await getTexture(file);

    // Si la textura es válida, se actualiza el estado de la textura
    if (textureImageUrl) {
      setTextureUrl(textureImageUrl);
    }

    // Se desactiva el loader
    setIsLoadingTexture(false);
  };

  const handleClick = async (skin: Skin) => {
    setIsLoadingTexture(true);
    await setTextureUrl(skin.texture.cloudinary.secure_url);
    setIsLoadingTexture(false);

    return false;
  };

  return (
    <motion.div
      ref={menuStickersRef}
      initial={
        isMobile
          ? {
              opacity: 0,
              left: 0,
              top: "100%",
              translateY: 0,
            }
          : {
              opacity: 0,
              left: 0,
              top: 0,
              translateX: 0,
            }
      }
      animate={
        isMobile
          ? {
              opacity: 1,
              left: 0,
              top: "100%",
              translateY: showStickerSelector ? -menuStickersBounds.height : 0,
            }
          : {
              opacity: 1,
              left: 0,
              top: 0,
              translateX: showStickerSelector ? 0 : -menuStickersBounds.width,
            }
      }
      className="absolute w-full xl:w-[250px] xl:max-h-screen z-[20] xl:z-[0] "
    >
      <div className="relative flex flex-col items-center justify-stretch xl:py-12 px-4 xl:px-0 xl:max-h-screen">
        <div className="card text-card bg-black/60 shadow rounded-b-[0] xl:rounded-b xl:rounded-l-[0] xl:max-h-full max-w-full flex flex-col gap-0 py-0 xl:py-6">
          <div className="-space-y-2 text-center hidden xl:block">
            <p className="text-xl">Diseños populares</p>
            <p>Selecciona un diseño</p>
          </div>
          <div className="max-w-screen xl:hidden">
            <Swiper
              slidesPerView={4}
              keyboard={{
                enabled: true,
              }}
              autoplay={{
                delay: 750,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              freeMode
              spaceBetween={24}
              centeredSlides={true}
              grabCursor={true}
              modules={[Keyboard, Pagination, Virtual, Mousewheel, Autoplay]}
              mousewheel={{
                forceToAxis: true,
              }}
              className="!py-0 mask-borders !max-h-screen pointer-events-auto"
            >
              {diseños.map((skin) => (
                <SwiperSlide key={skin.id}>
                  <SkinItem
                    skin={skin}
                    handleClick={() => {
                      handleClick(skin);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div
            data-lenis-prevent
            className="overflow-y-auto pointer-events-auto"
            style={{ maxHeight: "calc(100dvh - 14.5rem)" }}
          >
            <div className="relative hidden xl:flex flex-col gap-4">
              {diseños.map((skin, i) => (
                <SkinItem
                  key={skin.id}
                  skin={skin}
                  handleClick={() => {
                    handleClick(skin);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-full xl:top-1/2 xl:-translate-y-1/2 left-1/2 xl:left-full -translate-x-1/2 xl:translate-x-0 z-[10] w-12 h-12 rounded-full bg-black/60 mb-4 xl:mb-0 xl:ml-4 flex items-center justify-center shadow cursor-pointer pointer-events-auto"
          onClick={() => setShowStickerSelector(!showStickerSelector)}
        >
          <Icon
            variant="chevron-right"
            height={24}
            width={24}
            className={`!text-card transition-all ${
              showStickerSelector
                ? "rotate-90 xl:rotate-180"
                : "-rotate-90 xl:rotate-0"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

interface Skin {
  id: string;
  name: string;
  cover: {
    cloudinary: {
      secure_url: string;
    };
  };
  texture: {
    cloudinary: {
      secure_url: string;
    };
  };
}

interface SkinItemProps {
  skin: Skin;
  handleClick: () => void;
}

const SkinItem = ({ skin, handleClick }: SkinItemProps) => {
  return (
    <div onClick={handleClick}>
      <Image
        src={skin.cover.cloudinary.secure_url}
        height={220 * 1.5882352}
        width={220}
        quality={30}
        blurDataURL={skin.cover.cloudinary.secure_url}
        placeholder="blur"
        className="rounded-[5%] pointer-events-none aspect-[1/1.5882352]"
        alt={"Sticker para tarjeta de " + skin.name}
      />
    </div>
  );
};

export default memo(CardSeleccionDiseño);
