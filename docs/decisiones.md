# Decisiones de diseño – Prototipo v1

**Autora:** Korayma Pico · **Issue:** #3 · **Caso:** IHC-01 Tutorías

## Contexto
Persona usuaria: estudiante de primer nivel con poca experiencia digital. Restricción: uso exclusivo de teclado. Fallo base: el horario desaparece al pulsar "Confirmar".

## Decisiones

| # | Decisión | Justificación | Heurística |
|---|----------|---------------|------------|
| 1 | Flujo de 4 pantallas (inicio, formulario, error recuperable, comprobante) | Pasos cortos y predecibles reducen la carga cognitiva de un usuario novato. | H6 Reconocer antes que recordar |
| 2 | Horarios con radios nativos (`<input type="radio">`) | Las flechas ↑ ↓ funcionan sin JavaScript extra y los lectores de pantalla los anuncian bien. | H7 Flexibilidad y eficiencia |
| 3 | Indicador `:focus-visible` de doble anillo (borde oscuro + halo amarillo) | Se ve sobre cualquier fondo y cumple WCAG 2.4.7. | H1 Visibilidad del estado |
| 4 | Objeto `estado` como única fuente de verdad | **Corrige el fallo base:** al confirmar o fallar la validación, la interfaz se vuelve a pintar desde `estado`, por lo que el horario nunca se pierde. | H5 Prevención de errores |
| 5 | Resumen de errores con `role="alert"` y foco automático | La persona sabe qué falló y llega al campo con un solo Enter, sin ratón. | H9 Ayudar a recuperarse de errores |
| 6 | Mensaje que repite el horario elegido en el error | Confirma que no se perdió nada. | H1 |
| 7 | Foco al `<h1>` en cada cambio de pantalla | Evita que el foco se quede en un botón que ya no existe. | H1 |
| 8 | Enlace "Saltar al contenido" | Primer Tab útil para quien navega solo con teclado. | H7 |
| 9 | Objetivos de 52 px, texto de 18 px, contraste alto | Poca experiencia digital y posible fatiga visual. | Accesibilidad |
| 10 | Estado de carga: botón bloqueado con "Confirmando…" y mensaje `role="status"` | Evita doble envío y da feedback inmediato. | H1 Visibilidad del estado |
| 11 | Botón "Cancelar reserva" visible en el formulario | Salida clara sin consecuencias ocultas. | H3 Control y libertad |
| 12 | Textos en lenguaje simple ("Confirmar tutoría", no "Enviar") | El botón dice exactamente qué ocurre. | H2 Lenguaje del usuario |

## Técnica elegida y fidelidad
**Técnica:** prototipo en código (HTML, CSS y JavaScript).
**Por qué:** el riesgo del caso es doble: el horario desaparece al confirmar y todo debe poder hacerse solo con teclado. Ninguno de los dos se puede comprobar con papel ni con clic a clic: hace falta foco real, orden de Tab, flechas en radios y estado en memoria.
**Fidelidad:** alta en interacción (foco, validación, carga, error, éxito, cancelar) y baja en lo visual y en los datos. Los horarios son fijos y el comprobante no se guarda en un servidor.
**Profundidad:** un flujo completo (inicio, formulario, error recuperable, comprobante) con 4 pantallas.

## Cómo probar el prototipo
Abrir `prototipo/v1/index.html` en el navegador y **no usar el ratón**: Tab, Shift+Tab, flechas y Enter.
1. Empezar → elegir un horario → dejar la cédula vacía → Enter en "Confirmar tutoría".
2. Verificar que aparece el resumen de errores **y el horario sigue marcado**.
3. Corregir, confirmar y revisar el comprobante.



