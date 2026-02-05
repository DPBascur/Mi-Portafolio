# Portafolio (Next.js)

Portafolio personal construido con Next.js (App Router), enfocado en una experiencia visual moderna, secciones animadas y un hero 3D.

## Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Three.js / React Three Fiber / Drei (hero 3D)

## Requisitos

- Node.js 20.x

## Scripts

Instalar dependencias:

```bash
npm install
```

Desarrollo (Turbopack):

```bash
npm run dev
```

Build de producción:

```bash
npm run build
```

Servidor de producción local:

```bash
npm run start
```

## Estructura principal

- `app/` rutas y layout (App Router)
- `components/` secciones (Navbar, SobreMi, MisProyectos, Contacto, hero 3D)
- `public/` assets estáticos (imágenes, logos y documentos)

## Descarga de CV

El CV se sirve como archivo estático desde `public/`.

- URL: `/CV_DanielBascur.pdf`
- Archivo: `public/CV_DanielBascur.pdf`

En producción se configuran headers para forzar descarga del PDF (Content-Disposition: attachment).

## Deploy

Funciona bien en Vercel u otras plataformas compatibles con Next.js.

- Asegúrate de usar Node 20
- Verifica que `public/CV_DanielBascur.pdf` exista para evitar 404 en la descarga
