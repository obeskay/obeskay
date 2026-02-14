import Head from "next/head";
import { payload } from "../../lib/payload";
import Button from "../../components/Button";
import Price from "../../components/Price";
import Beneficios from "../../components/Beneficios";
import ProductSchema from "../../components/ProductSchema";
import { GetStaticPaths, GetStaticProps } from "next";
import { Product, useOrderStore } from "@lib/zustand";
import dynamic from "next/dynamic";
import RotatingEmojis from "@components/RotatingEmojis";
import ProductThumbnail from "@components/ProductThumbnail";
import { motion } from "framer-motion";
import Watermark from "@components/Watermark";
import { CldImage } from "next-cloudinary";
import PagaSeguroCard from "@/components/PagaSeguroCard";
const ThreeCanvas = dynamic(
  () => import("../../components/canvas/ThreeCanvas"),
  { ssr: false }
);

interface Props {
  skin: Product;
  textureUrl?: string;
  productosRecomendados?: Product[];
}

const videoUrl =
  "https://res.cloudinary.com/stickycoverscloudinary/video/upload/v1692488768/IMG_4226_1_vyfxe5.mp4";

const Index = ({ skin, textureUrl, productosRecomendados }: Props) => {
  const addItemToCart = useOrderStore((state) => state.addItemToCart);

  return (
    <>
      <Head>
        <title key={"title"}>
          Sticker de {skin?.name}
          para tarjeta
        </title>
        <meta
          name="description"
          content={`Personaliza tu tarjeta del metro o de crédito/débito con este sticker de ${skin.name}`}
        />
        <meta
          name="keywords"
          content={`Sticky Covers, tarjetas personalizadas, calcomanías para tarjetas, stickers para tarjetas, tunea tu tarjeta, tarjetas metro personalizadas, ${skin.name}`}
        />
        <meta
          property="og:title"
          key={"og:title"}
          content={`Sticker de ${skin.name} para tarjeta`}
        />
        <meta
          property="og:description"
          key={"og:description"}
          content={`Personaliza tu tarjeta del metro o de crédito/débito con este sticker de ${skin.name}`}
        />
        <meta property="og:image" content={skin.cover.cloudinary.secure_url} />
        <meta
          property="og:url"
          content={`https://www.stickycovers.com/stickers-para-tarjetas/${skin.slug}`}
        />
        {/* // canonical */}
        <link
          rel="canonical"
          href={`https://www.stickycovers.com/stickers-para-tarjetas/${skin.slug}`}
        />

        <meta property="og:type" content="product.item" />
        <meta property="product:price:amount" content={String(skin.price)} />
        <meta property="product:price:currency" content="MXN" />
        <meta property="product:availability" content="in stock" />
        <meta property="product:brand" content="Sticky Covers" />
        <meta property="product:category" content="Stickers para tarjetas" />
        <meta property="product:retailer_item_id" content={skin.id} />
        <meta property="product:retailer_part_no" content={skin.slug} />
        <meta property="product:retailer_title" content={skin.name} />
        <meta property="product:retailer_url" content={skin.slug} />
        <meta
          property="product:retailer_category"
          content="Stickers para tarjetas"
        />
        <meta
          property="product:retailer_price:amount"
          content={String(skin.price)}
        />
        <meta property="product:retailer_price:currency" content="MXN" />
        <meta property="product:retailer_item_group_id" content={skin.id} />
        <ProductSchema
          name={`Sticker de ${skin.name} para tarjeta`}
          description={`Personaliza tu tarjeta del metro, tarjeta de crédito o tarjeta de débito con este sticker de ${skin.name}`}
          imageUrl={skin.cover.cloudinary.secure_url}
          price={String(skin.price)}
        />
      </Head>

      <motion.div className="container space-y-12 py-24">
        <motion.div className="grid gap-12 md:grid-cols-2">
          <motion.div className="flex flex-col gap-12">
            <motion.div
              layout="size"
              layoutId={`product-${skin.slug}`}
              className="relative z-[2] rounded-2xl w-full max-w-[320px] h-auto aspect-[484.5/768] mx-auto bg-muted bg-opacity-10"
            >
              <CldImage
                src={skin.cover.cloudinary.secure_url}
                height={484.5}
                width={768}
                quality={75}
                sizes="(max-width: 360px) 100vw, (max-width: 768px) 50vw, 384"
                placeholder="blur"
                blurDataURL={skin.cover.cloudinary.secure_url}
                alt={`Sticker de ${skin.name} para tarjeta de metro, débito, metrobus, crédito | Sticky Covers`}
                className="rounded-2xl w-full h-full pointer-events-none object-cover"
                priority={true}
                onDragStart={(e) => e.preventDefault()}
                onAuxClick={(e) => e.preventDefault()}
                onTouchStart={(e) => e.preventDefault()}
                onAuxClickCapture={(e) => e.preventDefault()}
                onDragStartCapture={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              />

              <motion.div layoutId={`watermark-${skin?.slug}`} layout="size">
                <Watermark />
              </motion.div>
            </motion.div>
            {/* <motion.div className="relative max-w-[320px] md:max-w-full w-full mx-auto rounded-2xl bg-card-foreground/5 !aspect-[4/3] h-auto">
              <ThreeCanvas texturaUrl={textureUrl} />
            </motion.div> */}
          </motion.div>

          <div className="flex flex-col space-y-12 mb-auto md:sticky md:top-32">
            <div className="flex gap-6 space-between">
              <h1 className="text-card-foreground">
                Sticker de {skin.name} para tarjeta
              </h1>
              <Price quantity={skin.price} />
            </div>
            <p className="text-xl text-card-foreground bg-opacity-60">
              Personaliza tu tarjeta del metro o de crédito/débito con este
              sticker de {skin.name}
            </p>
            {/* <pre>
              <code>{JSON.stringify(skin, null, 2)}</code>
            </pre> */}
            <div
              className="md:mr-auto"
              onClick={() => {
                addItemToCart(skin);
              }}
            >
              <Button color="primary" variant="filled" data-test-id="Lo quiero">
                ¡Lo quiero!
              </Button>
            </div>
            <PagaSeguroCard />
          </div>
          <div className="relative rounded-2xl !aspect-[4/3] overflow-hidden sm:max-w-sm mx-auto !z-[1]">
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="rounded-2xl w-full h-full object-cover !z-[-1]"
              onDragStart={(e) => e.preventDefault()}
              onAuxClick={(e) => e.preventDefault()}
              onTouchStart={(e) => e.preventDefault()}
              onAuxClickCapture={(e) => e.preventDefault()}
              onDragStartCapture={(e) => e.preventDefault()}
              // Disables right click
              onContextMenu={(e) => e.preventDefault()}
            />
            <Watermark />
          </div>
        </motion.div>

        <hr />

        <Beneficios size="sm" />

        <hr />
        <div className="flex items-center gap-2 justify-center">
          <RotatingEmojis emojis={["🔥", "💳", "😍"]} />
          <h2 className="text-center text-card-foreground">
            También te podrían gustar:
          </h2>
        </div>

        <div className="grid grid-rows-[masonry] gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {productosRecomendados?.map((product) => (
            <ProductThumbnail key={product.id} product={product} />
          ))}
        </div>
      </motion.div>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { slug } = params;

  const { data } = await payload.get(`/products`, {
    params: {
      where: {
        slug: {
          equals: slug,
        },
      },
    },
  });

  const skin = data.docs[0];

  // let textureUrl = skin?.texture?.cloudinary?.secure_url;

  // if (!textureUrl) {
  //   const { data: dataTexture } = await fetch(
  //     process.env.NEXT_PUBLIC_URL +
  //       `/api/get-texture-url-by-sticker-slug/${slug}`
  //   ).then((res) => res.json());

  //   textureUrl = dataTexture?.textureUrl;
  // }

  // Obtiene los productos recomendados de manera aleatoria
  const { data: dataRecomendados } = await payload.get(`/products`, {
    params: {
      limit: 40,
      where: {
        slug: {
          notEquals: slug,
        },
        isVisible: {
          equals: true,
        },
      },
      sort: "-createdAt",
    },
  });

  // Elimina el skin del array de productos recomendados
  const index = dataRecomendados.docs.findIndex((p: any) => p.slug === slug);
  if (index !== -1) dataRecomendados.docs.splice(index, 1);

  return {
    props: {
      skin,
      // textureUrl: textureUrl || null,
      productosRecomendados: dataRecomendados.docs.sort(
        () => Math.random() - 0.5
      ),
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const skins: Product[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data } = await payload.get(`/products`, {
      params: {
        page: page,
        where: {
          isVisible: {
            equals: true,
          },
        },
      },
    });

    skins.push(...data.docs);

    if (data.hasNextPage) {
      page++;
    } else {
      hasMore = false;
    }
  }

  const paths = skins.map((skin) => ({
    params: { slug: skin.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default Index;
