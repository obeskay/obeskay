import { motion } from "framer-motion";
import ItemAnimation from "../components/animations/ItemAnimation";
import { useEffect } from "react";
import { useOrderStore } from "@lib/zustand";

const Index = () => {
  const { clearCart } = useOrderStore();
  useEffect(() => {
    clearCart();
  }, []);
  return (
    <div className="layout">
      <div className="container flex flex-col items-center max-w-2xl space-y-12">
        <motion.div
          className="flex flex-col items-center space-y-4"
          transition={{ staggerChildren: 2.75 }}
        >
          <ItemAnimation type="item" initialinview={true}>
            <h1 className="text-primary md:text-displayDesktop-sm text-displayMobile-sm">
              ¡Gracias!
            </h1>
          </ItemAnimation>
          <ItemAnimation type="item" initialinview={true}>
            <h2 className="text-3xl">Tu pedido ha sido generado</h2>
          </ItemAnimation>
        </motion.div>

        <ItemAnimation type="item" initialinview={true}>
          <p className="text-2xl text-center">
            En breve recbirás la confirmación de tu pedido vía WhatsApp.
          </p>
        </ItemAnimation>
      </div>
    </div>
  );
};

export default Index;
