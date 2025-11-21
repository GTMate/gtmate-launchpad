# 📋 Contact Requests Setup Guide

Esta guía te ayudará a configurar la tabla de solicitudes de contacto en Supabase.

## 🚀 Setup Rápido (5 minutos)

### Paso 1: Acceder a Supabase SQL Editor

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. En el menú lateral, click en **"SQL Editor"**
3. Click en **"New Query"**

### Paso 2: Ejecutar el Script

1. Abre el archivo `supabase-contact-requests-setup.sql`
2. Copia TODO el contenido
3. Pégalo en el SQL Editor de Supabase
4. Click en **"Run"** (o presiona `Ctrl/Cmd + Enter`)

✅ Deberías ver el mensaje: "Success. No rows returned"

### Paso 3: Verificar la Tabla

1. En el menú lateral, click en **"Table Editor"**
2. Deberías ver una nueva tabla llamada **`contact_requests`**
3. Click en la tabla para ver los 3 registros de ejemplo

## 📊 Estructura de la Tabla

La tabla `contact_requests` incluye:

### Campos del Solicitante
- `first_name` - Nombre
- `last_name` - Apellido
- `company_name` - Nombre de la empresa
- `email` - Email (con validación)
- `target_region` - Región objetivo

### Campos del Partner
- `partner_id` - ID del partner (UUID)
- `partner_name` - Nombre del partner

### Campos de Gestión
- `status` - Estado: `pending`, `contacted`, `qualified`, `closed`
- `created_at` - Fecha de creación (automático)
- `updated_at` - Fecha de actualización (automático)
- `notes` - Notas adicionales

## 🔒 Seguridad (Row Level Security)

El script configura automáticamente:

✅ **Cualquiera puede insertar** - El formulario público puede crear solicitudes  
✅ **Solo admins pueden leer** - Solo tú puedes ver las solicitudes en el dashboard  
✅ **Solo admins pueden actualizar** - Solo tú puedes cambiar el status  

## 📈 Ver las Solicitudes

### Desde el Dashboard de Supabase
1. Ve a **Table Editor** → `contact_requests`
2. Verás todas las solicitudes en una tabla
3. Puedes filtrar, ordenar, y editar directamente

### Queries Útiles

#### Ver todas las solicitudes (más recientes primero)
```sql
SELECT * FROM contact_requests 
ORDER BY created_at DESC;
```

#### Ver solo solicitudes pendientes
```sql
SELECT * FROM contact_requests 
WHERE status = 'pending' 
ORDER BY created_at DESC;
```

#### Contar solicitudes por región
```sql
SELECT target_region, COUNT(*) as total 
FROM contact_requests 
GROUP BY target_region;
```

#### Ver solicitudes de los últimos 7 días
```sql
SELECT * FROM contact_requests 
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

## 🔔 Configurar Notificaciones (Opcional)

### Opción 1: Email con Supabase Functions
Puedes crear una función de Supabase que envíe un email cada vez que se crea una solicitud.

### Opción 2: Webhooks con Zapier/Make
1. Crea un webhook en Zapier/Make
2. Configura un trigger en Supabase que llame al webhook
3. El webhook puede enviar emails, actualizar un CRM, etc.

### Opción 3: Email directo con SendGrid/Resend
Puedes agregar una función en el código que envíe un email después de guardar en Supabase.

¿Quieres que configure alguna de estas opciones?

## 🛠️ Gestión de Status

Los status disponibles son:

- **`pending`** - Nueva solicitud (default)
- **`contacted`** - Ya te contactaste con el prospecto
- **`qualified`** - Prospecto calificado, listo para match
- **`closed`** - Match completado o cerrado

Para cambiar el status:

```sql
UPDATE contact_requests 
SET status = 'contacted' 
WHERE id = 'uuid-aqui';
```

## 🔗 Relacionar con Partners (Opcional)

Si ya tienes la tabla `gtm_partners`, puedes crear una relación:

```sql
ALTER TABLE contact_requests 
ADD CONSTRAINT fk_contact_partner 
FOREIGN KEY (partner_id) 
REFERENCES gtm_partners(id);
```

Esto asegura la integridad de los datos.

## 📱 Acceso desde el Frontend

El código ya está configurado en:
- `src/lib/supabase.ts` - Funciones para crear y obtener solicitudes
- `src/pages/Contact.tsx` - Integración con el formulario

Cuando un usuario envía el formulario, automáticamente se guarda en Supabase.

## ⚠️ Troubleshooting

### Error: "new row violates row-level security policy"
- Ve a **Authentication** → **Policies** en Supabase
- Verifica que la policy "Anyone can insert" esté habilitada

### Error: "relation contact_requests does not exist"
- El script no se ejecutó correctamente
- Vuelve a ejecutar `supabase-contact-requests-setup.sql`

### No veo los datos en el dashboard
- Verifica que estés en el proyecto correcto
- Revisa la consola del navegador por errores
- Verifica que las variables de entorno estén configuradas en `.env.local`

## 📊 Exportar a CSV/Excel (Opcional)

Desde el Table Editor de Supabase:
1. Click en `contact_requests`
2. Click en el botón **"..."** (más opciones)
3. Selecciona **"Export as CSV"**

Esto te permite importar las solicitudes a Excel, Google Sheets, o tu CRM.

---

## 🎉 ¡Listo!

Tu sistema de contact requests está configurado y funcionando. 

Las solicitudes del formulario ahora se guardarán automáticamente en Supabase.

