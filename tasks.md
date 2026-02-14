# Tareas por Hacer

A continuación se detallan 100 tareas para completar e implementar todas las rutas, contenido dummy, ajustes de configuración, mejoras de UX/UI, y limpieza del proyecto:

1. Cambiar el puerto del servidor Payload a 3001 en .env y server.ts
2. Verificar que Next.js siga escuchando en el puerto 3000
3. Actualizar script dev:web para usar puerto 3000 explícitamente
4. Crear la ruta `/products` en Next.js con página de listado
5. Consumir datos de la colección `products` desde Payload en `/products` con SWR
6. Renderizar cards de producto con Shadcn Components y Tailwind
7. Implementar paginación en `/products` con query params
8. Crear la ruta `/products/[id]` para detalle de producto
9. Renderizar información detallada de producto con dummy data mínima
10. Añadir botón de "Editar producto" que redirija a Payload Admin
11. Crear la ruta `/orders` en Next.js con listado de pedidos
12. Consumir datos de la colección `orders` en `/orders` con fetch y SWR
13. Mostrar columnas de tabla: ID, cliente, fecha, total
14. Añadir search bar para filtrar pedidos por ID o cliente
15. Crear la ruta `/orders/[id]` para detalle de pedido
16. Mostrar línea de items, cantidades y precios en detalle de pedido
17. Crear la ruta `/users` con listado de usuarios autenticados
18. Añadir autenticación JWT en Next.js para acceder a `/users`
19. Crear login page `/login` con formulario email/password
20. Consumir endpoint de Login de Payload para obtener token
21. Almacenar JWT en cookie segura o localStorage con HttpOnly
22. Crear logout en layout global que limpie token
23. Añadir protected-route HOC para páginas sensibles
24. Crear la ruta `/clients` con listado de clientes
25. Renderizar información básica de clientes: nombre, email
26. Crear detalles de cliente en `/clients/[id]`
27. Crear ruta `/categories` con listado de categorías
28. Permitir selección de categoría en filtros de productos
29. Crear ruta `/boxes` con listado de cajas/paquetes
30. Crear ruta `/boxes/[id]` con detalle de caja
31. Crear ruta `/coupons` con listado de cupones
32. Mostrar estado (activo/expirado) de los cupones
33. Crear ruta `/coupons/[id]` para detalle de cupón
34. Crear ruta `/media` con galería de imágenes dummy
35. Consumir archivos subidos en Payload media collection
36. Implementar component "ImageGallery" con Shadcn UI
37. Añadir carga de dummy images con payload.create en seed
38. Crear script de seed para cargar dummy data en MongoDB
39. Añadir comando npm run seed al package.json
40. Crear página de Settings: `/settings/minimum-stock` para global
41. Mostrar y editar global `MinimumStock` desde Next.js
42. Crear página de Settings: `/settings/metro` para global Metro
43. Configurar form con validación Zod en pages de settings
44. Añadir barra de navegación global con links a todas rutas
45. Implementar layout base en components/Layout.tsx con slots
46. Añadir componente Navbar con Shadcn y headless UI
47. Integrar dark-mode toggle en Navbar y body class
48. Crear componente Footer con enlaces de interés
49. Personalizar metadata y title por página en Next.js
50. Eliminar contenido starter de src/app/page.tsx
51. Crear página Homepage `/` con bienvenida y links rápidos
52. Añadir hero section con imagen dummy y llamada a la acción
53. Crear componente Hero con props configurables
54. Crear sección "Destacados" en homepage con 3 productos dummy
55. Consumir 3 primeros productos en hero y mostrarlos
56. Añadir página de 404 personalizada en `/app/not-found.tsx`
57. Crear componente ErrorBoundary para captura de errores
58. Configurar tailwind.config.ts con paths de componentes
59. Añadir plugin de Shadcn UI a `src/web` con shadcn cli
60. Crear componente Badge para estado (activo, expirado)
61. Crear componente Table genérico con Shadcn UI
62. Crear component Modal para crear nuevos registros dummy
63. Añadir página "Create Product" en Next.js con dummy form
64. Validar form con React Hook Form y Zod
65. Enviar request POST a `/api/payload/collections/products` para crear
66. Crear endpoint API Route en `/src/web/src/pages/api/products.ts` proxy
67. Crear proxy route `/api/orders` similar al de productos
68. Añadir soporte GraphQL: crear página Playground en `/graphql`
69. Configurar Apollo Client en Next.js para consumir GraphQL
70. Crear componente Loading spinner reutilizable
71. Crear componente Alert para mensajes de éxito/error
72. Añadir Toast provider para mensajes flash
73. Integrar Algolia Search en homepage y /products page
74. Configurar client de Algolia con Next.js env var
75. Crear sección de ayuda Contact Us con formulario de envío dummy
76. Integrar Resend email desde frontend para Contact Us
77. Añadir Phone input con validación para WhatsApp
78. Configurar keys de Telegram en backend para notificaciones
79. Crear endpoint `/api/notify` que envíe mensaje via Telegram
80. Crear pruebas unitarias con Jest para utilidades de fetch
81. Configurar CI con Github Actions para build y test
82. Configurar lint y prettier con husky pre-commit hooks
83. Documentar componentes en Storybook básico
84. Configurar Storybook en `src/web` y añadir stories
85. Crear componente Button primario y secundario en Shadcn
86. Añadir test visual con Chromatic para Storybook
87. Crear pipeline de despliegue a Vercel en README.md
88. Actualizar README.md con rutas, configuración y seeding
89. Limpiar imports innecesarios en todos los archivos
90. Añadir ESLint y TS Config autofix para código limpio
91. Eliminar CSS global duplicado y unused styles
92. Configurar PurgeCSS en Tailwind para producción
93. Crear documentación de API interna en /docs/api.md
94. Crear documentación de Tasks en tasks.md (esta lista)
95. Revisar y actualizar .cursor/rules para mejores prácticas
96. Quitar logs de consola innecesarios en producción
97. Añadir README para configuración local y variables env
98. Verificar accesibilidad con Axe en componente Navbar
99. Optimizar imágenes con next/image y lazy-loading
100. Realizar prueba end-to-end con Cypress en flujo clave 