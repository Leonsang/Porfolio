# Documentación del Sitio Web (Next.js 15 + Turbopack)

Este documento describe el proyecto de tu portfolio: arquitectura, configuración, scripts, flujos clave (asistente virtual, audio), i18n, estilos, API y guía de desarrollo. Nota: no se modifica el README.md del repositorio (reservado para tu GitHub Page).

## Índice
- Requisitos
- Instalación y scripts
- Estructura del proyecto
- Arquitectura de UI
- Asistente Virtual (Athena)
- Internacionalización (next-intl)
- Estilos y UI
- Reproductor de Audio
- API interna /api/athena-chat
- Calidad (lint, types, análisis de bundle)
- Despliegue
- Troubleshooting

---

## Requisitos
- Node.js 20+
- pnpm 9+

## Instalación y scripts
Instalación de dependencias:
- pnpm install

Scripts disponibles:
- Desarrollo: pnpm dev (Next + Turbopack)
- Build: pnpm build (Next build con Turbopack)
- Start: pnpm start
- Lint: pnpm lint
- Type-check: pnpm type-check
- Check CI: pnpm ci:check (type-check + lint)
- Analizar bundle: pnpm analyze (requiere cross-env y @next/bundle-analyzer)

## Estructura del proyecto
- src/app
  - globals.css: estilos globales (tailwind + CSS custom)
  - layout.tsx: layout base (metadatos y tipografías)
  - [locale]/page.tsx: página principal por locale
  - api/athena-chat/route.ts: endpoint para el asistente
- src/components
  - effects/
    - VirtualAssistant.tsx: panel HUD lateral con chat
    - SynthwaveChat.tsx + SynthwaveChat.css: UI de chat (chatscope)
    - AudioPlayer.tsx: reproductor avanzado embebido (opcional)
    - AudioPlayerFloating.tsx: reproductor flotante con panel inline
    - AudioButton.tsx: botón para abrir reproductor flotante
  - layout/
    - PortfolioLayout.tsx: layout principal, navegación y toggle del asistente
    - LanguageButton.tsx, LanguageSwitcher.tsx: cambio de idioma UI
  - sections/: Hero, About, Technical, Experience, Projects, Certifications, Contact
  - ui/: componentes UI como CustomTooltip, DynamicTitleSlider, etc.
  - charts/: SkillsChart
  - modals/: CVDownloadModal
- src/contexts/ThemeContext.tsx: provider para temas y CSS vars
- src/hooks/useAssistantMessages.ts: carga de textos del asistente según locale
- src/i18n/: configuración next-intl
- src/messages/: assistant-es.json, assistant-en.json, demoResponses.ts
- public/: assets (imágenes Athena /images/1/athena_neutral_XX.png, sonidos, etc.)

## Arquitectura de UI
- Layout principal en PortfolioLayout.tsx que monta navegación, controles (idioma/tema/audio) y el Asistente Virtual (panel derecho toggleable).
- Secciones principales se renderizan en [locale]/page.tsx dentro de PortfolioLayout.

## Asistente Virtual (Athena)
- UI del Asistente: src/components/effects/VirtualAssistant.tsx
  - Renderiza SynthwaveChat (basado en @chatscope/chat-ui-kit-react).
  - Pasa initialAssistantMessage usando useAssistantMessages según locale.
  - Maneja isAITyping para bloquear input durante llamadas a /api/athena-chat.
  - Frames del avatar: rotación solo cuando llega nueva respuesta (imagen fija durante “typing”).
- Mensajes y contexto:
  - useAssistantMessages.ts carga assistant-*.json por locale (welcome, contextuales, tips).
  - Rutas de frames corregidas a /images/1/athena_neutral_00..12.png.
- API de chat:
  - /api/athena-chat combinada con fallback demo centralizado en src/messages/demoResponses.ts.
  - Detecta idioma por Accept-Language.

## Internacionalización (next-intl)
- Plugin en next.config.ts con createNextIntlPlugin.
- Configuración en src/i18n/ (config.ts, routing.ts). Mensajes en /messages/*.json.
- Componentes de UI para cambiar idioma: LanguageButton, LanguageSwitcher.

## Estilos y UI
- Tailwind v4 con configuración en tailwind.config.ts. Estilos globales en src/app/globals.css.
- Estilos del asistente: src/styles/virtual-assistant.css + SynthwaveChat.css (override de chatscope).
- Tema: ThemeContext aplica variables CSS de tema a :root; script opcional src/scripts/theme-init.ts (si lo usas antes de hidratar).

## Reproductor de Audio
- AudioPlayerFloating: reproductor flotante sencillo con panel interno (no depende de archivos eliminados).
- AudioButton en PortfolioLayout abre/cierra el panel flotante.
- AudioPlayer (opcional): reproductor avanzado con panel y botón toggle.
- Sonidos en public/sounds/.

## API interna: /api/athena-chat
- Si HUGGINGFACE_API_KEY no está definido, modo demo con respuestas localizadas.
- Si hay clave, realiza POST a HF DialoGPT con timeout (10s) y fallbacks robustos.
- Fallbacks (HTML en respuesta, JSON inválido, rate limit) devuelven respuesta demo.

## Calidad (lint, types, análisis de bundle)
- TypeScript: pnpm type-check
- ESLint: pnpm lint
- Análisis de bundle: pnpm analyze
  - next.config.ts integra @next/bundle-analyzer (habilitado cuando ANALYZE=true).

## Despliegue
- Build: pnpm build (Turbopack)
- Start: pnpm start
- Variables de entorno (opcional):
  - HUGGINGFACE_API_KEY: si lo defines, el chat usará la API en vez del modo demo.

## Troubleshooting
- Module not found tras eliminar componentes:
  - Ya se limpiaron importaciones rotas (ParticlesBackground, SplineBackground, AudioPlayerPanel, etc.).
- Tipos/Lint:
  - Se removieron variables e imports no usados; el proyecto queda sin errores de ESLint y TypeScript.
- Avatar del asistente se queda fijo:
  - Es el comportamiento buscado: rota solo al llegar una respuesta nueva.
- Ver el tamaño del bundle:
  - Ejecuta pnpm analyze. Revisa reportes por página y evita dependencias innecesarias.

