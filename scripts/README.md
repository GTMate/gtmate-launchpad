# Scripts de Generación

## Generar Imagen del Hero

Hay tres opciones disponibles para generar la imagen del hero:

### 1. OpenAI DALL-E 3 (Recomendado para mejor calidad)

**Requisitos:**
- Node.js 18+ (para soporte nativo de `fetch`)
- API Key de OpenAI

**Uso:**
```bash
export OPENAI_API_KEY=tu_api_key_aqui
npm run generate:hero-image
```

**Costo:** ~$0.04 USD por imagen (DALL-E 3 HD)

---

### 2. Unsplash (Gratis, sin API key requerida)

**Requisitos:**
- Node.js 18+
- API Key de Unsplash (opcional, pero recomendada para mejores resultados)

**Uso:**
```bash
# Sin API key (usa Unsplash Source)
npm run generate:hero-image:unsplash

# Con API key (mejores resultados)
export UNSPLASH_ACCESS_KEY=tu_access_key
npm run generate:hero-image:unsplash
```

**Obtener API key:** https://unsplash.com/developers (gratis)

**Nota:** Las imágenes de Unsplash son gratuitas pero requieren atribución.

---

### 3. Replicate / Stable Diffusion (Más económico que DALL-E)

**Requisitos:**
- Node.js 18+
- API Token de Replicate

**Uso:**
```bash
export REPLICATE_API_TOKEN=tu_api_token
npm run generate:hero-image:replicate
```

**Obtener API token:** https://replicate.com/account/api-tokens

**Costo:** ~$0.002-0.01 USD por imagen (depende del modelo)

---

### Personalización

Puedes editar los prompts en los archivos de script correspondientes para cambiar el estilo o contenido de la imagen generada.

### Notas Generales

- Todas las imágenes se guardan en `src/assets/hero-visual.jpg`
- Los scripts sobrescribirán la imagen existente
- Recomendación: Empieza con Unsplash (gratis), luego prueba DALL-E 3 para mejor calidad

