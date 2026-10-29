# Matriz de Trazabilidad Extremo a Extremo

**Proyecto:** Sistema de Tutorías IHC-01  
**Responsable:** Shantall Aguirre

| ID Requisito | Descripción Sintética                  | Pantalla / Vista        | Paso del User Flow     | Componente Atómico Asociado                           | Wireframe Asociado         | Criterio de Verificación                                                    |
| :----------- | :------------------------------------- | :---------------------- | :--------------------- | :---------------------------------------------------- | :------------------------- | :-------------------------------------------------------------------------- |
| **RF-01**    | Operación 100% mediante teclado        | P-01, P-02, P-03, P-04  | Pasos B, C, D, H, J, P | `Atom_FocusRing`, `Atom_KeyButton`, `Atom_InputField` | 01, 02, 03, 04             | Secuencia lógica con `Tab` sin uso de ratón; foco visual activo.            |
| **RF-02**    | Selección y persistencia del horario   | P-02: Formulario        | Pasos D, E, G          | `Molecule_TimeSlotCard`, `Atom_RadioBadge`            | 02-formulario-horarios.png | El horario seleccionado no se borra al enviar o tabular.                    |
| **RF-03**    | Validación y error contextual          | P-02 / Modal            | Pasos E, F             | `Atom_InlineErrorText`, `Molecule_AlertBanner`        | 03-error-confirmacion.png  | El mensaje se asocia al input y el foco viaja al error sin resetear campos. |
| **RF-04**    | Resumen y validación pre-envío         | P-03: Resumen           | Pasos H, I             | `Organism_SummaryCard`, `Molecule_ButtonGroup`        | 02-formulario-horarios.png | Presenta fecha, docente y horario fijado para confirmación final.           |
| **RF-05**    | Emisión y descarga de comprobante      | P-04: Confirmación      | Pasos O, P             | `Organism_ReceiptBox`, `Atom_DownloadButton`          | 04-comprobante.png         | Muestra código único y permite descarga con tecla `Enter`.                  |
| **RF-06**    | Modificar horario sin pérdida de datos | P-03 $\rightarrow$ P-02 | Pasos J, K             | `Atom_BackButton`, `Atom_PreservedStateForm`          | 02-formulario-horarios.png | Al volver atrás, los inputs de texto retienen su contenido íntegro.         |
