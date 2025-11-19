#!/usr/bin/env node

/**
 * Script para regenerar la imagen del hero usando OpenAI DALL-E API
 * 
 * Uso:
 *   node scripts/generate-hero-image.js
 * 
 * Requiere la variable de entorno OPENAI_API_KEY
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OUTPUT_PATH = path.join(__dirname, '../src/assets/hero-visual.jpg');

if (!OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY no está configurada');
  console.error('   Por favor, configura la variable de entorno:');
  console.error('   export OPENAI_API_KEY=tu_api_key');
  process.exit(1);
}

const prompt = `A modern, professional hero image for a B2B SaaS platform focused on go-to-market (GTM) expansion. The image should show:
- Global business expansion concept with world map or globe elements
- Professional, clean, modern design suitable for a tech startup
- Business growth and market expansion theme
- Color scheme: modern blues, whites, and subtle gradients
- No text overlays, just visual elements
- Aspect ratio suitable for web hero section (16:9 or similar)
- High quality, professional illustration or photo style`;

async function generateImage() {
  console.log('🎨 Generando nueva imagen del hero...');
  console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`);

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1792x1024', // Good size for hero images
        quality: 'hd',
        response_format: 'url'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    console.log('✅ Imagen generada exitosamente');
    console.log('📥 Descargando imagen...');

    // Descargar la imagen
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Error al descargar imagen: ${imageResponse.statusText}`);
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    // Guardar la imagen
    fs.writeFileSync(OUTPUT_PATH, buffer);
    
    console.log(`✅ Imagen guardada en: ${OUTPUT_PATH}`);
    console.log('🎉 ¡Imagen del hero regenerada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error al generar la imagen:', error.message);
    process.exit(1);
  }
}

generateImage();

