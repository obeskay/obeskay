import { motion } from "framer-motion";
import ItemAnimation from "../components/animations/ItemAnimation";

const pagoPendiente = () => {
  return (
    <div className="layout">
      <div className="container flex flex-col items-center max-w-2xl space-y-12">
        <motion.div
          className="flex flex-col items-center space-y-4"
          transition={{ staggerChildren: 2.75 }}
        >
          <ItemAnimation type="item" initialinview={true}>
            <h1 className="text-center text-primary md:text-displayDesktop-sm text-displayMobile-sm">
              ¡Gracias! Tu pedido ha sido generado
            </h1>
          </ItemAnimation>
          <ItemAnimation type="item" initialinview={true}>
            <h2 className="text-3xl text-center">
              Ya solo falta que completes tu compra
            </h2>
          </ItemAnimation>
        </motion.div>

        <ItemAnimation type="item" initialinview={true}>
          <p className="text-2xl text-center">
            Una vez procesado tu pago, recibirás una confirmación vía WhatsApp.
          </p>
        </ItemAnimation>
      </div>
    </div>
  );
};

export default pagoPendiente;
