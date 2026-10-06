# Redirecciones 301 al pasar a sibberia.com

La nueva web usa las **mismas rutas** que la web actual de sibberia.com para los
servicios y secciones principales, así que la mayoría no necesita redirección.
Solo cambian las que no terminan en barra.

| URL actual (sibberia.com) | Nueva URL | ¿301? |
|---|---|---|
| `/seleccion-personas/` | `/seleccion-personas/` | No (misma ruta) |
| `/estrategia-y-gestion-del-capital-humano/` | `/estrategia-y-gestion-del-capital-humano/` | No (misma ruta) |
| `/formacion-y-desarrollo-de-personas/` | `/formacion-y-desarrollo-de-personas/` | No (misma ruta) |
| `/ofertas-de-trabajo/` | `/ofertas-de-trabajo/` | No (misma ruta) |
| `/blog` | `/blog/` | Sí |
| `/contacto` | `/contacto/` | Sí |

**Pendiente:** las URLs de cada oferta y de cada artículo del blog actual. Cuando
tengamos el listado, cada una se redirige a `/ofertas-de-trabajo/<slug>/` o
`/blog/<slug>/`. Si una oferta ya está cerrada, redirigir a `/ofertas-de-trabajo/`.

## nginx

```nginx
location = /blog     { return 301 /blog/; }
location = /contacto { return 301 /contacto/; }
```

## Apache (.htaccess)

```apache
RewriteEngine On
RewriteRule ^blog$ /blog/ [R=301,L]
RewriteRule ^contacto$ /contacto/ [R=301,L]
```

## Netlify / Cloudflare Pages (`_redirects`)

```
/blog      /blog/      301
/contacto  /contacto/  301
```

## Rutas antiguas de la versión de GitHub Pages

`pages/seleccion.html`, `pages/consultoria.html`, etc. se generan como páginas de
redirección (meta refresh + canonical + noindex), porque GitHub Pages no permite
301 reales. En sibberia.com no hacen falta.

## Cambiar el dominio

1. En GitHub: *Settings → Secrets and variables → Actions → Variables* →
   crear `SITE_URL` con `https://sibberia.com`.
2. El siguiente despliegue regenera canonical, `og:url`, JSON-LD, `sitemap.xml`
   y `robots.txt` con ese dominio.
3. En local: `SITE_URL=https://sibberia.com npm run build`.
