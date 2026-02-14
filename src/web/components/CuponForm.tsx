import { Formik, Form } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { getCoupon } from "../lib/api";
import { useCartStore, useGlobalStore } from "../lib/store";
import CheckAnimation from "./animations/CheckAnimation";
import Button from "./Button";
import CustomField from "./CustomField";
import LoadingAnimation from "./animations/LoadingAnimation";
import * as Yup from "yup";

const schemaCupon = Yup.object().shape({
  cupon: Yup.string().required("Llena este campo"),
});

const CuponForm = () => {
  const [activeStep, saleData, setSaleData]: any = useGlobalStore(
    "activeStep, saleData, setSaleData"
  );
  const [items, total, applyDiscount, discount]: any = useCartStore(
    "items, total, applyDiscount, discount"
  );
  return (
    <div className="w-full">
      {activeStep <= 1 && (
        <>
          <hr />
          <Formik
            key={`formularioCupon`}
            initialValues={{
              cupon: "",
            }}
            enableReinitialize
            validationSchema={schemaCupon}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                const { cupon } = values;
                const { setSubmitting, setErrors } = actions;

                // Función que fija el error debajo del input
                const setErrorCupon = (errorMsg?) => {
                  setErrors({
                    cupon: errorMsg || "Cupón inválido",
                  });
                };

                // Valida el cupon en Strapi
                getCoupon(cupon)
                  .then((res) => {
                    if (res.length > 0) {
                      const descuento = res[0].attributes;
                      let msgError = "";
                      let error = false;
                      if (!descuento.Active || descuento.RemainingUses <= 0) {
                        msgError = "El cupón ya no está activo";
                        error = true;
                      } else if (
                        descuento.Type === "Static" &&
                        descuento.Discount >= total
                      ) {
                        msgError = "El cupón es mayor al total de tu compra";
                        error = true;
                      }

                      if (error) {
                        setErrorCupon(msgError);
                      } else {
                        let newTotal = 0;
                        if (descuento.Type === "Porcentual") {
                          // Si es porcentual
                          newTotal = total - (total * descuento.Discount) / 100;
                        }
                        if (descuento.Type === "Static") {
                          // Si es fijo
                          newTotal = total - descuento.Discount;
                        }
                        // applyDiscount({
                        //   ...cart,
                        //   totalMinusDiscounts: newTotal,
                        // });
                        // Alamcena el cupón en el state
                        setSaleData({
                          ...saleData,
                          discount: {
                            id: res[0].id,
                            slug: descuento.Slug,
                            descuento: descuento.Discount,
                            type: descuento.Type,
                          },
                        });
                      }
                    } else {
                      setErrorCupon();
                    }
                  })
                  // Si responde con un error, se fija el error
                  .catch((err) => {
                    console.log(err);
                    setErrorCupon();
                  });

                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {({ setSubmitting, isSubmitting, values, ...props }) => (
              <Form>
                <div className="flex flex-row space-x-2 items-top">
                  <AnimatePresence>
                    <div className="relative w-full">
                      <div className="absolute right-3 w-min top-7">
                        {saleData?.discount?.slug === values.cupon && (
                          <CheckAnimation />
                        )}
                      </div>
                      <CustomField
                        name="cupon"
                        type="text"
                        label="Cupón de descuento"
                        autoComplete="off"
                        key="cuponInput"
                      />
                    </div>
                    {values.cupon && (
                      <motion.div
                        initial={{ opacity: 0, translateX: -4 }}
                        animate={values.cupon && { opacity: 1, translateX: 0 }}
                        exit={{ opacity: 0, x: 4 }}
                        className="mt-3"
                      >
                        <Button
                          onClick={(props) => {
                            if (props.disabled) {
                              setSubmitting(true);
                            }
                          }}
                          color="primary"
                          variant="filled"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? <LoadingAnimation /> : "Aplicar"}
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default CuponForm;
