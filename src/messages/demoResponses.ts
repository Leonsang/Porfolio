export type DemoLocale = 'es' | 'en';

const demoResponses: Record<DemoLocale, Record<string, string>> = {
  es: {
    hola: '¡Hola! Soy Athena, tu asistente virtual. ¿En qué puedo ayudarte hoy?',
    github: 'Puedes encontrar mi GitHub en: https://github.com/leonsang',
    cv: 'Puedes descargar mi CV desde la sección de contacto del portfolio.',
    proyectos: 'Revisa la sección de proyectos para ver mis trabajos más destacados.',
    habilidades: 'Mis habilidades técnicas están detalladas en la sección correspondiente.',
    contacto: 'Puedes contactarme a través de LinkedIn o email desde la sección de contacto.',
    default: 'Soy Athena, tu asistente virtual. Puedo ayudarte a navegar por el portfolio y responder preguntas sobre mi experiencia como Data Engineer.'
  },
  en: {
    hello: "Hello! I'm Athena, your virtual assistant. How can I help you today?",
    github: 'You can find my GitHub at: https://github.com/leonsang',
    cv: 'You can download my CV from the contact section of the portfolio.',
    projects: 'Check the projects section to see my most outstanding work.',
    skills: 'My technical skills are detailed in the corresponding section.',
    contact: 'You can reach me through LinkedIn or email from the contact section.',
    default: "I'm Athena, your virtual assistant. I can help you navigate the portfolio and answer questions about my experience as a Data Engineer."
  }
};

export function getDemoResponseLocalized(message: string, locale: DemoLocale = 'es'): string {
  const map = demoResponses[locale];
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(map)) {
    if (key !== 'default' && lower.includes(key)) return response;
  }
  return map.default;
}

