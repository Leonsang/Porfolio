# 🚀 Portfolio Personal - Next.js 14

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue" alt="Framer Motion" />
</div>

## 📖 Descripción

Portfolio personal moderno y profesional desarrollado con **Next.js 14**, **TypeScript** y **Tailwind CSS**. Incluye un asistente virtual con IA integrada, diseño responsive optimizado y soporte completo multiidioma (ES/EN).

### 🎯 **Objetivo**
Mostrar habilidades técnicas, proyectos destacados y experiencia profesional de manera interactiva y atractiva, con enfoque en la experiencia del usuario y performance optimizada.

## ✨ Features

- **Asistente Virtual con IA**: Integración con Hugging Face para respuestas inteligentes
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Multiidioma**: Soporte completo para español e inglés
- **Animaciones Fluidas**: Transiciones suaves y efectos visuales
- **Tema Oscuro/Claro**: Cambio dinámico de tema
- **SEO Optimizado**: Meta tags y estructura optimizada para buscadores
- **Performance**: Optimizado para Core Web Vitals

## 🛠️ Stack Tecnológico

### **Frontend**
- **Framework**: Next.js 14 (App Router) - Framework React de producción
- **Lenguaje**: TypeScript - Tipado estático para JavaScript
- **Estilos**: Tailwind CSS - Framework CSS utility-first
- **Animaciones**: Framer Motion - Librería de animaciones para React
- **Iconos**: Lucide React - Iconos SVG optimizados

### **Backend & IA**
- **IA**: Hugging Face API - Modelos de lenguaje natural
- **API Routes**: Next.js API Routes - Endpoints serverless

### **Deployment & Tools**
- **Hosting**: Vercel - Plataforma optimizada para Next.js
- **Control de Versiones**: Git & GitHub
- **Package Manager**: npm/yarn
- **Linting**: ESLint + Prettier

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # 🚀 Servidor de desarrollo (http://localhost:3000)
npm run build        # 🏗️  Build optimizado para producción
npm run start        # ▶️  Servidor de producción local

# Calidad de Código
npm run lint         # 🔍 Análisis de código con ESLint
npm run lint:fix     # 🔧 Corrección automática de errores de linting
npm run type-check   # ✅ Verificación de tipos TypeScript
npm run format       # 💅 Formateo de código con Prettier

# Testing (si está configurado)
npm run test         # 🧪 Ejecutar tests unitarios
npm run test:watch   # 👀 Tests en modo watch
npm run test:coverage # 📊 Reporte de cobertura
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

## 🚀 Instalación y Desarrollo Local

### **Prerrequisitos**
- Node.js 18+ 
- npm o yarn
- Git

### **Instalación**

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/Leonsang/Porfolio.git
   cd Porfolio
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configura las variables de entorno (opcional)**
   ```bash
   cp .env.example .env.local
   ```
   Edita `.env.local` y agrega tu token de Hugging Face:
   ```env
   HUGGINGFACE_API_TOKEN=tu_token_aqui
   ```

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   Visita [http://localhost:3000](http://localhost:3000)

### **🎉 ¡Listo!** Tu portfolio está funcionando localmente.

## 🌐 Deploy en Producción

### **Vercel (Recomendado)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Leonsang/Porfolio)

1. **Deploy automático desde GitHub**
   - Conecta tu repositorio en [Vercel](https://vercel.com)
   - Configura las variables de entorno
   - Deploy automático en cada push

2. **Características optimizadas para Vercel:**
   - ✅ Build automático
   - ✅ Optimización de imágenes
   - ✅ Edge Functions para IA
   - ✅ CDN global
   - ✅ Analytics integrado

### **Otras plataformas**
- **Netlify**: Compatible con build estático
- **Railway**: Deploy con Docker
- **AWS Amplify**: Integración con AWS

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

Este es un proyecto personal, pero las **sugerencias y mejoras son bienvenidas**.

### **¿Cómo contribuir?**
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### **Reportar bugs**
Si encuentras algún bug, por favor [abre un issue](https://github.com/Leonsang/Porfolio/issues) con:
- Descripción del problema
- Pasos para reproducirlo
- Capturas de pantalla (si aplica)

## 📞 Contacto

**Erick Sang** - Data Engineer & Full Stack Developer

- 🌐 **Website**: [ericksang.dev](https://ericksang.dev)
- 💼 **LinkedIn**: [esangc](https://linkedin.com/in/esangc)
- 📧 **Email**: ericksang@gmail.com
- 🐱 **GitHub**: [@Leonsang](https://github.com/Leonsang)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">
  <p>⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub! ⭐</p>
  <p>Hecho con ❤️ por <a href="https://github.com/Leonsang">Erick Sang</a></p>
</div>