import { motion } from "framer-motion";
import Image from "next/image";

const FloatingWhatsApp = () => {
  return (
    <motion.a
      layoutId="FloatingWhatsApp"
      href={`https://wa.me/+525543897027`}
      aria-label="Contacto de Whatsapp"
      target="_blank"
      className="fixed right-4 bottom-24 z-30"
      whileHover={{ scale: 1.05 }}
      rel="noopener noreferrer"
    >
      <Image
        src="/images/WhatsApp.svg"
        alt="Logo Whatsapp"
        width={56}
        height={56}
        priority
      />
    </motion.a>
  );
};

export default FloatingWhatsApp;
