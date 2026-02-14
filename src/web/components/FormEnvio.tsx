import { useRef, useEffect, memo, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import RadioGroupForm from "./RadioGroupForm";
import CustomField from "./CustomField";
import BottomBar from "./BottomBar";
import Button from "./Button";
import LoadingAnimation from "./animations/LoadingAnimation";
import ItemAnimation from "./animations/ItemAnimation";
import PortalScalable from "./PortalScalable";
import MapAutocomplete from "./MapAutocomplete";
import { useGlobalStore, useSaleStore } from "@lib/store";
import { useOrderStore } from "@lib/zustand";
import { useRouter } from "next/router";

const FormEnvio = () => {
  const [paqueteria, setPaqueteria] = useState<any>({});
  const formEnvioRef = useRef<any>(null);

  const schemaEnvio = Yup.object().shape({
    shippingMethod: Yup.string()
      .oneOf(["metro", "domicilio"])
      .required("Selecciona una opción"),
    paqueteria: Yup.string().when("shippingMethod", {
      is: "domicilio",
      then: Yup.string().required("Selecciona una opción"),
    }),
    // Esto no funciona
    // direccion: Yup.string().when("shippingMethod", {
    //   is: "domicilio",
    //   then: Yup.string().required("Llena este campo"),
    // }),
    estacionMetro: Yup.string().when("shippingMethod", {
      is: "metro",
      then: Yup.string().required("Selecciona una opción"),
    }),
    interiorNumber: Yup.string().when("shippingMethod", {
      is: "domicilio",
      then: Yup.string().max(6, "El campo es demasiado largo"),
    }),
    references: Yup.string().when("shippingMethod", {
      is: "domicilio",
      then: Yup.string()
        .required("Llena este campo.")
        .max(40, "El campo es demasiado largo"),
    }),
  });

  const { saleData, addSaleData } = useSaleStore((state) => ({
    saleData: state.saleData,
    addSaleData: state.addSaleData,
  }));

  const addShippingInfo = useOrderStore((state) => state.addShippingInfo);
  const router = useRouter();

  const {
    paqueterias,
    actualizarPaqueterias,
    tiposEnvio,
    fetchTiposEnvio,
    estacionesMetroDisponibles,
    fetchEstacionesMetroDisponibles,
  } = useGlobalStore((state) => ({
    paqueterias: state.paqueterias,
    actualizarPaqueterias: state.actualizarPaqueterias,
    tiposEnvio: state.tiposEnvio,
    fetchTiposEnvio: state.fetchTiposEnvio,
    estacionesMetroDisponibles: state.estacionesMetroDisponibles,
    fetchEstacionesMetroDisponibles: state.fetchEstacionesMetroDisponibles,
  }));

  const initialValues = {
    shippingMethod: saleData.shippingMethod ?? "metro",
    estacionMetro: saleData.estacionMetro ?? "",
    interiorNumber: saleData.interiorNumber ?? "",
    references: saleData.references ?? "",
    paqueteria: saleData.paqueteria ?? "",
    direccion: "",
    shippingAddress: saleData.shippingAddress ?? "",
  };

  useEffect(() => {
    fetchEstacionesMetroDisponibles();
    fetchTiposEnvio();
  }, []);

  useEffect(() => {
    const codigoPostal = saleData?.shippingAddress?.codigoPostal;
    if (codigoPostal) {
      actualizarPaqueterias(codigoPostal);
    }
  }, [saleData?.shippingAddress, actualizarPaqueterias]);

  const handleSubmit = async (values, { setSubmitting }: any) => {
    try {
      if (values.shippingMethod === "metro") {
        addSaleData("estacionMetro", values.estacionMetro);
        addShippingInfo({
          references: values.estacionMetro,
          shippingMethod: "metro",
        });
        router.push("/pedido/pago");
        return;
      } else {
        addSaleData("direccion", values.direccion);
        addShippingInfo({
          references: values.references,
          interiorNumber: values.interiorNumber,
          shipment: {
            total_pricing: paqueteria.total_pricing,
            days: paqueteria.days,
            provider: paqueteria.provider,
            service_level_code: paqueteria.service_level_code,
            service_level_name: paqueteria.service_level_name,
          },
          shippingMethod: "domicilio",
        });
        router.push("/pedido/pago");
      }
    } catch (error) {
      console.log(error);
    }

    setSubmitting(false);
  };

  return (
    <Formik
      innerRef={formEnvioRef}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={schemaEnvio}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, setSubmitting, isSubmitting }) => {
        return (
          <Form className="flex flex-col gap-8">
            <h5>¿Cómo deseas recibir tu pedido?</h5>
            {/* <pre className="text-xs">{JSON.stringify(values, null, 2)}</pre> */}
            <RadioGroupForm
              name="shippingMethod"
              type="radio"
              label="Medio de envío"
              content={tiposEnvio}
            />
            {values.shippingMethod === "metro" ? (
              <>
                <h5>Selecciona la estación:</h5>
                <RadioGroupForm
                  name="estacionMetro"
                  type="radio"
                  label="Estación de metro"
                  content={estacionesMetroDisponibles}
                  className="sm:grid-cols-2 xl:grid-cols-3"
                />
              </>
            ) : (
              <>
                <ItemAnimation type="item" initialinview={true} i={0}>
                  <h5>¿Dónde quieres recibir tu pedido?</h5>
                </ItemAnimation>

                <ItemAnimation
                  type="item"
                  initialinview={true}
                  i={1}
                  className="flex flex-col gap-4"
                >
                  <MapAutocomplete />
                </ItemAnimation>

                <PortalScalable containerId={"places-container"}>
                  <div className="grid sm:grid-cols-3 gap-y-2 gap-x-4">
                    <div className="sm:col-span-2">
                      <CustomField
                        name="references"
                        type="text"
                        label="Referencias"
                        autoComplete="off"
                        data-test-id="references"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <CustomField
                        name="interiorNumber"
                        type="text"
                        label="Número interior"
                        autoComplete="off"
                        data-test-id="interiorNumber"
                      />
                    </div>
                  </div>
                </PortalScalable>

                {paqueterias?.length > 0 ? (
                  <>
                    <h5>Escoge el tipo de envío:</h5>
                    {/* <pre>{JSON.stringify(paqueterias, null, 2)}</pre> */}
                    <RadioGroupForm
                      name="paqueteria"
                      type="radio"
                      label="Selecciona tu tipo de envío"
                      onChange={(e) => {
                        // Separamos el provider y el service level code
                        const [provider, service_level_code] = e.split("-");

                        // Buscamos la paqueteria seleccionada
                        const paqueteriaSeleccionada = paqueterias.find(
                          (paqueteria) =>
                            paqueteria.provider === provider &&
                            paqueteria.service_level_code === service_level_code
                        );

                        setPaqueteria(paqueteriaSeleccionada);

                        addShippingInfo({
                          references: values.references,
                          interiorNumber: values.interiorNumber,
                          shipment: {
                            total_pricing: paqueteriaSeleccionada.total_pricing,
                            days: paqueteriaSeleccionada.days,
                            provider: paqueteriaSeleccionada.provider,
                            service_level_code:
                              paqueteriaSeleccionada.service_level_code,
                            service_level_name:
                              paqueteriaSeleccionada.service_level_name,
                          },
                        });
                      }}
                      content={paqueterias.map((paqueteria, i) => ({
                        title: `$${paqueteria.total_pricing} `,
                        text: `Recíbelo en ${
                          paqueteria.days + 2
                        } días hábiles con envío ${paqueteria.provider}`,
                        value: `${paqueteria.provider}-${paqueteria.service_level_code}`,
                      }))}
                      className="md:grid-cols-2"
                    />
                  </>
                ) : (
                  saleData?.shippingAddress && (
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <LoadingAnimation />
                      <p className="text-lg text-center">
                        Estamos calculando las paqueterías disponibles para tu
                        código postal
                      </p>
                    </div>
                  )
                )}
              </>
            )}

            <PortalScalable containerId={"mainBody"} breakpoint={768}>
              <BottomBar>
                <Button
                  onClick={(props: any) => {
                    if (!props.disabled) {
                      setSubmitting(true);
                      formEnvioRef.current?.submitForm();
                    }
                  }}
                  variant="filled"
                  color="primary"
                  type="button"
                  disabled={
                    // Deshabilitamos el botón si:
                    // 1. No se ha seleccionado un método de envío
                    // 2. Se seleccionó envío a domicilio y no se llenaron los campos
                    !values.shippingMethod ||
                    (values.shippingMethod === "metro" &&
                      !values.estacionMetro) ||
                    (values.shippingMethod === "domicilio" &&
                      (!saleData?.shippingAddress?.codigoPostal ||
                        !values.references ||
                        !values.paqueteria))
                  }
                  aria-label="Proceder al pago"
                >
                  {isSubmitting ? <LoadingAnimation /> : "Proceder al pago"}
                </Button>
              </BottomBar>
            </PortalScalable>
          </Form>
        );
      }}
    </Formik>
  );
};

FormEnvio.displayName = "FormEnvio";

export default memo(FormEnvio);
