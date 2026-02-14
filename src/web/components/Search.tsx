import {
  InstantSearch,
  Configure,
  connectSearchBox,
  connectInfiniteHits,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";
import { useGlobalStore } from "@lib/store";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import CustomField from "./CustomField";
import ItemAnimation from "./animations/ItemAnimation";
import ProductThumbnail from "./ProductThumbnail";
import { motion } from "framer-motion";

const searchClient = algoliasearch(
  "G1UXRTM0OM",
  "d7a7e24131ba890a706081d3be89640c"
);

const CustomSearchBox = connectSearchBox(({ refine }) => {
  const router = useRouter();
  const [setShowSearchbarHitsOpen, searchInput, setSearchInput]: any =
    useGlobalStore("setShowSearchbarHitsOpen, searchInput, setSearchInput");

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && router.asPath.includes("/busqueda") && router?.isReady) {
      ref.current.focus();
    }
  }, [router?.isReady]);

  return (
    <Formik
      enableReinitialize
      initialValues={{ search: searchInput ?? "" }}
      onSubmit={() => null}
    >
      {(props) => (
        <form role="search" onSubmit={props.handleSubmit}>
          <motion.div
            layoutId="searchBar"
            className="flex items-center space-x-4 px-4"
          >
            <CustomField
              name="search"
              label="Busca aquí"
              type="text"
              autoComplete="off"
              id="algolia_search"
              onClick={() => {
                router.push("/busqueda");
              }}
              onChange={(e) => {
                setSearchInput(e.target.value);
                if (e.target.value.length > 0) {
                  setShowSearchbarHitsOpen(true);
                } else {
                  setShowSearchbarHitsOpen(false);
                }
                refine(e.currentTarget.value);
              }}
              innerRef={ref}
            />
          </motion.div>
        </form>
      )}
    </Formik>
  );
});

const CustomHits = connectInfiniteHits(({ hits, hasMore, refineNext }) => {
  const searchInput: any = useGlobalStore("searchInput");

  return (
    <div className="container">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
        {hits.map((hit, i) => (
          <ItemAnimation key={`${i}`} type="item">
            {/* <pre className="text-xs">{JSON.stringify(hit, null, 2)}</pre> */}
            <ProductThumbnail
              product={{
                attributes: {
                  ...hit,
                  Cover: {
                    data: {
                      attributes: hit.Cover,
                    },
                  },
                },
              }}
            />
          </ItemAnimation>
        ))}

        {hits.length < 1 && searchInput.length > 0 && (
          <div className="col-span-full text-center">
            <h2 className="text-2xl font-bold">No se encontraron resultados</h2>
          </div>
        )}
      </div>
    </div>
  );
});

const Search = () => {
  const router = useRouter();
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="development_api::product.product"
    >
      <Configure hitsPerPage={30} />
      <div className="w-full md:relative  space-y-12">
        <div className="mx-auto max-w-xl">
          <CustomSearchBox />
        </div>
        {router?.asPath.includes("/busqueda") && <CustomHits />}
      </div>
    </InstantSearch>
  );
};

export default Search;
