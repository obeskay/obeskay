import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";

const ParallaxItem = (props) => {
  const { scrollY } = useViewportScroll();
  const yRange = useTransform(scrollY, [0, 0.5, 1], [10, 0, 50]);
  const y = useSpring(yRange, { stiffness: 80, damping: 35 });

  return (
    <motion.div
      className={`relative w-full h-full ${props.className} `}
      style={{ translateY: y }}
    >
      {props.children}
    </motion.div>
  );
};

export default ParallaxItem;
