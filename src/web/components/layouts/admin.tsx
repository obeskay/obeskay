import MenuContainer from "@components/MenuContainer";
import { useRouter } from "next/router";
import Icon from "../Icon";

const AdminLayout = ({ children }) => {
  const router = useRouter();

  return (
    <MenuContainer
      items={[
        {
          label: "Inicio",
          href: "/admin",
          icon: "cart",
        },
        // {
        //   label: "Subir productos",
        //   href: "/admin/productos/subir",
        // },
        // {
        //   label: "Pedidos",
        //   href: "/admin/pedidos",
        // },
      ]}
      selected={router.asPath}
    >
      {children}
    </MenuContainer>
  );
};

export default AdminLayout;
