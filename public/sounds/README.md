# 🎵 Carpeta de Sonidos

Esta carpeta contiene los archivos de audio para el reproductor de música del portfolio.

## 📁 Ubicación

✅ **CORRECTO**: Esta carpeta está ubicada en `public/sounds/` donde Vite puede servir los archivos estáticamente.

## 📁 Archivos Actuales

### **Archivos de Música Disponibles:**
- `Something+Beautiful+Is+Going+To+Happen.mp3` - Nihilore (Ambient)
- `bush-week-by-nihilore.mp3` - Nihilore (Electronic)

### **Formatos Soportados:**
- ✅ **MP3** (recomendado)
- ✅ **WAV**
- ✅ **OGG**
- ✅ **M4A**

## 🎧 Cómo Agregar Más Canciones

1. **Coloca tus archivos** de audio en esta carpeta (`public/sounds/`)
2. **Actualiza** el `AudioPlayer.ts` con los nombres correctos
3. **Ajusta** las duraciones en el código si es necesario

## 📝 Ejemplo de Configuración

```typescript
{
  id: 'mi-cancion',
  title: 'Nombre de la Canción',
  artist: 'Tu Artista',
  url: '/sounds/mi-cancion.mp3', // Nota: comienza con /sounds/
  duration: 180, // duración en segundos
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  category: 'electronic'
}
```

## ⚠️ Importante

- **Asegúrate** de que los archivos tengan permisos de Creative Commons
- **Verifica** que las rutas en el código coincidan con los nombres de archivo
- **Optimiza** los archivos para web (tamaño recomendado: < 10MB por canción)
- **Esta carpeta está en la ubicación correcta** para que funcione con Vite

## 🔧 Solución de Problemas

Si el reproductor no funciona:
1. Verifica que los archivos existan en esta carpeta
2. Comprueba que las rutas en `AudioPlayer.ts` sean correctas (deben comenzar con `/sounds/`)
3. Asegúrate de que los archivos no estén corruptos
4. Revisa la consola del navegador para errores
5. Ejecuta `npm run check-audio` para verificar la configuración

## 🎵 Estado Actual

✅ **Configuración correcta**: Los archivos están en la ubicación correcta
✅ **Archivos detectados**: 2 archivos de música de Nihilore
✅ **Rutas configuradas**: El AudioPlayer está configurado para usar estos archivos
