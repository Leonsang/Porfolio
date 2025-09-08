# 🖥️ COMANDOS PARA DIFERENTES PLATAFORMAS

## 🎯 OBJETIVO
Comandos específicos para ejecutar en Claude Code, Cursor y Warp para el desarrollo del portfolio.

---

## 🚀 COMANDOS DE INICIO RÁPIDO

### **Claude Code**
```bash
# Verificar estructura del proyecto
ls -la .agents/

# Ver estado de agentes
cat .agents/status.md

# Ver progreso actual
cat .agents/progress.md

# Ver issues activos
cat .agents/issues.md
```

### **Cursor**
```bash
# Abrir proyecto en Cursor
cursor .

# Ver archivos de agentes
code .agents/

# Ver changelog
code CHANGELOG-AI-AGENT.md
code CHANGELOG-MANUAL.md
```

### **Warp**
```bash
# Navegar al directorio del proyecto
cd /path/to/portfolio

# Ver estructura de agentes
tree .agents/

# Ver estado actual
cat .agents/status.md | head -20
```

---

## 📋 COMANDOS POR AGENTE

### 🏗️ **ARCHITECT-AGENT**

#### **Claude Code**
```bash
# Crear diagrama de arquitectura
mermaid-cli -i architecture.mmd -o architecture.png

# Ver configuración actual
cat next.config.ts
cat tailwind.config.ts
cat tsconfig.json
```

#### **Cursor**
```bash
# Abrir archivos de configuración
code next.config.ts
code tailwind.config.ts
code tsconfig.json

# Crear documentación
code docs/architecture.md
```

#### **Warp**
```bash
# Ver configuración del proyecto
cat package.json | grep -A 10 "scripts"
cat next.config.ts
cat tailwind.config.ts
```

### 🎨 **UI-AGENT**

#### **Claude Code**
```bash
# Ver componentes existentes
ls -la src/components/sections/
ls -la src/components/ui/

# Crear nuevo componente
touch src/components/sections/AnalyticsSection.tsx
touch src/components/sections/NotebooksSection.tsx

# Ver estilos globales
cat src/app/globals.css
```

#### **Cursor**
```bash
# Abrir componentes
code src/components/sections/
code src/components/ui/

# Crear componentes
code src/components/sections/AnalyticsSection.tsx
code src/components/sections/NotebooksSection.tsx
```

#### **Warp**
```bash
# Ver estructura de componentes
find src/components -name "*.tsx" | head -10

# Ver estilos
cat src/app/globals.css | head -20
```

### 🔧 **BACKEND-AGENT**

#### **Claude Code**
```bash
# Ver APIs existentes
ls -la src/app/api/

# Crear nueva API
mkdir -p src/app/api/portfolio-data
touch src/app/api/portfolio-data/route.ts

# Ver configuración de Supabase
cat .env.local.example
```

#### **Cursor**
```bash
# Abrir APIs
code src/app/api/

# Crear API routes
code src/app/api/portfolio-data/route.ts
code src/app/api/external-projects/route.ts
```

#### **Warp**
```bash
# Ver estructura de APIs
tree src/app/api/

# Ver variables de entorno
cat .env.local.example
```

### 🧪 **TEST-AGENT**

#### **Claude Code**
```bash
# Ejecutar tests
npm test
npm run test:watch
npm run test:coverage

# Ver configuración de tests
cat jest.config.js
cat __tests__/
```

#### **Cursor**
```bash
# Abrir tests
code __tests__/
code jest.config.js

# Ejecutar tests en Cursor
# Usar la terminal integrada
```

#### **Warp**
```bash
# Ejecutar tests
pnpm test
pnpm test:watch
pnpm test:coverage

# Ver resultados
cat coverage/lcov-report/index.html
```

### 🚀 **DEPLOY-AGENT**

#### **Claude Code**
```bash
# Build del proyecto
npm run build
npm run start

# Ver configuración de Vercel
cat vercel.json
cat .vercel/
```

#### **Cursor**
```bash
# Abrir configuración de deploy
code vercel.json
code .vercel/

# Deploy desde Cursor
# Usar Vercel CLI
```

#### **Warp**
```bash
# Deploy con Vercel
vercel --prod
vercel env pull

# Ver logs de deploy
vercel logs
```

### 📚 **DOCS-AGENT**

#### **Claude Code**
```bash
# Ver documentación existente
ls -la docs/
cat README.md

# Crear documentación
mkdir -p docs/api
touch docs/api/portfolio-data.md
```

#### **Cursor**
```bash
# Abrir documentación
code docs/
code README.md

# Crear documentación
code docs/api/portfolio-data.md
code docs/components/
```

#### **Warp**
```bash
# Ver estructura de docs
tree docs/

# Generar documentación
npm run docs:generate
```

---

## 🔧 COMANDOS DE DESARROLLO

### **Instalación de Dependencias**

#### **Claude Code**
```bash
# Instalar dependencias
npm install
# o
pnpm install

# Instalar dependencias de desarrollo
npm install -D @types/node @types/react
```

#### **Cursor**
```bash
# Instalar dependencias
pnpm install

# Instalar dependencias específicas
pnpm add framer-motion
pnpm add -D @types/framer-motion
```

#### **Warp**
```bash
# Instalar dependencias
pnpm install

# Ver dependencias instaladas
pnpm list
```

### **Desarrollo Local**

#### **Claude Code**
```bash
# Iniciar servidor de desarrollo
npm run dev
# o
pnpm dev

# Ver en el navegador
open http://localhost:3000
```

#### **Cursor**
```bash
# Iniciar servidor
pnpm dev

# Abrir en navegador
# Usar Cmd+Click en la URL
```

#### **Warp**
```bash
# Iniciar servidor
pnpm dev

# Ver logs
tail -f .next/server.log
```

### **Build y Deploy**

#### **Claude Code**
```bash
# Build para producción
npm run build

# Iniciar servidor de producción
npm run start

# Deploy a Vercel
vercel --prod
```

#### **Cursor**
```bash
# Build
pnpm build

# Deploy
vercel --prod

# Ver deploy
vercel ls
```

#### **Warp**
```bash
# Build
pnpm build

# Deploy
vercel --prod

# Ver status
vercel status
```

---

## 📊 COMANDOS DE MONITOREO

### **Ver Estado del Proyecto**

#### **Claude Code**
```bash
# Ver estado de agentes
cat .agents/status.md

# Ver progreso
cat .agents/progress.md

# Ver issues
cat .agents/issues.md
```

#### **Cursor**
```bash
# Abrir archivos de estado
code .agents/status.md
code .agents/progress.md
code .agents/issues.md
```

#### **Warp**
```bash
# Ver estado
cat .agents/status.md | grep "Estado"

# Ver progreso
cat .agents/progress.md | grep "Progreso"

# Ver issues
cat .agents/issues.md | grep "Issue"
```

### **Ver Logs y Errores**

#### **Claude Code**
```bash
# Ver logs de build
cat .next/build.log

# Ver errores de TypeScript
npx tsc --noEmit

# Ver errores de ESLint
npx eslint .
```

#### **Cursor**
```bash
# Ver problemas en Cursor
# Usar el panel de problemas

# Ver logs
code .next/build.log
```

#### **Warp**
```bash
# Ver logs
tail -f .next/server.log

# Ver errores
pnpm type-check
pnpm lint
```

---

## 🎯 COMANDOS ESPECÍFICOS POR PLATAFORMA

### **Claude Code**
```bash
# Comandos específicos de Claude Code
claude --help
claude --version

# Ver configuración
cat .claude/config.json
```

### **Cursor**
```bash
# Comandos específicos de Cursor
cursor --help
cursor --version

# Ver configuración
cat .cursor/settings.json
```

### **Warp**
```bash
# Comandos específicos de Warp
warp --help
warp --version

# Ver configuración
cat .warp/config.yaml
```

---

## 📝 COMANDOS DE DOCUMENTACIÓN

### **Generar Documentación**

#### **Claude Code**
```bash
# Generar documentación de APIs
npx swagger-jsdoc -d swaggerDef.js src/app/api/**/*.ts -o docs/api.json

# Generar documentación de componentes
npx typedoc src/components/
```

#### **Cursor**
```bash
# Generar documentación
npm run docs:generate

# Abrir documentación
code docs/
```

#### **Warp**
```bash
# Generar documentación
pnpm docs:generate

# Ver documentación
open docs/index.html
```

---

## 🔄 COMANDOS DE ACTUALIZACIÓN

### **Actualizar Estado de Agentes**

#### **Claude Code**
```bash
# Actualizar estado
echo "## ARCHITECT-AGENT Status Update - $(date)" >> .agents/status.md

# Actualizar progreso
echo "## Día 1: Setup - $(date)" >> .agents/progress.md
```

#### **Cursor**
```bash
# Editar archivos de estado
code .agents/status.md
code .agents/progress.md
```

#### **Warp**
```bash
# Actualizar estado
echo "## ARCHITECT-AGENT Status Update - $(date)" >> .agents/status.md

# Ver cambios
git diff .agents/
```

---

## 🚨 COMANDOS DE EMERGENCIA

### **Reset del Proyecto**

#### **Claude Code**
```bash
# Reset completo
git reset --hard HEAD
rm -rf .next
rm -rf node_modules
pnpm install
```

#### **Cursor**
```bash
# Reset desde Cursor
# Usar Git panel para reset
```

#### **Warp**
```bash
# Reset completo
git reset --hard HEAD
rm -rf .next
rm -rf node_modules
pnpm install
```

### **Backup del Proyecto**

#### **Claude Code**
```bash
# Crear backup
tar -czf portfolio-backup-$(date +%Y%m%d).tar.gz .

# Restaurar backup
tar -xzf portfolio-backup-20240101.tar.gz
```

#### **Cursor**
```bash
# Crear backup
git add .
git commit -m "Backup $(date)"
git push
```

#### **Warp**
```bash
# Crear backup
git add .
git commit -m "Backup $(date)"
git push origin main
```

---

## 📞 COMANDOS DE AYUDA

### **Obtener Ayuda**

#### **Claude Code**
```bash
# Ayuda general
claude --help

# Ayuda específica
claude agent --help
```

#### **Cursor**
```bash
# Ayuda de Cursor
cursor --help

# Ver documentación
code docs/
```

#### **Warp**
```bash
# Ayuda de Warp
warp --help

# Ver configuración
cat .warp/config.yaml
```

---

**Última actualización**: [FECHA Y HORA]
**Próxima revisión**: [FECHA Y HORA]
