/* eslint-disable import/prefer-default-export */

import create from "zustand-store-addons";
import { persist } from "zustand/middleware";
import { getTiposEnvio, getEstacionesDeMetroDisponibles } from "../lib/api";
import axios from "axios";
import toast from "react-hot-toast";
import { FetchPaqueterias } from "./skydropApi";

const persistCartStore = (store) =>
  persist(store, {
    name: "cartStoreStickyCovers",
  });
const persistSaleStore = (store) =>
  persist(store, {
    name: "saleStoreStickyCovers",
  });

// Se declaran todos los estados, funciones y constantes globales
export const useGlobalStore = create(
  (set, get) => ({
    openPromptDialog: true,
    // Estado que nos indica si el prompt dialog está abierto o no
    setOpenPromptDialog: (value) =>
      set((state) => ({ openPromptDialog: value })),
    pedidoMinimo: 29,
    // Estado que nos indica si la navbar se oculta o no
    isNavbarHidden: false,
    // Controla el estado de arriba
    setIsNavbarHidden: (value) => set((state) => ({ isNavbarOpen: value })),

    // Estado que nos indica si el carrito está abierto o no
    isCartOpen: false,
    // Controla el estado de arriba
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

    // Estado que nos indica si el modal está abierto o no
    isModalOpen: false,
    // Invierte el estado de arriba (true/false)
    toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),

    // Estado que nos indica si el modal está abierto o no
    isAuxiliarWindowOpen: true,
    // Invierte el estado de arriba (true/false)
    toggleAuxiliarWindow: () =>
      set((state) => ({ isAuxiliarWindowOpen: !state.isAuxiliarWindowOpen })),

    // Estado que nos indica si el menú está abierto o no
    isMenuOpen: false,
    // Invierte el estado de arriba (true/false)
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),

    // Constante que contiene los pasos que se mostrarán en el pedido
    steps: ["Comprador", "Envío", "Pago"],

    // Estado que nos indica el paso actual en el cual se encuentra el usuario en el sitio
    actualStep: 0,
    // Controla el estado de arriba
    setActualStep: (value) => set((state) => ({ actualStep: value })),

    // Estado que contiene las paqueterías disponibles
    paqueterias: [],
    // Controla el estado de arriba
    setPaqueterias: (value) => set((state) => ({ paqueterias: value })),
    // Función que va a obtener las paqueterías y las almacena en el estado de arriba
    actualizarPaqueterias: async (postcode) => {
      const resPaqueterias = await FetchPaqueterias(postcode);
      return set((state) => ({ paqueterias: resPaqueterias.slice(0, 2) }));
    },

    // Estado que contiene el envio seleccionado
    envio: {},
    // Controla el estado de arriba
    setEnvio: (value) => set((state) => ({ envio: value })),

    // Estado que contiene la paqueteria seleccionada
    paqueteria: {},
    // Controla el estado de arriba
    setPaqueteria: (value) => set((state) => ({ paqueteria: value })),

    // Estado que contiene los tipos de envío disponibles
    tiposEnvio: [],
    // Función que va a obtener los tipos de envío y los almacena en el estado de arriba
    fetchTiposEnvio: async () => {
      const res = await getTiposEnvio();
      return set((state) => ({ tiposEnvio: res }));
    },

    // Estado que contiene las estaciones de metro disponibles
    estacionesMetroDisponibles: [],
    // Función que va a obtener las estaciones de metro disponibles y las almacena en el estado de arriba
    fetchEstacionesMetroDisponibles: async () => {
      const res = await getEstacionesDeMetroDisponibles();
      return set((state) => ({ estacionesMetroDisponibles: res }));
    },

    // Estado que contiene lo que el usuario escriba en el buscador
    searchInput: "",
    // Controla el estado de arriba
    setSearchInput: (value) => set((state) => ({ searchInput: value })),

    // Estado que contiene los productos que se muestran en el buscador
    showSearchbarHitsOpen: false,
    // Controla el estado de arriba
    setShowSearchbarHitsOpen: (value) =>
      set((state) => ({ showSearchbarHitsOpen: value })),

    lienzoId: null,
    setLienzoId: (id) => set((state) => ({ lienzoId: id })),

    isLoadingOverlay: false,
    setIsLoadingOverlay: (value) =>
      set((state) => ({ isLoadingOverlay: value })),

    resetUI: () => set((state) => ({ isCartOpen: false, isMenuOpen: false })),
  }),
  {
    computed: {},
  }
);

// Función que busca el producto en el carrito
const getProductInCart = (cart, product) =>
  cart.items.find((item) => item.id === product.id);

export const useCartStore = create(
  (set, get) => ({
    // Inicializa el total del carrito en 0
    total: 0,
    totalAPagar: 0,
    // Inicializa el carrito vacío
    items: [],
    // Función que agrega un producto al carrito
    addToCart: (product) => {
      set((state) => {
        // Se abre el carrito
        useGlobalStore.setState((currentState) => ({
          ...currentState,
          isCartOpen: true,
        }));

        // Revisa que el producto exista en el carrito
        const productInCart = getProductInCart(state, product);
        // ¿El producto existe en el carrito?
        if (productInCart) {
          // Si sí existe, entonces...
          if (productInCart.quantity > 0) {
            // Sobreescribe el carrito
            return {
              // Agrega al total el precio del producto
              total: state.total + parseFloat(product.attributes.Price),
              // Recorre todos los items del carrito y le suma 1 a la cantidad del producto
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              total: state.total,
              items: state.items,
            };
          }
        } else {
          // Si no existe el producto en el carrito, entonces...
          return {
            // Agrega al total el precio del producto
            total: state.total + parseFloat(product.attributes.Price),
            // Agrega el producto al carrito (con la cantidad en 1)
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }
      });
    },
    // Función que modifica el total a pagar
    setTotalAPagar: (value) => {
      set((state) => ({
        totalAPagar: value,
      }));
    },
    // Función que limpia el carrito
    clearCart: () => set({ total: 0, items: [] }),

    // Función que elimina un producto del carrito
    removeFromCart: (product) => {
      // Sobreescrbe el carrito
      set((state) => {
        let newItems = state.items;

        const index = newItems.findIndex((item) => item.id === product.id);

        newItems.splice(index, 1);

        return {
          items: newItems,
          total: state.total - Number(product.attributes.Price),
        };
      });
    },
    // Función que resta un producto del carrito
    substractFromCart: (product) => {
      set((state) => {
        // Revisa que el producto exista en el carrito
        const productInCart = getProductInCart(state, product);
        // ¿El producto existe en el carrito?
        if (productInCart) {
          // Si sí existe, entonces...
          // Si la cantidad es mayor a 1, se resta 1
          if (productInCart.quantity > 1) {
            // Sobreescribe el carrito
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
              total: state.total - Number(product.attributes.Price),
            };
          } else {
            state.removeFromCart(product);
          }
        }
      });
    },
  }),
  {
    computed: {},
    middleware: [persistCartStore],
  }
);

export const useSaleStore = create((set, get) => ({
  saleData: {},
  setSaleData: (value) => set((state) => ({ saleData: value })),
  addSaleData: (key, value) =>
    set((state) => ({ saleData: { ...state.saleData, [key]: value } })),
  clearSaleData: () => set((state) => ({ saleData: {} })),
}));

export const useThreeStore = create(
  (set, get) => ({
    // Estado que contiene la textura subida por el usuario
    textureUrl: "",
    // Controla el estado de arriba
    setTextureUrl: (value) => set((state) => ({ textureUrl: value })),

    // Estado que indica si está cargandose la textura
    isLoadingTexture: false,
    // Controla el estado de arriba
    setIsLoadingTexture: (value) =>
      set((state) => ({ isLoadingTexture: value })),

    // Función que se encarga de recibir una imagen y devolver la textura
    getTexture: async (image: File) => {
      try {
        // Creamos un formData con la imagen recibida
        const formData = new FormData();
        formData.append("image", image);

        // Enviar la imagen recibida al endpoint http://localhost:3000/api/armarSticker
        const stickerResponse = await axios.post(
          "/api/armarSticker",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/octet-stream",
            },
            responseType: "arraybuffer",
          }
        );

        // Si la respuesta es válida...
        if (stickerResponse.status === 200) {
          // Recibimos la imagen
          const stickerImage = stickerResponse.data;

          // Construimos un blob
          const stickerBlob = new Blob([stickerImage], { type: "image/png" });

          // Creamos un formData con la imagen recibida
          const formData = new FormData();
          formData.append("image", stickerBlob, "sticker.png");

          // Enviamos la imagen al endpoint http://localhost:3000/api/armarTextura
          const textureResponse = await axios.post(
            "/api/armarTextura",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/octet-stream",
              },
              responseType: "arraybuffer",
            }
          );

          // Si la respuesta es válida...
          if (textureResponse.status === 200) {
            // Recibimos la imagen
            const textureImage = textureResponse.data;

            // Extraemos la url de la imagen
            const textureImageUrl = URL.createObjectURL(
              new Blob([textureImage], { type: "image/png" })
            );

            // Retornamos la url de la imagen
            return textureImageUrl;
          } else {
            toast.error("Ocurrió un error al cargar la imagen 1");
          }
        }
      } catch (error) {
        console.log(error); // Imprimimos el error en la consola
        throw error; // Lanzamos el error para que sea capturado por el bloque catch en el componente Index
      }
    },

    // Estado que indica si se muestra el selector de stickers
    showStickerSelector: true,
    // Controla el estado de arriba
    setShowStickerSelector: (value) =>
      set((state) => ({ showStickerSelector: value })),
  }),
  {
    computed: {},
    middleware: [],
    settings: {
      name: "threeStoreStickyCovers",
    },
  }
);
