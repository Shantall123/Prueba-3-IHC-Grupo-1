(function () {
  'use strict';

  var SLOTS = [
    { id: 's1', label: 'Lun 08:00 - 09:00' },
    { id: 's2', label: 'Lun 10:00 - 11:00' },
    { id: 's3', label: 'Mar 09:00 - 10:00', taken: true },
    { id: 's4', label: 'Mié 14:00 - 15:00' },
    { id: 's5', label: 'Jue 11:00 - 12:00' },
    { id: 's6', label: 'Vie 15:00 - 16:00' }
  ];
  var FIELDS = ['nombre', 'correo', 'materia', 'tutor'];
  var STORE_KEY = 'ihc-g1-v2-state';

  // Estado único: sobrevive a confirmar, a cambiar horario y a recargar la página.
  var state = { nombre: '', correo: '', materia: '', tutor: '', horario: '', receipt: null };
  var metrics = { start: Date.now(), errors: 0, tabs: 0, mouse: 0, changes: 0 };

  var $ = function (id) { return document.getElementById(id); };
  var form = $('form');

  function save() {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* sin almacenamiento */ }
  }
  function load() {
    try {
      var raw = sessionStorage.getItem(STORE_KEY);
      if (raw) state = Object.assign(state, JSON.parse(raw));
    } catch (e) { /* ignorar */ }
  }

  function announce(msg) {
    var s = $('status');
    s.textContent = '';
    setTimeout(function () { s.textContent = msg; }, 50);
  }

  function slotLabel(id) {
    for (var i = 0; i < SLOTS.length; i++) if (SLOTS[i].id === id) return SLOTS[i].label;
    return '';
  }

  // ---------- Render de horarios ----------
  function renderSlots() {
    var box = $('slots');
    box.innerHTML = '';
    SLOTS.forEach(function (s) {
      var wrap = document.createElement('div');
      wrap.className = 'slot' + (s.taken ? ' taken' : '');
      var input = document.createElement('input');
      input.type = 'radio';
      input.name = 'horario';
      input.id = 'slot-' + s.id;
      input.value = s.id;
      input.checked = state.horario === s.id;
      if (s.taken) input.disabled = true;
      var label = document.createElement('label');
      label.htmlFor = input.id;
      label.textContent = s.label + (s.taken ? ' (ocupado)' : '');
      wrap.appendChild(input);
      wrap.appendChild(label);
      box.appendChild(wrap);
    });
    updateSelectedLine();
  }

  function updateSelectedLine() {
    $('selected-text').textContent = state.horario ? slotLabel(state.horario) : 'ninguno';
  }

  // ---------- Sincroniza formulario <-> estado ----------
  function fillFormFromState() {
    FIELDS.forEach(function (f) { $(f).value = state[f]; });
    renderSlots();
  }

  function readFormIntoState() {
    FIELDS.forEach(function (f) { state[f] = $(f).value.trim(); });
    var checked = form.querySelector('input[name="horario"]:checked');
    state.horario = checked ? checked.value : state.horario; // nunca se pierde por omisión
    save();
  }

  // ---------- Validación ----------
  function validate() {
    var errs = [];
    if (!state.nombre) errs.push(['nombre', 'Escribe tu nombre completo.']);
    if (!state.correo) errs.push(['correo', 'Escribe tu correo institucional.']);
    else if (!/^[^@\s]+@uta\.edu\.ec$/i.test(state.correo)) errs.push(['correo', 'El correo debe terminar en @uta.edu.ec.']);
    if (!state.materia) errs.push(['materia', 'Selecciona una materia.']);
    if (!state.tutor) errs.push(['tutor', 'Selecciona un tutor.']);
    if (!state.horario) errs.push(['horario', 'Elige un horario con las flechas y Espacio.']);
    return errs;
  }

  function clearErrors() {
    $('errors').hidden = true;
    $('errors').innerHTML = '';
    FIELDS.concat(['horario']).forEach(function (f) {
      var p = $(f + '-err');
      p.hidden = true; p.textContent = '';
    });
    FIELDS.forEach(function (f) { $(f).removeAttribute('aria-invalid'); });
    $('horarios').classList.remove('invalid');
  }

  function showErrors(errs) {
    clearErrors();
    metrics.errors += errs.length;
    var box = $('errors');
    var html = '<strong>Hay ' + errs.length + (errs.length === 1 ? ' campo' : ' campos') + ' por corregir:</strong><ul>';
    errs.forEach(function (e) {
      var p = $(e[0] + '-err');
      p.textContent = e[1]; p.hidden = false;
      if (e[0] === 'horario') $('horarios').classList.add('invalid');
      else $(e[0]).setAttribute('aria-invalid', 'true');
      html += '<li>' + e[1] + '</li>';
    });
    box.innerHTML = html + '</ul>';
    box.hidden = false;
    // foco al primer error; los datos y el horario se conservan
    var first = errs[0][0];
    var target = first === 'horario'
      ? (form.querySelector('input[name="horario"]:checked') || form.querySelector('input[name="horario"]:not(:disabled)'))
      : $(first);
    if (target) target.focus();
    announce('Hay ' + errs.length + ' errores en el formulario.');
  }

  // ---------- Navegación entre pantallas ----------
  function showForm(focusSelector) {
    $('screen-receipt').hidden = true;
    $('screen-form').hidden = false;
    $('st-1').setAttribute('aria-current', 'step');
    $('st-2').removeAttribute('aria-current');
    fillFormFromState();
    clearErrors();
    var t = focusSelector ? document.querySelector(focusSelector) : $('h-form');
    if (t) t.focus();
  }

  function showReceipt() {
    var r = state.receipt;
    $('r-code').textContent = r.code;
    $('r-nombre').textContent = r.nombre;
    $('r-correo').textContent = r.correo;
    $('r-materia').textContent = r.materia;
    $('r-tutor').textContent = r.tutor;
    $('r-horario').textContent = slotLabel(r.horario);
    $('r-fecha').textContent = r.fecha;
    $('screen-form').hidden = true;
    $('screen-receipt').hidden = false;
    $('st-2').setAttribute('aria-current', 'step');
    $('st-1').removeAttribute('aria-current');
    $('h-receipt').focus();
    announce('Reserva confirmada. Código ' + r.code + '. Horario ' + slotLabel(r.horario) + '.');
  }

  function makeCode() {
    return 'TUT-' + Math.random().toString(36).slice(2, 7).toUpperCase();
  }

  // ---------- Eventos ----------
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    readFormIntoState();
    var errs = validate();
    if (errs.length) { showErrors(errs); return; }
    var prevCode = state.receipt && state.receipt.code;
    state.receipt = {
      code: prevCode || makeCode(), // reprogramar conserva el mismo código
      nombre: state.nombre, correo: state.correo, materia: state.materia,
      tutor: state.tutor, horario: state.horario,
      fecha: new Date().toLocaleString('es-EC')
    };
    save();
    showReceipt();
  });

  form.addEventListener('change', function () {
    readFormIntoState();
    updateSelectedLine();
    if (!$('errors').hidden) clearErrors();
  });
  form.addEventListener('input', function (ev) {
    if (ev.target.id && FIELDS.indexOf(ev.target.id) > -1) readFormIntoState();
  });

  $('btn-print').addEventListener('click', function () { window.print(); });

  $('btn-new').addEventListener('click', function () {
    state = { nombre: '', correo: '', materia: '', tutor: '', horario: '', receipt: null };
    save();
    showForm();
  });

  $('btn-clear').addEventListener('click', function () {
    state.nombre = state.correo = state.materia = state.tutor = state.horario = '';
    save();
    fillFormFromState();
    clearErrors();
    $('nombre').focus();
    announce('Formulario borrado.');
  });

  // ---------- Panel del observador ----------
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Tab') metrics.tabs++;
    if (ev.altKey && (ev.key === 'm' || ev.key === 'M')) {
      ev.preventDefault();
      $('observer').hidden = !$('observer').hidden;
    }
  });
  document.addEventListener('mousedown', function () { metrics.mouse++; });

  function renderMetrics() {
    $('o-time').textContent = ((Date.now() - metrics.start) / 1000).toFixed(1) + ' s';
    $('o-errors').textContent = metrics.errors;
    $('o-tabs').textContent = metrics.tabs;
    $('o-mouse').textContent = metrics.mouse;
  }
  setInterval(function () { if (!$('observer').hidden) renderMetrics(); }, 200);

  $('o-reset').addEventListener('click', function () {
    metrics = { start: Date.now(), errors: 0, tabs: 0, mouse: 0, changes: 0 };
    renderMetrics();
  });

  // ---------- Inicio ----------
  load();
  if (state.receipt) showReceipt(); else showForm('#nombre');
})();
