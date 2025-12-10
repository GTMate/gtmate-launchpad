-- ============================================
-- GTMate Partner Applications Table Setup
-- ============================================
-- Este script crea la tabla para almacenar las postulaciones
-- de personas que quieren ser GTM Partners

-- Crear la tabla partner_applications
CREATE TABLE IF NOT EXISTS partner_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Información personal
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50), -- Optional
  linkedin VARCHAR(500) NOT NULL,
  
  -- Información profesional
  country VARCHAR(100) NOT NULL,
  experience VARCHAR(50), -- Optional (1-2, 3-5, 5-10, 10+)
  industry VARCHAR(100), -- Optional
  
  -- Metadata
  status VARCHAR(50) DEFAULT 'pending', -- pending, reviewing, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  
  -- Constraint para validar email
  CONSTRAINT partner_applications_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_partner_applications_email ON partner_applications(email);
CREATE INDEX IF NOT EXISTS idx_partner_applications_status ON partner_applications(status);
CREATE INDEX IF NOT EXISTS idx_partner_applications_created_at ON partner_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_partner_applications_country ON partner_applications(country);
CREATE INDEX IF NOT EXISTS idx_partner_applications_industry ON partner_applications(industry);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_partner_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para updated_at
DROP TRIGGER IF EXISTS trigger_update_partner_applications_updated_at ON partner_applications;
CREATE TRIGGER trigger_update_partner_applications_updated_at
  BEFORE UPDATE ON partner_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_partner_applications_updated_at();

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Habilitar RLS
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Permitir que cualquiera pueda insertar (para el formulario público)
CREATE POLICY "Anyone can insert partner applications"
  ON partner_applications
  FOR INSERT
  WITH CHECK (true);

-- Policy: Solo admins pueden leer (usa el dashboard de Supabase o crea un rol admin)
CREATE POLICY "Admins can view all partner applications"
  ON partner_applications
  FOR SELECT
  USING (true); -- Por ahora permitir lectura, luego puedes restringir por roles

-- Policy: Solo admins pueden actualizar
CREATE POLICY "Admins can update partner applications"
  ON partner_applications
  FOR UPDATE
  USING (true);

-- ============================================
-- Datos de ejemplo (opcional - comenta si no quieres datos de prueba)
-- ============================================

-- Insertar algunos datos de prueba
INSERT INTO partner_applications (first_name, last_name, email, phone, linkedin, country, status) VALUES
  ('Carlos', 'Mendoza', 'carlos.mendoza@example.com', '+52 55 1234 5678', 'https://linkedin.com/in/carlosmendoza', 'mexico', 'pending'),
  ('Maria', 'Silva', 'maria.silva@example.com', NULL, 'https://linkedin.com/in/mariasilva', 'brazil', 'reviewing'),
  ('Pablo', 'García', 'pablo.garcia@example.com', '+54 11 4567 8901', 'https://linkedin.com/in/pablogarcia', 'argentina', 'approved');

-- ============================================
-- Queries útiles
-- ============================================

-- Ver todas las aplicaciones ordenadas por fecha
-- SELECT * FROM partner_applications ORDER BY created_at DESC;

-- Ver aplicaciones pendientes
-- SELECT * FROM partner_applications WHERE status = 'pending' ORDER BY created_at DESC;

-- Contar aplicaciones por país
-- SELECT country, COUNT(*) as total FROM partner_applications GROUP BY country ORDER BY total DESC;

-- Contar aplicaciones por industria
-- SELECT industry, COUNT(*) as total FROM partner_applications GROUP BY industry ORDER BY total DESC;

-- Contar aplicaciones por experiencia
-- SELECT experience, COUNT(*) as total FROM partner_applications GROUP BY experience;

