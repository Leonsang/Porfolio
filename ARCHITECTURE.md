# 🏗️ Portfolio Architecture - Sistema Modular

## 📋 **Descripción General**

Este portfolio ha sido refactorizado para usar una arquitectura modular que separa cada sección en componentes independientes. Esto hace que el código sea más mantenible, testeable y escalable.

## 🏛️ **Estructura de Archivos**

```
src/
├── components/
│   ├── sections/           # Componentes de secciones
│   │   ├── BaseSection.ts  # Clase base para todas las secciones
│   │   ├── ProjectsSection.ts
│   │   ├── AboutSection.ts (TODO)
│   │   ├── OverviewSection.ts (TODO)
│   │   ├── TechnicalSection.ts (TODO)
│   │   ├── ExperienceSection.ts (TODO)
│   │   └── ContactSection.ts (TODO)
│   ├── layout/             # Componentes de layout
│   │   ├── PortfolioNavigation.ts
│   │   └── SectionContainer.ts (TODO)
│   ├── ui/                 # Componentes de UI reutilizables
│   │   ├── DashboardCard.ts (TODO)
│   │   └── SectionHeader.ts (TODO)
│   └── PortfolioManager.ts # Gestor principal del portfolio
├── config/
│   └── sections.ts         # Configuración de secciones
└── main.ts                 # Punto de entrada principal
```

## 🔧 **Componentes Principales**

### **BaseSection.ts**
Clase abstracta que proporciona funcionalidad común para todas las secciones:
- Gestión del ciclo de vida (init, show, hide, destroy)
- Event listeners y cleanup
- Hooks para personalización (onShow, onHide)

### **PortfolioNavigation.ts**
Maneja la navegación entre secciones:
- Creación dinámica de tabs de navegación
- Cambio de secciones con animaciones
- Integración con i18n

### **PortfolioManager.ts**
Coordinador principal que:
- Inicializa todas las secciones
- Maneja cambios de idioma
- Gestiona eventos globales
- Proporciona API pública para el portfolio

### **ProjectsSection.ts**
Ejemplo de implementación de sección:
- Extiende BaseSection
- Maneja su propio contenido y eventos
- Integra con el sistema de traducciones

## 🚀 **Cómo Usar**

### **1. Crear una Nueva Sección**

```typescript
import { BaseSection } from './BaseSection';

export class MySection extends BaseSection {
  constructor() {
    super('my-section-id');
  }

  protected setupEventListeners(): void {
    // Configurar event listeners específicos
  }

  protected render(): void {
    // Renderizar contenido de la sección
  }
}
```

### **2. Registrar la Sección**

```typescript
// En PortfolioManager.ts
private async initializeSections(): Promise<void> {
  const mySection = new MySection();
  mySection.init();
  this.sections.set('my', mySection);
}
```

### **3. Configurar la Navegación**

```typescript
// En config/sections.ts
{
  id: 'my',
  name: 'My Section',
  icon: 'fas fa-star',
  labelKey: 'nav.my',
  sectionId: 'my-section',
  description: 'Description of my section',
  enabled: true
}
```

## 🎯 **Ventajas de la Arquitectura Modular**

### **✅ Mantenibilidad**
- Cada sección es independiente
- Fácil de modificar sin afectar otras partes
- Código más legible y organizado

### **✅ Escalabilidad**
- Agregar nuevas secciones es simple
- Reutilización de componentes
- Configuración centralizada

### **✅ Testabilidad**
- Cada componente puede ser testeado por separado
- Mocks y stubs más fáciles de crear
- Mejor cobertura de código

### **✅ Rendimiento**
- Lazy loading de secciones
- Cleanup automático de recursos
- Gestión eficiente de memoria

## 🔄 **Flujo de Datos**

```
User Action → PortfolioNavigation → PortfolioManager → Section → DOM Update
     ↓              ↓                    ↓           ↓         ↓
  Click Tab → switchToSection() → onSectionChange() → show() → UI Update
```

## 🌍 **Integración con i18n**

Cada sección maneja sus propias traducciones:

```typescript
private updateContent(): void {
  const title = this.sectionElement.querySelector('h2[data-i18n]');
  if (title) {
    const key = title.getAttribute('data-i18n');
    if (key) title.textContent = i18n.t(key);
  }
}
```

## 📱 **Responsive Design**

Las secciones se adaptan automáticamente:
- CSS Grid responsivo
- Media queries centralizadas
- Breakpoints consistentes

## 🚧 **TODOs y Próximos Pasos**

- [ ] Implementar AboutSection
- [ ] Implementar OverviewSection
- [ ] Implementar TechnicalSection
- [ ] Implementar ExperienceSection
- [ ] Implementar ContactSection
- [ ] Crear componentes UI reutilizables
- [ ] Agregar tests unitarios
- [ ] Implementar lazy loading
- [ ] Agregar animaciones avanzadas

## 🐛 **Debugging**

### **Logs de Consola**
El sistema proporciona logs detallados:
- ✅ Secciones inicializadas
- 🔄 Cambios de sección
- 🌍 Cambios de idioma
- 📱 Eventos de resize

### **Herramientas de Desarrollo**
```typescript
// Acceder al portfolio desde la consola
window.portfolioApp.portfolioManager.getActiveSection()
window.portfolioApp.portfolioManager.switchToSection('projects')
```

## 📚 **Recursos Adicionales**

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [DOM Manipulation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Event Handling](https://developer.mozilla.org/en-US/docs/Web/Events)

---

**¿Necesitas ayuda?** Revisa los logs de la consola o consulta este documento para entender cómo funciona cada componente.
