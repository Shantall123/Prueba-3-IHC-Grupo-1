# Diagnóstico heurístico y de experiencia — Caso IHC-01: Tutorías Universitarias

**Autor:** Sandro Fernández · **Grupo 1 · Variante A** · Issue #1
**Rama:** `feature/sandro-diagnostico-atomic`

## 1. Contexto del caso

| Elemento | Descripción |
|---|---|
| Persona usuaria | Estudiante de primer nivel con poca experiencia digital |
| Tarea crítica | Reservar una tutoría y recibir un comprobante de confirmación |
| Restricción | Navegación y operación exclusivamente con teclado (sin ratón) |
| Fallo base | El horario seleccionado desaparece al pulsar **Confirmar** |

> **Nota metodológica:** el diagnóstico se basa en el flujo del sistema de reserva descrito en el caso. Los touchpoints se levantan recorriendo la tarea crítica con teclado y asumiendo la perspectiva de una persona con poca experiencia digital.

## 2. Touchpoints del recorrido (8)

| N.º | Touchpoint | Qué hace la persona (solo teclado) | Observación del diagnóstico |
|---|---|---|---|
| T1 | Pantalla de inicio | Llega y pulsa `Tab` hasta encontrar "Reservar tutoría" | Sin enlace de salto ni indicación clara de dónde está el foco, puede no saber por dónde empezar |
| T2 | Selección de materia y tutor | Navega por las listas con `Tab` y flechas | Debe recordar qué eligió; no hay resumen visible |
| T3 | Consulta de horarios disponibles | Recorre el grupo de horarios | No siempre es obvio que se navega con flechas y no con `Tab` |
| T4 | Selección del horario | Marca un horario con `Espacio` | Poca señal de que la selección quedó registrada |
| T5 | Captura de datos personales | Escribe nombre y correo | Sin indicaciones de formato; riesgo de error al escribir |
| **T6** | **Pulsar Confirmar** | Pulsa `Enter` | **Momento de verdad 1:** el horario seleccionado desaparece |
| T7 | Recuperación tras el fallo | Intenta entender qué pasó y vuelve a elegir | Sin mensaje que explique el problema; debe repetir pasos |
| **T8** | **Comprobante de confirmación** | Lee el resultado de la reserva | **Momento de verdad 2:** necesita certeza de que la tutoría quedó reservada |

## 3. Momentos de verdad

### MV1 — T6: pulsar Confirmar
Es el punto donde la persona ha invertido todo su esfuerzo (materia, tutor, horario, datos) y espera un resultado. Al desaparecer el horario, el sistema contradice lo que la persona acaba de hacer, de modo que no sabe si la reserva se guardó, si falló o si debe empezar de nuevo. Para una persona con poca experiencia digital, que tiende a culparse a sí misma, es el punto de mayor abandono.

### MV2 — T8: recibir el comprobante
Es el cierre de la tarea crítica. Si el comprobante no aparece, o no muestra el horario y los datos reservados, la persona queda sin evidencia de su reserva y debe volver a verificar por otros medios. Este momento define si el sistema se percibe como confiable.

## 4. Heurísticas de Nielsen vulneradas

### Principales

| Heurística | Dónde se vulnera | Evidencia / justificación |
|---|---|---|
| **H1 — Visibilidad del estado del sistema** | T4, T6, T7 | Al pulsar Confirmar el horario desaparece sin ningún mensaje. El sistema no informa si la selección se mantuvo, si la reserva se procesó o si falló. Con teclado, además, el foco puede perderse y la persona no sabe dónde está. |
| **H5 — Prevención de errores** | T3 a T6 | El diseño permite llegar a Confirmar sin que la selección esté protegida. No hay validación previa ni confirmación del horario elegido, así que el error ocurre en el último paso, el más costoso. |

### Secundarias

| Heurística | Dónde se vulnera | Justificación |
|---|---|---|
| H9 — Ayudar a reconocer, diagnosticar y recuperarse de errores | T7 | No hay mensaje en lenguaje claro que explique el fallo ni cómo corregirlo. |
| H3 — Control y libertad del usuario | T7, T8 | Para cambiar de horario hay que repetir el proceso, sin opción de volver conservando los datos (relacionado con la incidencia sorpresa). |
| H6 — Reconocer en lugar de recordar | T2, T5 | No hay resumen de lo elegido; la persona debe recordar materia, tutor y horario. |

## 5. Niveles de diseño emocional (Norman)

### Visceral — primera impresión
- **T1:** una interfaz sin guía visual del foco genera inseguridad. Quien usa solo teclado no ve dónde está.
- **T6–T7:** la desaparición del horario produce sorpresa y desconfianza inmediata.

### Conductual — facilidad de uso
- **T3–T4:** la navegación con flechas dentro del grupo de horarios no es evidente para un usuario novato.
- **T5:** formulario sin ayudas de formato.
- **T6:** el comportamiento del botón Confirmar es incoherente con la acción previa.
- **T7:** la recuperación exige repetir pasos.

### Reflexivo — recuerdo y valoración posterior
- La persona concluye que "el sistema no es confiable" o que "no sirvo para esto". Es probable que evite volver a usar el servicio de tutorías o que prefiera pedir ayuda presencial.
- Si el comprobante (T8) llega con los datos correctos, se recupera parte de la confianza, pero no se borra la mala experiencia del fallo.

## 6. Resumen de la curva emocional inicial

Escala de 1 (muy negativa) a 5 (muy positiva), 3 neutral. Ver `diagramas/curva-antes.png`.

| Touchpoint | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 |
|---|---|---|---|---|---|---|---|---|
| Valoración | 3.0 | 3.5 | 3.0 | 4.0 | 3.5 | **1.0** | 1.5 | 2.5 |

**Lectura:** la experiencia es neutra a moderadamente positiva hasta T5, cae de forma abrupta en T6 (MV1) y se recupera solo de manera parcial en T8 (MV2). Este es el punto que la versión 2 del prototipo debe corregir: la curva "después" debe mostrar que T6 deja de ser un punto crítico.

## 7. Conclusiones y prioridades de mejora

1. **Prioridad alta:** conservar el horario seleccionado al confirmar y mostrarlo en el comprobante (H1, H5).
2. **Prioridad alta:** mostrar mensajes de estado y error asociados al campo, con foco automático al primer error (H1, H9).
3. **Prioridad media:** foco visible en todos los controles y resumen de lo elegido antes de confirmar (H1, H6).
4. **Prioridad media:** permitir cambiar el horario sin perder los datos digitados (H3), conectado con la incidencia sorpresa.
