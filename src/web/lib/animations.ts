export const customTransition = {
  duration: 0.5,
  ease: [0.25, 1, 0.5, 1],
};

export const buttonAnimation = {
  hover: {
    scale: 1.05,
  },
  tap: {
    scale: 0.95,
  },
};

export const itemAnimation = (i) => ({
  hidden: {
    scale: 0.5,
    translateY: 50,
    opacity: 0,
  },
  show: {
    scale: 1,
    translateY: 0,
    opacity: 1,
    transition: { ...customTransition, delay: i * 0.125 },
  },
  exit: {
    scale: 0,
    translateY: 50,
    opacity: 0,
  },
});

export const imageWrapperAnimation = (i) => ({
  hidden: {
    // clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
    // webkitClipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
  },
  show: {
    // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    // webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: {
      ...customTransition,
      delay: 0.125 + i * 0.25,
    },
  },
  exit: {
    // clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
    // webkitClipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
  },
});

export const imageAnimation = (i) => ({
  hidden: {
    opacity: 0,
    scale: 1.25,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      ...customTransition,
      delay: 0.125 + i * 0.25,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
  },
});

export const imageZoomOutAnimation = (i) => ({
  hidden: {
    opacity: 0,
    scale: 1.25,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.125 + i * 0.25 },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
  },
});
