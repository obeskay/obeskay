import { useState, useMemo, useEffect, useCallback, memo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Combobox } from "@headlessui/react";
import { useSaleStore } from "@lib/store";
import toast from "react-hot-toast";
import { useOrderStore } from "@lib/zustand";

const libraries = ["places"];

const MapAutocomplete = memo(() => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAz173SkUTbOpKK8q05QdiZ4ZMcGdQDEWA" as any,
    libraries: libraries as any,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
});

const Map = (props: any) => {
  const center = useMemo(() => ({ lat: 23.634501, lng: -102.552788 }), []);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="flex flex-col gap-4" id="places-container">
        <PlacesAutocomplete
          {...props}
          selected={selected}
          setSelected={setSelected}
        />
      </div>

      <GoogleMap
        zoom={selected ? 17 : 5}
        center={selected || center}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          scrollwheel: false,
        }}
        mapContainerClassName="w-full h-[520px] rounded-2xl block"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
      {/* <GetDistance /> */}
    </>
  );
};

// GetDistance.displayName = "GetDistance";

const PlacesAutocomplete = ({ selected, setSelected }: any) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const { saleData, addSaleData }: any = useSaleStore((state) => ({
    saleData: state.saleData,
    addSaleData: state.addSaleData,
  }));
  const { addShippingInfo } = useOrderStore((state) => ({
    addShippingInfo: state.addShippingInfo,
  }));

  // Cuando el componente se monta...
  useEffect(() => {
    // ¿El usuario ya ha registrado su dirección?
    if (saleData?.direccion) {
      // Si es así, entonces la establece como valor inicial
      handleSelect(saleData.direccion);
    }
  }, []);

  const handleSelect = useCallback(async (address: any) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });

    // const adaptedAddress = adaptAddress(results[0]);
    // // Obtiene las partes por separado de la dirección
    // const {
    //   calle,
    //   numeroExterior,
    //   colonia,
    //   calleConNumero,
    //   ciudad,
    //   entidadFederativa,
    //   codigoPostal,
    //   pais,
    // } = adaptedAddress;

    // if (
    //   calle === undefined ||
    //   numeroExterior === undefined ||
    //   colonia === undefined ||
    //   calleConNumero === undefined ||
    //   ciudad === undefined ||
    //   entidadFederativa === undefined ||
    //   codigoPostal === undefined ||
    //   pais === undefined
    // ) {
    //   toast.error(
    //     "Por favor, ingresa tu dirección completa (calle y número exterior)"
    //   );
    //   return;
    // } else {
    //   if (pais !== "MX") {
    //     toast.error("Por el momento, sólo contamos con servicio en México.");
    //   } else {
    //     addSaleData("direccion", address);
    //     addSaleData("shippingAddress", adaptedAddress);
    //   }
    // }

    // Buscamos el address component que tenga el type "postal_code"
    const postalCode = results[0].address_components.find(
      (component: any) => component.types[0] === "postal_code"
    );

    // Buscamos el país
    const country = results[0].address_components.find(
      (component: any) => component.types[0] === "country"
    );

    // Si no se encuentra el código postal, entonces no se puede continuar
    if (!postalCode) {
      toast.error(
        "Por favor, ingresa tu dirección completa (calle y número exterior)"
      );
      return;
    }

    // Si el país no es méxico
    if (country.short_name !== "MX") {
      toast.error("Por el momento, sólo contamos con servicio en México.");
      return;
    }

    addSaleData("shippingAddress", {
      codigoPostal: postalCode.short_name,
      pais: country.short_name,
    });

    addShippingInfo({
      lineAddress: results[0].formatted_address,
    });

    const { lat, lng } = await getLatLng(results[0] as any);

    setSelected({ lat, lng });
  }, []);

  return (
    <div className="relative w-full">
      <Combobox value={value} onChange={handleSelect}>
        <Combobox.Input
          value={value}
          name="direccion"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="w-full font-semibold px-4 placeholder:text-gray py-3 h-[56px] outline-none bg-verde-esmeralda/10 rounded-2xl select-text focus:text-verde-esmeralda"
          placeholder="Ingresa tu calle y número"
          autoComplete="off"
        />
        <Combobox.Options className="absolute top-full z-[1] w-full rounded-2xl rounded-t-none bg-card shadow-2xl">
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <Combobox.Option
                className={`cursor-pointer py-3 px-4 hover:bg-verde-esmeralda/5 focus:bg-verde-esmeralda/5 focus:text-verde-esmeralda`}
                key={place_id}
                value={description}
              >
                {description}
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

MapAutocomplete.displayName = "MapAutocomplete";
export default MapAutocomplete;
