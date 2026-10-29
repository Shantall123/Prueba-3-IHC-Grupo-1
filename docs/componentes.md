# Catálogo de componentes — Atomic Design

**Autor:** Sandro Fernández · **Grupo 1 · Variante A** · Issue #1 · Caso IHC-01: Tutorías Universitarias

Todos los componentes se diseñan para **uso exclusivo con teclado** y para una persona usuaria con poca experiencia digital. Cada componente indica su comportamiento de teclado y su aporte a la corrección del fallo (H1, H5).

## 1. Jerarquía general

```
Átomos ──► Moléculas ──► Organismos ──► Plantillas / Pantallas
 label       campo de       formulario     Pantalla 02: formulario
 input       formulario     de reserva     Pantalla 03: error
 botón       opción de      comprobante    Pantalla 04: comprobante
 mensaje     horario        modal
             grupo de
             horarios
```

## 2. Átomos

| ID | Átomo | Descripción | Teclado y accesibilidad |
|---|---|---|---|
| A1 | Etiqueta (`label`) | Texto visible asociado a cada control | Asociada con `for`/`id`; nunca solo un placeholder |
| A2 | Campo de texto | Entrada de nombre | `Tab` para entrar; `autocomplete="name"` |
| A3 | Campo de correo | Entrada de correo institucional | `type="email"`; `autocomplete="email"` |
| A4 | Lista desplegable | Materia y tutor | `select` nativo: flechas para elegir, `Tab` para salir |
| A5 | Opción de horario (radio) | Control de selección única | `Espacio` selecciona; estado marcado visible |
| A6 | Botón primario | "Confirmar reserva" | `Enter` o `Espacio`; `:focus-visible` con contorno alto contraste |
| A7 | Botón secundario | "Cambiar horario" | Mismas reglas; claramente distinto del primario |
| A8 | Mensaje de error | Texto de error en lenguaje claro | `role="alert"`/`aria-live`; enlazado con `aria-describedby` |
| A9 | Mensaje de ayuda | Pista de formato bajo el campo | Enlazado con `aria-describedby` |
| A10 | Icono de estado | Éxito / error / información | Acompañado de texto; no depende solo del color |
| A11 | Encabezado | Título de pantalla (`h1`/`h2`) | Estructura jerárquica; recibe el foco al cambiar de pantalla |
| A12 | Enlace de salto | "Saltar al contenido" | Primer elemento al pulsar `Tab` |

## 3. Moléculas

| ID | Molécula | Compuesta por | Función | Comportamiento |
|---|---|---|---|---|
| M1 | Campo de formulario | A1 + A2/A3 + A9 + A8 | Capturar un dato con ayuda y error asociados | El error aparece junto al campo y el foco va al primer campo con error |
| M2 | Selector con etiqueta | A1 + A4 | Elegir materia o tutor | Mantiene el valor elegido ante cualquier error |
| M3 | Opción de horario | A5 + A1 + A10 | Una franja horaria seleccionable | El estado "seleccionado" se ve y se anuncia |
| M4 | Grupo de horarios | Varias M3 dentro de `fieldset` + `legend` | Elegir **un** horario | Flechas ↑ ↓ ← → mueven entre opciones; `Espacio` selecciona; **la selección persiste al confirmar** |
| M5 | Resumen de reserva | A11 + A1 + texto | Mostrar materia, tutor, horario y datos elegidos | Visible antes de confirmar y en el comprobante (H6) |
| M6 | Barra de acciones | A6 + A7 | Confirmar o cambiar horario | Orden lógico de `Tab`: Cambiar horario, luego Confirmar |
| M7 | Bloque de estado | A10 + A8/texto | Informar éxito o fallo | Se anuncia con `aria-live` (H1) |

## 4. Organismos

### O1 — Formulario de reserva
- **Compuesto por:** M2 (materia, tutor) + M4 (horarios) + M1 (nombre, correo) + M6 (acciones).
- **Responsabilidad:** concentrar toda la información de la tarea crítica.
- **Reglas clave:**
  - La selección de horario **no se borra** al validar ni al confirmar (corrección del fallo base, H1/H5).
  - Validación antes de enviar; el foco pasa al primer error.
  - Cambiar horario conserva nombre, correo, materia y tutor (incidencia sorpresa, H3).

### O2 — Comprobante de confirmación
- **Compuesto por:** A11 + M7 + M5 + A7.
- **Responsabilidad:** dar certeza de que la reserva quedó hecha (Momento de verdad 2).
- **Contenido mínimo:** materia, tutor, **horario seleccionado**, nombre y correo, y un código o fecha de emisión.
- **Teclado:** al cargar, el foco va al encabezado; el botón "Cambiar horario" está disponible.

### O3 — Modal de confirmación o error
- **Compuesto por:** A11 + M7 + A6/A7.
- **Responsabilidad:** informar un error recuperable o pedir una confirmación crítica sin perder el contexto.
- **Reglas de teclado (patrón de diálogo accesible):**
  - Al abrir, el foco entra al modal (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`).
  - El foco queda **atrapado** dentro con `Tab` / `Shift+Tab`.
  - `Esc` lo cierra y el foco **regresa** al elemento que lo abrió.
  - Los datos del formulario permanecen intactos.

### O4 — Cabecera y navegación
- **Compuesto por:** A12 + A11 + enlaces de navegación.
- **Responsabilidad:** orientar a la persona y permitir saltar al contenido principal.

## 5. Plantillas / pantallas

| Pantalla | Wireframe | Organismos |
|---|---|---|
| Inicio | `01-inicio.png` | O4 |
| Formulario de horarios | `02-formulario-horarios.png` | O4 + O1 |
| Error de confirmación | `03-error-confirmacion.png` | O4 + O1 + O3 |
| Comprobante | `04-comprobante.png` | O4 + O2 |

## 6. Trazabilidad con el diagnóstico

| Problema (diagnostico.md) | Heurística | Componente que lo resuelve |
|---|---|---|
| El horario desaparece al confirmar (MV1) | H1, H5 | M4 (persistencia), O1 |
| Sin mensajes de estado ni error | H1, H9 | A8, M7, O3 |
| Foco poco visible | H1 | A6 y A7 con `:focus-visible` |
| Sin resumen de lo elegido | H6 | M5 |
| No se puede cambiar horario sin perder datos | H3 | M6, O1, O2 |
| Comprobante sin certeza (MV2) | H1 | O2 |

## 7. Criterios de calidad comunes

- Contraste de texto y foco suficiente (mínimo 4.5:1 para texto).
- Ningún componente depende solo del color para comunicar estado.
- Orden de tabulación coherente con el orden visual.
- Mensajes en lenguaje claro, sin jerga técnica.
