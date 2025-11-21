# 🚀 Supabase Quickstart - GTMate

## Paso 1: Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Click en "Start your project"
3. Crea un nuevo proyecto:
   - **Name**: GTMate
   - **Database Password**: Guarda esto (lo necesitarás)
   - **Region**: Escoge el más cercano a tus usuarios
4. Espera ~2 minutos mientras se crea el proyecto

---

## Paso 2: Ejecutar Script SQL

1. En tu proyecto de Supabase, ve a **SQL Editor** (icono en el menú lateral)
2. Click en **"New query"**
3. Copia TODO el contenido del archivo `supabase-setup.sql`
4. Pégalo en el editor
5. Click en **"Run"** (o Cmd/Ctrl + Enter)
6. Deberías ver: "Success. No rows returned"
7. Verifica que se crearon 6 partners de ejemplo

---

## Paso 3: Obtener Credenciales

1. Ve a **Settings** → **API** (en el menú lateral)
2. Encuentra:
   - **Project URL** (algo como: `https://xxxxx.supabase.co`)
   - **anon/public key** (una llave larga)
3. Copia estas dos cosas

---

## Paso 4: Configurar Variables de Entorno

1. Copia el archivo `.env.local.example` a `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Abre `.env.local` y reemplaza:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_larga_api_key_aqui
   ```

3. Guarda el archivo

---

## Paso 5: Reiniciar el Servidor

```bash
# Detén el servidor (Ctrl + C si está corriendo)
# Luego inicia de nuevo:
npm run dev
```

---

## Paso 6: Verificar que Funciona

1. Ve a [http://localhost:8080/explore](http://localhost:8080/explore)
2. Deberías ver 6 partners cargados desde Supabase
3. Abre la consola del navegador (F12)
4. Si ves "Using mock data" → algo salió mal con la configuración
5. Si NO ves ese mensaje → ¡está funcionando con Supabase! 🎉

---

## Verificación en Supabase

Para confirmar que todo está bien:

1. Ve a **Table Editor** en Supabase
2. Selecciona la tabla `gtm_partners`
3. Deberías ver 6 filas con los partners de ejemplo

---

## Solución de Problemas

### ❌ "Using mock data" en consola

**Causa**: Variables de entorno no configuradas o incorrectas

**Solución**:
1. Verifica que `.env.local` existe y tiene las credenciales correctas
2. Reinicia el servidor de desarrollo
3. Revisa que no haya espacios extra en las credenciales

### ❌ Error: "relation gtm_partners does not exist"

**Causa**: No se ejecutó el script SQL

**Solución**:
1. Ve al SQL Editor en Supabase
2. Ejecuta `supabase-setup.sql` completo

### ❌ Error: "Failed to fetch"

**Causa**: Políticas RLS bloqueando el acceso

**Solución**:
1. Verifica que se crearon las políticas en el script SQL
2. O temporalmente desactiva RLS:
   ```sql
   ALTER TABLE gtm_partners DISABLE ROW LEVEL SECURITY;
   ```

---

## Próximos Pasos

Una vez que funciona:

1. ✅ Agregar más partners reales
2. ✅ Implementar filtros funcionales
3. ✅ Crear página de detalle de partner
4. ✅ Sistema de "Request introduction"
5. ✅ Panel de administración

---

## Agregar Nuevo Partner Manualmente

Ve al SQL Editor y ejecuta:

```sql
INSERT INTO gtm_partners (name, photo_url, email, rate, markets, hires, verified, bio, skills, languages)
VALUES (
  'Juan Perez',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
  'juan@example.com',
  85,
  ARRAY['Mexico', 'Central America'], -- Array de mercados (max 5)
  0,
  true,
  'Sales expert in Mexican market',
  ARRAY['B2B', 'SaaS'],
  ARRAY['Spanish', 'English']
);
```

---

## Recursos Útiles

- [Supabase Docs](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

¿Necesitas ayuda? Revisa `SUPABASE_SETUP.md` para guía completa.

