import { Formik, Form } from "formik";
import Button from "./Button";
import CustomField from "./CustomField";
import LoadingAnimation from "./animations/LoadingAnimation";
import * as Yup from "yup";
import { phoneRegExp } from "../lib/utils";
import { useRouter } from "next/router";
import BottomBar from "./BottomBar";
import PortalScalable from "./PortalScalable";
import ItemAnimation from "./animations/ItemAnimation";
import { useRef } from "react";
import { useOrderStore } from "@lib/zustand";

const FormLead = () => {
  const { name, email, phone, addContactInfo } = useOrderStore(
    (state) => state
  );

  const router = useRouter();

  const formLeadRef = useRef(null);

  return (
    <Formik
      key={name + email + phone}
      innerRef={formLeadRef}
      initialValues={{
        name: name || "",
        email: email || "",
        phone: phone || "",
      }}
      validationSchema={leadSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        setTimeout(() => {
          addContactInfo(values.name, values.email, values.phone);
          actions.setSubmitting(false);
          router.push("/pedido/envio");
        }, 600);
      }}
    >
      {({ setSubmitting, isSubmitting, ...props }) => (
        <Form className="w-full space-y-6 md:space-y-8">
          <div className="space-y-6">
            <ItemAnimation type="item" initialinview={true} i={0}>
              <div className="flex flex-col gap-4">
                <h3>¿Quién recibirá el pedido?</h3>
                <hr />
              </div>
            </ItemAnimation>

            <ItemAnimation type="item" initialinview={true} i={1}>
              <CustomField
                name="name"
                type="text"
                label="Nombre"
                autoComplete="off"
                data-test-id="nombre"
              />
            </ItemAnimation>
            <div className="grid md:grid-cols-2 gap-2">
              <ItemAnimation type="item" initialinview={true} i={2}>
                <CustomField
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  autoComplete="off"
                  data-test-id="correo"
                />
              </ItemAnimation>
              <ItemAnimation type="item" initialinview={true} i={3}>
                <CustomField
                  name="phone"
                  type="number"
                  label="Número con WhatsApp"
                  autoComplete="off"
                  data-test-id="celular"
                />
              </ItemAnimation>
            </div>
          </div>
          <PortalScalable containerId={"mainBody"} breakpoint={768}>
            <BottomBar>
              <ItemAnimation type="item" initialinview={true} i={4}>
                <Button
                  onClick={(props) => {
                    if (!props.disabled) {
                      setSubmitting(true);
                      formLeadRef.current.handleSubmit();
                    }
                  }}
                  variant="filled"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  data-test-id="btn-siguiente text-card"
                >
                  {isSubmitting ? <LoadingAnimation /> : "Siguiente"}
                </Button>
              </ItemAnimation>
            </BottomBar>
          </PortalScalable>
        </Form>
      )}
    </Formik>
  );
};

// Esquema de validación para el formulario
const leadSchema = Yup.object().shape({
  name: Yup.string().required("Llena este campo"),
  email: Yup.string()
    .required("Llena este campo")
    .max(70, "Este correo es demasiado largo")
    .email("Ingresa un correo válido"),
  phone: Yup.string()
    .required("Llena este campo")
    .matches(phoneRegExp, {
      message: "Ingresa un número válido.",
      excludeEmptyString: false,
    })
    .max(10, "El número debe ser de 10 dígitos")
    .min(10, "El número debe ser de 10 dígitos"),
});

export default FormLead;
