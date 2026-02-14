/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/globals.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import CartSide from "../components/CartSide";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { useEffect, useState } from "react";
import { Lenis as ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { useGlobalStore } from "../lib/store";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  AnimateSharedLayout,
  MotionConfig,
  motion,
} from "framer-motion";
import Script from "next/script";
import { customTransition } from "../lib/animations";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { createOrderPayload, loginPayload } from "@lib/payload";
import { useApiAuthStore, useOrderStore } from "@lib/zustand";
import { IconContext } from "@phosphor-icons/react/dist/lib/context";
import { League_Spartan } from "next/font/google";
import { cn } from "@/lib/utils";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import OverlayLoader from "@/components/animations/OverlayLoader";
import { Spotlight } from "@/components/ui/spotlight";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

const font = League_Spartan({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const AuxiliarStateWindow = dynamic(
  import("../components/AuxiliarStateWindow"),
  {
    ssr: false,
  }
);

if (typeof window !== "undefined") {
  // checks that we are client-side
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST ||
      "https://web-psoc4kk.cloud.obeskay.com",
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug(); // debug mode in development
    },
  });
}

const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

const isProd = process.env.NODE_ENV === "production";

function App({ Component, pageProps, router }: any) {
  const lenis = useLenis();
  const { resetUI, isCartOpen, isLoadingOverlay } = useGlobalStore((state) => ({
    resetUI: state.resetUI,
    isCartOpen: state.isCartOpen,
    isLoadingOverlay: state.isLoadingOverlay,
  }));

  // Cuando se abre el carrito o un modal se deshabilita el scroll
  useEffect(() => {
    if (lenis) {
      if (isCartOpen) {
        lenis?.stop();
      } else {
        lenis?.start();
      }
    }
  }, [isCartOpen]);

  // Store que guarda la sesión de API
  const { token } = useApiAuthStore();

  // Store que obtiene el carrito
  const cart = useOrderStore();

  // Función para hacer login
  useEffect(() => {
    if (!token) {
      loginPayload();
    }
  }, []);

  // Función para crear una nueva orden en caso de que no exista
  useEffect(() => {
    if (token && !cart.id) {
      if (router.asPath.includes("/gracias")) {
        return;
      }

      // alert("No hay carrito");
      createOrderPayload(cart); // Pass the missing argument to the function
    }
  }, [token, cart.id, router.asPath]);

  useEffect(() => {
    resetUI();
  }, [router.asPath]);

  // Si cambiamos de sticker, pero estamos en la misma url, queremos que haga scroll al inicio
  useEffect(() => {
    if (router.asPath.includes("/stickers-para-tarjetas")) {
      lenis?.scrollTo(0);
    }
  }, [router.asPath]);

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <SessionProvider session={pageProps.session}>
        <GoogleAnalytics trackPageViews />
        {/* Google Tag Manager - Global base code */}
        <Script
          id="fb-pixel"
          strategy="worker"
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '995370088023904');
fbq('track', 'PageView');
`,
          }}
        />
        <Script
          async
          strategy="worker"
          src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
        />
        <Script
          async
          id="gtm-base"
          strategy="worker"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTM_ID}');`,
          }}
        />

        <MotionConfig transition={customTransition} reducedMotion={"user"}>
          <IconContext.Provider
            value={{
              className: "text-primary",
              size: 24,
            }}
          >
            <Head>
              <title>Sticky Covers | Stickers para tarjetas</title>
              <link rel="icon" href="/favicon.ico" />
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
              />

              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
              />
              <link rel="manifest" href="/site.webmanifest" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />

              <meta
                property="description"
                content="Stickers para personalizar tarjetas de débito o del metro."
              />

              {/* OG Tags for social media */}
              <meta
                property="og:title"
                content="Sticky Covers | Stickers para tarjetas"
              />

              <meta
                property="og:description"
                content="Stickers para personalizar tarjetas de débito o del metro."
              />
              {/* End of OG Tags for social media */}

              {/* Keywords type B */}
              <meta
                property="og:keywords"
                content="sticky covers, tarjetas personalizadas, calcomanías para tarjetas, stickers para tarjetas, tunea tu tarjeta, tarjetas metro personalizadas"
              />
              {/* End of Keywords type B */}

              <meta property="og:url" content="https://stickycovers.com" />
              <meta
                property="og:image"
                content="https://stickycovers.com/StickyCovers_Cover-min.jpg"
              />

              {/* Color */}
              <meta name="theme-color" content="#ffffff" />
            </Head>
            <motion.div layout layoutId="spotlight" className="opacity-50">
              <Spotlight
                className="fixed -top-1/3 -left-[17.5%] z-[0]"
                fill="hsl(var(--secondary))"
              />
            </motion.div>
            <main className={cn(font.className)}>
              {process.env.NEXT_PUBLIC_SHOW_DEBUGGER === "true" && (
                <AuxiliarStateWindow />
              )}
              {(!router.asPath.includes("/crear/") ||
                !router.asPath.includes("/crea-tu-sticker")) && <Navbar />}
              <Toaster position="top-center" />

              <CartSide />
              {!router.asPath.includes("/crear/") &&
                !router.asPath.includes("/crea-tu-sticker") &&
                !router.asPath.includes("/admin") && <FloatingWhatsApp />}

              <motion.div key={router.asPath}>
                <Component {...pageProps} />
              </motion.div>

              {isLoadingOverlay && <OverlayLoader />}
            </main>
          </IconContext.Provider>
        </MotionConfig>
      </SessionProvider>
    </PostHogProvider>
  );
}

export default App;
