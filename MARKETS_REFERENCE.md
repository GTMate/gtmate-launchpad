# Mercados/Regiones - Referencia

## Lista de Mercados Sugeridos

Usa estos nombres consistentemente en el array `markets` de cada partner:

### América Latina

#### Regiones
- `LATAM` - Toda América Latina
- `Central America` - Centroamérica
- `South America` - Sudamérica
- `Andean Region` - Región Andina
- `Southern Cone` - Cono Sur

#### Países
- `Mexico` - México
- `Brazil` - Brasil
- `Argentina` - Argentina
- `Chile` - Chile
- `Colombia` - Colombia
- `Peru` - Perú
- `Uruguay` - Uruguay
- `Paraguay` - Paraguay
- `Ecuador` - Ecuador
- `Bolivia` - Bolivia
- `Venezuela` - Venezuela
- `Costa Rica` - Costa Rica
- `Panama` - Panamá
- `Guatemala` - Guatemala
- `El Salvador` - El Salvador
- `Honduras` - Honduras
- `Nicaragua` - Nicaragua
- `Dominican Republic` - República Dominicana
- `Puerto Rico` - Puerto Rico

### Europa

#### Regiones
- `Europe` - Europa (general)
- `Southern Europe` - Europa del Sur
- `Western Europe` - Europa Occidental
- `Northern Europe` - Europa del Norte
- `Eastern Europe` - Europa del Este

#### Países
- `Spain` - España
- `Portugal` - Portugal
- `Italy` - Italia
- `France` - Francia
- `Germany` - Alemania
- `UK` - Reino Unido
- `Netherlands` - Países Bajos
- `Belgium` - Bélgica
- `Switzerland` - Suiza
- `Austria` - Austria
- `Sweden` - Suecia
- `Norway` - Noruega
- `Denmark` - Dinamarca
- `Finland` - Finlandia
- `Poland` - Polonia
- `Czech Republic` - República Checa

### Norteamérica
- `USA` - Estados Unidos
- `Canada` - Canadá

### Asia-Pacífico
- `APAC` - Asia-Pacífico (general)
- `Singapore` - Singapur
- `Hong Kong` - Hong Kong
- `Japan` - Japón
- `South Korea` - Corea del Sur
- `Australia` - Australia
- `New Zealand` - Nueva Zelanda
- `India` - India

---

## Reglas de Uso

1. **Máximo 5 mercados** por partner
2. **Nombres en inglés** para consistencia
3. **Orden sugerido**: Más específico primero
   - ✅ Bueno: `['Mexico', 'LATAM', 'Central America']`
   - ❌ Evitar: `['LATAM', 'Central America', 'Mexico']`

---

## Ejemplos de Combinaciones

### Partner enfocado en un país
```sql
markets = ARRAY['Brazil']
```

### Partner regional
```sql
markets = ARRAY['LATAM', 'Mexico', 'Colombia']
```

### Partner multi-región
```sql
markets = ARRAY['Argentina', 'Chile', 'Uruguay', 'Southern Cone']
```

### Partner europeo especializado
```sql
markets = ARRAY['Spain', 'Portugal', 'Italy', 'Southern Europe']
```

### Partner con experiencia amplia
```sql
markets = ARRAY['LATAM', 'Spain', 'Portugal', 'Brazil', 'Mexico']
```

---

## Tips de Visualización

En las cards se mostrarán máximo 5 badges:
- Si el partner tiene más de 5 mercados, solo se muestran los primeros 5
- Los mercados más específicos deberían ir primero
- Los nombres cortos se ven mejor en badges (`Mexico` vs `Dominican Republic`)

---

## Filtrado

Los usuarios podrán filtrar por:
- Región específica (ej: "LATAM")
- País específico (ej: "Mexico")
- Partners que atiendan ese mercado

El sistema buscará en el array completo de markets.

