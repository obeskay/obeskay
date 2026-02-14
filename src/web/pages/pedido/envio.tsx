import { useGlobalStore } from "@lib/store";
import { useEffect } from "react";
import FormEnvio from "../../components/FormEnvio";
import dynamic from "next/dynamic";

const LayoutPedido = dynamic(() => import("../../components/LayoutPedido"), {
  ssr: false,
});

const Envio = () => {
  const { setActualStep } = useGlobalStore();

  useEffect(() => {
    setActualStep(1);
  }, [setActualStep]);

  return (
    <LayoutPedido>
      <FormEnvio />
    </LayoutPedido>
  );
};

export default Envio;
