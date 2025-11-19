#!/usr/bin/env node

/**
 * Script para regenerar la imagen del hero usando Unsplash API
 * 
 * Uso:
 *   node scripts/generate-hero-image-unsplash.js
 * 
 * Requiere la variable de entorno UNSPLASH_ACCESS_KEY (opcional, pero recomendado)
 * Puedes obtener una API key gratuita en: https://unsplash.com/developers
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'YOUR_ACCESS_KEY';
const OUTPUT_PATH = path.join(__dirname, '../src/assets/hero-visual.jpg');

// Términos de búsqueda relacionados con GTM, expansión de mercados, negocios globales
const searchTerms = [
  'global business expansion',
  'international market growth',
  'world map business',
  'global network',
  'business growth strategy',
  'international partnership',
  'market expansion',
  'global commerce'
];

async function getImageFromUnsplash() {
  console.log('🎨 Buscando imagen del hero en Unsplash...');
  
  // Si no hay API key, usar una imagen directa de Unsplash Source
  if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'YOUR_ACCESS_KEY') {
    console.log('⚠️  No se encontró UNSPLASH_ACCESS_KEY, usando imagen directa...');
    return getDirectUnsplashImage();
  }

  try {
    // Buscar una imagen relacionada con los términos
    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    console.log(`🔍 Buscando: "${randomTerm}"`);
    
    const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(randomTerm)}&orientation=landscape&per_page=10&client_id=${UNSPLASH_ACCESS_KEY}`;
    
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      console.log('⚠️  No se encontraron resultados, usando imagen directa...');
      return getDirectUnsplashImage();
    }
    
    // Seleccionar una imagen aleatoria de los resultados
    const randomImage = data.results[Math.floor(Math.random() * data.results.length)];
    const imageUrl = randomImage.urls.regular || randomImage.urls.full;
    
    console.log(`✅ Imagen encontrada: ${randomImage.description || randomImage.alt_description || 'Sin descripción'}`);
    console.log(`📸 Fotógrafo: ${randomImage.user.name}`);
    console.log('📥 Descargando imagen...');
    
    return await downloadImage(imageUrl);
    
  } catch (error) {
    console.error('❌ Error al buscar en Unsplash:', error.message);
    console.log('🔄 Intentando con imagen directa...');
    return getDirectUnsplashImage();
  }
}

async function getDirectUnsplashImage() {
  // Usar URLs directas de Unsplash con IDs específicos de imágenes relacionadas con negocios
  // Estas son imágenes curadas de alta calidad relacionadas con GTM y expansión de mercados
  const imageUrls = [
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&q=80', // Global business
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1920&h=1080&fit=crop&q=80', // Business growth
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=1080&fit=crop&q=80', // International business
    'https://images.unsplash.com/photo-1553484771-371a605b060b?w=1920&h=1080&fit=crop&q=80', // Global network
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=80', // Business strategy
    'https://images.unsplash.com/photo-1556761175-b93bdfb0c0e7?w=1920&h=1080&fit=crop&q=80', // Market expansion
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1920&h=1080&fit=crop&q=80', // Business partnership
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=1080&fit=crop&q=80', // Global commerce
  ];
  
  const randomUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
  
  console.log('📥 Descargando imagen de Unsplash...');
  return await downloadImage(randomUrl);
}

async function downloadImage(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`Error al descargar imagen: ${response.statusText}`);
    }
    
    const imageBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);
    
    // Guardar la imagen
    fs.writeFileSync(OUTPUT_PATH, buffer);
    
    console.log(`✅ Imagen guardada en: ${OUTPUT_PATH}`);
    console.log('🎉 ¡Imagen del hero regenerada exitosamente!');
    console.log('\n📝 Nota: Las imágenes de Unsplash son gratuitas pero requieren atribución.');
    console.log('   Considera agregar créditos en tu sitio si usas estas imágenes.');
    
  } catch (error) {
    console.error('❌ Error al descargar la imagen:', error.message);
    throw error;
  }
}

getImageFromUnsplash().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});

