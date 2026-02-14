/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import HeroIndex from "@components/HeroIndex";
import InfiniteTextAnounce from "@components/InfiniteTextAnounce";
import { payload } from "@lib/payload";
import Head from "next/head";
import { ScriptSchema } from "./preguntas-frecuentes";
import dynamic from "next/dynamic";
import ReviewsList from "@/components/ReviewsList";

const OutOfViewportLandingPage = dynamic(
  () => import("@/components/OutOfViewportLandingPage"),
  {
    ssr: false,
  }
);

const heroItems = [
  {
    image: "/images/hero/StickyCovers-creador-stickers-v2.jpg",
  },

  // {
  //   image: "/images/hero/StickyCovers-Fotomontaje01.webp",
  // },
];

interface IndexProps {
  products: any[];
  productosDestacados: any[];
  categories: any[];
  page: number;
}

const Index = ({
  products,
  productosDestacados,
  categories,
  page: lastSSRpage,
}: IndexProps) => {
  const [page, setPage] = useState(lastSSRpage + 1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([
    ...productosDestacados,
    ...products,
  ]);

  const loadMore = async () => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);

    try {
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
      setProductList((state) => [...state, ...data.docs]);
      setPage(page + 1);
      setHasMore(data.hasNextPage);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-10 py-24 md:space-y-12">
      {/* <HeroParallax
        products={products.map((product) => ({
          title: product.name,
          link: `/stickers-para-tarjetas/${product.slug}`,
          thumbnail: product.cover.url,
        }))}
      /> */}

      <HeroIndex heroItems={heroItems} />

      <Head>
        <ScriptSchema />
        <link rel="canonical" href={`https://www.stickycovers.com/`} />
      </Head>
      {/* <HeroIndex heroItems={heroItems} /> */}
      <InfiniteTextAnounce
        duration={30}
        content={<ReviewsList />}
        className="before:content-[attr(data-content)] before:absolute before:w-full before:h-full before:inset-0 before:z-[-1] before:opacity-10 before:bg-secondary"
      />

      <OutOfViewportLandingPage
        categories={categories}
        productList={productList}
        hasMore={hasMore}
        loadMore={loadMore}
      />
    </div>
  );
};

export const getStaticProps = async () => {
  const skins = [];
  let page = 1;
  let hasMore = true;
  let pageMax = 3;

  while (hasMore && page <= pageMax) {
    const { data } = await payload.get(`/products`, {
      params: {
        page,
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

  const { data: dataDestacados } = await payload.get("/products", {
    params: {
      page: 1,
      limit: 100,
      where: {
        highlighted: {
          equals: true,
        },
        isVisible: {
          equals: true,
        },
      },
    },
  });

  // Retira del listado de productos a los que ya están en destacados
  skins.filter((skin) => {
    return !dataDestacados.docs.find((destacado) => {
      return destacado.id === skin.id;
    });
  });

  return {
    props: {
      products: skins,
      productosDestacados: dataDestacados.docs,
      page,
    },
    revalidate: 60,
  };
};

export default Index;
