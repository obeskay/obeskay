import Link from "next/link";
import Icon from "./Icon";

const Breadcrumbs = ({ items }) => {
  return (
    <nav>
      <ul className="flex items-center gap-2">
        {items.map((item, i) => (
          <>
            <li key={`link-${i}`}>
              <Link href={item.href} aria-label={`Ir a ${item.name}`}>
                {item.name}
              </Link>
            </li>
            {i < items.length - 1 && (
              <Icon key={`icon-${i}`} variant={"chevron-right"} width={18} />
            )}
          </>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
