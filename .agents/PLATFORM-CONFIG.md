# 🖥️ CONFIGURACIÓN POR PLATAFORMA

## 🎯 OBJETIVO
Configuraciones específicas para optimizar el trabajo con agentes en Claude Code, Cursor y Warp.

---

## 🤖 CLAUDE CODE

### **Configuración de Agentes**
```json
{
  "claude": {
    "agents": {
      "enabled": true,
      "auto_save": true,
      "backup_interval": 300,
      "log_level": "info"
    },
    "workspace": {
      "auto_reload": true,
      "file_watcher": true,
      "sync_interval": 1000
    }
  }
}
```

### **Comandos Específicos**
```bash
# Inicializar agente
claude agent init --name ARCHITECT-AGENT

# Ejecutar agente
claude agent run --name ARCHITECT-AGENT --task "design-database"

# Ver estado
claude agent status

# Ver logs
claude agent logs --name ARCHITECT-AGENT
```

### **Configuración de Archivos**
```bash
# Crear archivo de configuración
touch .claude/config.json

# Configurar workspace
echo '{"workspace": {"auto_reload": true}}' > .claude/workspace.json
```

### **Integración con Git**
```bash
# Configurar Git hooks
echo '#!/bin/bash
claude agent status > .agents/git-status.md' > .git/hooks/pre-commit

chmod +x .git/hooks/pre-commit
```

---

## 🎯 CURSOR

### **Configuración de Agentes**
```json
{
  "cursor": {
    "agents": {
      "enabled": true,
      "auto_complete": true,
      "suggestions": true,
      "context_aware": true
    },
    "workspace": {
      "multi_cursor": true,
      "auto_save": true,
      "file_explorer": true
    }
  }
}
```

### **Configuración de Workspace**
```json
{
  "folders": [
    {
      "name": "Portfolio",
      "path": ".",
      "agents": {
        "ARCHITECT-AGENT": {
          "enabled": true,
          "auto_suggest": true
        },
        "UI-AGENT": {
          "enabled": true,
          "auto_complete": true
        }
      }
    }
  ],
  "settings": {
    "typescript.preferences.includePackageJsonAutoImports": "auto",
    "typescript.suggest.autoImports": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  }
}
```

### **Configuración de Archivos**
```bash
# Crear configuración de Cursor
mkdir -p .cursor
touch .cursor/settings.json
touch .cursor/agents.json
```

### **Integración con TypeScript**
```json
{
  "typescript": {
    "preferences": {
      "includePackageJsonAutoImports": "auto",
      "autoImports": true
    },
    "suggest": {
      "autoImports": true,
      "completeFunctionCalls": true
    }
  }
}
```

---

## ⚡ WARP

### **Configuración de Agentes**
```yaml
# .warp/config.yaml
agents:
  enabled: true
  auto_save: true
  backup_interval: 300
  log_level: info

workspace:
  auto_reload: true
  file_watcher: true
  sync_interval: 1000

claude:
  api_key: ${CLAUDE_API_KEY}
  model: claude-3-sonnet
  max_tokens: 4000
```

### **Configuración de Terminal**
```bash
# Configurar Warp
warp config set agents.enabled true
warp config set agents.auto_save true
warp config set workspace.auto_reload true
```

### **Configuración de Archivos**
```bash
# Crear configuración de Warp
mkdir -p .warp
touch .warp/config.yaml
touch .warp/agents.yaml
```

### **Integración con Shell**
```bash
# Configurar shell
echo 'export WARP_AGENTS_ENABLED=true' >> ~/.bashrc
echo 'export WARP_AUTO_SAVE=true' >> ~/.bashrc
source ~/.bashrc
```

---

## 🔧 CONFIGURACIÓN COMPARTIDA

### **Variables de Entorno**
```bash
# .env.local
# Claude Code
CLAUDE_API_KEY=your_api_key_here
CLAUDE_MODEL=claude-3-sonnet
CLAUDE_MAX_TOKENS=4000

# Cursor
CURSOR_API_KEY=your_api_key_here
CURSOR_MODEL=cursor-3
CURSOR_MAX_TOKENS=4000

# Warp
WARP_API_KEY=your_api_key_here
WARP_MODEL=warp-3
WARP_MAX_TOKENS=4000

# Proyecto
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### **Configuración de Git**
```bash
# .gitignore
# Agentes
.agents/status.md
.agents/progress.md
.agents/issues.md

# Configuraciones específicas
.claude/
.cursor/
.warp/

# Logs
*.log
logs/
```

### **Configuración de TypeScript**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/agents/*": ["./.agents/*"]
    }
  }
}
```

---

## 📊 CONFIGURACIÓN DE MONITOREO

### **Claude Code**
```json
{
  "monitoring": {
    "enabled": true,
    "metrics": {
      "agent_performance": true,
      "task_completion": true,
      "error_tracking": true
    },
    "alerts": {
      "email": "your_email@example.com",
      "slack": "your_slack_webhook"
    }
  }
}
```

### **Cursor**
```json
{
  "monitoring": {
    "enabled": true,
    "metrics": {
      "code_quality": true,
      "performance": true,
      "errors": true
    },
    "alerts": {
      "email": "your_email@example.com",
      "discord": "your_discord_webhook"
    }
  }
}
```

### **Warp**
```yaml
# .warp/monitoring.yaml
monitoring:
  enabled: true
  metrics:
    agent_performance: true
    task_completion: true
    error_tracking: true
  alerts:
    email: your_email@example.com
    slack: your_slack_webhook
```

---

## 🔄 CONFIGURACIÓN DE SINCRONIZACIÓN

### **Sincronización entre Plataformas**
```bash
# Script de sincronización
#!/bin/bash
# sync-agents.sh

# Sincronizar estado
cp .agents/status.md .claude/status.md
cp .agents/status.md .cursor/status.md
cp .agents/status.md .warp/status.md

# Sincronizar progreso
cp .agents/progress.md .claude/progress.md
cp .agents/progress.md .cursor/progress.md
cp .agents/progress.md .warp/progress.md

# Sincronizar issues
cp .agents/issues.md .claude/issues.md
cp .agents/issues.md .cursor/issues.md
cp .agents/issues.md .warp/issues.md
```

### **Configuración de Backup**
```bash
# Script de backup
#!/bin/bash
# backup-agents.sh

# Crear backup
tar -czf agents-backup-$(date +%Y%m%d).tar.gz .agents/

# Subir a cloud storage
# aws s3 cp agents-backup-$(date +%Y%m%d).tar.gz s3://your-bucket/
```

---

## 🚀 CONFIGURACIÓN DE DEPLOY

### **Claude Code**
```json
{
  "deploy": {
    "platform": "vercel",
    "auto_deploy": true,
    "environment": "production",
    "build_command": "pnpm build",
    "output_directory": ".next"
  }
}
```

### **Cursor**
```json
{
  "deploy": {
    "platform": "vercel",
    "auto_deploy": true,
    "environment": "production",
    "build_command": "pnpm build",
    "output_directory": ".next"
  }
}
```

### **Warp**
```yaml
# .warp/deploy.yaml
deploy:
  platform: vercel
  auto_deploy: true
  environment: production
  build_command: pnpm build
  output_directory: .next
```

---

## 📝 CONFIGURACIÓN DE LOGS

### **Claude Code**
```json
{
  "logging": {
    "level": "info",
    "file": ".claude/logs/claude.log",
    "max_size": "10MB",
    "max_files": 5,
    "format": "json"
  }
}
```

### **Cursor**
```json
{
  "logging": {
    "level": "info",
    "file": ".cursor/logs/cursor.log",
    "max_size": "10MB",
    "max_files": 5,
    "format": "json"
  }
}
```

### **Warp**
```yaml
# .warp/logging.yaml
logging:
  level: info
  file: .warp/logs/warp.log
  max_size: 10MB
  max_files: 5
  format: json
```

---

## 🔐 CONFIGURACIÓN DE SEGURIDAD

### **Claves API**
```bash
# Configurar claves API
export CLAUDE_API_KEY="your_claude_api_key"
export CURSOR_API_KEY="your_cursor_api_key"
export WARP_API_KEY="your_warp_api_key"

# Verificar claves
echo $CLAUDE_API_KEY
echo $CURSOR_API_KEY
echo $WARP_API_KEY
```

### **Configuración de Seguridad**
```json
{
  "security": {
    "encrypt_logs": true,
    "secure_storage": true,
    "api_key_rotation": 30,
    "access_control": true
  }
}
```

---

## 📊 CONFIGURACIÓN DE MÉTRICAS

### **Métricas de Agentes**
```json
{
  "metrics": {
    "agent_performance": {
      "enabled": true,
      "interval": 300,
      "retention": 30
    },
    "task_completion": {
      "enabled": true,
      "interval": 60,
      "retention": 7
    },
    "error_tracking": {
      "enabled": true,
      "interval": 30,
      "retention": 14
    }
  }
}
```

### **Dashboard de Métricas**
```bash
# Iniciar dashboard
npm run metrics:dashboard

# Ver métricas
curl http://localhost:3001/metrics
```

---

## 🎯 CONFIGURACIÓN DE DESARROLLO

### **Modo Desarrollo**
```json
{
  "development": {
    "hot_reload": true,
    "auto_save": true,
    "debug_mode": true,
    "verbose_logging": true
  }
}
```

### **Modo Producción**
```json
{
  "production": {
    "hot_reload": false,
    "auto_save": false,
    "debug_mode": false,
    "verbose_logging": false
  }
}
```

---

## 📞 CONFIGURACIÓN DE AYUDA

### **Sistema de Ayuda**
```bash
# Ayuda general
help

# Ayuda específica de agente
help ARCHITECT-AGENT

# Ayuda de comando
help --command "claude agent run"
```

### **Documentación**
```bash
# Ver documentación
cat .agents/AGENTS.md
cat .agents/SUBAGENTS.md
cat .agents/COMMANDS.md
```

---

**Última actualización**: [FECHA Y HORA]
**Próxima revisión**: [FECHA Y HORA]
