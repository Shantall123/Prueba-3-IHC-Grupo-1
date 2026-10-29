# Defensa individual · Juan

Rol: evaluación con usuarios, prototipo v2 e incidencia sorpresa (Issues #4 y #5).

## 1. Qué hice

| Entregable | Archivo |
|---|---|
| README con integrantes, roles, ejecución e issues | `README.md` |
| Prueba observada con participante externo (solo teclado) | `pruebas/sesion.md`, `evidencias/` |
| Prototipo v2 con el fallo corregido | `prototipo/v2/` |
| Incidencia sorpresa: cambiar horario sin perder datos | `prototipo/v2/` (Issue #5) |

## 2. Causa del fallo base y su corrección

**Síntoma:** al pulsar *Confirmar* el horario seleccionado desaparece.

**Causa (patrón típico):** el estado del horario solo existía en el DOM y el envío del formulario re-renderizaba la pantalla o recargaba la página, destruyendo la selección antes de mostrarla.

**Corrección en v2:**

- Existe un **estado único** (`state`) que contiene datos personales, horario y comprobante.
- Cada `change`/`input` del formulario copia su valor al estado (`readFormIntoState`), y el estado se guarda en `sessionStorage`.
- Al confirmar se llama `preventDefault()`, se valida y el comprobante se construye **desde el estado**, no desde el DOM.
- `readFormIntoState` nunca borra el horario si el DOM no lo informa (`checked ? checked.value : state.horario`).
- Si falla la validación, el formulario no se re-renderiza: los datos y el horario siguen intactos.

## 3. Incidencia sorpresa (Issue #5, min 100)

**Requisito:** poder cambiar el horario sin volver a digitar nada.

**Solución:**

1. En el comprobante se añadió el botón **Cambiar horario**.
2. Al activarlo, `showForm()` vuelve al formulario y `fillFormFromState()` rellena nombre, correo, materia y tutor, y marca de nuevo el horario anterior.
3. El foco va directamente al horario marcado, de modo que el usuario solo usa las flechas y `Enter`.
4. El código del comprobante se conserva (es la misma reserva, reprogramada), y se anuncia con `aria-live` que los datos se conservaron.

**Por qué esta decisión:** no se creó una pantalla nueva ni un modal; se reutiliza el formulario, que ya es accesible, para reducir carga cognitiva y riesgo de errores (H3 control y libertad, H7 flexibilidad, H5 prevención de errores).

## 4. Heurísticas atendidas

| Heurística | Cómo se atiende en v2 |
|---|---|
| H1 Visibilidad del estado | Línea "Horario elegido", indicador de pasos, comprobante con código |
| H3 Control y libertad | *Cambiar horario*, *Borrar formulario*, *Nueva reserva* |
| H5 Prevención de errores | Horarios ocupados deshabilitados, validación de correo `@uta.edu.ec` |
| H9 Recuperación de errores | Resumen de errores, mensaje por campo, foco al primer error, datos no se pierden |

## 5. Accesibilidad por teclado

- Orden de tabulación lógico; enlace *Saltar al contenido*.
- Horarios como grupo `radio` dentro de `fieldset/legend`: se navegan con flechas.
- `:focus-visible` con contorno de 4 px y alto contraste.
- Mensajes dinámicos con `role="alert"` y `aria-live`.
- Sin dependencia del ratón: el panel `Alt+M` cuenta clics para comprobarlo.

## 6. Prueba con usuario

Los datos reales (tiempos, errores, cita textual) están en `pruebas/sesion.md`. Mi argumento en la defensa se apoya solo en lo medido ahí; las mejoras de v2 se contrastan contra v1 con la misma tarea.

## 7. Revisión del PR ajeno

Revisión del PR #1 de Sandro: verificar que cada heurística (H1, H5) esté ligada a un touchpoint concreto y que la curva *antes* sea coherente con los incidentes observados en la prueba.

## 8. Limitaciones y trabajo futuro

- Persistencia en `sessionStorage`: se pierde al cerrar la pestaña; en un sistema real iría al servidor.
- La disponibilidad de horarios es simulada.
- Falta prueba con lector de pantalla real.
- Muestra de un solo participante: los resultados son cualitativos, no estadísticos.

## 9. Preguntas probables

**¿Por qué sessionStorage y no una variable?** La variable cubre confirmar y cambiar horario; sessionStorage además sobrevive a un refresco accidental.

**¿Qué pasa si el horario elegido se ocupa mientras se cambia?** En esta versión los horarios ocupados están deshabilitados, así que no se puede elegir; con backend se re-validaría al confirmar.

**¿Cómo sabes que funciona sin ratón?** El contador de clics del panel `Alt+M` debe quedar en 0 durante la prueba.
