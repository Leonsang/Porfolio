#!/bin/bash

# 🤖 INSTALACIÓN DE AI ASSISTANTS - PORTFOLIO ERICK SANG
# Basado en el patrón de Gentleman.Dots

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Verificar sistema operativo
detect_os() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        OS="mac"
        PACKAGE_MANAGER="brew"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        OS="linux"
        PACKAGE_MANAGER="apt"
    else
        print_error "Sistema operativo no soportado: $OSTYPE"
        exit 1
    fi
    print_message "Sistema operativo detectado: $OS"
}

# Verificar dependencias
check_dependencies() {
    print_header "Verificando dependencias"
    
    # Verificar Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version | cut -d'v' -f2)
        if [[ $(echo "$NODE_VERSION 18.0.0" | tr " " "\n" | sort -V | head -n1) == "18.0.0" ]]; then
            print_message "Node.js $NODE_VERSION ✓"
        else
            print_error "Node.js 18+ requerido. Versión actual: $NODE_VERSION"
            exit 1
        fi
    else
        print_error "Node.js no encontrado. Instalando..."
        install_nodejs
    fi
    
    # Verificar pnpm
    if command -v pnpm &> /dev/null; then
        print_message "pnpm $(pnpm --version) ✓"
    else
        print_warning "pnpm no encontrado. Instalando..."
        install_pnpm
    fi
    
    # Verificar Git
    if command -v git &> /dev/null; then
        print_message "Git $(git --version) ✓"
    else
        print_error "Git no encontrado. Por favor instala Git primero."
        exit 1
    fi
}

# Instalar Node.js
install_nodejs() {
    print_message "Instalando Node.js 18+..."
    if [[ "$OS" == "mac" ]]; then
        brew install node@18
    elif [[ "$OS" == "linux" ]]; then
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
}

# Instalar pnpm
install_pnpm() {
    print_message "Instalando pnpm..."
    npm install -g pnpm
}

# Instalar CLI tools para AI assistants
install_ai_cli_tools() {
    print_header "Instalando CLI tools para AI assistants"
    
    # Claude Code CLI
    if [[ "$OS" == "mac" ]]; then
        print_message "Instalando Claude Code CLI..."
        brew install --cask claude-code
    else
        print_warning "Claude Code CLI no disponible para Linux. Instala manualmente."
    fi
    
    # OpenCode CLI
    print_message "Instalando OpenCode CLI..."
    curl -fsSL https://opencode.ai/install | bash
    
    # Gemini CLI
    if [[ "$OS" == "mac" ]]; then
        print_message "Instalando Gemini CLI..."
        brew install gemini-cli
    else
        print_warning "Gemini CLI no disponible para Linux. Instala manualmente."
    fi
}

# Configurar variables de entorno
setup_environment() {
    print_header "Configurando variables de entorno"
    
    # Crear archivo .env.local si no existe
    if [[ ! -f .env.local ]]; then
        print_message "Creando archivo .env.local..."
        cat > .env.local << EOF
# AI Assistants API Keys
CLAUDE_API_KEY=your_claude_api_key_here
GITHUB_COPILOT_TOKEN=your_copilot_token_here
OPENCODE_API_KEY=your_opencode_key_here
GEMINI_API_KEY=your_gemini_key_here

# Proyecto
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key_here
EOF
        print_warning "Archivo .env.local creado. Por favor configura tus API keys."
    else
        print_message "Archivo .env.local ya existe."
    fi
    
    # Crear archivo .env.local.example
    if [[ ! -f .env.local.example ]]; then
        print_message "Creando archivo .env.local.example..."
        cp .env.local .env.local.example
    fi
}

# Configurar AI assistants
configure_ai_assistants() {
    print_header "Configurando AI assistants"
    
    # Crear directorio de configuración si no existe
    mkdir -p .agents
    
    # Verificar si ai-config.json existe
    if [[ ! -f .agents/ai-config.json ]]; then
        print_error "Archivo ai-config.json no encontrado. Ejecuta primero la configuración de agentes."
        exit 1
    fi
    
    print_message "Configuración de AI assistants lista."
}

# Instalar dependencias del proyecto
install_project_dependencies() {
    print_header "Instalando dependencias del proyecto"
    
    # Instalar dependencias principales
    print_message "Instalando dependencias principales..."
    pnpm install
    
    # Instalar dependencias de desarrollo
    print_message "Instalando dependencias de desarrollo..."
    pnpm add -D @types/node @types/react @types/react-dom
    
    # Instalar dependencias específicas para AI
    print_message "Instalando dependencias para AI assistants..."
    pnpm add -D @types/jest @types/testing-library__jest-dom
    
    print_message "Dependencias instaladas correctamente."
}

# Configurar Git hooks
setup_git_hooks() {
    print_header "Configurando Git hooks"
    
    # Crear directorio de hooks si no existe
    mkdir -p .git/hooks
    
    # Crear pre-commit hook
    cat > .git/hooks/pre-commit << 'EOF'
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
EOF
    
    # Hacer ejecutable el hook
    chmod +x .git/hooks/pre-commit
    
    print_message "Git hooks configurados correctamente."
}

# Verificar instalación
verify_installation() {
    print_header "Verificando instalación"
    
    # Verificar Node.js
    if command -v node &> /dev/null; then
        print_message "✅ Node.js $(node --version)"
    else
        print_error "❌ Node.js no encontrado"
    fi
    
    # Verificar pnpm
    if command -v pnpm &> /dev/null; then
        print_message "✅ pnpm $(pnpm --version)"
    else
        print_error "❌ pnpm no encontrado"
    fi
    
    # Verificar archivos de configuración
    if [[ -f .agents/ai-config.json ]]; then
        print_message "✅ ai-config.json encontrado"
    else
        print_error "❌ ai-config.json no encontrado"
    fi
    
    if [[ -f .env.local ]]; then
        print_message "✅ .env.local encontrado"
    else
        print_error "❌ .env.local no encontrado"
    fi
    
    # Verificar dependencias
    if [[ -f node_modules/.pnpm-lock.yaml ]]; then
        print_message "✅ Dependencias instaladas"
    else
        print_error "❌ Dependencias no instaladas"
    fi
}

# Mostrar instrucciones finales
show_final_instructions() {
    print_header "Instalación completada"
    
    echo -e "${GREEN}🎉 ¡Instalación de AI assistants completada!${NC}"
    echo ""
    echo -e "${YELLOW}📋 Próximos pasos:${NC}"
    echo "1. Configura tus API keys en .env.local"
    echo "2. Ejecuta: pnpm dev"
    echo "3. Verifica la configuración: cat .agents/ai-config.json"
    echo ""
    echo -e "${YELLOW}🔧 Comandos útiles:${NC}"
    echo "- Ver estado: cat .agents/status.md"
    echo "- Ejecutar agente: pnpm run agent:run --name ARCHITECT-AGENT"
    echo "- Ver logs: cat .agents/logs/ai-assistants.log"
    echo ""
    echo -e "${YELLOW}📚 Documentación:${NC}"
    echo "- AI Integration: .agents/AI-INTEGRATION.md"
    echo "- Comandos: .agents/COMMANDS.md"
    echo "- Configuración: .agents/PLATFORM-CONFIG.md"
    echo ""
    echo -e "${GREEN}¡Happy coding! 🚀${NC}"
}

# Función principal
main() {
    print_header "🤖 INSTALACIÓN DE AI ASSISTANTS - PORTFOLIO ERICK SANG"
    
    detect_os
    check_dependencies
    install_ai_cli_tools
    setup_environment
    configure_ai_assistants
    install_project_dependencies
    setup_git_hooks
    verify_installation
    show_final_instructions
}

# Ejecutar función principal
main "$@"
