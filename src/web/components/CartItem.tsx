import { motion } from "framer-motion";
import Image from "next/image";
import Button from "./Button";
import Icon from "./Icon";
import Price from "./Price";
import { ItemInCart, useOrderStore } from "@lib/zustand";

const CartItem = ({ item }: { item: ItemInCart }) => {
  const { increaseItemQuantity, dicreaseItemQuantity } = useOrderStore(
    (state) => ({
      increaseItemQuantity: state.increaseItemQuantity,
      dicreaseItemQuantity: state.dicreaseItemQuantity,
    })
  );

  return (
    <motion.div className="relative overflow-hidden" key={item.product.id}>
      <div className="flex items-center justify-between space-x-2">
        <div className={`flex items-center w-full py-4 space-x-4`}>
          <div className="flex flex-col items-center shrink-0 grow-0">
            <Button
              color="primary"
              variant="outlined"
              className="!p-0"
              onClick={() => increaseItemQuantity(item.product.id, 1)}
            >
              <Icon variant="suma" className="text-primary" width={24} />
            </Button>
            <p className="text-xl ">{item.quantity}</p>
            <Button
              color="primary"
              variant="outlined"
              className="!p-0"
              onClick={() => dicreaseItemQuantity(item.product.id, 1)}
            >
              <Icon variant="resta" className="text-primary" width={24} />
            </Button>
          </div>
          <Image
            src={`${item.product?.cover?.url}`}
            alt={`Skin para tarjeta de ${item.product?.name}`}
            height={48 * 1.558}
            width={48}
            quality={10}
            blurDataURL={`${item.product?.cover?.url}`}
            placeholder="blur"
            className="rounded-[5%] pointer-events-none"
          />
          <div className="relative flex flex-row gap-6 w-full max-w-full">
            <p className="flex w-full text-sm text-balance">
              {item.product?.name.replace(/\(.*?\)/g, "")}
            </p>
            <Price quantity={item.product?.price} size="sm" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
