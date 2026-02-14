import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import {
  addItemToCartPayload,
  updateContactPayload,
  updateShippingPayload,
} from "./payload";
import { useGlobalStore } from "./store";
import toast from "react-hot-toast";

export interface Errors {
  errors: {
    message: string;
  }[];
}

export interface Cart extends Doc {
  temporaryItem: ItemInCart | null;
  addShippingInfo: (shippingInfo: Shipping) => void;
  addContactInfo: (name, email, phone) => void;
  setCart?: (order: Doc) => void;
  getItemFromCart?: (productId: string) => ItemInCart | undefined;
  addItemToCart?: (item: Product, quantity?: number) => void;
  increaseItemQuantity?: (productId: string, quantity: number) => void;
  dicreaseItemQuantity?: (productId: string, quantity: number) => void;
  removeItemFromCart: (item: Product, quantity: number) => void;
  updateCartServer: (
    item: ItemInCart,
    quantity: number,
    orderId: number,
    isAddingError?: boolean
  ) => void;
  calculateTotal?: () => void;
  openCart?: () => void;
  restoreCartStateAfterAddingError?: (
    productId: string,
    quantity: number
  ) => void;
  restoreCartStateAfterRemovingError?: (
    productId: string,
    quantity: number
  ) => void;
  clearCart?: () => void;
}

export interface OrderResponse {
  message: string;
  doc: Doc;
}

export interface Doc {
  id?: number | null;
  items?: ItemInCart[];

  name?: string;
  email?: string;
  phone?: string;

  // Todo: cambiar a un tipo de dato
  payment?: {
    paymentMethod?: string;
    paymentId?: string;
    paymentStatus?: string;
    paymentDate?: string;
  };
  shipping?: Shipping;

  subtotal?: number;
  total?: number;
  paid?: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Shipping {
  lineAddress?: string;
  references?: string;
  interiorNumber?: string;
  shipment?: {
    status?: string;
    id?: string;
    provider?: string;
    service_level_name?: string;
    service_level_code?: string;
    days?: number;
    total_pricing?: number;
    label?: {
      id?: string;
      tracking_number?: string;
      label_url?: string;
      tracking_url_provider?: string;
      status?: string;
      tracking_status?: string;
      rate_id?: number;
    };
  };
  shippingMethod?: "metro" | "domicilio";
  address?: (
    | {
        street?: string;
        exteriorNumber?: string;
        interiorNumber?: string;
        colony?: string;
        zipCode?: string;
        city?: string;
        state?: string;
        references?: string;
        id?: string;
        blockName?: string;
        blockType?: "address";
      }
    | {
        metroStation?: string;
        id?: string;
        blockName?: string;
        blockType?: "metroStation";
      }
  )[];
}

export interface ItemInCart {
  id: string;
  quantity: number;
  product?: Product;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  stock: number;
  sales: number;
  isCustom: boolean;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  cover: CloudinaryImage;
  texture: CloudinaryImage;
}

interface CloudinaryImage {
  id: string;
  altText: string;
  cloudinary: {
    public_id: string;
    original_filename: string;
    format: string;
    secure_url: string;
    resource_type: string;
  };
  filename: string;
  mimeType: string;
  fileSize: number;
  width: number;
  height: number;
  sizes: {
    thumbnail: CloudinaryImageSizes;
    card: CloudinaryImageSizes;
    tablet: CloudinaryImageSizes;
  };
  createdAt: string;
  updatedAt: string;
  url: string;
  original_doc: {
    url: string;
    filename: string;
  };
}

interface CloudinaryImageSizes {
  width: number;
  height: number;
  mimeType: string;
  fileSize: number;
  filename: string;
  url: string;
}

interface ApiAuthStore {
  expireAt: number;
  token: string | null;
  setApiAuth: (token: string, expireAt: number) => void;
}

export const useApiAuthStore = create<ApiAuthStore>()(
  devtools(
    persist(
      (set) => ({
        expireAt: 0,
        token: null,
        setApiAuth: (token: string, expireAt: number) =>
          set(() => ({ token, expireAt })),
      }),
      {
        name: "apiAuthStickyCovers",
      }
    )
  )
);

export const useOrderStore = create<Cart>()(
  devtools(
    persist(
      (set, get) => ({
        id: null,
        items: [],
        payment: {},
        shipping: {},
        subtotal: 0,
        total: 0,
        paid: false,
        status: "",
        createdAt: "",
        updatedAt: "",

        name: "",
        email: "",
        phone: "",

        temporaryItem: null,

        setCart: (order) => {
          set(() => order);
        },

        addContactInfo: async (name, email, phone) => {
          set(() => ({ name, email, phone }));

          const orderId = get().id;

          try {
            const { doc } = await updateContactPayload(orderId, {
              name,
              email,
              phone,
            });

            set(() => doc);
          } catch (error) {
            set(() => ({ name: "", email: "", phone: "" }));
            toast.error("Error al actualizar la información de contacto", {
              icon: "❌",
            });
          }
        },

        addShippingInfo: async (shippingInfo: Shipping) => {
          const orderId = get().id;

          try {
            const { doc } = await updateShippingPayload(orderId, shippingInfo);
            // console.log(doc);
            set(() => doc);

            // toast.success("Información de envío actualizada", {
            //   icon: "🎉",
            // });
          } catch (error) {
            toast.error("Error al actualizar la información de envío", {
              icon: "❌",
            });
          }
        },

        getItemFromCart: (productId: string) => {
          return get().items?.find((prod) => prod.product?.id === productId);
        },

        addItemToCart: async (itemFromProducts, quantity = 1) => {
          // Verificamos si el producto ya está en el carrito
          const itemInCart = get().getItemFromCart(itemFromProducts.id);

          // Si el producto ya está en el carrito, aumentamos la cantidad
          if (itemInCart) {
            get().increaseItemQuantity(itemFromProducts.id, quantity);
            return;
          }

          // Convertimos el producto a un item del carrito
          const item: ItemInCart = {
            id: itemFromProducts.id,
            quantity,
            product: itemFromProducts,
          };

          // Actualizamos el carrito (OPTIMISTIC UI)
          set((state) => {
            const items = [...state.items, item];
            return { items };
          });
          // Se recalcula el total
          get().calculateTotal();

          // Abrimos el carrito UI
          get().openCart();

          // Obtenemos el id de la orden
          const orderId = get().id;

          // Actualizamos el carrito en el servidor
          get().updateCartServer(item, quantity, orderId, true);
        },

        increaseItemQuantity: async (productId: string, quantity = 1) => {
          // Buscamos el carrito en el producto
          const itemInCart = get().getItemFromCart(productId);

          // Si no hay carrito, no hacemos nada
          if (!itemInCart) return;

          // Si hay carrito, aumentamos la cantidad
          const newQuantity = itemInCart.quantity + quantity;

          // Convertimos el producto a un item del carrito
          const item: ItemInCart = {
            id: itemInCart.id,
            quantity: newQuantity,
            product: itemInCart.product,
          };

          // Actualizamos el carrito (OPTIMISTIC UI)
          set((state) => {
            const items = state.items?.map((item) => {
              if (item.product?.id === productId) {
                return { ...item, quantity: newQuantity };
              }
              return item;
            });
            return { items };
          });

          // Se recalcula el total
          get().calculateTotal();

          // Abrimos el carrito UI
          get().openCart();

          // Obtenemos el id de la orden
          const orderId = get().id;

          // Actualizamos el carrito en el servidor
          get().updateCartServer(item, quantity, orderId, true);
        },

        removeItemFromCart: async (itemFromProducts, quantity = 1) => {
          // Verificamos si el producto ya está en el carrito
          const itemInCart = get().getItemFromCart(itemFromProducts.id);
          set(() => ({ temporaryItem: itemInCart }));

          // Si el producto ya está en el carrito y la cantidad es mayor a la que se quiere eliminar, disminuimos la cantidad
          if (itemInCart && itemInCart.quantity > quantity) {
            get().dicreaseItemQuantity(itemFromProducts.id, quantity);
            return;
          }

          // Si el producto ya está en el carrito y la cantidad es igual a la que se quiere eliminar, eliminamos el producto
          if (itemInCart) {
            // Buscamos el carrito en el producto
            const itemInCart = get().getItemFromCart(itemFromProducts.id);
            // Filtramos el producto del carrito
            const items = get().items?.filter(
              (item) => item.product?.id !== itemFromProducts.id
            );

            // Actualizamos el carrito (OPTIMISTIC UI)
            set(() => ({ items }));

            // Se recalcula el total
            get().calculateTotal();

            // Abrimos el carrito UI
            get().openCart();

            // Obtenemos el id de la orden
            const orderId = get().id;

            // Actualizamos el carrito en el servidor
            get().updateCartServer(itemInCart, quantity, orderId, false);
          }

          return null;
        },

        dicreaseItemQuantity: async (productId: string, quantity = 1) => {
          // Buscamos el carrito en el producto
          const itemInCart = get().getItemFromCart(productId);
          // Guardamos el item temporalmente
          set(() => ({ temporaryItem: itemInCart }));

          // Si no hay carrito, no hacemos nada
          if (!itemInCart) return;

          // Si hay carrito, disminuimos la cantidad
          const newQuantity = itemInCart.quantity - quantity;

          // Convertimos el producto a un item del carrito
          const item: ItemInCart = {
            id: itemInCart.id,
            quantity: newQuantity,
            product: itemInCart.product,
          };

          // Si la cantidad es 0, eliminamos el producto
          if (newQuantity <= 0) {
            // Filtramos el producto del carrito
            const items = get().items?.filter(
              (it) => it.product?.id !== productId
            );

            // Actualizamos el carrito (OPTIMISTIC UI)
            set(() => ({ items }));
          } else {
            // Actualizamos el carrito (OPTIMISTIC UI)
            set((state) => {
              const items = state.items?.map((item) => {
                if (item.product?.id === productId) {
                  return { ...item, quantity: newQuantity };
                }
                return item;
              });
              return { items };
            });
          }

          // Se recalcula el total
          get().calculateTotal();

          // Abrimos el carrito UI
          get().openCart();

          // Obtenemos el id de la orden
          const orderId = get().id;

          // Actualizamos el carrito en el servidor
          get().updateCartServer(item, quantity, orderId, false);
        },

        updateCartServer: async (
          item: ItemInCart,
          quantity,
          orderId,
          isAddingError = true
        ) => {
          // Convertimos los productos a un item del carrito
          const items: { product: string; quantity: number }[] =
            get().items?.map((item) => {
              return {
                product: item.product?.id,
                quantity: item?.quantity ?? 0,
              };
            });

          try {
            // Actualizamos el carrito en servidor
            const { doc } = await addItemToCartPayload(orderId, items);

            // Actualizamos el carrito en el store
            set(() => doc);

            // Mostramos un toast
            // toast.success("Skin agregada al carrito", {
            //   icon: "🛒",
            // });
          } catch (error) {
            // Mostramos un toast
            toast.error(
              `Error al ${
                isAddingError ? "agregar" : "quitar"
              } el producto del carrito.`,
              {
                icon: "😢",
              }
            );

            if (isAddingError) {
              // Restauramos el estado del carrito
              get().restoreCartStateAfterAddingError(item.product.id, quantity);
            } else {
              // Restauramos el estado del carrito
              get().restoreCartStateAfterRemovingError(
                item.product.id,
                quantity
              );
            }
          }
        },

        calculateTotal: () => {
          set((state) => {
            // Todo: Calcular el total con el envío y el cupón
            const subtotal = state.items?.reduce(
              (acc, item) => acc + item.product?.price * item.quantity,
              0
            );
            const total = state.subtotal;
            return { total, subtotal };
          });
        },

        openCart: () => {
          useGlobalStore.setState((currentState) => ({
            ...currentState,
            isCartOpen: true,
          }));
        },

        restoreCartStateAfterAddingError: (productId, quantity) => {
          set((state) => {
            let usedIndex = null;
            const items = state.items?.filter((item, i) => {
              if (item.product?.id === productId) {
                // Si la cantidad es 1, eliminamos el producto del carrito
                if (item.quantity === quantity) {
                  return false;
                }

                usedIndex = i;
              }
              return true;
            });

            if (usedIndex !== null) {
              items[usedIndex].quantity -= quantity;
            }

            // Todo: corregir esto
            const subtotal = items.reduce(
              (acc, item) => acc + item.product?.price * item.quantity,
              0
            );

            return { items, subtotal, total: subtotal };
          });
        },

        restoreCartStateAfterRemovingError: (productId, quantity) => {
          // Obtenemos el producto en estado temporal
          const temporaryItem = get().temporaryItem;

          // Buscamos si el producto temporal está en el carrito
          const itemInCart = get().getItemFromCart(temporaryItem.product.id);

          // Si el producto temporal está en el carrito, restauramos el estado
          if (itemInCart) {
            set((state) => {
              const items = state.items?.map((item) => {
                if (item.product?.id === temporaryItem.product.id) {
                  return { ...item, quantity: temporaryItem.quantity };
                }
                return item;
              });
              // Todo: corregir esto
              const subtotal = items.reduce(
                (acc, item) => acc + item.product?.price * item.quantity,
                0
              );

              return { items, subtotal, total: subtotal, temporaryItem: null };
            });
          } else {
            // Si el producto temporal no está en el carrito, lo agregamos
            set((state) => {
              const items = [...state.items, temporaryItem];

              // Todo: corregir esto
              const subtotal = items.reduce(
                (acc, item) => acc + item.product?.price * item.quantity,
                0
              );

              return { items, subtotal, total: subtotal, temporaryItem: null };
            });
          }
        },

        clearCart: () => {
          set(() => ({
            id: null,
            items: [],
            payment: {},
            shipping: {},
            subtotal: 0,
            total: 0,
            paid: false,
            status: "",
            createdAt: "",
            updatedAt: "",

            name: "",
            email: "",
            phone: "",

            temporaryItem: null,
          }));
        },
      }),
      {
        name: "orderStickyCovers",
      }
    )
  )
);
