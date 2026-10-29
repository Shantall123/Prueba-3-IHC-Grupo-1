# Prueba-3-IHC-Grupo-1

**Universidad Técnica de Ambato · FISEI · Carrera de Software**
Prueba Práctica Integradora de IHC · Grupo 1 · Variante A · Caso **IHC-01: Tutorías Universitarias**

## Caso asignado

| Elemento | Descripción |
|---|---|
| Persona usuaria | Estudiante de primer nivel con poca experiencia digital |
| Tarea crítica | Reservar una tutoría y recibir un comprobante de confirmación |
| Restricción | Navegación y operación **exclusivamente con teclado** (sin ratón) |
| Fallo base | El horario seleccionado desaparece al pulsar *Confirmar* |
| Incidencia sorpresa | Permitir **cambiar el horario sin perder los datos** ya digitados |

## Integrantes y roles

| Integrante | Rol | Entregables | Issues |
|---|---|---|---|
| Sandro Fernández | Diagnóstico heurístico y Atomic Design | `docs/diagnostico.md`, `diagramas/curva-antes.png`, `docs/componentes.md` | [#1](../../issues/1) |
| Shantall Aguirre | Arquitectura, requisitos y trazabilidad | `docs/requisitos.md`, `diagramas/sitemap.png`, `diagramas/user-flow.png`, `docs/trazabilidad.md` | [#2](../../issues/2) |
| Korayma Pico | Diseño UI y accesibilidad (prototipo v1) | `wireframes/`, `prototipo/v1/`, `docs/decisiones.md` | [#3](../../issues/3) |
| Juan | Evaluación, prototipo v2 e incidencia sorpresa | `README.md`, `pruebas/sesion.md`, `evidencias/`, `prototipo/v2/`, `docs/defensa.md` | [#4](../../issues/4), [#5](../../issues/5) |

## Estructura del repositorio

```
.
├── README.md
├── docs/            diagnóstico, componentes, requisitos, trazabilidad, decisiones, defensa
├── diagramas/       curva emocional, sitemap, user flow
├── wireframes/      4 pantallas Lo-Fi
├── prototipo/
│   ├── v1/          prototipo accesible (Korayma)
│   └── v2/          prototipo corregido + incidencia sorpresa (Juan)
├── pruebas/         sesion.md (prueba observada)
└── evidencias/      registros de la prueba
```

## Cómo ejecutar el prototipo

El prototipo es HTML, CSS y JavaScript puros, sin dependencias ni compilación.

**Opción 1: abrir el archivo**

```bash
# Windows
start prototipo/v2/index.html
# macOS
open prototipo/v2/index.html
# Linux
xdg-open prototipo/v2/index.html
```

**Opción 2: servidor local**

```bash
cd prototipo/v2
python -m http.server 8080
# abrir http://localhost:8080
```

Para la versión 1 usar la misma instrucción dentro de `prototipo/v1/`.

### Uso solo con teclado

| Tecla | Acción |
|---|---|
| `Tab` / `Shift+Tab` | Avanzar / retroceder entre campos |
| `↑` `↓` `←` `→` | Elegir horario dentro del grupo de horarios |
| `Espacio` | Seleccionar horario |
| `Enter` | Confirmar la reserva / activar botón |
| `Alt+M` | Mostrar u ocultar el panel de medición del observador |

El panel de medición (modo observación) registra tiempo y errores durante la prueba y alimenta `pruebas/sesion.md`.

## Qué corrige la versión 2

1. **Fallo base:** el horario elegido ya no desaparece al confirmar; permanece seleccionado y aparece en el comprobante.
2. **Incidencia sorpresa:** desde el comprobante o antes de confirmar, el botón *Cambiar horario* regresa al formulario conservando nombre, correo, materia y tutor, y recupera el horario anterior marcado.
3. Mensajes de error asociados al campo, con foco automático al primer error (`aria-live`).
4. Foco visible (`:focus-visible`) en todos los controles.

Detalle y justificación en [`docs/defensa.md`](docs/defensa.md); resultados de la prueba en [`pruebas/sesion.md`](pruebas/sesion.md).

## Flujo de trabajo en Git

- Una rama por integrante (`feature/<nombre>-...`) creada desde `origin/main`.
- Un Pull Request por integrante hacia `main`, con revisor obligatorio (matriz cruzada: #1→Juan, #2→Korayma, #3→Shantall, #4→Sandro).
- Commits con formato *Conventional Commits* referenciando el issue (`feat(...)`, `test(...)`, `fix(...)`).

## Issues

- [#1](../../issues/1) Fallo del horario y heurísticas
- [#2](../../issues/2) Flujos y trazabilidad
- [#3](../../issues/3) Accesibilidad por teclado
- [#4](../../issues/4) Pruebas con usuarios y prototipo v2
- [#5](../../issues/5) Incidencia sorpresa: cambiar horario sin perder datos
