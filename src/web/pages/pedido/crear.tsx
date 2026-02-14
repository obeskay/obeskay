import FormLead from "../../components/FormLead";
import { useGlobalStore } from "@lib/store";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const LayoutPedido = dynamic(() => import("../../components/LayoutPedido"), {
  ssr: false,
});

const Crear = () => {
  const { setActualStep } = useGlobalStore();

  // TODO: #8 No se cambia el actual step, ni se refleja en UI
  useEffect(() => {
    setActualStep(0);
  }, [setActualStep]);

  return (
    <LayoutPedido>
      <FormLead />
    </LayoutPedido>
  );
};

export default Crear;
