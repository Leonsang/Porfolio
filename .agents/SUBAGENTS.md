# 🤖 SUBAGENTES ESPECIALIZADOS - PORTFOLIO ERICK SANG

## 🎯 OBJETIVO
Definir los subagentes especializados que trabajan bajo los agentes principales para mayor granularidad y especialización.

---

## 🏗️ SUBAGENTES DE ARCHITECT-AGENT

### 🗄️ **DATABASE-DESIGN-AGENT**
**Tipo**: Subagente
**Agente Padre**: ARCHITECT-AGENT
**Responsabilidad**: Diseño de esquemas y relaciones de base de datos

**Tareas Específicas**:
- [ ] Diseñar esquema de tabla `portfolio_data`
- [ ] Diseñar esquema de tabla `external_projects`
- [ ] Diseñar esquema de tabla `athena_conversations`
- [ ] Definir relaciones entre tablas
- [ ] Crear índices para optimización
- [ ] Documentar esquema de base de datos

**Herramientas Especializadas**:
- Supabase Schema Designer
- SQL DDL
- Diagramas ER
- Documentación de esquemas

**Criterios de Éxito**:
- [ ] Esquema de base de datos completo
- [ ] Relaciones bien definidas
- [ ] Índices optimizados
- [ ] Documentación clara

**Dependencias**:
- Ninguna (subagente inicial)

**Tiempo Estimado**: 1 hora
**Prioridad**: ALTA

---

### 🔗 **API-DESIGN-AGENT**
**Tipo**: Subagente
**Agente Padre**: ARCHITECT-AGENT
**Responsabilidad**: Diseño de endpoints y contratos de API

**Tareas Específicas**:
- [ ] Diseñar endpoint `/api/portfolio-data`
- [ ] Diseñar endpoint `/api/external-projects`
- [ ] Diseñar endpoint `/api/contact`
- [ ] Definir contratos de request/response
- [ ] Documentar APIs con OpenAPI
- [ ] Definir códigos de error

**Herramientas Especializadas**:
- OpenAPI/Swagger
- Postman
- API documentation tools
- TypeScript interfaces

**Criterios de Éxito**:
- [ ] Endpoints bien definidos
- [ ] Contratos de API claros
- [ ] Documentación completa
- [ ] Códigos de error definidos

**Dependencias**:
- DATABASE-DESIGN-AGENT debe completar antes

**Tiempo Estimado**: 0.5 horas
**Prioridad**: ALTA

---

### ⚙️ **CONFIG-AGENT**
**Tipo**: Subagente
**Agente Padre**: ARCHITECT-AGENT
**Responsabilidad**: Configuraciones y variables de entorno

**Tareas Específicas**:
- [ ] Definir variables de entorno necesarias
- [ ] Configurar `.env.local` template
- [ ] Configurar variables de Vercel
- [ ] Documentar configuración
- [ ] Validar configuraciones

**Herramientas Especializadas**:
- Environment variables
- Vercel configuration
- Configuration validation
- Documentation tools

**Criterios de Éxito**:
- [ ] Variables de entorno definidas
- [ ] Template de configuración
- [ ] Documentación clara
- [ ] Validación funcionando

**Dependencias**:
- API-DESIGN-AGENT debe completar antes

**Tiempo Estimado**: 0.5 horas
**Prioridad**: MEDIA

---

## 🎨 SUBAGENTES DE UI-AGENT

### 🎨 **COMPONENT-AGENT**
**Tipo**: Subagente
**Agente Padre**: UI-AGENT
**Responsabilidad**: Creación de componentes React

**Tareas Específicas**:
- [ ] Crear `AnalyticsSection.tsx`
- [ ] Crear `NotebooksSection.tsx`
- [ ] Mejorar `TechnicalSection.tsx`
- [ ] Implementar barras de progreso
- [ ] Crear componentes reutilizables
- [ ] Implementar TypeScript interfaces

**Herramientas Especializadas**:
- React 19
- TypeScript 5
- Tailwind CSS 4
- Lucide React icons

**Criterios de Éxito**:
- [ ] Componentes implementados
- [ ] TypeScript sin errores
- [ ] Props bien tipadas
- [ ] Componentes reutilizables

**Dependencias**:
- CONFIG-AGENT debe completar antes

**Tiempo Estimado**: 3 horas
**Prioridad**: ALTA

---

### 📱 **RESPONSIVE-AGENT**
**Tipo**: Subagente
**Agente Padre**: UI-AGENT
**Responsabilidad**: Diseño responsive y mobile-first

**Tareas Específicas**:
- [ ] Optimizar layout para mobile
- [ ] Implementar breakpoints responsive
- [ ] Optimizar navegación móvil
- [ ] Ajustar espaciado y tipografía
- [ ] Testing en diferentes dispositivos
- [ ] Optimizar touch interactions

**Herramientas Especializadas**:
- Tailwind CSS responsive utilities
- Mobile testing tools
- Browser dev tools
- Responsive design patterns

**Criterios de Éxito**:
- [ ] Responsive en todos los dispositivos
- [ ] Navegación móvil optimizada
- [ ] Touch interactions funcionando
- [ ] Performance móvil optimizada

**Dependencias**:
- COMPONENT-AGENT debe completar antes

**Tiempo Estimado**: 2.5 horas
**Prioridad**: ALTA

---

### ✨ **ANIMATION-AGENT**
**Tipo**: Subagente
**Agente Padre**: UI-AGENT
**Responsabilidad**: Animaciones con Framer Motion

**Tareas Específicas**:
- [ ] Implementar animaciones de entrada
- [ ] Crear transiciones suaves
- [ ] Implementar hover effects
- [ ] Optimizar performance de animaciones
- [ ] Implementar animaciones de scroll
- [ ] Crear micro-interacciones

**Herramientas Especializadas**:
- Framer Motion
- CSS animations
- Performance monitoring
- Animation libraries

**Criterios de Éxito**:
- [ ] Animaciones suaves
- [ ] Performance optimizada
- [ ] Micro-interacciones funcionando
- [ ] Transiciones fluidas

**Dependencias**:
- RESPONSIVE-AGENT debe completar antes

**Tiempo Estimado**: 1.5 horas
**Prioridad**: MEDIA

---

## 🔧 SUBAGENTES DE BACKEND-AGENT

### 🗃️ **SUPABASE-AGENT**
**Tipo**: Subagente
**Agente Padre**: BACKEND-AGENT
**Responsabilidad**: Configuración y gestión de Supabase

**Tareas Específicas**:
- [ ] Configurar proyecto Supabase
- [ ] Crear tablas de base de datos
- [ ] Configurar Row Level Security (RLS)
- [ ] Crear funciones de base de datos
- [ ] Configurar triggers
- [ ] Optimizar queries

**Herramientas Especializadas**:
- Supabase Dashboard
- SQL
- Supabase CLI
- Database optimization tools

**Criterios de Éxito**:
- [ ] Supabase configurado
- [ ] Tablas creadas
- [ ] RLS configurado
- [ ] Queries optimizadas

**Dependencias**:
- DATABASE-DESIGN-AGENT debe completar antes

**Tiempo Estimado**: 4 horas
**Prioridad**: ALTA

---

### 📧 **EMAIL-AGENT**
**Tipo**: Subagente
**Agente Padre**: BACKEND-AGENT
**Responsabilidad**: Sistema de notificaciones por email

**Tareas Específicas**:
- [ ] Configurar servicio de email
- [ ] Crear templates de email
- [ ] Implementar sistema de notificaciones
- [ ] Configurar webhooks
- [ ] Implementar rate limiting
- [ ] Crear logs de email

**Herramientas Especializadas**:
- Email service (SendGrid/Resend)
- Email templates
- Webhook handlers
- Rate limiting tools

**Criterios de Éxito**:
- [ ] Emails funcionando
- [ ] Templates implementados
- [ ] Notificaciones automáticas
- [ ] Rate limiting configurado

**Dependencias**:
- SUPABASE-AGENT debe completar antes

**Tiempo Estimado**: 2.5 horas
**Prioridad**: MEDIA

---

### 🔐 **AUTH-AGENT**
**Tipo**: Subagente
**Agente Padre**: BACKEND-AGENT
**Responsabilidad**: Autenticación y autorización

**Tareas Específicas**:
- [ ] Configurar autenticación Supabase
- [ ] Implementar JWT tokens
- [ ] Configurar políticas de acceso
- [ ] Implementar middleware de auth
- [ ] Crear sistema de roles
- [ ] Configurar sesiones

**Herramientas Especializadas**:
- Supabase Auth
- JWT tokens
- Middleware
- Role-based access control

**Criterios de Éxito**:
- [ ] Autenticación funcionando
- [ ] JWT tokens implementados
- [ ] Políticas de acceso configuradas
- [ ] Sistema de roles funcionando

**Dependencias**:
- EMAIL-AGENT debe completar antes

**Tiempo Estimado**: 1.5 horas
**Prioridad**: BAJA

---

## 🧪 SUBAGENTES DE TEST-AGENT

### 🧪 **UNIT-TEST-AGENT**
**Tipo**: Subagente
**Agente Padre**: TEST-AGENT
**Responsabilidad**: Tests unitarios de componentes

**Tareas Específicas**:
- [ ] Configurar Jest y React Testing Library
- [ ] Crear tests para componentes
- [ ] Implementar tests de hooks
- [ ] Crear tests de utilidades
- [ ] Configurar coverage reports
- [ ] Optimizar performance de tests

**Herramientas Especializadas**:
- Jest
- React Testing Library
- Coverage tools
- Test utilities

**Criterios de Éxito**:
- [ ] Tests unitarios pasando
- [ ] Coverage > 80%
- [ ] Tests rápidos
- [ ] Tests mantenibles

**Dependencias**:
- COMPONENT-AGENT debe completar antes

**Tiempo Estimado**: 2 horas
**Prioridad**: MEDIA

---

### 🔗 **INTEGRATION-TEST-AGENT**
**Tipo**: Subagente
**Agente Padre**: TEST-AGENT
**Responsabilidad**: Tests de integración

**Tareas Específicas**:
- [ ] Crear tests de integración API
- [ ] Implementar tests de flujos completos
- [ ] Crear tests de base de datos
- [ ] Implementar tests de autenticación
- [ ] Crear tests de formularios
- [ ] Configurar test database

**Herramientas Especializadas**:
- Jest
- Supertest
- Test database
- Integration testing tools

**Criterios de Éxito**:
- [ ] Tests de integración pasando
- [ ] Flujos completos funcionando
- [ ] Base de datos testeada
- [ ] APIs funcionando

**Dependencias**:
- SUPABASE-AGENT debe completar antes

**Tiempo Estimado**: 2 horas
**Prioridad**: ALTA

---

### 📊 **PERFORMANCE-TEST-AGENT**
**Tipo**: Subagente
**Agente Padre**: TEST-AGENT
**Responsabilidad**: Tests de performance y Lighthouse

**Tareas Específicas**:
- [ ] Configurar Lighthouse CI
- [ ] Implementar tests de performance
- [ ] Optimizar Core Web Vitals
- [ ] Crear tests de carga
- [ ] Implementar monitoring
- [ ] Optimizar bundle size

**Herramientas Especializadas**:
- Lighthouse
- Web Vitals
- Bundle analyzer
- Performance monitoring

**Criterios de Éxito**:
- [ ] Lighthouse Score > 90
- [ ] Core Web Vitals optimizados
- [ ] Bundle size optimizado
- [ ] Performance monitoring funcionando

**Dependencias**:
- ANIMATION-AGENT debe completar antes

**Tiempo Estimado**: 2 horas
**Prioridad**: ALTA

---

## 🚀 SUBAGENTES DE DEPLOY-AGENT

### ☁️ **VERCEL-AGENT**
**Tipo**: Subagente
**Agente Padre**: DEPLOY-AGENT
**Responsabilidad**: Configuración de Vercel

**Tareas Específicas**:
- [ ] Configurar proyecto en Vercel
- [ ] Configurar build settings
- [ ] Configurar environment variables
- [ ] Configurar custom domains
- [ ] Configurar preview deployments
- [ ] Optimizar build performance

**Herramientas Especializadas**:
- Vercel Dashboard
- Vercel CLI
- Build optimization
- Environment management

**Criterios de Éxito**:
- [ ] Deploy en Vercel funcionando
- [ ] Build optimizado
- [ ] Environment variables configuradas
- [ ] Preview deployments funcionando

**Dependencias**:
- CONFIG-AGENT debe completar antes

**Tiempo Estimado**: 1 hora
**Prioridad**: ALTA

---

### 🌐 **DNS-AGENT**
**Tipo**: Subagente
**Agente Padre**: DEPLOY-AGENT
**Responsabilidad**: Configuración de DNS y dominios

**Tareas Específicas**:
- [ ] Configurar dominio ericksang.dev
- [ ] Configurar subdominios
- [ ] Configurar DNS records
- [ ] Configurar redirects
- [ ] Configurar CDN
- [ ] Optimizar DNS performance

**Herramientas Especializadas**:
- DNS management
- Domain registrar
- CDN configuration
- DNS optimization tools

**Criterios de Éxito**:
- [ ] Dominio configurado
- [ ] Subdominios funcionando
- [ ] DNS optimizado
- [ ] CDN configurado

**Dependencias**:
- VERCEL-AGENT debe completar antes

**Tiempo Estimado**: 0.5 horas
**Prioridad**: ALTA

---

### 🔒 **SSL-AGENT**
**Tipo**: Subagente
**Agente Padre**: DEPLOY-AGENT
**Responsabilidad**: Configuración de SSL y seguridad

**Tareas Específicas**:
- [ ] Configurar SSL certificates
- [ ] Configurar HTTPS redirects
- [ ] Configurar security headers
- [ ] Configurar CSP
- [ ] Configurar HSTS
- [ ] Implementar security monitoring

**Herramientas Especializadas**:
- SSL certificates
- Security headers
- CSP configuration
- Security monitoring

**Criterios de Éxito**:
- [ ] SSL funcionando
- [ ] HTTPS redirects configurados
- [ ] Security headers implementados
- [ ] Security monitoring funcionando

**Dependencias**:
- DNS-AGENT debe completar antes

**Tiempo Estimado**: 0.5 horas
**Prioridad**: ALTA

---

## 📚 SUBAGENTES DE DOCS-AGENT

### 📖 **TECHNICAL-DOCS-AGENT**
**Tipo**: Subagente
**Agente Padre**: DOCS-AGENT
**Responsabilidad**: Documentación técnica

**Tareas Específicas**:
- [ ] Documentar arquitectura
- [ ] Documentar componentes
- [ ] Documentar APIs
- [ ] Crear diagramas técnicos
- [ ] Documentar deployment
- [ ] Crear troubleshooting guides

**Herramientas Especializadas**:
- Markdown
- Mermaid diagrams
- Technical writing
- Documentation tools

**Criterios de Éxito**:
- [ ] Documentación técnica completa
- [ ] Diagramas actualizados
- [ ] APIs documentadas
- [ ] Troubleshooting guides creados

**Dependencias**:
- PERFORMANCE-TEST-AGENT debe completar antes

**Tiempo Estimado**: 2 horas
**Prioridad**: MEDIA

---

### 👥 **USER-GUIDE-AGENT**
**Tipo**: Subagente
**Agente Padre**: DOCS-AGENT
**Responsabilidad**: Guías de usuario

**Tareas Específicas**:
- [ ] Crear guía de usuario
- [ ] Crear tutoriales
- [ ] Crear FAQ
- [ ] Crear screenshots
- [ ] Crear video tutorials
- [ ] Crear help system

**Herramientas Especializadas**:
- User documentation tools
- Screenshot tools
- Video recording
- Help system tools

**Criterios de Éxito**:
- [ ] Guía de usuario completa
- [ ] Tutoriales funcionando
- [ ] FAQ actualizada
- [ ] Help system implementado

**Dependencias**:
- TECHNICAL-DOCS-AGENT debe completar antes

**Tiempo Estimado**: 1 hora
**Prioridad**: BAJA

---

### 🔧 **API-DOCS-AGENT**
**Tipo**: Subagente
**Agente Padre**: DOCS-AGENT
**Responsabilidad**: Documentación de APIs

**Tareas Específicas**:
- [ ] Crear documentación de APIs
- [ ] Crear ejemplos de uso
- [ ] Crear Postman collection
- [ ] Crear OpenAPI spec
- [ ] Crear SDK documentation
- [ ] Crear changelog de APIs

**Herramientas Especializadas**:
- OpenAPI/Swagger
- Postman
- API documentation tools
- SDK generation

**Criterios de Éxito**:
- [ ] APIs documentadas
- [ ] Ejemplos funcionando
- [ ] Postman collection creada
- [ ] OpenAPI spec actualizada

**Dependencias**:
- USER-GUIDE-AGENT debe completar antes

**Tiempo Estimado**: 1 hora
**Prioridad**: MEDIA

---

## 📊 RESUMEN DE SUBAGENTES

### **Total de Subagentes**: 18
### **Tiempo Total Estimado**: 28 horas
### **Distribución por Agente Padre**:
- **ARCHITECT-AGENT**: 3 subagentes (2 horas)
- **UI-AGENT**: 3 subagentes (7 horas)
- **BACKEND-AGENT**: 3 subagentes (8 horas)
- **TEST-AGENT**: 3 subagentes (6 horas)
- **DEPLOY-AGENT**: 3 subagentes (2 horas)
- **DOCS-AGENT**: 3 subagentes (3 horas)

---

## 🔄 FLUJO DE TRABAJO DE SUBAGENTES

### **Día 1: Setup**
```
DATABASE-DESIGN-AGENT → API-DESIGN-AGENT → CONFIG-AGENT
                    ↓
SUPABASE-AGENT ← EMAIL-AGENT
```

### **Día 2: Frontend**
```
COMPONENT-AGENT → RESPONSIVE-AGENT → ANIMATION-AGENT
```

### **Día 3: Backend**
```
SUPABASE-AGENT → EMAIL-AGENT → AUTH-AGENT
```

### **Día 4: Integración**
```
SUPABASE-AGENT + EMAIL-AGENT
COMPONENT-AGENT + RESPONSIVE-AGENT
```

### **Día 5: Deploy**
```
VERCEL-AGENT → DNS-AGENT → SSL-AGENT
INTEGRATION-TEST-AGENT + PERFORMANCE-TEST-AGENT
```

### **Día 6: Testing**
```
UNIT-TEST-AGENT + INTEGRATION-TEST-AGENT + PERFORMANCE-TEST-AGENT
TECHNICAL-DOCS-AGENT + USER-GUIDE-AGENT + API-DOCS-AGENT
```

### **Día 7: Finalización**
```
INTEGRATION-TEST-AGENT + PERFORMANCE-TEST-AGENT
TECHNICAL-DOCS-AGENT + USER-GUIDE-AGENT + API-DOCS-AGENT
```

---

## 🎯 CRITERIOS DE ÉXITO GLOBALES

### **Técnicos**
- [ ] Todos los subagentes completados
- [ ] Tests pasando
- [ ] Performance optimizada
- [ ] Documentación completa

### **Funcionales**
- [ ] Portfolio funcional
- [ ] APIs funcionando
- [ ] Deploy exitoso
- [ ] Documentación accesible

### **Profesionales**
- [ ] Código de calidad
- [ ] Documentación clara
- [ ] Performance excelente
- [ ] Portfolio completo

---

**Última actualización**: [FECHA Y HORA]
**Próxima revisión**: [FECHA Y HORA]
