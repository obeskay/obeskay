import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { motion } from "framer-motion";
import { useField } from "formik";
import Image from "next/image";
import Check from "@phosphor-icons/react/dist/icons/Check";
import Circle from "@phosphor-icons/react/dist/icons/Circle";

import { useSaleStore } from "../lib/store";
import { cn } from "@/lib/utils";

export default function RadioGroupForm({ content, className = "", ...props }) {
  const [field, meta, helpers] = useField(props.name);
  const [saleData, addSaleData] = useSaleStore((state) => [
    state.saleData,
    state.addSaleData,
  ]);
  const { value } = meta;
  const { setValue } = helpers;
  const [activeOption, setActiveOption] = useState(value);

  return (
    <motion.div className={`w-full`}>
      <RadioGroup
        value={activeOption}
        onChange={(value) => {
          addSaleData(props.name, value);
          setValue(value);
          setActiveOption(value);
          props.onChange && props.onChange(value);
        }}
      >
        <motion.div className={`grid gap-4 ${className}`}>
          {content.map((option: any, i: any) => {
            return (
              <RadioGroup.Option
                className={`w-full group`}
                key={`${props.name}${option.value}${i}`}
                value={option.value}
                data-test-id={option.value}
                style={{
                  pointerEvents: option.disabled ? "none" : "auto",
                  opacity: option.disabled ? 0.5 : 1,
                }}
              >
                {({ checked }) => (
                  <motion.div
                    className={cn(
                      `relative rounded-2xl p-2 cursor-pointer transition-colors pr-12 h-full card`
                      // checked && "bg-transparent"
                    )}
                    layoutId={
                      checked
                        ? `${props.name}Active`
                        : `${props.name}${option.value}`
                    }
                  >
                    <div className="flex flex-row items-center justify-center w-full h-full gap-4">
                      {option.image && (
                        <div className="flex m-auto ml-0 flex-shrink-0 ">
                          <Image
                            src={option.image}
                            alt="Sticky Covers Opción de formulario"
                            width={56}
                            height={56}
                            className="block m-auto"
                            blurDataURL={option.image}
                            placeholder="blur"
                            quality={60}
                          />
                        </div>
                      )}
                      {option.icon && (
                        <div className="flex m-auto ml-0 flex-shrink-0">
                          {option.icon}
                        </div>
                      )}
                      <div className="w-full space-y-1 pr-12 max-w-lg mr-auto text-balance">
                        <p className="text-base md:text-lg overflow-ellipsis font-bold">
                          {option.title}
                        </p>
                        <p className="text-sm md:text-base overflow-ellipsis">
                          {option.text}
                        </p>
                      </div>
                      {checked && (
                        <motion.div
                          className={`absolute inset-0 w-full h-full rounded-2xl z-[1] place-content-evenly border-2 border-secondary shadow`}
                          layoutId={
                            checked
                              ? `${props.name}ActiveIndicator`
                              : `${props.name}${option.value}Indicator`
                          }
                        >
                          <Check
                            weight="bold"
                            className="text-secondary absolute w-4 h-4 -translate-y-1/2 top-1/2 right-[23px] z-[99] !opacity-100"
                          />
                        </motion.div>
                      )}

                      <Circle
                        className={`transition-all text-secondary absolute w-8 h-8 -translate-y-1/2 top-1/2 right-4`}
                      />
                    </div>
                  </motion.div>
                )}
              </RadioGroup.Option>
            );
          })}
        </motion.div>
        {meta.touched && meta.error && (
          <div className="text-red-300 text-center">{meta.error}</div>
        )}
      </RadioGroup>
    </motion.div>
  );
}
