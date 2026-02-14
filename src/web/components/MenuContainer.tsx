import { motion } from "framer-motion";
import Link from "next/link";
import Icon from "./Icon";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";

function MenuItem({ href, selected, children, icon }) {
  return (
    <Link
      href={href}
      aria-label={`Ir a la pagina de ${
        typeof children == "string" ? children : "menu"
      }`}
      className="block relative w-full text-center lg:text-left h-[22px]"
    >
      {selected && <MenuSelectedIndicator />}
      <motion.li
        className={`flex flex-col lg:flex-row gap-2 !z-[1] w-full lg:justify-between px-2 lg:px-6 cursor-pointer items-center ${
          selected && "!text-secondary"
        }`}
      >
        <motion.p className="order-last lg:order-first">{children}</motion.p>
        {icon && (
          <Icon width={24} name="logout" variant={icon?.variant || "eye"} />
        )}
      </motion.li>
    </Link>
  );
}

function Menu({ items, selected }) {
  return (
    <>
      {items.map(({ href, label, icon }, index) => (
        <>
          <MenuItem
            key={index}
            href={href}
            icon={icon}
            selected={selected === href}
          >
            {label}
          </MenuItem>
          <hr
            key={`menuDivider-${index}`}
            className="border-border bg-opacity-5 hidden lg:block"
          />
        </>
      ))}

      <div className="block relative w-full">
        <li
          className={`flex flex-col lg:flex-row gap-2 w-full items-center lg:justify-between px-2 lg:px-6 cursor-pointer`}
          onClick={() => {
            toast("Saliendo...", {
              icon: "👋",
            });

            signOut({
              callbackUrl: "/admin/login",
            });
          }}
        >
          <span className="order-last lg:order-first text-center lg:text-left">
            Salir
          </span>
          <Icon width={24} name="logout" variant={"eye"} />
        </li>
      </div>
    </>
  );
}

export default function MenuContainer({ items, selected, children }) {
  return (
    <div className="relative grid lg:grid-cols-12">
      <div className="fixed lg:col-span-3 flex-col gap-6 p-2 bg-white/75 backdrop-blur-sm lg:h-[100dvh] w-screen lg:w-auto lg:sticky lg:top-0 bottom-0 lg:bottom-auto left-0 z-[1]">
        <motion.ul className="text-xs lg:text-xl flex lg:flex-col lg:gap-6 font-bold lg:pt-24 max-w-screen items-stretch">
          <Menu items={items} selected={selected} />
        </motion.ul>
      </div>
      <div
        className={`relative lg:col-span-9 space-y-4 overflow-auto text-center items-center flex flex-col min-h-screen `}
      >
        {children}
      </div>
    </div>
  );
}

const MenuSelectedIndicator = () => {
  return (
    <motion.div
      animate={{
        transition: {
          ease: "easeOut",
          spring: 0,
          bounce: 0,
        },
      }}
      layoutId="menuIndicator"
      className="absolute w-full h-full pointer-events-none"
    >
      <div className="relative w-full h-full inset-0">
        <span className="absolute top-1/2 left-1/2 -translate-y-1/2 bg-gradient-to-b lg:bg-gradient-to-l -translate-x-1/2 from-secondary/10 to-secondary/0 w-full lg:w-[calc(100%+1rem)] h-[calc(100%+1rem)] lg:h-[calc(100%+3rem)] border-t-4 lg:border-t-0 lg:border-r-4 border-secondary" />
      </div>
    </motion.div>
  );
};
