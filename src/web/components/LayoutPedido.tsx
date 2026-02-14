import { motion } from "framer-motion";
import { useGlobalStore } from "../lib/store";
import ItemAnimation from "./animations/ItemAnimation";
import CuponForm from "./CuponForm";
import Steps from "./Steps";
import { useOrderStore } from "@lib/zustand";
import StickersStack from "./StickersStack";
import { memo } from "react";

const LayoutPedido = ({ children }) => {
  const { steps, actualStep }: any = useGlobalStore();
  const { subtotal, total, shipping, items } = useOrderStore((state) => state);

  // Todo: costo de envío

  return (
    <div className="layout">
      <div className="container relative grid gap-12 md:gap-24 md:grid-cols-5">
        <div className="flex flex-col space-y-12 md:col-span-3 order-last md:order-first">
          {children}
        </div>
        <div className="space-y-4 md:col-span-2 order-fisrt md:order-last">
          <div className="sticky space-y-4 top-16">
            <Steps
              className="flex-col max-w-2xl mx-auto"
              steps={steps}
              actualStep={actualStep}
            />
            <div className="card space-y-4">
              <h6>Resumen de compra:</h6>

              <ItemAnimation
                className="relative flex flex-col gap-4"
                type="item"
                initialinview={true}
                i={5}
              >
                <StickersStack stickers={items as any} />

                <hr />
                <div className="space-y-1">
                  <div className="flex justify-between max-w-full">
                    <span className="block">Subtotal:</span>
                    <span className="block">${subtotal} MXN</span>
                  </div>

                  {/* TODO: #13 Agregar apartado de descuentos */}
                  {/* {saleData?.discount && (
                <div className="flex justify-between text-secondary">
                <span>Descuento:</span>
                
                {saleData?.discount.type === "Porcentual" ? (
                  <span>-{saleData.discount.descuento} %</span>
                  ) : (
                    <span>-${saleData.discount.descuento} MXN</span>
                    )}
                    </div>
                  )} */}

                  <div className="flex justify-between w-full">
                    <span>Envío:</span>
                    <span>
                      {actualStep <= 0 || !shipping.shipment.total_pricing
                        ? "Pendiente"
                        : `$${shipping.shipment.total_pricing} MXN`}
                    </span>
                  </div>

                  <div className="flex justify-between font-bold text-card-foreground w-full">
                    <span>Total:</span>
                    <span>
                      ${total}
                      MXN
                    </span>
                  </div>
                </div>
              </ItemAnimation>

              {/* <CuponForm /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LayoutPedido);
