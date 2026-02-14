import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
interface AppProps {
  children?: any;
  containerId?: any;
  breakpoint?: any;
  flag?: any;
}

const PortalScalable = ({
  children,
  containerId,
  breakpoint = 9999,
}: AppProps) => {
  const [mounted, setMounted] = useState(false);

  const container = document.querySelector(`#${containerId}` as any);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (mounted && window.innerWidth < parseInt(breakpoint) && container) {
    return createPortal(
      children,
      document.querySelector(`#${containerId}` as any)
    );
  }
  return children;
};

export default PortalScalable;
