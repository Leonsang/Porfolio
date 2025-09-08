# Portfolio Personal - Next.js 14

## Descripción

Portfolio personal desarrollado con Next.js 14, TypeScript y Tailwind CSS. Incluye un asistente virtual con IA integrada, diseño responsive y soporte multiidioma.

## ✨ Features

- **Asistente Virtual con IA**: Integración con Hugging Face para respuestas inteligentes
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Multiidioma**: Soporte completo para español e inglés
- **Animaciones Fluidas**: Transiciones suaves y efectos visuales
- **Tema Oscuro/Claro**: Cambio dinámico de tema
- **SEO Optimizado**: Meta tags y estructura optimizada para buscadores
- **Performance**: Optimizado para Core Web Vitals

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **IA**: Hugging Face API
- **Iconos**: Lucide React
- **Deployment**: Vercel

## 📦 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
npm run type-check   # Verificación de tipos
```

## 📁 Estructura Relevante

```
src/
├── app/                 # App Router (Next.js 14)
├── components/          # Componentes reutilizables
├── config/             # Configuración del portfolio
├── hooks/              # Custom hooks
├── lib/                # Utilidades y helpers
└── types/              # Definiciones de tipos

public/
├── docs/               # Documentos (CV, etc.)
├── images/             # Imágenes del portfolio
└── locales/            # Archivos de traducción
```

## ⚙️ Configuración de Contenido

El contenido del portfolio se configura en:
- `src/config/portfolio.ts` - Datos principales
- `public/locales/` - Traducciones
- `public/docs/` - Documentos y archivos

### Contenido Bilingüe

Todos los textos están disponibles en español e inglés:
- Detección automática del idioma del navegador
- Cambio manual de idioma
- URLs localizadas

### Estructura Modular

Cada sección del portfolio es un componente independiente:
- Fácil mantenimiento
- Reutilización de código
- Carga optimizada

## 🚀 Desarrollo Local

1. Clona el repositorio
2. Instala dependencias: `npm install`
3. Configura variables de entorno (opcional para IA)
4. Ejecuta: `npm run dev`
5. Abre: `http://localhost:3000`

## 🌐 Deploy

El proyecto está optimizado para deployment en Vercel:
- Build automático
- Optimización de imágenes
- Edge Functions para IA
- CDN global

## 🔧 Configuración de Variables de Entorno

Para el asistente de IA (opcional):
```env
HUGGINGFACE_API_TOKEN=tu_token_aqui
```

## 📱 Responsive Design

El portfolio está optimizado para:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Personalización

### Colores y Tema
Los colores se configuran en `tailwind.config.js` y `src/app/globals.css`

### Contenido
Modifica `src/config/portfolio.ts` para actualizar:
- Información personal
- Proyectos
- Habilidades
- Experiencia
- Certificaciones

### Traducciones
Actualiza los archivos en `public/locales/` para modificar textos

## 🧪 Testing

```bash
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Coverage report
```

## 📈 Performance

El proyecto incluye optimizaciones para:
- Lazy loading de componentes
- Optimización de imágenes con Next.js Image
- Code splitting automático
- Preload de recursos críticos

## 🤝 Contribución

Este es un proyecto personal, pero las sugerencias y mejoras son bienvenidas.

## 📄 Licencia

MIT License - ver archivo LICENSE para más detalles.