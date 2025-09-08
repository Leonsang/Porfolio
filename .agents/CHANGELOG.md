# .agents/CHANGELOG (oculto para agentes)

Este archivo está pensado para agentes (Gemini, Warp, Cursor, u otros). Resume cambios, políticas internas y modos de operación para automatizar tareas con seguridad. No mover ni exponer públicamente. No editar README.md desde agentes.

## Reglas generales para agentes
- Seguridad y secretos
  - Nunca imprimir secretos en plano. Usar variables de entorno.
  - No subir claves a control de versiones.
- Alcance de cambios
  - No modificar README.md (es el de GitHub Page). Documentación técnica va en docs/WEBSITE_DOCUMENTATION.md y en este archivo.
  - Mantener consistencia i18n y evitar romper locales.
- Convenciones de commit
  - Incluir etiqueta [agents-changelog] cuando se actualice este archivo.
  - Describir brevemente qué se cambió y por qué.
- Estándares de código
  - Ejecutar: `pnpm ci:check` antes de proponer/mergear.
  - Corregir tipos (tsc) y lint (eslint) antes de finalizar.
- API y endpoints
  - Si no hay HUGGINGFACE_API_KEY, usar modo demo (demoResponses.ts). No cambiar esta lógica sin aprobación.
- Asistente virtual
  - Mantener UI en SynthwaveChat + VirtualAssistant. Avatar fijo en typing; rotar frame solo al recibir respuesta.

## Modos de ejecución

### Modo YOLO (acción automática)
- Permitido:
  - Refactors internos sin romper la API pública.
  - Limpieza de imports, warnings, tipos.
  - Ajustes de estilos no disruptivos.
  - Actualizar `.agents/CHANGELOG` y `docs/WEBSITE_DOCUMENTATION.md`.
- Requiere confirmación explícita del usuario antes de:
  - Eliminar archivos/producto visible (componentes de secciones principales).
  - Cambios en i18n que alteren rutas.
  - Modificar configuración de build o dependencias críticas.
- Prohibido:
  - Modificar README.md.
  - Exponer secretos.

### Modo SOLO (confirmar antes de actuar)
- Siempre solicitar confirmación cuando:
  - Se cambien dependencias (package.json).
  - Se altere next.config.ts o tsconfig.json.
  - Se toque API /api/athena-chat o demos.
  - Se muevan/eliminen componentes de UI de primer nivel.
- Tras confirmación, proceder y actualizar este changelog.

## Procedimiento de actualización de changelog (por agentes)
1) Añadir una entrada bajo “Historial” con fecha UTC, autor (Agente/Usuario) y resumen.
2) Si se agregan scripts o docs, enlazar ruta.
3) Confirmar que `pnpm ci:check` pasa.

## Historial

### 2025-08-30 (Agente)
- Unificación del asistente
  - VirtualAssistant simplificado para usar solo @chatscope/chat-ui-kit-react.
  - Saludo inicial inyectado vía useAssistantMessages por locale.
  - Avatar fijo durante typing; rotación de frame cuando llega nueva respuesta.
- Limpieza de código/archivos
  - Eliminados: ParticlesBackground, SplineBackground, ThreeDEffects, AudioPlayerPanel, typewriter-dialog.css, data/chatExamples.ts.
  - Removidas importaciones rotas en page.tsx y otros.
  - AudioPlayerFloating ahora incluye un panel inline (sin dependencia externa).
- API y mensajes
  - Centralización de respuestas demo en src/messages/demoResponses.ts con soporte de idioma.
  - /api/athena-chat usa demoResponses y fallbacks robustos.
- Tipos/Lint
  - Proyecto sin errores de TypeScript y ESLint (pnpm ci:check OK).
  - Ajustes de tipos en PortfolioNavigation, AudioPlayer, AudioPlayerFloating, DynamicTitleSlider, i18n/config.
- Scripts y análisis
  - package.json: `ci:check` y `analyze` (ANALYZE=true) añadidos.
  - Integrado @next/bundle-analyzer en next.config.ts.
- Documentación
  - Nuevo: docs/WEBSITE_DOCUMENTATION.md con guía completa.

## Pendientes / Notas para agentes
- Si se añaden nuevas secciones o endpoints, documentar en docs/WEBSITE_DOCUMENTATION.md y registrar aquí.
- Mantener la coherencia de rutas i18n (no romper /[locale]).
- Si se introduce un nuevo modelo de IA, agregar variable de entorno y fallback seguro.

