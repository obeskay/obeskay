import Star from "@phosphor-icons/react/dist/icons/Star";
import StarHalf from "@phosphor-icons/react/dist/icons/StarHalf";

const StarsQualification = ({ qualification }: { qualification: number }) => {
  if (qualification > 5) qualification = 5;
  if (qualification < 0) qualification = 0;

  return (
    <div className="flex gap-0">
      {Array(5)
        .fill(0)
        .map((e, i) => {
          return (
            <Star
              key={i}
              weight={i >= qualification ? "bold" : "fill"}
              name="half_star"
              className="w-5 h-5 text-yellow-400"
            />
          );
        })}
    </div>
  );
};

export default StarsQualification;
