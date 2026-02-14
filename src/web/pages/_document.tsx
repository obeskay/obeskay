import { cn } from "@/lib/utils";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html
        className={cn(
          "overflow-x-crop antialiased text-card-foreground bg-radial-gradient-card"
        )}
        lang="es-MX"
      >
        <Head />
        <body className="relative min-h-screen overflow-x-clip" id="mainBody">
          <div className="fixed inset-0 w-screen overflow-clip pointer-events-none">
            {/* <div className=" bg-primary absolute h-[70vw] aspect-square top-12 left-0 rounded-full -translate-x-1/2 -translate-y-1/2" /> */}
            {/* <div className=" absolute h-[100dvh] inset-0" /> */}
          </div>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
