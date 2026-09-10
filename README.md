# 🌸 VARM Portfolio — Minimalist Relational Architecture

Un ecosistema web premium y auto-gestionable concebido bajo la filosofía artesanal japonesa del **Monozukuri (ものづくり)**. El proyecto fusiona una interfaz interactiva de alta fidelidad para el visitante (inspirada en la estética zen _Hinomaru_ con papel tradicional _Washi_) con un robusto panel de control administrativo CRUD blindado que mide el tráfico global en tiempo real.

Construido en Puerto Asís, Putumayo, Colombia, para proyectar una trayectoria profesional sólida al mercado internacional.

---

## 🚀 Arquitectura Tecnológica (Vanguardia de Ingeniería)

El portafolio opera sobre la punta de la lanza del desarrollo web moderno, optimizando al máximo el rendimiento y eliminando dependencias pesadas:

- **Core & Enrutamiento**: [Next.js 16.3 (App Router)](https://nextjs.org) & [React 19.2](https://react.dev) para un renderizado híbrido eficiente.
- **Compilador Avanzado**: Inyección nativa de `babel-plugin-react-compiler` para la optimización automática de renderizados en la memoria RAM, garantizando animaciones a 60 FPS estables.
- **Diseño & Estilos**: [TailwindCSS v4](https://tailwindcss.com) nativo acoplado a un motor PostCSS, logrando un empaquetado de hojas de estilo ultra ligero y un diseño responsivo fluido en pantallas de alta resolución.
- **Ecosistema Relacional**: [Prisma ORM v7.10](https://prisma.io) como motor de abstracción y tipado estricto, sincronizado a un adaptador seguro `@prisma/adapter-pg`.
- **Persistencia en la Nube**: Base de datos relacional indexada en **PostgreSQL** a través de [Supabase](https://supabase.com).
- **Paisaje Sonoro e Interacción**: [GSAP (GreenSock)](https://gsap.com) para físicas de movimiento tradicionales e interactividad táctil auditiva de baja latencia mediante contextos nativos de React (`AudioContext`).

---

## 🏛️ Patrón de Arquitectura Limpia (SOLID & Atómica)

El directorio `src/` aplica una separación estricta de responsabilidades. Los componentes visuales actúan únicamente como contenedores de presentación limpios, delegando el comportamiento lógico y el tráfico asíncrono de red a una capa dedicada de **Custom Hooks**.

```text
📦src
 ┣ 📂app
 ┃ ┣ 📂(admin)        # Zona Privada: Panel de control CRUD & Métricas del Dashboard
 ┃ ┣ 📂(visitor)      # Zona Pública: Interfaz inmersiva RPG del reclutador
 ┃ ┣ 📂api            # Server Route Handlers independientes (API REST relacional)
 ┃ ┗ 📜layout.tsx     # Cascarón inteligente con máscaras de enrutamiento dinámico (usePathname)
 ┣ 📂components
 ┃ ┣ 📂admin          # Formularios de inserción y componentes de analítica (TrafficChart)
 ┃ ┗ 📂sections       # Ventanas modulares de presentación de papel Washi (SOLID)
 ┣ 📂context          # Proveedores globales de estado interactivo (AudioContext)
 ┣ 📂generated        # Modelos estricta y nativamente tipados por el motor de Prisma 7
 ┣ 📂hooks            # Capa Operacional: Custom Hooks desacoplados (Lectura/Escritura independientes)
 ┗ 📂lib              # Clientes de infraestructura nuclear (Instancias centralizadas de db.ts)
```

---

## 🗄️ Diseño del Ecosistema Relacional (Ciberseguridad & Eficiencia)

La base de datos opera bajo un esquema normalizado que optimiza las consultas concurrentes y protege la integridad digital de la marca personal:

### 🔄 Operación de Fila Única (Profile)

Para evitar la duplicación de identidad digital y proteger las rutas de cara al público, la tabla `Profile` se administra mediante operaciones inteligentes de tipo `Upsert` en el servidor con un ID de anclaje de ciberseguridad defensiva (`ADMIN_PROFILE_ID`). Si el perfil no existe se crea; si ya existe, se sobreescribe la misma fila exacta sin mutar los punteros de red.

### 🔗 Relaciones Muchos a Muchos (Many-to-Many)

Los proyectos del portafolio (como **Heroes App**) y sus tecnologías del stack se entrelazan mediante una tabla pivote indexada en Supabase (`_ProjectToSkill`). El backend resuelve el cruce relacional (_JOIN_) e inyecta las colecciones correspondientes mediante la propiedad `include` de Prisma 7 de forma nativa.

### ⚡ Cargas Paralelas Optimizadas (`Promise.all`)

El panel de analíticas del administrador no ejecuta consultas secuenciales lentas que bloqueen el hilo del procesador. Implementa un bloque `Promise.all` para consultar en paralelo los conteos de habilidades, proyectos, educación y tráfico anónimo en un único viaje de red:

```typescript
// Optimización paralela a nivel de servidor en api/analytics/route.ts
const [skillsCount, projectsCount, educationCount, analyticsCount] =
  await Promise.all([
    db.skill.count(),
    db.project.count(),
    db.education.count(),
    db.analytics.count(),
  ]);
```

### 🛡️ Type Guards Defensivos en el Cliente

Los Custom Hooks del visitante (`useVisitorProjects`, `useVisitorSkills`) repudian el uso de tipados laxos como `any`. Implementan capturas de excepciones tipadas estrictamente como `unknown` acopladas a Type Guards de la clase nativa `Error` del navegador. Esto blinda al sistema ante caídas de internet y activa de forma infalible banners elegantes de resguardo offline en el frontend:

```typescript
} catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Error de red al consultar el lienzo relacional.");
  }
}
```

---

## 🎯 Secciones y Módulos de Datos Sincronizados

1. **💻 Proyectos / Obras**: Módulo interactivo con paginación abstracta y modular acoplado a sonidos zen independientes. Consume hilos Muchos a Muchos e incluye condicionales con renderizados de 0 KB extras para enlaces dinámicos de producción mediante iconos SVGs nativos con inteligencia cromática (`fill="currentColor"`).
2. **🛠️ Habilidades / Inventario RPG**: Cuadrícula interactiva que clasifica las tecnologías cargadas desde Supabase (_Frontend, Backend, Cybersecurity & QA_) mediante filtros instantáneos en la memoria RAM del navegador, reduciendo el tráfico de internet.
3. **🎓 Formación Académica**: Línea de tiempo cronológica independiente alimentada desde el backend, aplicando un ordenamiento nativo descendente (`orderBy: { gradYear: "desc" }`) que posiciona automáticamente en la cima las especializaciones de nivel superior (UNAD / SENA).
4. **🏢 Trayectoria Laboral**: Hitos consolidados que documentan más de 12 años de sólida madurez profesional en el área de docencia y administración del **SENA Putumayo** (Instructor de Informática, Asistente Administrativo, Técnico/Asesor de Empleo).
5. **📊 Analíticas de Tráfico**: Un `useEffect` silencioso y perimetral en la vista pública dispara peticiones `POST` que evalúan el `User-Agent` del cliente mediante operadores de coalescencia nula (`?? ""`). Clasifica el tráfico de forma anónima (_Desktop/Mobile_) cumpliendo estrictamente normativas de privacidad Habeas Data / GDPR.

---

## ⚙️ Instalación y Configuración Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local:

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com
   cd varm-portfolio
   ```

2. **Instalar dependencias mediante PNPM** (Gestor de paquetes optimizado):

   ```bash
   pnpm install
   ```

3. **Configurar Variables de Entorno**:
   Crea un archivo `.env` en la raíz del proyecto e Inyecta tus credenciales cifradas de Supabase:

   ```env
   DATABASE_URL="postgresql://postgres:[PASSWORD]@://supabase.com"
   DIRECT_URL="postgresql://postgres:[PASSWORD]@://supabase.com"
   NEXT_PUBLIC_SUPABASE_URL="https://supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="tu-anon-key-cifrada"
   ```

4. **Esculpir y sincronizar las Tablas con Supabase**:
   Ejecuta el push de Prisma para mapear y crear de forma instantánea todo tu esquema relacional en la nube:

   ```bash
   pnpm exec prisma db push --config ./prisma7.config.ts
   ```

5. **Encender el Servidor de Desarrollo**:

   ```bash
   pnpm run dev
   ```

   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el lienzo cobrar vida.

6. **Inspeccionar la base de datos (Gratis y Visual)**:
   Si deseas revisar, limpiar o auditar de forma gráfica tus registros sin abrir consolas pesadas, enciende la suite de Prisma Studio:
   ```bash
   pnpm exec prisma studio --config ./prisma7.config.ts
   ```
   E ingresa a [http://localhost:5555](http://localhost:5555).

---

## 📄 Licencia

Este ecosistema ha sido desarrollado con fines puramente profesionales, de laboratorio y de práctica de alta ingeniería. Todos los derechos reservados.
