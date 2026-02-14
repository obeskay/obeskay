import Link from "next/link";
import Button from "./Button";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Navigation } from "swiper";
import SwiperArrows from "./SwiperArrows";
import { memo, useEffect, useState } from "react";
import PagaSeguroCard from "./PagaSeguroCard";

interface HeroIndexProps {
  heroItems: { image?: string; video?: string }[];
}

const HeroIndex = ({ heroItems }: HeroIndexProps) => {
  const [isAutoplay, setIsAutoplay] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAutoplay(true);
    }, 500);
  }, []);

  return (
    <div className="relative container flex flex-col md:flex-row items-center gap-x-20 gap-y-10 px-2">
      <Swiper
        key={`${isAutoplay}-${heroItems?.length}`}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev",
        }}
        loop={false}
        autoplay={
          isAutoplay
            ? {
                delay: 5000,
                disableOnInteraction: false,
              }
            : false
        }
        modules={[Navigation, Autoplay]}
        className="relative w-full h-full rounded-2xl"
      >
        {heroItems?.map((item, index) => (
          <SwiperSlide key={index}>
            <Link
              className="aspect-[3/2] relative w-full md:w-[100%] md:max-h-none h-auto overflow-hidden block"
              href={`/crea-tu-sticker`}
            >
              {/* <ItemAnimation type={"image"} initialinview={true}> */}
              {item?.video ? (
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full"
                />
              ) : (
                <Image
                  src={item?.image}
                  alt={"Banner de Sticky Covers"}
                  fill
                  quality={100}
                  priority={index === 0 ? true : false}
                  placeholder="blur"
                  sizes="(min-width: 800px) 336px, (min-width: 680px) 624px, (min-width: 420px) 91.67vw, calc(80vw + 44px)"
                  className="object-cover w-full h-full"
                  blurDataURL={item?.image}
                />
              )}
              {/* </ItemAnimation> */}
            </Link>
          </SwiperSlide>
        ))}
        <SwiperArrows />
      </Swiper>

      <div className=" flex flex-col justify-center space-y-10 w-full h-full">
        {/* <ItemAnimation type="item" initialinview={true} i={0}> */}
        <h1 className="flex flex-col items-center md:items-start w-full space-y-0 text-primary text-displayMobile md:text-displayDesktop -skew-y-3">
          <span>
            Stickers para{" "}
            {/* {process.env.NODE_ENV !== "production" && process.env.NODE_ENV} */}
          </span>
          <span className="text-card-foreground">tarjetas</span>
        </h1>
        {/* </ItemAnimation> */}
        <div className="grid">
          {/* <ItemAnimation type="item" initialinview={true} i={1}> */}
          {/* <a
            href="#skins"
            aria-label="Ir a los modelos de stickers para tarjetas"
            className="flex"
          >
            <Button color="primary" variant="filled">
              Ver modelos
            </Button>
          </a> */}
          {/* </ItemAnimation> */}
          {/* <ItemAnimation type="item" initialinview={true} i={2}> */}
          <Link
            href="/crea-tu-sticker?utm_source=stickycovers.com&utm_medium=hero&utm_campaign=cta"
            aria-label="Personaliza tus stickers para tarjetas con tus propias fotos"
            className="flex ml-0 mr-auto w-full md:w-auto"
          >
            <Button
              className="!w-full md:!px-32 !py-5"
              color="primary"
              variant="filled"
            >
              Crea el tuyo
            </Button>
          </Link>
          {/* </ItemAnimation> */}
        </div>
        <PagaSeguroCard />
      </div>
    </div>
  );
};

export default memo(HeroIndex);
