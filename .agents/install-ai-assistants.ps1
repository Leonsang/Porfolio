# 🤖 INSTALACIÓN DE AI ASSISTANTS - PORTFOLIO ERICK SANG
# Script de PowerShell para Windows
# Basado en el patrón de Gentleman.Dots

param(
    [switch]$Force,
    [switch]$SkipDependencies,
    [switch]$Help
)

# Función para mostrar ayuda
function Show-Help {
    Write-Host "🤖 INSTALACIÓN DE AI ASSISTANTS - PORTFOLIO ERICK SANG" -ForegroundColor Blue
    Write-Host ""
    Write-Host "Uso: .\install-ai-assistants.ps1 [opciones]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Opciones:" -ForegroundColor Yellow
    Write-Host "  -Force              Forzar reinstalación" -ForegroundColor White
    Write-Host "  -SkipDependencies   Omitir verificación de dependencias" -ForegroundColor White
    Write-Host "  -Help               Mostrar esta ayuda" -ForegroundColor White
    Write-Host ""
    Write-Host "Ejemplos:" -ForegroundColor Yellow
    Write-Host "  .\install-ai-assistants.ps1" -ForegroundColor White
    Write-Host "  .\install-ai-assistants.ps1 -Force" -ForegroundColor White
    Write-Host "  .\install-ai-assistants.ps1 -SkipDependencies" -ForegroundColor White
}

# Mostrar ayuda si se solicita
if ($Help) {
    Show-Help
    exit 0
}

# Función para imprimir mensajes
function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Write-Header {
    param([string]$Message)
    Write-Host "=================================" -ForegroundColor Blue
    Write-Host $Message -ForegroundColor Blue
    Write-Host "=================================" -ForegroundColor Blue
}

# Verificar si estamos en PowerShell 5.1 o superior
function Test-PowerShellVersion {
    $version = $PSVersionTable.PSVersion
    if ($version.Major -lt 5) {
        Write-Error "PowerShell 5.1 o superior requerido. Versión actual: $version"
        exit 1
    }
    Write-Info "PowerShell $version ✓"
}

# Verificar dependencias
function Test-Dependencies {
    Write-Header "Verificando dependencias"
    
    # Verificar Node.js
    try {
        $nodeVersion = node --version
        if ($nodeVersion -match "v(\d+)\.") {
            $majorVersion = [int]$matches[1]
            if ($majorVersion -ge 18) {
                Write-Info "Node.js $nodeVersion ✓"
            } else {
                Write-Error "Node.js 18+ requerido. Versión actual: $nodeVersion"
                exit 1
            }
        }
    } catch {
        Write-Error "Node.js no encontrado. Por favor instala Node.js 18+ primero."
        Write-Info "Descarga desde: https://nodejs.org/"
        exit 1
    }
    
    # Verificar pnpm
    try {
        $pnpmVersion = pnpm --version
        Write-Info "pnpm $pnpmVersion ✓"
    } catch {
        Write-Warning "pnpm no encontrado. Instalando..."
        Install-Pnpm
    }
    
    # Verificar Git
    try {
        $gitVersion = git --version
        Write-Info "Git $gitVersion ✓"
    } catch {
        Write-Error "Git no encontrado. Por favor instala Git primero."
        Write-Info "Descarga desde: https://git-scm.com/"
        exit 1
    }
}

# Instalar pnpm
function Install-Pnpm {
    Write-Info "Instalando pnpm..."
    try {
        npm install -g pnpm
        Write-Info "pnpm instalado correctamente"
    } catch {
        Write-Error "Error instalando pnpm: $_"
        exit 1
    }
}

# Configurar variables de entorno
function Set-Environment {
    Write-Header "Configurando variables de entorno"
    
    # Crear archivo .env.local si no existe
    if (-not (Test-Path ".env.local")) {
        Write-Info "Creando archivo .env.local..."
        $envContent = @"
# AI Assistants API Keys
CLAUDE_API_KEY=your_claude_api_key_here
GITHUB_COPILOT_TOKEN=your_copilot_token_here
OPENCODE_API_KEY=your_opencode_key_here
GEMINI_API_KEY=your_gemini_key_here

# Proyecto
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key_here
"@
        $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
        Write-Warning "Archivo .env.local creado. Por favor configura tus API keys."
    } else {
        Write-Info "Archivo .env.local ya existe."
    }
    
    # Crear archivo .env.local.example
    if (-not (Test-Path ".env.local.example")) {
        Write-Info "Creando archivo .env.local.example..."
        Copy-Item ".env.local" ".env.local.example"
    }
}

# Configurar AI assistants
function Set-AIAssistants {
    Write-Header "Configurando AI assistants"
    
    # Crear directorio de configuración si no existe
    if (-not (Test-Path ".agents")) {
        New-Item -ItemType Directory -Path ".agents" -Force | Out-Null
    }
    
    # Verificar si ai-config.json existe
    if (-not (Test-Path ".agents/ai-config.json")) {
        Write-Error "Archivo ai-config.json no encontrado. Ejecuta primero la configuración de agentes."
        exit 1
    }
    
    Write-Info "Configuración de AI assistants lista."
}

# Instalar dependencias del proyecto
function Install-ProjectDependencies {
    Write-Header "Instalando dependencias del proyecto"
    
    # Instalar dependencias principales
    Write-Info "Instalando dependencias principales..."
    try {
        pnpm install
        Write-Info "Dependencias principales instaladas"
    } catch {
        Write-Error "Error instalando dependencias principales: $_"
        exit 1
    }
    
    # Instalar dependencias de desarrollo
    Write-Info "Instalando dependencias de desarrollo..."
    try {
        pnpm add -D @types/node @types/react @types/react-dom
        Write-Info "Dependencias de desarrollo instaladas"
    } catch {
        Write-Warning "Error instalando dependencias de desarrollo: $_"
    }
    
    # Instalar dependencias específicas para AI
    Write-Info "Instalando dependencias para AI assistants..."
    try {
        pnpm add -D @types/jest @types/testing-library__jest-dom
        Write-Info "Dependencias para AI assistants instaladas"
    } catch {
        Write-Warning "Error instalando dependencias para AI assistants: $_"
    }
}

# Configurar Git hooks
function Set-GitHooks {
    Write-Header "Configurando Git hooks"
    
    # Crear directorio de hooks si no existe
    if (-not (Test-Path ".git/hooks")) {
        New-Item -ItemType Directory -Path ".git/hooks" -Force | Out-Null
    }
    
    # Crear pre-commit hook
    $hookContent = @'
#!/bin/bash
# Pre-commit hook para AI assistants

echo "🤖 Verificando configuración de AI assistants..."

# Verificar que ai-config.json existe
if [[ ! -f .agents/ai-config.json ]]; then
    echo "❌ Error: ai-config.json no encontrado"
    exit 1
fi

# Verificar que al menos un AI assistant esté habilitado
if ! grep -q '"enabled": true' .agents/ai-config.json; then
    echo "❌ Error: Ningún AI assistant habilitado"
    exit 1
fi

echo "✅ Configuración de AI assistants OK"
'@
    
    $hookContent | Out-File -FilePath ".git/hooks/pre-commit" -Encoding UTF8
    Write-Info "Git hooks configurados correctamente."
}

# Verificar instalación
function Test-Installation {
    Write-Header "Verificando instalación"
    
    # Verificar Node.js
    try {
        $nodeVersion = node --version
        Write-Info "✅ Node.js $nodeVersion"
    } catch {
        Write-Error "❌ Node.js no encontrado"
    }
    
    # Verificar pnpm
    try {
        $pnpmVersion = pnpm --version
        Write-Info "✅ pnpm $pnpmVersion"
    } catch {
        Write-Error "❌ pnpm no encontrado"
    }
    
    # Verificar archivos de configuración
    if (Test-Path ".agents/ai-config.json") {
        Write-Info "✅ ai-config.json encontrado"
    } else {
        Write-Error "❌ ai-config.json no encontrado"
    }
    
    if (Test-Path ".env.local") {
        Write-Info "✅ .env.local encontrado"
    } else {
        Write-Error "❌ .env.local no encontrado"
    }
    
    # Verificar dependencias
    if (Test-Path "node_modules/.pnpm-lock.yaml") {
        Write-Info "✅ Dependencias instaladas"
    } else {
        Write-Error "❌ Dependencias no instaladas"
    }
}

# Mostrar instrucciones finales
function Show-FinalInstructions {
    Write-Header "Instalación completada"
    
    Write-Host "🎉 ¡Instalación de AI assistants completada!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Próximos pasos:" -ForegroundColor Yellow
    Write-Host "1. Configura tus API keys en .env.local"
    Write-Host "2. Ejecuta: pnpm dev"
    Write-Host "3. Verifica la configuración: Get-Content .agents/ai-config.json"
    Write-Host ""
    Write-Host "🔧 Comandos útiles:" -ForegroundColor Yellow
    Write-Host "- Ver estado: Get-Content .agents/status.md"
    Write-Host "- Ejecutar agente: pnpm run agent:run --name ARCHITECT-AGENT"
    Write-Host "- Ver logs: Get-Content .agents/logs/ai-assistants.log"
    Write-Host ""
    Write-Host "📚 Documentación:" -ForegroundColor Yellow
    Write-Host "- AI Integration: .agents/AI-INTEGRATION.md"
    Write-Host "- Comandos: .agents/COMMANDS.md"
    Write-Host "- Configuración: .agents/PLATFORM-CONFIG.md"
    Write-Host ""
    Write-Host "¡Happy coding! 🚀" -ForegroundColor Green
}

# Función principal
function Main {
    Write-Header "🤖 INSTALACIÓN DE AI ASSISTANTS - PORTFOLIO ERICK SANG"
    
    Test-PowerShellVersion
    
    if (-not $SkipDependencies) {
        Test-Dependencies
    }
    
    Set-Environment
    Set-AIAssistants
    Install-ProjectDependencies
    Set-GitHooks
    Test-Installation
    Show-FinalInstructions
}

# Ejecutar función principal
try {
    Main
} catch {
    Write-Error "Error durante la instalación: $_"
    exit 1
}
