import { useCartStore, useGlobalStore, useSaleStore } from "../lib/store";
import Accordion from "./Accordion";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const AuxiliarStateWindow = () => {
  const [items]: any = useCartStore("items,total");
  const [maxDragX, setMaxDragX] = useState(0);
  const saleData: any = useSaleStore("saleData");
  const parentDivRef: any = useRef(null);
  const {
    paqueterias,
    paqueteria,
    envio,
    isAuxiliarWindowOpen,
    toggleAuxiliarWindow,
  } = useGlobalStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMaxDragX(window.innerWidth - parentDivRef?.current?.offsetWidth);
    }
  }, [window?.innerWidth]);

  return (
    <motion.div
      ref={parentDivRef}
      drag={"x"}
      whileDrag={{ scale: 0.95, cursor: "grabbing", rotate: -5 }}
      whileHover={{ cursor: "grab" }}
      whileTap={{ scale: 0.95, cursor: "grabbing" }}
      dragConstraints={{ left: 0, right: maxDragX }}
      className={`fixed ${
        isAuxiliarWindowOpen ? "top-0" : "top-[calc(100dvh-6rem)]"
      } h-screen p-6 z-50 `}
    >
      <div className="card flex flex-col h-full w-[520px] text-sm bg-card/90 overflow-auto backdrop-blur-sm space-y-6">
        <div
          className="ml-auto rounded-full bg-card-foreground bg-opacity-5 z-10 cursor-pointer"
          onClick={() => {
            toggleAuxiliarWindow();
          }}
        >
          <Icon variant={isAuxiliarWindowOpen ? "resta" : "suma"} width={48} />
        </div>
        <Accordion title={"Cart"}>
          <pre>{JSON.stringify(items, null, 2)}</pre>
        </Accordion>
        <Accordion title={"SaleData"} defaultOpen>
          <pre>{String(JSON.stringify(saleData, null, 2))}</pre>
        </Accordion>
        <Accordion title={"Paqueterías"}>
          <pre>{JSON.stringify(paqueterias, null, 2)}</pre>
        </Accordion>
        <Accordion title={"Paquetería"}>
          <pre>{JSON.stringify(paqueteria, null, 2)}</pre>
        </Accordion>
        <Accordion title={"Envío"}>
          <pre>{JSON.stringify(envio, null, 2)}</pre>
        </Accordion>
      </div>
    </motion.div>
  );
};

export default AuxiliarStateWindow;
