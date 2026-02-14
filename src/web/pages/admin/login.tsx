import Button from "@components/Button";
import CustomField from "@components/CustomField";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().required("Llena este campo").email("Email inválido"),
  password: Yup.string().required("Llena este campo"),
});

const Login = () => {
  return (
    <div className="container py-32 max-w-2xl">
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <div className="space-y-0">
            <h1 className="text-4xl font-bold text-center">Iniciar sesión</h1>
            <p className="text-center text-gray-600">
              Inicia sesión para acceder al panel de administración
            </p>
          </div>

          <Formik
            initialValues={{
              email: "stickycoversmx@gmail.com",
              password: "H8TpbfD&Rxpz",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await signIn("credentials", {
                callbackUrl: "/admin",
                redirect: true,
                email: values.email,
                password: values.password,
              });
              setSubmitting(false);
              return;
            }}
            validationSchema={schema}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col items-center justify-center w-full space-y-4">
                <div className="space-y-0 w-full">
                  <CustomField
                    type="email"
                    name="email"
                    className="w-full"
                    label={"Correo electrónico"}
                  />

                  <CustomField
                    type="password"
                    name="password"
                    className="w-full"
                    label={"Contraseña"}
                  />
                </div>

                <div className="flex flex-col items-center justify-center w-full gap-4">
                  <Button
                    type="submit"
                    variant="filled"
                    color="primary"
                    className="w-full text-card"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <LoadingAnimation /> : "Iniciar sesión"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
