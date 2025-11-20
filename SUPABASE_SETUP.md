# Configuración de Supabase para GTMate

## 1. Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto:
   - **Name**: GTMate
   - **Database Password**: (guarda esto de forma segura)
   - **Region**: Escoge el más cercano a tus usuarios

---

## 2. Crear la Tabla de Partners

### SQL para crear la tabla:

```sql
-- Crear tabla de GTM Partners
CREATE TABLE gtm_partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Información básica
  name VARCHAR(255) NOT NULL,
  photo_url TEXT,
  email VARCHAR(255) UNIQUE,
  
  -- Información de trabajo
  rate INTEGER NOT NULL, -- Rate por hora en USD
  market VARCHAR(100) NOT NULL, -- LATAM, Brazil, Mexico, Argentina, etc.
  hires INTEGER DEFAULT 0, -- Número de veces contratado
  verified BOOLEAN DEFAULT false,
  
  -- Información adicional (opcional)
  bio TEXT,
  skills TEXT[], -- Array de habilidades
  languages TEXT[], -- Array de idiomas
  
  -- Status
  active BOOLEAN DEFAULT true,
  available BOOLEAN DEFAULT true
);

-- Crear índices para búsquedas rápidas
CREATE INDEX idx_gtm_partners_market ON gtm_partners(market);
CREATE INDEX idx_gtm_partners_rate ON gtm_partners(rate);
CREATE INDEX idx_gtm_partners_active ON gtm_partners(active);

-- Habilitar Row Level Security (RLS)
ALTER TABLE gtm_partners ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública (cualquiera puede ver los partners activos)
CREATE POLICY "Public can view active partners"
ON gtm_partners FOR SELECT
USING (active = true);

-- Política para inserción (solo usuarios autenticados pueden agregar)
CREATE POLICY "Authenticated users can insert partners"
ON gtm_partners FOR INSERT
TO authenticated
WITH CHECK (true);

-- Política para actualización (solo usuarios autenticados pueden actualizar)
CREATE POLICY "Authenticated users can update partners"
ON gtm_partners FOR UPDATE
TO authenticated
USING (true);
```

---

## 3. Insertar Datos de Ejemplo

```sql
-- Insertar partners de ejemplo
INSERT INTO gtm_partners (name, photo_url, email, rate, market, hires, verified, bio, skills, languages) VALUES
('Carlos Rodriguez', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', 'carlos@example.com', 85, 'LATAM', 12, true, 'Experienced sales leader with 10+ years in B2B SaaS', ARRAY['B2B Sales', 'Enterprise', 'SaaS'], ARRAY['Spanish', 'English', 'Portuguese']),
('Ana Silva', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', 'ana@example.com', 95, 'Brazil', 8, true, 'Expert in Brazilian market expansion', ARRAY['Market Entry', 'B2B', 'Fintech'], ARRAY['Portuguese', 'English']),
('Miguel Torres', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel', 'miguel@example.com', 75, 'Mexico', 15, true, 'Specialized in Mexican SMB market', ARRAY['SMB Sales', 'B2B', 'Channel Sales'], ARRAY['Spanish', 'English']),
('Sofia Martinez', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia', 'sofia@example.com', 90, 'Argentina', 10, true, 'GTM expert for Argentine market', ARRAY['Enterprise Sales', 'B2B', 'SaaS'], ARRAY['Spanish', 'English']),
('Luis Fernandez', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luis', 'luis@example.com', 80, 'Chile', 7, true, 'Chilean market specialist', ARRAY['B2B Sales', 'Startups', 'SaaS'], ARRAY['Spanish', 'English']),
('Isabella Costa', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella', 'isabella@example.com', 100, 'Europe', 20, true, 'European expansion expert', ARRAY['Enterprise', 'B2B', 'International Sales'], ARRAY['English', 'Spanish', 'Portuguese', 'Italian']);
```

---

## 4. Instalar el Cliente de Supabase

```bash
cd gtmate-launchpad
npm install @supabase/supabase-js
```

---

## 5. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=tu_supabase_url_aqui
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key_aqui
```

**Dónde encontrar estas credenciales:**
1. Ve a tu proyecto en Supabase
2. Settings → API
3. Copia `Project URL` y `anon/public key`

---

## 6. Crear el Cliente de Supabase

Crea el archivo `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos TypeScript para los partners
export interface Partner {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  photo_url: string | null;
  email: string | null;
  rate: number;
  market: string;
  hires: number;
  verified: boolean;
  bio: string | null;
  skills: string[] | null;
  languages: string[] | null;
  active: boolean;
  available: boolean;
}
```

---

## 7. Actualizar la Página Explore

Reemplaza el fetch en `src/pages/Explore.tsx`:

```typescript
import { supabase, type Partner } from "@/lib/supabase";

// En el useEffect:
useEffect(() => {
  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('gtm_partners')
        .select('*')
        .eq('active', true)
        .order('hires', { ascending: false });

      if (error) throw error;
      
      setPartners(data || []);
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchPartners();
}, []);
```

---

## 8. Funciones Útiles para Agregar

### Filtrar por mercado:

```typescript
export const fetchPartnersByMarket = async (market: string) => {
  const { data, error } = await supabase
    .from('gtm_partners')
    .select('*')
    .eq('active', true)
    .eq('market', market)
    .order('hires', { ascending: false });

  if (error) throw error;
  return data;
};
```

### Filtrar por rango de precio:

```typescript
export const fetchPartnersByRate = async (minRate: number, maxRate: number) => {
  const { data, error } = await supabase
    .from('gtm_partners')
    .select('*')
    .eq('active', true)
    .gte('rate', minRate)
    .lte('rate', maxRate)
    .order('rate', { ascending: true });

  if (error) throw error;
  return data;
};
```

### Incrementar contador de hires:

```typescript
export const incrementHires = async (partnerId: string) => {
  const { data, error } = await supabase.rpc('increment_hires', {
    partner_id: partnerId
  });

  if (error) throw error;
  return data;
};

// SQL para crear la función:
CREATE OR REPLACE FUNCTION increment_hires(partner_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE gtm_partners
  SET hires = hires + 1
  WHERE id = partner_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 9. Storage para Fotos de Perfil (Opcional)

Si quieres almacenar fotos en Supabase:

1. Ve a Storage en Supabase Dashboard
2. Crea un bucket llamado `partner-photos`
3. Configura como público:

```sql
-- Política para lectura pública
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'partner-photos');

-- Política para upload (usuarios autenticados)
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'partner-photos');
```

---

## 10. Panel de Administración (Próximos Pasos)

Para agregar/editar partners, considera:
1. Crear página de admin (`/admin/partners`)
2. Usar Supabase Auth para autenticación
3. Formulario CRUD para partners
4. O usar directamente el Dashboard de Supabase

---

## Estructura Final del Proyecto

```
gtmate-launchpad/
├── src/
│   ├── lib/
│   │   └── supabase.ts          # Cliente de Supabase
│   ├── pages/
│   │   ├── Explore.tsx          # Página de exploración
│   │   └── Apply.tsx            # Formulario (guardado para futuro)
│   └── ...
├── .env.local                    # Variables de entorno
└── SUPABASE_SETUP.md            # Esta guía
```

---

## Checklist de Setup

- [ ] Crear proyecto en Supabase
- [ ] Ejecutar SQL para crear tabla `gtm_partners`
- [ ] Insertar datos de ejemplo
- [ ] Instalar `@supabase/supabase-js`
- [ ] Crear `.env.local` con credenciales
- [ ] Crear `src/lib/supabase.ts`
- [ ] Actualizar `Explore.tsx` para usar Supabase
- [ ] Probar la conexión
- [ ] (Opcional) Configurar Storage para fotos

---

## Recursos

- [Documentación Supabase](https://supabase.com/docs)
- [Supabase + React Guide](https://supabase.com/docs/guides/with-react)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

