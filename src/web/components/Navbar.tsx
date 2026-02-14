import Link from "next/link";
import { useEffect, useState } from "react";
import { useGlobalStore } from "../lib/store";
import Icon from "./Icon";
import LogoStickyCovers from "./LogoStickyCovers";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

const menuLinks = [
  { name: "FAQs", href: "/preguntas-frecuentes" },
  { name: "Carrito", href: "#" },
];

const Navbar = () => {
  const router = useRouter();
  const toggleCart: any = useGlobalStore("toggleCart");
  const [userScroll, setUserScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 8) {
        setUserScroll(true);
      } else {
        setUserScroll(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  if (router.pathname.includes("/admin")) return null;

  return (
    <div
      className={`fixed top-0 w-full transition-all pt-2 pointer-events-none z-50`}
    >
      <div className="container flex items-center justify-between mx-auto">
        <div
          className={`relative transition-all p-2 rounded-2xl ${
            userScroll ? "bg-white shadow" : "bg-transparent opacity-50"
          }`}
        >
          <Link
            href="/"
            aria-label="Ir a la página de inicio"
            className="pointer-events-auto"
          >
            <LogoStickyCovers height={userScroll ? 56 : 56} />
          </Link>
        </div>
        <ul
          className={`transition-all space-x-6 tracking-wide flex items-center uppercase font-bold rounded-2xl py-2 px-4 list-none ${
            userScroll ? "bg-white shadow" : "bg-transparent opacity-50"
          }`}
        >
          {menuLinks.map((link, i) => {
            if (link.name === "Carrito") {
              return (
                <li
                  className="pointer-events-auto"
                  onClick={() => toggleCart()}
                  key={i}
                  aria-hidden
                >
                  <Icon
                    className="cursor-pointer text-card-foreground hover:text-primary link"
                    variant="cart"
                    height={24}
                  />
                </li>
              );
            } else {
              return (
                <li className="pointer-events-auto" key={i}>
                  <Link
                    href={link?.href}
                    aria-label={`Ir a la página de ${link?.name}`}
                    className="link"
                  >
                    {link?.name}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
