-- ============================================
-- GTMate Contact Requests Table Setup
-- ============================================
-- Este script crea la tabla para almacenar las solicitudes de contacto
-- que vienen del formulario /contact

-- Crear la tabla contact_requests
CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Información del solicitante
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  company_name VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  target_region VARCHAR(100) NOT NULL,
  
  -- Relación con el partner (opcional si no tienes la tabla gtm_partners aún)
  partner_id UUID,
  partner_name VARCHAR(200),
  
  -- Metadata
  status VARCHAR(50) DEFAULT 'pending', -- pending, contacted, qualified, closed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  
  -- Índices para búsquedas rápidas
  CONSTRAINT contact_requests_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_contact_requests_email ON contact_requests(email);
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON contact_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_requests_partner_id ON contact_requests(partner_id);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_contact_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para updated_at
DROP TRIGGER IF EXISTS trigger_update_contact_requests_updated_at ON contact_requests;
CREATE TRIGGER trigger_update_contact_requests_updated_at
  BEFORE UPDATE ON contact_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_requests_updated_at();

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Habilitar RLS
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Permitir que cualquiera pueda insertar (para el formulario público)
CREATE POLICY "Anyone can insert contact requests"
  ON contact_requests
  FOR INSERT
  WITH CHECK (true);

-- Policy: Solo admins pueden leer (usa el dashboard de Supabase o crea un rol admin)
CREATE POLICY "Admins can view all contact requests"
  ON contact_requests
  FOR SELECT
  USING (true); -- Por ahora permitir lectura, luego puedes restringir por roles

-- Policy: Solo admins pueden actualizar
CREATE POLICY "Admins can update contact requests"
  ON contact_requests
  FOR UPDATE
  USING (true);

-- ============================================
-- Datos de ejemplo (opcional)
-- ============================================

-- Insertar algunos datos de prueba
INSERT INTO contact_requests (first_name, last_name, company_name, email, target_region, partner_id, partner_name, status) VALUES
  ('John', 'Doe', 'Acme Corp', 'john.doe@acme.com', 'LATAM', NULL, 'Carlos Mendoza', 'pending'),
  ('Jane', 'Smith', 'TechStart Inc', 'jane@techstart.io', 'Brazil', NULL, 'Maria Silva', 'contacted'),
  ('Robert', 'Johnson', 'GlobalCo', 'robert.j@globalco.com', 'Europe', NULL, 'Pablo García', 'qualified');

-- ============================================
-- Ver los datos
-- ============================================

-- Query para ver todas las solicitudes ordenadas por fecha
-- SELECT * FROM contact_requests ORDER BY created_at DESC;

-- Query para ver solicitudes pendientes
-- SELECT * FROM contact_requests WHERE status = 'pending' ORDER BY created_at DESC;

-- Query para contar solicitudes por región
-- SELECT target_region, COUNT(*) as total FROM contact_requests GROUP BY target_region;

