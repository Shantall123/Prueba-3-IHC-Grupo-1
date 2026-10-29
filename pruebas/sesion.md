# Sesión de prueba observada

> Prueba de observación con un participante **externo al grupo**, usando únicamente teclado.
> Los campos marcados `[COMPLETAR]` se llenan durante/después de la sesión real con los datos observados. No se deben inventar valores.

## 1. Datos de la sesión

| Campo | Valor |
|---|---|
| Fecha | [COMPLETAR] |
| Observador / facilitador | Juan |
| Participante | [COMPLETAR: código P1, carrera y nivel; sin nombre completo] |
| Perfil | Estudiante con poca experiencia digital (coincide con la persona usuaria del caso IHC-01) |
| Dispositivo y navegador | [COMPLETAR] |
| Ratón | Desconectado / no permitido |
| Prototipos probados | v1 (línea base, con el fallo) y v2 (corregido) |

## 2. Guion

1. Presentar el propósito: se evalúa el sistema, no a la persona. Consentimiento verbal.
2. Entregar la tarea sin pistas: *"Reserva una tutoría de Programación I con el Ing. Andrade el jueves y consigue tu comprobante."*
3. Pedir pensar en voz alta. El observador no ayuda salvo bloqueo mayor a 60 s (se anota como asistencia).
4. Abrir el panel de medición con `Alt+M` y anotar los valores al terminar.
5. Repetir la misma tarea en v2.
6. Cierre: 3 preguntas (qué fue lo más difícil, qué cambiarías, ¿confiarías en el comprobante?).

## 3. Resultados medidos

Valores tomados del panel de medición (`Alt+M`) y de cronómetro/observación directa.

| Métrica | v1 (antes) | v2 (después) |
|---|---|---|
| Tiempo hasta obtener comprobante | [COMPLETAR] s | [COMPLETAR] s |
| Errores de validación | [COMPLETAR] | [COMPLETAR] |
| Pulsaciones de `Tab` | [COMPLETAR] | [COMPLETAR] |
| Clics de ratón (debe ser 0) | [COMPLETAR] | [COMPLETAR] |
| ¿Completó la tarea sin ayuda? | [COMPLETAR] | [COMPLETAR] |
| ¿Se perdió el horario al confirmar? | [COMPLETAR: sí/no] | [COMPLETAR: sí/no] |
| Asistencias del observador | [COMPLETAR] | [COMPLETAR] |

## 4. Registro de incidentes

| Min:seg | Qué ocurrió | Gravedad (0–4) | Heurística |
|---|---|---|---|
| [COMPLETAR] | [COMPLETAR] | [COMPLETAR] | [COMPLETAR] |

## 5. Cita textual del participante

> "[COMPLETAR: frase literal dicha por el participante]"

## 6. Hallazgos y acción tomada

| Hallazgo | Evidencia | Corrección en v2 |
|---|---|---|
| El horario seleccionado desaparece al confirmar | v1, intento [COMPLETAR] | El horario vive en un estado único que no se reinicia al enviar (`readFormIntoState()` en `prototipo/v2/app.js`) y se muestra en el comprobante. |
| Errores sin indicar el campo | [COMPLETAR] | Mensaje junto a cada campo, resumen con `role="alert"` y foco al primer error. |
| Foco poco visible con teclado | [COMPLETAR] | `:focus-visible` con contorno de 4 px en todos los controles. |

## 7. Cumplimiento de la restricción

- [ ] Ninguna acción requirió ratón (clics = 0 en el panel).
- [ ] Todo el flujo se completó con `Tab`, flechas, `Espacio` y `Enter`.

## 8. Incidencia sorpresa (min 100)

Se pidió al participante que, ya con el comprobante, cambiara el horario.

| Métrica | Valor |
|---|---|
| Datos conservados al cambiar horario (nombre, correo, materia, tutor) | [COMPLETAR: sí/no] |
| Tiempo para cambiar horario | [COMPLETAR] s |
| Datos que hubo que volver a digitar | [COMPLETAR] |

Evidencia: ver `evidencias/`.
