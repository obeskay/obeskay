import config from '../payload.config'
import { getPayload } from 'payload'

export const seedFAQs = async () => {
  try {
    const payload = await getPayload({ config });

    // Clear existing FAQs
    await payload.delete({
      collection: 'faqs',
      where: {
        question: { not_equals: null }
      }
    })

    const faqs = [
      // Payment Methods - MercadoPago
      {
        question: '¿Qué métodos de pago aceptan?',
        answer: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Aceptamos múltiples métodos de pago a través de nuestra plataforma segura de MercadoPago:'
                }
              ]
            },
            {
              type: 'list',
              children: [
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Tarjetas de crédito (Visa, MasterCard, American Express)'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Tarjetas de débito'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'MercadoPago Pago Fácil (Oxxo, 7Eleven, Farmacias Guadalajara)'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Transferencias bancarias'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Saldo de cuenta MercadoPago'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Todos los pagos son procesados de forma segura y encriptada. No almacenamos información de tus tarjetas.'
                }
              ]
            }
          ]
        },
        category: 'payment',
        order: 1,
        featured: true
      },

      // Metro Delivery - CDMX
      {
        question: '¿Cómo funciona la entrega en estaciones del metro?',
        answer: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Entregamos directamente en estaciones del Metro de la Ciudad de México para mayor comodidad:'
                }
              ]
            },
            {
              type: 'list',
              children: [
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Selecciona "Entrega en Metro" al checkout'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Elige la estación de tu preferencia de la lista disponible'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Recibirás una notificación cuando tus stickers estén listos para recoger'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Presenta el código de recogida en mostrador durante horario comercial'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Horarios de entrega: Lunes a Sábado, 10:00 AM - 7:00 PM'
                }
              ]
            }
          ]
        },
        category: 'shipping',
        order: 1,
        featured: true
      },

      // Home Shipping - Skydropx
      {
        question: '¿Cómo funciona el envío a domicilio?',
        answer: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Realizamos envíos a nivel nacional a través de nuestro socio logístico Skydropx:'
                }
              ]
            },
            {
              type: 'list',
              children: [
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Entrega estándar: 3-5 días hábiles'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Entrega express: 24-48 horas (disponible en CDMX y zonas metropolitanas)'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Seguimiento en tiempo real por correo electrónico'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Cobertura en todas las principales ciudades de México'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'El costo del envío se calcula al checkout según tu ubicación y método de envío seleccionado.'
                }
              ]
            }
          ]
        },
        category: 'shipping',
        order: 2,
        featured: false
      },

      // Delivery Times
      {
        question: '¿Cuál es el tiempo estimado de entrega?',
        answer: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Los tiempos de entrega varían según el método de envío seleccionado:'
                }
              ]
            },
            {
              type: 'list',
              children: [
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Producción: 24-48 horas hábiles'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Entrega en Metro: 2-3 días hábiles (incluyendo producción)'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Envío estándar: 4-7 días hábiles (incluyendo producción)'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Envío express: 2-4 días hábiles (incluyendo producción)'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Recibirás un correo de confirmación cuando tu pedido esté listo para enviar.'
                }
              ]
            }
          ]
        },
        category: 'shipping',
        order: 3,
        featured: false
      },

      // Product Compatibility
      {
        question: '¿En qué tarjetas y teléfonos se pueden pegar los stickers?',
        answer: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Nuestros stickers están diseñados para adaptarse a la mayoría de tarjetas bancarias y teléfonos:'
                }
              ]
            },
            {
              type: 'list',
              children: [
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Tarjetas de crédito y débito estándar (Visa, MasterCard, American Express)'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Tarjetas de identificación (INE, pasaporte)'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Teléfonos con diseño similar al iPhone 12/13/14/15'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'La mayoría de los teléfonos Android de gama media y alta'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Si tienes dudas sobre compatibilidad, contáctanos antes de tu compra.'
                }
              ]
            }
          ]
        },
        category: 'products',
        order: 1,
        featured: false
      },

      // Returns Policy
      {
        question: '¿Cuál es la política de devoluciones y cambios?',
        answer: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Nos esforzamos por ofrecerte productos de calidad. Aquí están nuestros términos:'
                }
              ]
            },
            {
              type: 'list',
              children: [
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Cambios: Puedes solicitar cambio por otro diseño dentro de los 7 días hábiles'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Devoluciones: Solo por defectos de fabricación, dentro de los 3 días hábiles'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'El producto debe estar en perfectas condiciones sin uso'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Envío de devolución corre por cuenta del cliente'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Para iniciar un proceso de devolución o cambio, contáctanos a hola@stickycovers.com'
                }
              ]
            }
          ]
        },
        category: 'general',
        order: 1,
        featured: false
      },

      // Custom Orders
      {
        question: '¿Cómo puedo solicitar diseños personalizados?',
        answer: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Creamos diseños personalizados para empresas y eventos especiales:'
                }
              ]
            },
            {
              type: 'list',
              children: [
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Diseños corporativos para empresas'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Diseños para eventos y fiestas'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Diseños con logos o imágenes específicas'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Pedidos mínimos: 50 unidades'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'list-item',
                  children: [
                    {
                      type: 'list-item-child',
                      children: [
                        {
                          text: 'Entrega en 5-10 días hábiles'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Envía tu idea a diseño@stickycovers.com y te enviaremos un presupuesto personalizado.'
                }
              ]
            }
          ]
        },
        category: 'products',
        order: 2,
        featured: false
      }
    ]

    // Create FAQs
    for (const faq of faqs) {
      await payload.create({
        collection: 'faqs',
        data: faq
      })
    }

    console.log('✅ FAQs seeded successfully')
  } catch (error) {
    console.error('❌ Error seeding FAQs:', error)
    throw error
  }
}

// Execute if run directly
if (process.argv[1].includes('faqs.ts')) {
  seedFAQs()
}