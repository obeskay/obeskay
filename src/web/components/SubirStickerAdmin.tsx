/* eslint-disable @next/next/no-img-element */
import React from "react";
import CustomField from "@components/CustomField";
import { Field } from "formik";

interface StickerProps {
  file: File;
  index: number;
}

const Sticker: React.FC<StickerProps> = ({ file, index }: any) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = React.useState<null | number>(null);

  React.useEffect(() => {
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

        {/* <input type="file" name={`skins.${index}.file`} defaultValue={file} /> */}
      </div>
    </div>
  );
};

export default Sticker;
