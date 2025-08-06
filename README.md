# MITINGÜ ^\_−☆ – E-commerce de productos coreanos

MITINGÜ es una tienda online moderna y responsiva para la venta de productos coreanos, como ramen, snacks, salsas y más. Incluye panel de administración, carrito de compras, checkout y autenticación de usuarios.

## Características principales

- **Catálogo de productos:** Explora productos coreanos con imágenes, descripciones y categorías.
- **Carrito de compras:** Añade, elimina y ajusta cantidades de productos.
- **Checkout:** Proceso de compra con formulario de datos del comprador y selección de método de pago (transferencia o pago en tienda).
- **Panel de administración:** Gestión de productos, pedidos y categorías (CRUD).
- **Autenticación:** Login para administradores.
- **Responsive:** Diseño adaptado a dispositivos móviles y escritorio.
- **Integración con Firebase Hosting.**

## Estructura del proyecto

- `/src/components`: Componentes reutilizables (UI, Admin, Cart, Header, etc).
- `/src/pages`: Vistas principales (Home, Shop, ProductDetail, Checkout, Admin, etc).
- `/src/services`: Lógica de conexión con la API (productos, usuarios, pedidos).
- `/src/store` y `/src/context`: Manejo de estado global (carrito, autenticación).
- `/public`: Recursos estáticos e imágenes.

## Instalación

1. Instala las dependencias:

   ```sh
   npm install
   ```

2. Configura las variables de entorno en un archivo `.env`:

   ```
   VITE_API_URL=URL_DE_TU_BACKEND
   ```

3. Inicia el servidor de desarrollo:

   ```sh
   npm run dev
   ```

4. Accede a la app en [http://localhost:5173](http://localhost:5173)

## Scripts útiles

- `npm run dev` – Inicia el entorno de desarrollo.
- `npm run build` – Genera la build de producción.
- `npm run lint` – Ejecuta ESLint para revisar el código.

## Demo de acceso administrador

Para probar el panel admin, puedes usar:

```
Usuario: admin@test.com
Contraseña: admin123
```

## Tecnologías utilizadas

- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **Framer Motion** (animaciones)
- **Axios** (peticiones HTTP)
- **Firebase Hosting**

## Estructura de carpetas

```
src/
  components/
  pages/
  services/
  store/
  context/
  utils/
  types/
public/
```

## Despliegue

El proyecto está preparado para desplegarse en Firebase Hosting. Consulta los archivos [`firebase.json`](firebase.json) y [`.firebaserc`](.firebaserc).

---

Desarrollado por DivKey para MITINGÜ.
# front-mitingu
