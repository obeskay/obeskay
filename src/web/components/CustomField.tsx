import { useField } from "formik";
import { motion } from "framer-motion";
import { Field } from "formik";
import { useSaleStore } from "../lib/store";

const CustomField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props.name);
  const [saleData, setSaleData]: any = useSaleStore("saleData, setSaleData");

  const handleChange = (e) => {
    if (props.onChange) {
      props.onChange(e);
    }
    helpers.setValue(e.target.value);

    setSaleData({
      ...saleData,
      [props.name]: e.target.value,
    });
  };

  return (
    <div className={`transition-all relative w-full py-3 ${props.className}`}>
      <motion.label
        className={`absolute pointer-events-none z-[1] top-0 ${
          meta.value !== "" ? "opacity-50" : "opacity-75"
        }`}
        animate={
          meta.value === ""
            ? { y: "1.5rem", x: "1rem" }
            : { y: "-1rem", x: "0rem" }
        }
        htmlFor={props.name}
      >
        {label}
      </motion.label>
      <Field
        {...field}
        {...props}
        className={`${meta.touched && meta.error && "error"} w-full`}
        onChange={handleChange}
      />
      {meta.touched && meta.error && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 1 }}
          className="absolute left-4 text-red-400 -bottom-3 text-sm"
        >
          {meta.error}
        </motion.div>
      )}
    </div>
  );
};
export default CustomField;
