import { memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  refineNext: () => void;
  hasMore: boolean;
}

const Centinel = ({
  refineNext,
  hasMore,
}: Props & React.HTMLAttributes<HTMLDivElement>) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0,
  });

  useEffect(() => {
    if (inView && true) {
      refineNext();
    }
  }, [inView, hasMore, refineNext]);

  return (
    <div
      className="h-px w-full bg-transparent -translate-y-[50dvh]"
      ref={ref}
    />
  );
};

export default memo(Centinel);
