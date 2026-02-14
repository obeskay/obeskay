import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onDrop: (files: File[]) => void;
}

const CustomDropzone: React.FC<DropzoneProps> = ({ onDrop }) => {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
  });

  return (
    <div
      {...getRootProps({
        isFocused,
        isDragAccept,
        isDragReject,
        isDragActive,
      })}
      className={`flex items-center justify-center transition-all bg-primary/5 border-primary dropzone  border-2 border-dashed border-spacing-24 rounded-2xl w-full py-6 px-2 h-full 
      ${
        isDragAccept
          ? "bg-primary border-primary"
          : isDragReject
          ? "border-red-500 bg-red-500/10"
          : isDragActive
          ? "bg-primary/5 border-primary"
          : "!bg-card-foreground !border-card-foreground !bg-opacity-10 !border-opacity-10"
      }
      `}
    >
      <input {...getInputProps()} />
      <p className="text-center text-xl">¡Arrastra y suelta aquí tu archivo!</p>
    </div>
  );
};

export default CustomDropzone;
