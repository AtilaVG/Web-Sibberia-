# Auditoría de skills de Claude Code (2026-10-06)

Las skills son instrucciones en texto que Claude Code carga en `.claude/skills/`.
Ninguna se ejecuta sola: solo influyen en cómo trabaja el agente. El riesgo real
es que contengan instrucciones para leer credenciales, descargar y ejecutar
código o publicar datos, o que descarguen instrucciones nuevas en tiempo de uso.

## Método

1. Clonado limpio de cada repositorio de origen y comparación byte a byte con
   lo instalado (`diff -r`).
2. Búsqueda de: ficheros ejecutables/scripts, Unicode invisible, comentarios
   HTML, descargas (`curl`, `wget`), ejecución (`| sh`, `eval`), codificación
   (`base64`), inyección de instrucciones («ignore previous», «system prompt»,
   «no se lo digas al usuario»), credenciales (`token`, `.env`, `.ssh`, `.aws`,
   `GITHUB_TOKEN`…), cambios de configuración (`settings.json`, `hooks`, `sudo`)
   y publicación (`git push`, `npm publish`, `webhook`).
3. Revisión manual de cada coincidencia y de todos los dominios externos.

## Resultado

| Skill | Origen | Commit | Íntegra | Hallazgos |
|---|---|---|---|---|
| find-skills | vercel-labs/skills (oficial) | 14cf84a | Sí | Ninguno. Propone instalar con `-y` (sin confirmación); en este repo siempre se pide confirmación (ver CLAUDE.md). |
| frontend-design | anthropics/skills (oficial) | 683bc88 | Sí | Ninguno («webhook» aparece como ejemplo de redacción). |
| web-design-guidelines | vercel-labs/agent-skills (oficial) | 063bee9 | Sí → **endurecida** | Descargaba sus reglas de GitHub en cada uso: un cambio futuro podría colar instrucciones. Ahora usa una copia local revisada (`guidelines.md`, commit 434b7f9). |
| gsap-core, gsap-scrolltrigger, gsap-performance | greensock/gsap-skills (oficial) | aed9cfd | Sí | Ninguno. Solo enlaces a gsap.com. |
| threejs-* (10) | CloudAI-X/threejs-skills (terceros) | b1c6230 | Sí | Ninguno. «base64» es un ejemplo de Data URL; URLs de CDNs públicas en ejemplos de código. El repo no incluye licencia. |
| remotion-best-practices, remotion-captions | remotion-dev/skills (oficial de Remotion) | 4733526 | Sí | Ninguno. Explican cómo usar **tus propias** claves de MapTiler, Mapbox, Google Maps o ElevenLabs mediante variables de entorno, solo si se usan esas funciones; no piden ni leen credenciales. La clave de Algolia es la clave pública de solo lectura de su buscador de documentación. Los `.ts` son plantillas de ejemplo. **Licencia de Remotion:** uso comercial por empresas puede requerir licencia (remotion.dev/license). |
| algorithmic-art | anthropics/skills (oficial) | 683bc88 | Sí | Ninguno. Comentarios HTML de plantilla; carga p5.js desde cdnjs. |
| scroll-world | Propia (este repo) | — | — | Escrita para Sibberia. |

Fuera del repo, `~/.claude/skills/find-skills` (instalación global del
contenedor) también es idéntica al original. `session-start-hook` y `synced`
las aporta el entorno de Claude Code, no este proyecto.

## Cómo volver a auditar

```bash
git clone --depth 1 https://github.com/<owner>/<repo>.git /tmp/up
diff -r .claude/skills/<skill> /tmp/up/skills/<skill>
grep -rniE 'curl|wget|\| *sh|eval|base64|ignore (previous|prior)|system prompt|token|\.env|\.ssh|settings\.json|hooks' .claude/skills/<skill>
```
