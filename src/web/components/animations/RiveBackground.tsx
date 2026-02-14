import Rive from "@rive-app/react-canvas";

const riveUrl =
  "https://res.cloudinary.com/stickycoverscloudinary/raw/upload/v1685061361/background_eyf8ba.riv";

const RiveBackground = () => {
  return (
    <Rive
      src={riveUrl}
      style={{
        objectFit: "cover",
        width: "auto",
        height: "auto",
        minWidth: "200%",
        minHeight: "200%",
        aspectRatio: "1/1",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateY(-50%) translateX(-50%)",
      }}
      stateMachines={["main"]}
    />
  );
};

export default RiveBackground;
