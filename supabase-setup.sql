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

-- 2. Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_gtm_partners_market ON gtm_partners(market);
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
INSERT INTO gtm_partners (name, photo_url, email, rate, market, hires, verified, bio, skills, languages) VALUES
('Carlos Rodriguez', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', 'carlos.rodriguez@example.com', 85, 'LATAM', 12, true, 'Experienced sales leader with 10+ years in B2B SaaS across Latin America. Proven track record in enterprise sales and market expansion.', ARRAY['B2B Sales', 'Enterprise', 'SaaS', 'Market Expansion'], ARRAY['Spanish', 'English', 'Portuguese']),
('Ana Silva', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', 'ana.silva@example.com', 95, 'Brazil', 8, true, 'Expert in Brazilian market expansion with deep knowledge of local business culture and extensive network in São Paulo and Rio.', ARRAY['Market Entry', 'B2B', 'Fintech', 'Enterprise Sales'], ARRAY['Portuguese', 'English']),
('Miguel Torres', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel', 'miguel.torres@example.com', 75, 'Mexico', 15, true, 'Specialized in Mexican SMB market with strong presence in Monterrey and Mexico City. Focus on tech and SaaS companies.', ARRAY['SMB Sales', 'B2B', 'Channel Sales', 'SaaS'], ARRAY['Spanish', 'English']),
('Sofia Martinez', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia', 'sofia.martinez@example.com', 90, 'Argentina', 10, true, 'GTM expert for Argentine market with connections across Buenos Aires tech ecosystem. Experienced in fintech and enterprise software.', ARRAY['Enterprise Sales', 'B2B', 'SaaS', 'Fintech'], ARRAY['Spanish', 'English']),
('Luis Fernandez', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luis', 'luis.fernandez@example.com', 80, 'Chile', 7, true, 'Chilean market specialist with strong network in Santiago. Focused on helping startups scale in the Chilean market.', ARRAY['B2B Sales', 'Startups', 'SaaS', 'Market Entry'], ARRAY['Spanish', 'English']),
('Isabella Costa', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella', 'isabella.costa@example.com', 100, 'Europe', 20, true, 'European expansion expert with experience across Spain, Portugal, Italy and France. Specialized in enterprise B2B sales.', ARRAY['Enterprise', 'B2B', 'International Sales', 'Market Expansion'], ARRAY['English', 'Spanish', 'Portuguese', 'Italian', 'French']);

-- 8. Verificar que todo está funcionando
SELECT 
  COUNT(*) as total_partners,
  COUNT(*) FILTER (WHERE active = true) as active_partners,
  COUNT(*) FILTER (WHERE verified = true) as verified_partners
FROM gtm_partners;

-- Mostrar todos los partners
SELECT id, name, rate, market, hires, verified FROM gtm_partners ORDER BY hires DESC;

