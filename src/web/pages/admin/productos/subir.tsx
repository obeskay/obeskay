/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import { Formik, Form, FieldArray } from "formik";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Keyboard,
  Pagination,
  Navigation,
  Virtual,
  Mousewheel,
} from "swiper";
import CustomDropzone from "@components/CustomDropzone";
import SwiperArrows from "@components/SwiperArrows";
import Breadcrumbs from "@components/Breadcrumbs";
import Button from "@components/Button";
import AdminLayout from "@components/layouts/admin";
import { useRouter } from "next/router";
import { subirProducto } from "@lib/api/payload";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import CustomField from "@components/CustomField";

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual, Mousewheel]);

const Subir = () => {
  const [files, setFiles] = useState<File[]>([]);
  const formRef = useRef<any>(null);
  const router = useRouter();

  // Función para manejar el evento de arrastrar y soltar archivos
  const handleDrop = (acceptedFiles: File[]) => {
    const updatedFiles: any = acceptedFiles.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));
    setFiles(updatedFiles);
  };

  // Limpiar la URL del objeto cuando el componente se desmonta
  useEffect(() => {
    return () => {
      files.forEach((file: any) => {
        // Para cada archivo en el objeto URL

        // Lo añadimos al formulario
        formRef.current.setFieldValue(
          `skins.${files.indexOf(file)}.file`,
          file
        );

        // Se limpia el objeto URL
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  return (
    <AdminLayout>
      <div className="container">
        <Breadcrumbs
          items={[
            {
              name: "Admin",
              href: "/admin",
            },
            {
              name: "Subir productos",
              href: "/admin/productos/subir",
            },
          ]}
        />
        <h1>Sube productos en lote</h1>
        <div className="relative grid w-full gap-4 md:grid-cols-12 h-full max-h-full">
          <div className="relative flex flex-col space-y-12 md:col-span-3 max-h-full">
            <CustomDropzone onDrop={handleDrop} />
          </div>

          <div className="relative !max-w-[90vw] max-h-full space-y-4 md:col-span-6">
            <Formik
              innerRef={formRef}
              initialValues={{
                skins: files.map((file) => ({
                  nombre: "",
                  file: file,
                })),
              }}
              onSubmit={async (values, actions) => {
                // Código para subir los archivos y realizar acciones después de la carga
                // console.log(values.skins);

                // Crear FormData object
                const formData = new FormData();

                // Loop through skins array and append file to FormData object
                values.skins.forEach((skin: any) => {
                  formData.append("file", skin.file);
                });

                // Make POST request to backend API with FormData object
                try {
                  const product = await subirProducto(formData);
                  toast.success(
                    `Producto creado: ${JSON.stringify(product, null, 2)}`
                  );
                  router.push("/admin/productos");
                } catch (error) {
                  const axiosError = error as AxiosError;
                  if (axiosError?.response) {
                    toast.error(`Error: ${axiosError?.response?.data}`);
                  } else {
                    toast.error(axiosError?.message);
                  }
                }

                // Se limpia el formulario
                actions.resetForm();

                // Se limpia el estado de los archivos
                setFiles([]);
              }}
            >
              {({ setSubmitting, values }) => (
                <Form className="max-h-full overflow-y-auto overflow-x-clip">
                  <FieldArray
                    name="skins"
                    render={(arrayHelpers) => (
                      <div>
                        {files.length > 0 && (
                          <Swiper
                            slidesPerView={1.33}
                            keyboard={{
                              enabled: true,
                            }}
                            spaceBetween={24}
                            centeredSlides={true}
                            navigation={{
                              nextEl: ".swiper-button-next",
                              prevEl: ".swiper-button-prev",
                            }}
                            grabCursor={true}
                            pagination={{
                              type: "progressbar",
                              horizontalClass: "swiper-pagination-horizontal",
                              progressbarFillClass:
                                "swiper-pagination-progressbar-fill !bg-primary",
                            }}
                            modules={[
                              Keyboard,
                              Pagination,
                              Navigation,
                              Virtual,
                              Mousewheel,
                            ]}
                            mousewheel={{
                              forceToAxis: true,
                            }}
                            className="bg-cyan-400"
                          >
                            {files.map((file, index) => (
                              <SwiperSlide key={index} className="!max-h-full">
                                <Sticker file={file} index={index} />
                              </SwiperSlide>
                            ))}
                            <SwiperArrows />
                          </Swiper>
                        )}
                      </div>
                    )}
                  />
                </Form>
              )}
            </Formik>
          </div>
          <div className="flex flex-col space-y-12 md:col-span-3">
            {/* Botón de subir */}
            <Button
              className="!w-full"
              color="primary"
              variant="filled"
              disabled={formRef.current?.isSubmitting || files.length === 0}
              onClick={() => {
                formRef.current.submitForm();
              }}
            >
              Subir
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Subir;

export interface StickerProps {
  file: File;
  index: number;
}

const Sticker: React.FC<StickerProps> = ({ file, index }: any) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<null | number>(null);

  useEffect(() => {
    if (file) {
      setImageUrl(file?.preview);
      const image = new Image();
      image.src = file.preview;
      image.onload = () => {
        setAspectRatio(image.width / image.height);
      };
    }
  }, [file]);

  const handleImageError = () => {
    setImageUrl(null);
  };

  return (
    <div className="relative space-y-12">
      {imageUrl && (
        <div className="relative rounded-[5%] overflow-hidden h-full w-auto aspect-sticker max-h-[320px] mx-auto">
          <img
            src={imageUrl}
            alt={file?.name}
            onError={handleImageError}
            style={{ aspectRatio }}
          />
        </div>
      )}

      <div className="space-y-2">
        <CustomField
          name={`skins.${index}.nombre`}
          type="text"
          label="Nombre"
          autoComplete="off"
        />
      </div>
    </div>
  );
};
