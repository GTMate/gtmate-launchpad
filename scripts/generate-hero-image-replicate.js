#!/usr/bin/env node

/**
 * Script para regenerar la imagen del hero usando Replicate API (Stable Diffusion)
 * 
 * Uso:
 *   node scripts/generate-hero-image-replicate.js
 * 
 * Requiere la variable de entorno REPLICATE_API_TOKEN
 * Puedes obtener una API key en: https://replicate.com/account/api-tokens
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const OUTPUT_PATH = path.join(__dirname, '../src/assets/hero-visual.jpg');

if (!REPLICATE_API_TOKEN) {
  console.error('❌ Error: REPLICATE_API_TOKEN no está configurada');
  console.error('   Por favor, configura la variable de entorno:');
  console.error('   export REPLICATE_API_TOKEN=tu_api_token');
  console.error('\n   Puedes obtener una API key en: https://replicate.com/account/api-tokens');
  process.exit(1);
}

const prompt = `A modern, professional hero image for a B2B SaaS platform focused on go-to-market (GTM) expansion. The image should show:
- Global business expansion concept with world map or globe elements
- Professional, clean, modern design suitable for a tech startup
- Business growth and market expansion theme
- Color scheme: modern blues, whites, and subtle gradients
- No text overlays, just visual elements
- High quality, professional illustration or photo style
- Aspect ratio 16:9, suitable for web hero section`;

const negativePrompt = `text, words, letters, low quality, blurry, distorted, watermark, signature`;

async function generateImageWithReplicate() {
  console.log('🎨 Generando nueva imagen del hero con Stable Diffusion...');
  console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`);

  try {
    // Usar el modelo Stable Diffusion XL de Replicate
    const model = "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b";
    
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${REPLICATE_API_TOKEN}`
      },
      body: JSON.stringify({
        version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        input: {
          prompt: prompt,
          negative_prompt: negativePrompt,
          width: 1920,
          height: 1080,
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Replicate API error: ${JSON.stringify(error)}`);
    }

    const prediction = await response.json();
    console.log('⏳ Imagen en proceso...');
    console.log(`   ID: ${prediction.id}`);
    
    // Polling para verificar el estado
    let result = await pollPrediction(prediction.id);
    
    if (!result || !result.output || result.output.length === 0) {
      throw new Error('No se generó ninguna imagen');
    }
    
    const imageUrl = result.output[0];
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

async function pollPrediction(predictionId, maxAttempts = 60) {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar 2 segundos
    
    try {
      const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: {
          'Authorization': `Token ${REPLICATE_API_TOKEN}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error al verificar estado: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.status === 'succeeded') {
        return result;
      } else if (result.status === 'failed') {
        throw new Error(`La generación falló: ${result.error || 'Error desconocido'}`);
      } else if (result.status === 'canceled') {
        throw new Error('La generación fue cancelada');
      }
      
      // Mostrar progreso
      if (i % 5 === 0) {
        process.stdout.write('.');
      }
      
    } catch (error) {
      if (i === maxAttempts - 1) {
        throw error;
      }
    }
  }
  
  throw new Error('Tiempo de espera agotado');
}

generateImageWithReplicate();

