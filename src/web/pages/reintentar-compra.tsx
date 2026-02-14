import { motion } from "framer-motion";
import Link from "next/link";
import ItemAnimation from "../components/animations/ItemAnimation";
import Button from "../components/Button";

const gracias = () => {
  return (
    <div className="layout">
      <div className="container flex flex-col items-center max-w-2xl space-y-12">
        <motion.div
          className="flex flex-col items-center space-y-4"
          transition={{ staggerChildren: 2.75 }}
        >
          <ItemAnimation type="item" initialinview={true}>
            <h1 className="text-center text-primary md:text-displayDesktop-sm text-displayMobile-sm">
              ¡Uy!, tu pago no pasó
            </h1>
          </ItemAnimation>
          <ItemAnimation type="item" initialinview={true}>
            <h2 className="text-3xl text-center">Pero puedes reintentarlo</h2>
          </ItemAnimation>
        </motion.div>

        <ItemAnimation type="item" initialinview={true}>
          <p className="text-2xl text-center">
            Haz clic en el botón de abajo para reintentar tu pago.
          </p>
        </ItemAnimation>
        <ItemAnimation type="item" initialinview={true}>
          <Link href="/pedido/crear">
            <Button variant="filled" color="primary">
              Reintentar
            </Button>
          </Link>
        </ItemAnimation>
      </div>
    </div>
  );
};

export default gracias;
