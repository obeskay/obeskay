/* eslint-disable @next/next/no-img-element */
import Check from "@phosphor-icons/react/dist/icons/Check";

const PagaSeguroCard = () => {
  return (
    <section className="relative w-full flex flex-col md:flex-row items-center gap-4 border-2 border-secondary rounded-2xl max-w-md mx-auto md:ml-0 py-2 px-8">
      <p className="text-xl font-bold flex-shrink-0 -skew-y-3 mt-1">
        Paga seguro con:
      </p>
      <div className="flex items-center gap-2">
        <img
          src={"/metodosPago.png"}
          height={68}
          width={232}
          alt="Métodos de pago"
        />
      </div>
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 shadow rounded-full bg-lime-500 p-2">
        <Check className="text-white" />
      </div>
    </section>
  );
};

export default PagaSeguroCard;
