import { NextRequest, NextResponse } from 'next/server';
import { getDemoResponseLocalized, type DemoLocale } from '@/messages/demoResponses';

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    // Verificar si hay token configurado
    if (!process.env.HUGGINGFACE_API_KEY || process.env.HUGGINGFACE_API_KEY === 'your_huggingface_token_here') {
      // Modo demo con respuestas predefinidas centralizadas
      const accept = request.headers.get('accept-language') || '';
      const locale: DemoLocale = accept.toLowerCase().startsWith('es') ? 'es' : 'en';
      const demoResponse = getDemoResponseLocalized(message, locale);
      return NextResponse.json({ 
        response: demoResponse,
        success: true,
        demo: true
      });
    }

    // Configurar el prompt para Athena RPG Assistant
    const prompt = `Athena RPG Assistant: Eres Athena, un asistente virtual con personalidad de RPG clásico. 
    Responde de manera amigable y con estilo de videojuego retro. 
    Contexto actual: ${context || 'portfolio general'}
    Usuario dice: ${message}
    Responde como Athena:`;

    // Crear AbortController para timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout

    try {
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 100,
            temperature: 0.8,
            do_sample: true,
            top_p: 0.9,
            repetition_penalty: 1.1
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
      console.error(`Hugging Face API error: ${response.status} ${response.statusText}`);
      // Para errores HTTP, usar respuesta demo como fallback centralizado
      const accept = request.headers.get('accept-language') || '';
      const locale: DemoLocale = accept.toLowerCase().startsWith('es') ? 'es' : 'en';
      const demoResponse = getDemoResponseLocalized(message, locale);
      return NextResponse.json({ 
        response: demoResponse,
        success: true,
        demo: true,
        reason: `API HTTP error: ${response.status}`
      });
    }

    // Verificar si la respuesta es JSON válido
    const responseText = await response.text();
    let data;
    
    // Verificar si la respuesta es HTML (error page)
    if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
      console.error('Hugging Face API returned HTML instead of JSON:', responseText.substring(0, 200));
      // Usar respuesta demo como fallback centralizado
      const accept = request.headers.get('accept-language') || '';
      const locale: DemoLocale = accept.toLowerCase().startsWith('es') ? 'es' : 'en';
      const demoResponse = getDemoResponseLocalized(message, locale);
      return NextResponse.json({ 
        response: demoResponse,
        success: true,
        demo: true,
        reason: 'API returned HTML instead of JSON'
      });
    }
    
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error('Error parsing Hugging Face response:', responseText.substring(0, 200));
      // Usar respuesta demo como fallback centralizado
      const accept = request.headers.get('accept-language') || '';
      const locale: DemoLocale = accept.toLowerCase().startsWith('es') ? 'es' : 'en';
      const demoResponse = getDemoResponseLocalized(message, locale);
      return NextResponse.json({ 
        response: demoResponse,
        success: true,
        demo: true,
        reason: 'Invalid JSON response from API'
      });
    }
    
    // Extraer la respuesta generada
    let aiResponse = '';
    if (Array.isArray(data) && data.length > 0) {
      aiResponse = data[0]?.generated_text || '';
      // Limpiar la respuesta removiendo el prompt original
      aiResponse = aiResponse.replace(prompt, '').trim();
    } else if (data.generated_text) {
      aiResponse = data.generated_text.replace(prompt, '').trim();
    } else if (data.error) {
      // Manejar errores específicos de Hugging Face
      if (data.error.includes('Model is currently loading')) {
        aiResponse = 'El modelo de IA está cargando. Espera unos segundos e intenta de nuevo.';
      } else if (data.error.includes('rate limit')) {
        aiResponse = 'Demasiadas peticiones. Espera un momento antes de intentar de nuevo.';
      } else {
        aiResponse = 'Error temporal del servicio de IA. Intenta más tarde.';
      }
    }

    // Fallback si no hay respuesta válida
    if (!aiResponse) {
      aiResponse = 'Lo siento, no pude procesar tu mensaje. ¿Puedes intentar de nuevo?';
    }

      return NextResponse.json({ 
        response: aiResponse,
        success: true 
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      // Manejar timeout específicamente
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error('Hugging Face API timeout');
        const accept = request.headers.get('accept-language') || '';
        const locale: DemoLocale = accept.toLowerCase().startsWith('es') ? 'es' : 'en';
        const demoResponse = getDemoResponseLocalized(message, locale);
        return NextResponse.json({ 
          response: demoResponse,
          success: true,
          demo: true,
          reason: 'API timeout'
        });
      }
      
      // Otros errores de fetch
      console.error('Error fetching from Hugging Face API:', fetchError);
      const accept = request.headers.get('accept-language') || '';
      const locale: DemoLocale = accept.toLowerCase().startsWith('es') ? 'es' : 'en';
      const demoResponse = getDemoResponseLocalized(message, locale);
      return NextResponse.json({ 
        response: demoResponse,
        success: true,
        demo: true,
        reason: 'API fetch error'
      });
    }

  } catch (error) {
    console.error('Error en athena-chat API:', error);
    
    // Respuestas de fallback según el tipo de error
    let fallbackResponse = 'Lo siento, estoy teniendo problemas técnicos. Intenta más tarde.';
    
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        fallbackResponse = 'Error de autenticación. Verifica la configuración de la API.';
      } else if (error.message.includes('429')) {
        fallbackResponse = 'Demasiadas peticiones. Espera un momento antes de intentar de nuevo.';
      } else if (error.message.includes('500')) {
        fallbackResponse = 'El servicio de IA está temporalmente no disponible.';
      }
    }

    return NextResponse.json({ 
      response: fallbackResponse,
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
