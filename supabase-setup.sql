-- ============================================
-- GTMate - Supabase Database Setup
-- ============================================
-- Ejecuta este script en el SQL Editor de Supabase

-- 1. Crear tabla de GTM Partners
CREATE TABLE IF NOT EXISTS gtm_partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Información básica
  name VARCHAR(255) NOT NULL,
  photo_url TEXT,
  email VARCHAR(255) UNIQUE,
  
  -- Información de trabajo
  rate INTEGER NOT NULL, -- Rate por hora en USD
  markets TEXT[] NOT NULL, -- Array de mercados/países: LATAM, Brazil, Mexico, Argentina, etc. (max 5)
  hires INTEGER DEFAULT 0, -- Número de veces contratado
  verified BOOLEAN DEFAULT false,
  
  -- Información adicional (opcional)
  bio TEXT,
  skills TEXT[], -- Array de habilidades
  languages TEXT[], -- Array de idiomas
  expertise TEXT[], -- Array de áreas de expertise (se muestran como bullet points)
  
  -- Status
  active BOOLEAN DEFAULT true,
  available BOOLEAN DEFAULT true
);

-- 2. Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_gtm_partners_markets ON gtm_partners USING GIN(markets); -- GIN index para arrays
CREATE INDEX IF NOT EXISTS idx_gtm_partners_rate ON gtm_partners(rate);
CREATE INDEX IF NOT EXISTS idx_gtm_partners_active ON gtm_partners(active);
CREATE INDEX IF NOT EXISTS idx_gtm_partners_hires ON gtm_partners(hires DESC);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE gtm_partners ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de seguridad

-- Política para lectura pública (cualquiera puede ver los partners activos)
DROP POLICY IF EXISTS "Public can view active partners" ON gtm_partners;
CREATE POLICY "Public can view active partners"
ON gtm_partners FOR SELECT
USING (active = true);

-- Política para inserción (solo usuarios autenticados pueden agregar)
DROP POLICY IF EXISTS "Authenticated users can insert partners" ON gtm_partners;
CREATE POLICY "Authenticated users can insert partners"
ON gtm_partners FOR INSERT
TO authenticated
WITH CHECK (true);

-- Política para actualización (solo usuarios autenticados pueden actualizar)
DROP POLICY IF EXISTS "Authenticated users can update partners" ON gtm_partners;
CREATE POLICY "Authenticated users can update partners"
ON gtm_partners FOR UPDATE
TO authenticated
USING (true);

-- 5. Función para incrementar contador de hires
CREATE OR REPLACE FUNCTION increment_hires(partner_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE gtm_partners
  SET hires = hires + 1, updated_at = NOW()
  WHERE id = partner_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_gtm_partners_updated_at ON gtm_partners;
CREATE TRIGGER update_gtm_partners_updated_at
BEFORE UPDATE ON gtm_partners
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 7. Insertar datos de ejemplo
INSERT INTO gtm_partners (name, photo_url, email, rate, markets, hires, verified, bio, skills, languages, expertise) VALUES
('Carlos Rodriguez', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', 'carlos.rodriguez@example.com', 85, ARRAY['LATAM', 'Mexico', 'Colombia'], 12, true, 'Experienced sales leader with 10+ years in B2B SaaS across Latin America. Proven track record in enterprise sales and market expansion.', ARRAY['B2B Sales', 'Enterprise', 'SaaS', 'Market Expansion'], ARRAY['Spanish', 'English', 'Portuguese'], ARRAY['Go-to-market strategy and execution', 'Local market entry and expansion', 'B2B sales and business development', 'Building and managing sales pipelines', 'Enterprise deal negotiation']),
('Ana Silva', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', 'ana.silva@example.com', 95, ARRAY['Brazil'], 8, true, 'Expert in Brazilian market expansion with deep knowledge of local business culture and extensive network in São Paulo and Rio.', ARRAY['Market Entry', 'B2B', 'Fintech', 'Enterprise Sales'], ARRAY['Portuguese', 'English'], ARRAY['Brazilian market entry strategies', 'Fintech sales and compliance', 'Building local partnerships', 'Navigating local business culture and regulations', 'Enterprise account management']),
('Miguel Torres', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel', 'miguel.torres@example.com', 75, ARRAY['Mexico', 'Central America'], 15, true, 'Specialized in Mexican SMB market with strong presence in Monterrey and Mexico City. Focus on tech and SaaS companies.', ARRAY['SMB Sales', 'B2B', 'Channel Sales', 'SaaS'], ARRAY['Spanish', 'English'], ARRAY['SMB sales and scaling strategies', 'Channel partner development', 'Local market entry and expansion', 'SaaS go-to-market execution', 'Building regional sales teams']),
('Sofia Martinez', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia', 'sofia.martinez@example.com', 90, ARRAY['Argentina', 'Uruguay', 'Chile'], 10, true, 'GTM expert for Southern Cone markets with connections across Buenos Aires tech ecosystem. Experienced in fintech and enterprise software.', ARRAY['Enterprise Sales', 'B2B', 'SaaS', 'Fintech'], ARRAY['Spanish', 'English'], ARRAY['Multi-country expansion strategy', 'B2B sales and business development', 'Navigating regional regulations', 'Enterprise software sales', 'Cross-border deal structuring']),
('Luis Fernandez', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luis', 'luis.fernandez@example.com', 80, ARRAY['Chile', 'Peru'], 7, true, 'Chilean market specialist with strong network in Santiago and Lima. Focused on helping startups scale in Andean markets.', ARRAY['B2B Sales', 'Startups', 'SaaS', 'Market Entry'], ARRAY['Spanish', 'English'], ARRAY['Startup GTM strategy', 'Building sales pipelines from zero', 'Local market entry and expansion', 'Seed to Series A sales execution', 'Regional partnership development']),
('Isabella Costa', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella', 'isabella.costa@example.com', 100, ARRAY['Spain', 'Portugal', 'Italy', 'France'], 20, true, 'European expansion expert with experience across Southern Europe. Specialized in enterprise B2B sales and market entry strategies.', ARRAY['Enterprise', 'B2B', 'International Sales', 'Market Expansion'], ARRAY['English', 'Spanish', 'Portuguese', 'Italian', 'French'], ARRAY['Pan-European expansion strategy', 'Enterprise sales and account management', 'Navigating EU regulations and compliance', 'Building multi-country sales operations', 'International business development']);

-- 8. Verificar que todo está funcionando
SELECT 
  COUNT(*) as total_partners,
  COUNT(*) FILTER (WHERE active = true) as active_partners,
  COUNT(*) FILTER (WHERE verified = true) as verified_partners
FROM gtm_partners;

-- Mostrar todos los partners
SELECT id, name, rate, markets, hires, verified FROM gtm_partners ORDER BY hires DESC;

