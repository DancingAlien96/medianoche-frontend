# Medianoche — Frontend

Tienda en línea **Medianoche**, construida con **Next.js 16** (App Router), **React 19**
y **Tailwind CSS v4**. Consume la API de [`medianoche-backend`](../medianoche-backend).

## Características (MVP)

- 🛍️ **Catálogo** — listado, detalle, filtro por categoría, búsqueda y paginación.
- 🔐 **Autenticación** — registro / login con JWT guardado en **cookie httpOnly**
  (patrón BFF con Server Actions; el token nunca se expone al cliente).
- 🟦 **Google Sign-In (Firebase)** — el cliente obtiene un ID token con el Firebase
  Web SDK; el backend lo verifica y emite el mismo JWT/cookie.
- 🛒 **Carrito** — agregar, actualizar cantidad y eliminar, con contador en la barra.
- 🌙 Tema oscuro "medianoche".

## Requisitos

- Node.js 20.9+ (probado con 22.x)
- El backend corriendo en `http://localhost:3001` (ver su README).

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar el entorno (ya incluido en .env.local)
#    API_URL="http://localhost:3001/api"

# 3. Arrancar el servidor de desarrollo
npm run dev
```

Abre `http://localhost:3000`.

> Asegúrate de que el backend esté levantado y con datos (`npm run db:seed`).
> Puedes entrar con la cuenta demo: `demo@medianoche.com` / `password123`.

## Notas sobre esta versión de Next.js (16)

Este proyecto sigue las convenciones de Next.js 16:

- `params`, `searchParams`, `cookies()` y `headers()` son **asíncronos** (`await`).
- Las mutaciones (auth y carrito) usan **Server Actions** (`lib/*-actions.ts`).
- Las imágenes remotas se configuran con `images.remotePatterns` (no `images.domains`).
- `cacheComponents` está **desactivado** en este MVP; el fetching es dinámico y
  siempre fresco desde el backend.

## Estructura

```text
app/
  layout.tsx              # layout raíz + navbar + footer
  page.tsx                # catálogo (home)
  products/[id]/page.tsx  # detalle de producto
  cart/page.tsx           # carrito (requiere sesión)
  login/ · register/      # autenticación
components/               # navbar, product-card, cart-item-row, etc.
lib/
  api.ts                  # cliente HTTP hacia el backend
  session.ts              # lectura del token (cookie httpOnly)
  auth-actions.ts         # Server Actions de login/registro/logout
  cart-actions.ts         # Server Actions del carrito
  types.ts · money.ts     # tipos y formato de precio
```
