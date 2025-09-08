# 🤖 INTEGRACIÓN DE AI ASSISTANTS - PORTFOLIO ERICK SANG

## 🎯 OBJETIVO
Integrar múltiples AI assistants siguiendo el patrón de Gentleman.Dots para optimizar el desarrollo del portfolio.

---

## 🧠 AI ASSISTANTS DISPONIBLES

### **1. 🤖 CLAUDE CODE (Habilitado por defecto)**
**Estado**: ✅ Habilitado
**Responsabilidad**: Asistente principal de desarrollo
**Especialización**:
- Generación de código
- Refactoring
- Debugging
- Documentación
- Arquitectura

**Configuración**:
```json
{
  "claude-code": {
    "enabled": true,
    "model": "claude-3-sonnet",
    "max_tokens": 4000,
    "temperature": 0.1
  }
}
```

### **2. 🚀 GITHUB COPILOT (Deshabilitado)**
**Estado**: ❌ Deshabilitado
**Responsabilidad**: Autocompletado y sugerencias
**Especialización**:
- Autocompletado de código
- Sugerencias contextuales
- Generación de tests
- Comentarios automáticos

**Configuración**:
```json
{
  "copilot": {
    "enabled": false,
    "suggestions": true,
    "auto_complete": true
  }
}
```

### **3. 🔮 AVANTE.NVIM (Deshabilitado)**
**Estado**: ❌ Deshabilitado
**Responsabilidad**: Asistente de código avanzado
**Especialización**:
- Análisis de código
- Optimización
- Refactoring avanzado
- Patrones de diseño

**Configuración**:
```json
{
  "avante": {
    "enabled": false,
    "analysis": true,
    "optimization": true
  }
}
```

### **4. 🌐 OPENCODE.NVIM (Deshabilitado)**
**Estado**: ❌ Deshabilitado
**Responsabilidad**: Integración con OpenCode AI
**Especialización**:
- Búsqueda de código
- Documentación automática
- Ejemplos de uso
- Mejores prácticas

**Configuración**:
```json
{
  "opencode": {
    "enabled": false,
    "search": true,
    "documentation": true
  }
}
```

### **5. 🤝 CODE COMPANION (Deshabilitado)**
**Estado**: ❌ Deshabilitado
**Responsabilidad**: Soporte multi-AI
**Especialización**:
- Múltiples proveedores AI
- Comparación de respuestas
- Selección automática
- Fallback inteligente

**Configuración**:
```json
{
  "code-companion": {
    "enabled": false,
    "providers": ["claude", "gpt", "gemini"],
    "auto_select": true
  }
}
```

### **6. 🔍 GEMINI.NVIM (Deshabilitado)**
**Estado**: ❌ Deshabilitado
**Responsabilidad**: Integración con Google Gemini
**Especialización**:
- Análisis de código
- Sugerencias de optimización
- Documentación
- Testing

**Configuración**:
```json
{
  "gemini": {
    "enabled": false,
    "model": "gemini-pro",
    "analysis": true
  }
}
```

---

## 🔄 CÓMO CAMBIAR AI ASSISTANTS

### **Paso 1: Deshabilitar AI Actual**
```bash
# Editar archivo de configuración
code .agents/ai-config.json

# Cambiar enabled: true a enabled: false
{
  "claude-code": {
    "enabled": false  # Deshabilitar Claude Code
  }
}
```

### **Paso 2: Habilitar AI Deseado**
```bash
# Habilitar GitHub Copilot
{
  "copilot": {
    "enabled": true  # Habilitar Copilot
  }
}
```

### **Paso 3: Reiniciar Sistema**
```bash
# Reiniciar agentes
pnpm restart:agents

# Verificar estado
cat .agents/status.md
```

---

## 🎯 CONFIGURACIÓN POR AGENTE

### **🏗️ ARCHITECT-AGENT**
**AI Recomendado**: Claude Code
**Razón**: Mejor para arquitectura y diseño
```json
{
  "architect-agent": {
    "ai": "claude-code",
    "tasks": ["design", "architecture", "planning"]
  }
}
```

### **🎨 UI-AGENT**
**AI Recomendado**: GitHub Copilot
**Razón**: Excelente para autocompletado de componentes
```json
{
  "ui-agent": {
    "ai": "copilot",
    "tasks": ["components", "styling", "responsive"]
  }
}
```

### **🔧 BACKEND-AGENT**
**AI Recomendado**: Claude Code
**Razón**: Mejor para lógica de backend y APIs
```json
{
  "backend-agent": {
    "ai": "claude-code",
    "tasks": ["apis", "database", "integration"]
  }
}
```

### **🧪 TEST-AGENT**
**AI Recomendado**: Avante.nvim
**Razón**: Especializado en análisis y testing
```json
{
  "test-agent": {
    "ai": "avante",
    "tasks": ["testing", "analysis", "optimization"]
  }
}
```

### **🚀 DEPLOY-AGENT**
**AI Recomendado**: Claude Code
**Razón**: Mejor para configuración y deployment
```json
{
  "deploy-agent": {
    "ai": "claude-code",
    "tasks": ["deployment", "configuration", "optimization"]
  }
}
```

### **📚 DOCS-AGENT**
**AI Recomendado**: OpenCode.nvim
**Razón**: Especializado en documentación
```json
{
  "docs-agent": {
    "ai": "opencode",
    "tasks": ["documentation", "examples", "guides"]
  }
}
```

---

## 🔧 CONFIGURACIÓN AVANZADA

### **Configuración Multi-AI**
```json
{
  "multi-ai": {
    "enabled": true,
    "primary": "claude-code",
    "fallback": ["copilot", "avante"],
    "auto_switch": true,
    "context_aware": true
  }
}
```

### **Configuración por Tarea**
```json
{
  "task-specific": {
    "code_generation": "claude-code",
    "autocomplete": "copilot",
    "analysis": "avante",
    "documentation": "opencode",
    "testing": "gemini"
  }
}
```

### **Configuración de Performance**
```json
{
  "performance": {
    "cache_responses": true,
    "parallel_requests": true,
    "timeout": 30000,
    "retry_attempts": 3
  }
}
```

---

## 📊 MÉTRICAS DE AI ASSISTANTS

### **Claude Code**
- **Velocidad**: ⭐⭐⭐⭐⭐
- **Calidad**: ⭐⭐⭐⭐⭐
- **Contexto**: ⭐⭐⭐⭐⭐
- **Especialización**: ⭐⭐⭐⭐

### **GitHub Copilot**
- **Velocidad**: ⭐⭐⭐⭐⭐
- **Calidad**: ⭐⭐⭐⭐
- **Contexto**: ⭐⭐⭐
- **Especialización**: ⭐⭐⭐⭐⭐

### **Avante.nvim**
- **Velocidad**: ⭐⭐⭐⭐
- **Calidad**: ⭐⭐⭐⭐⭐
- **Contexto**: ⭐⭐⭐⭐
- **Especialización**: ⭐⭐⭐⭐⭐

### **OpenCode.nvim**
- **Velocidad**: ⭐⭐⭐
- **Calidad**: ⭐⭐⭐⭐
- **Contexto**: ⭐⭐⭐⭐⭐
- **Especialización**: ⭐⭐⭐⭐

---

## 🚨 NOTAS IMPORTANTES

### **Solo Habilitar UN AI a la Vez**
- Evitar conflictos de keybindings
- Prevenir respuestas duplicadas
- Optimizar performance
- Mantener consistencia

### **Herramientas CLI Requeridas**
```bash
# Claude Code CLI
brew install --cask claude-code

# OpenCode CLI
curl -fsSL https://opencode.ai/install | bash

# Gemini CLI
brew install gemini-cli
```

### **API Keys Requeridas**
```bash
# Configurar claves API
export CLAUDE_API_KEY="your_claude_api_key"
export GITHUB_COPILOT_TOKEN="your_copilot_token"
export OPENCODE_API_KEY="your_opencode_key"
export GEMINI_API_KEY="your_gemini_key"
```

### **Node.js 18+ Requerido**
```bash
# Verificar versión
node --version

# Actualizar si es necesario
brew install node@18
```

---

## 🎯 RECOMENDACIONES ESPECÍFICAS

### **Para Principiantes**
- **Empezar con**: CodeCompanion.nvim
- **Razón**: Soporte multi-AI, fácil de usar
- **Configuración**: Mínima configuración requerida

### **Para Usuarios de Claude**
- **Usar**: Claude Code.nvim
- **Razón**: Integración nativa, mejor contexto
- **Configuración**: Claude Code CLI instalado

### **Para Usuarios de GitHub Copilot**
- **Usar**: CopilotChat.nvim
- **Razón**: Integración familiar, autocompletado
- **Configuración**: Token de GitHub Copilot

### **Para Usuarios de Google Gemini**
- **Usar**: Gemini.nvim
- **Razón**: Integración con Gemini, análisis avanzado
- **Configuración**: Gemini CLI instalado

---

## 🔄 FLUJO DE TRABAJO OPTIMIZADO

### **Desarrollo Frontend**
```
UI-AGENT (Copilot) → COMPONENT-AGENT (Claude) → RESPONSIVE-AGENT (Avante)
```

### **Desarrollo Backend**
```
BACKEND-AGENT (Claude) → SUPABASE-AGENT (Claude) → EMAIL-AGENT (Avante)
```

### **Testing y Calidad**
```
TEST-AGENT (Avante) → UNIT-TEST-AGENT (Gemini) → INTEGRATION-TEST-AGENT (Claude)
```

### **Documentación**
```
DOCS-AGENT (OpenCode) → TECHNICAL-DOCS-AGENT (OpenCode) → API-DOCS-AGENT (Claude)
```

---

## 📞 SOPORTE Y AYUDA

### **Documentación**
- Ver [`.agents/AGENTS.md`](./AGENTS.md) para agentes principales
- Ver [`.agents/SUBAGENTS.md`](./SUBAGENTS.md) para subagentes
- Ver [`.agents/COMMANDS.md`](./COMMANDS.md) para comandos

### **Configuración**
- Ver [`.agents/PLATFORM-CONFIG.md`](./PLATFORM-CONFIG.md) para configuración
- Ver [`.agents/AGENT-BEST-PRACTICES.md`](./AGENT-BEST-PRACTICES.md) para mejores prácticas

### **Issues**
- Reportar en [`.agents/issues.md`](./issues.md)
- Ver soluciones en [`.agents/AGENT-BEST-PRACTICES.md`](./AGENT-BEST-PRACTICES.md)

---

**Última actualización**: [FECHA Y HORA]
**Próxima revisión**: [FECHA Y HORA]
