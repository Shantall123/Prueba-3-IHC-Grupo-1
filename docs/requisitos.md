# Especificación de Requisitos de Software y UX

**Sistema:** Sistema Integrado de Tutorías Universitarias  
**Caso:** IHC-01 · Tutorías  
**Persona Usuaria:** Estudiante de primer nivel con poca experiencia digital  
**Responsable:** Shantall Aguirre

---

## 1. Alcance y Contexto del Problema

El sistema permite a un estudiante novato agendar una tutoría académica y obtener un comprobante digital verificable. Para dar cumplimiento a las restricciones del caso, la interfaz debe operar al 100% mediante teclado y garantizar la persistencia del estado seleccionado para evitar el fallo donde el horario desaparecía al pulsar confirmar.

---

## 2. Requisitos Funcionales y UX Observables

### RF-01: Navegación y Operación Exclusiva por Teclado

- **Descripción:** Toda la interfaz debe ser operable secuencialmente mediante las teclas `Tab`, `Shift + Tab`, `Enter`, `Espacio` y flechas direccionales, sin requerir el uso de ratón en ningún punto del flujo.
- **Criterio de Aceptación:** Cada elemento interactivo posee un indicador de foco visible (`:focus-visible`) con contraste no menor a 4.5:1. No existen trampas de foco en modales ni campos de formulario.

### RF-02: Selección y Persistencia del Bloque Horario

- **Descripción:** Al navegar por la lista de horarios disponibles y seleccionar uno mediante teclado, la interfaz debe marcarlo visualmente como activo y conservar dicho valor en el estado de la sesión local.
- **Criterio de Aceptación:** Al presionar el botón de confirmación o enviar el formulario, el horario previamente seleccionado se mantiene visible en pantalla y no se borra ni se deselecciona.

### RF-03: Validación Contextual y Prevención de Errores

- **Descripción:** Si el usuario intenta avanzar sin haber seleccionado docente, materia o bloque horario, el sistema debe bloquear el envío y anunciar el error en el campo exacto sin limpiar los datos ya digitados.
- **Criterio de Aceptación:** El mensaje de error aparece inmediatamente bajo el campo omitido, asocia su identificador mediante `aria-describedby` y el foco se traslada al primer elemento con error.

### RF-04: Resumen de Reserva Pre-Confirmación

- **Descripción:** Antes del envío definitivo, la interfaz debe presentar una vista resumen con la materia, nombre del docente, fecha, bloque horario y motivo digitado, permitiendo al estudiante validar su solicitud.
- **Criterio de Aceptación:** Los datos se presentan en una tarjeta de solo lectura accesible por teclado, con botones claros para "Confirmar Reserva" y "Modificar Horario".

### RF-05: Generación y Descarga de Comprobante Verificable

- **Descripción:** Una vez confirmada con éxito la reserva, el sistema debe presentar en pantalla un comprobante con código único de reserva, resumen de la cita y la opción accesible de descargar/imprimir comprobante.
- **Criterio de Aceptación:** La pantalla de éxito muestra el código de cita, fecha/hora y permite activar la descarga del comprobante mediante `Enter` sobre el botón principal.

### RF-06: Recuperación y Modificación sin Pérdida de Datos (Incidencia Sorpresa)

- **Descripción:** El usuario debe poder regresar desde el resumen o estado de confirmación a modificar el horario asignado sin que se borre el formulario (nombre, paralelo o motivo de consulta).
- **Criterio de Aceptación:** Al activar el control "Modificar Horario", el flujo retorna a la selección de horario manteniendo precargados los campos de texto previamente completados.
