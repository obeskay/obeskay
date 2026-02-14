import StarsQualification from "./StarsQualification";
import Image from "next/image";

interface IReviewItemProps {
  author: {
    name: String;
    image: String;
  };
  qualification: number;
  text: String;
}

// Todo: Reparar la interfaz de los props este componente

const ReviewItem = ({ content }: any) => {
  return (
    <div className="flex gap-2 w-[320px] card bg-white/60">
      <Image
        alt={content?.author?.name}
        src={content?.author?.image}
        height={32}
        width={32}
        className="flex-shrink-0 flex-grow-0 mb-auto rounded-full"
      />
      <div className="flex flex-col gap-1 w-full">
        <p className="font-bold text-card-foreground text-lg">
          {content?.author?.name}
        </p>
        <StarsQualification qualification={content?.qualification} />
        <p className="text-sm">{content.text}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
