import Truck from "@phosphor-icons/react/dist/icons/Truck";

export async function fetchApi(query, { variables = {} } = {}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"}/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    return { errors: json.errors };
  }
  return json.data;
}

export async function getSkins(page = 1, pageSize = 100) {
  const data = await fetchApi(`
    query Products {
      products(sort:"Order:ASC", pagination: { page: ${page}, pageSize: ${pageSize} }) {
        __typename
        data {
          id
          attributes {
            Name
            slug
            Price
            Images {
              data {
                attributes {
                  url
                }
              }
            }
            Cover {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `);

  if (data.errors) {
    console.error(data.errors);
    return { errors: data.errors };
  }
  return data.products.data;
}

export async function getSkinsPopulares() {
  const data = await fetchApi(`
  query Products {
    products(sort:"Order:ASC", pagination: { page: 1, pageSize: 100 }) {
      __typename
      data {
        id
        attributes {
          Name
          slug
          Price
          Images {
            data {
              attributes {
                url
              }
            }
          }
          Cover {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`);
  return data.products.data;
}

export async function getSkinsPaths() {
  const data = await fetchApi(`
    query Products {
      products(sort:"Order:ASC", pagination: { page: 1, pageSize: 100 }) {
        __typename
        data {
          id
          attributes {
            slug
          }
        }
      }
    }
  `);

  return data.products.data;
}

export async function getSkinBySlug(slug) {
  const data = await fetchApi(`query Product {
    products(filters: { slug: { eq: "${slug}" } }) {
      data {
        id
        attributes {
          Name
          slug
          Price
          Images {
            data {
              attributes {
                url
              }
            }
          }
          Cover {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
  `);
  return data.products.data;
}

export async function getVentas(imes = false) {
  const anioActual = new Date().getFullYear();
  const mesActual = new Date().getMonth();
  const mes = new Date(anioActual, mesActual, 1).toISOString();

  const intentosDeCompra = await fetchApi(`query IntentosDeCompra {
    sales(
      filters: {
        Pagado: { eq: false }
        createdAt: { gt: "${imes ? imes : mes}" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
  }`);

  const totales = await fetchApi(`query TotalDeCompras {
    sales(
      filters: {
        Pagado: { eq: true }
        createdAt: { gt: "${imes ? imes : mes}" }
      }
    ) {
      data {
        attributes {
          Total
          CantidadDeCompra
          CantidadDeEnvio
        }
      }
    }
  }`);

  let cantidades = {
    total: 0,
    cantidadDeCompra: 0,
    cantidadDeEnvio: 0,
  };

  totales?.sales?.data?.map((venta) => {
    cantidades.total += venta?.attributes?.Total;
    cantidades.cantidadDeCompra += venta?.attributes?.CantidadDeCompra;
    cantidades.cantidadDeEnvio += venta?.attributes?.CantidadDeEnvio;
  });

  const ventas = await fetchApi(`query Sales {
    sales(
      pagination: { page: 1, pageSize: 400 }
      sort: "id:DESC"
      filters: {
        Pagado: { eq: true }
        createdAt: { gt: "${imes ? imes : mes}" }
      }
    ) {
      data {
        id
        attributes {
          ...DatosSale
          products {
            ... on ProductRelationResponseCollection {
              data {
                id
                attributes {
                  Name
                  Cover {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
          InformacionEnvio {
            ... on ComponentEnvioEnvio {
              id
              Calle
              NumExterior
              NumInterior
              Colonia
              Ciudad
              CP
              Estado
              Referencia
              Recolectado
              GuiaGenerada
              GuiaDeRastreo
              FechaDeRecoleccion
            }
            ... on ComponentEnvioEntregaEnMetro {
              id
              Metro
              FechaEntrega
            }
          }
        }
      }
    }
  }
  
  fragment DatosSale on Sale {
    Pagado
    Impreso
    Entregado
    NombreCliente
    EmailCliente
    TelefonoCliente
    Total
    CantidadDeCompra
    CantidadDeEnvio
    FechaDePago
    FechaDeImpresion
    FechaDeEntrega
    MetodoDePago
    uid
  }`);

  const pendientesDeImpresion = await fetchApi(`query SalesPendientesImpresion {
    sales(
      pagination: { page: 1, pageSize: 400 }
      sort: "id:DESC"
      filters: {
        Pagado: { eq: true }
        Impreso: { eq: false }
        createdAt: { gt: "${imes ? imes : mes}" }
      }
    ) {
      data {
        id
        attributes {
          Pagado
          NombreCliente
          EmailCliente
          TelefonoCliente
          Total
          CantidadDeCompra
          CantidadDeEnvio
          FechaDePago
          MetodoDePago
          uid
          products {
            ... on ProductRelationResponseCollection {
              data {
                id
                attributes {
                  Name
                  Cover {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`);

  const pendientesDeEnvio = await fetchApi(`query SalesPendientesEnvio {
    sales(
      pagination: { page: 1, pageSize: 400 }
      sort: "id:DESC"
      filters: {
        Pagado: { eq: true }
        Impreso: { eq: true }
        Entregado: { eq: false }
        createdAt: { gt: "2022-06-01T05:00:00.000Z" }
        Envio: { eq: true }
      }
    ) {
      data {
        id
        attributes {
          Pagado
          NombreCliente
          EmailCliente
          TelefonoCliente
          Total
          CantidadDeCompra
          CantidadDeEnvio
          FechaDePago
          MetodoDePago
          uid
          products {
            ... on ProductRelationResponseCollection {
              data {
                id
                attributes {
                  Name
                  Cover {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
          InformacionEnvio {
            ... on ComponentEnvioEnvio {
              id
              Calle
              NumExterior
              NumInterior
              Colonia
              Ciudad
              CP
              Estado
              Referencia
              Recolectado
              GuiaGenerada
              GuiaDeRastreo
              FechaDeRecoleccion
            }
          }
        }
      }
    }
  }`);

  return {
    pendientesDeImpresion: pendientesDeImpresion?.sales?.data || [],
    pendientesDeEnvio: pendientesDeEnvio?.sales?.data || [],
    intentosDeCompra: intentosDeCompra?.sales?.meta?.pagination?.total || 0,
    totales: cantidades,
  };
}

export async function getCoupon(slug) {
  const data = await fetchApi(`
  query Coupon {
    coupons(
      pagination: {
        limit:1
      }
      filters: {
        Slug: {
          eq: "${slug}"
        }
      }
    ){
      data{
        id
        attributes{
          Slug
          Active
          RemainingUses
          Discount
          Type
        }
      }
    }
  }
  `);
  return data.coupons.data;
}

export async function getSaleEnvioData(saleId) {
  const data = await fetchApi(`{
    sale(id: "${saleId}"){
      data{
        attributes{
          Envio
          InformacionEnvio{
            ...on ComponentEnvioEnvio{
              RateId
            }
            ...on ComponentEnvioEntregaEnMetro{
              FechaEntrega
              Metro
            }
          }
        }
      }
    }
  }`);

  return data?.sale?.data?.attributes ? data.sale.data.attributes : null;
}

export function getEstacionesDeMetroDisponibles() {
  return [
    {
      image:
        "https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1647411789/hidalgo_58723df946.png?width=147&height=148",
      title: "Hidalgo",
      text: "Línea 2",
      value: "Hidalgo",
    },
    {
      image:
        "https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1647411789/bellas_artes_54df65d4af.png?width=147&height=148",
      title: "Bellas Artes",
      text: "Línea 2",
      value: "Bellas Artes",
    },
    {
      image:
        "https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1647411789/allende_ced649879a.png?width=147&height=148",
      title: "Allende",
      text: "Línea 2",
      value: "Allende",
    },
    {
      image:
        "https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1647411789/zocalo_25e0e80a1f.png?width=147&height=148",
      title: "Zócalo",
      text: "Línea 2",
      value: "Zócalo",
    },
  ];
}

export function getTiposEnvio() {
  return [
    {
      value: "domicilio",
      icon: <Truck size={56} />,
      title: "Envío a domicilio",
      text: "¡Envíos a todo México! Recíbe en la puerta de tu casa al transcurso de 1 a 5 días hábiles.",
    },
    {
      value: "metro",
      image:
        "https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1657668343/Frame_15_90de786256.svg",
      title: "Entrega en Metro CDMX",
      text: `Recoge tu pedido en el metro, de lunes a sábado de 12:00 a 19:00 hrs. ¡Totalmente gratis!`,
      // disabled: true,
    },
  ];
}

export const login = async (email: string, password: string) => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"
    }/api/auth/local`,
    {
      method: "POST",
      body: JSON.stringify({
        identifier: email,
        password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const data = res.json();

  return data;
};

export const subirNuevosSkins = async (skins: any) => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"
    }/api/products`,
    {
      method: "POST",
      body: JSON.stringify({
        skins,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const data = res.json();

  return data;
};

export async function fetchTestimonials() {
  const data = await fetchApi(`
    query Testimonials {
      testimonials(sort: "publishedDate:DESC") {
        data {
          id
          attributes {
            author
            content
            rating
            source
            publishedDate
            avatar {
              data {
                attributes {
                  url
                }
              }
            }
            featured
          }
        }
      }
    }
  `);

  if (data.errors) {
    console.error(data.errors);
    return [];
  }
  return data.testimonials.data;
}

export async function fetchFAQs() {
  const data = await fetchApi(`
    query FAQs {
      faqs(sort: "order:ASC") {
        data {
          id
          attributes {
            question
            answer
            category
            order
            featured
          }
        }
      }
    }
  `);

  if (data.errors) {
    console.error(data.errors);
    return [];
  }
  return data.faqs.data;
}
