import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useCartStore, useGlobalStore } from "../lib/store";
import { Button } from "@components/ui/button";
import CartItem from "./CartItem";
import Price from "./Price";
import { useRouter } from "next/router";
import { useOrderStore } from "@lib/zustand";
import toast from "react-hot-toast";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const CartSide = () => {
  const { isCartOpen, toggleCart, pedidoMinimo } = useGlobalStore(
    (state) => state
  );

  const router = useRouter();

  // Store que obtiene el carrito
  const { items, total } = useOrderStore((state) => ({
    items: state.items,
    total: state.total,
  }));

  // Creamos una variable para la posición del menú en el eje X
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Función para manejar el deslizamiento del menú
  const handleDrag = (_, info) => {
    // Evita que se pueda deslizar el menú hacia la izquierda
    // console.log(_);
    x.set(info.offset.x);
    y.set(info.offset.y);
  };

  // Función para manejar el final del deslizamiento del menú
  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100 || info.offset.y > 100) {
      isCartOpen && toggleCart();
    } else {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <AnimatePresence mode="wait" initial>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed z-[51] w-screen h-[100dvh] inset-0 px-4 flex flex-col justify-end items-center`}
        >
          <div
            className="absolute w-full h-full inset-0 bg-black/70 z-[-1]"
            onClick={() => toggleCart()}
          />

          <motion.div
            data-lenis-prevent
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.5}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            className="relative flex flex-col justify-between h-[calc(100dvh-4rem)] md:max-h-[600px] md:max-w-xl w-full bg-background max-w-[520px] shadow p-0 overflow-hidden rounded-t-xl"
          >
            {items.length > 0 ? (
              <>
                <div className="relative flex items-center justify-center p-4 space-x-4 w-full">
                  <p className="text-2xl text-center font-bold -skew-y-3 text-primary">
                    Tu carrito:
                  </p>
                  {/* Close icon */}
                  <Button
                    variant={"link"}
                    className="absolute left-auto right-2 top-1/2 -translate-y-1/2 p-0 h-8 w-8"
                    onClick={() => toggleCart()}
                  >
                    <ChevronDownIcon className="w-5 h-5" />
                  </Button>
                </div>

                <div className="h-full overflow-y-auto divide-y divide-muted bg-opacity-5">
                  {items?.map((item, i) => (
                    <div key={`${item.id}-${i}`} className="px-4">
                      <CartItem item={item} />
                    </div>
                  ))}
                </div>
                <hr />
                <div className="p-4 space-y-2 w-full">
                  <div className="flex items-center justify-between space-x-4">
                    <p className="text-2xl font-bold text-primary">Total:</p>
                    <Price className="text-primary" quantity={total} />
                  </div>

                  <Button
                    className="w-full mx-auto md:w-auto block"
                    onClick={() => {
                      if (total < pedidoMinimo) {
                        toast.error(
                          `El pedido mínimo es de $${pedidoMinimo} MXN.`
                        );
                      } else {
                        router.push("/pedido/crear");
                      }
                    }}
                    data-test-id="Finalizar compra"
                  >
                    Finalizar compra
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p
                  className="text-center text-3xl font-bold m-auto text-balanced"
                  aria-hidden
                >
                  Tu carrito está vacío.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartSide;
