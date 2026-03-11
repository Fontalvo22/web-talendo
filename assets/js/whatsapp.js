/* ===== WhatsApp Widget Script ===== */
(function () {
   'use strict';

   // ── Configuration ───────────────────────────────────────────────
   // IMPORTANT: Replace with the real business WhatsApp number before deploying.
   // Format: country code + number, no + sign or spaces (e.g. '34612345678').
   var WA_PHONE   = '34600000000';
   var WA_MESSAGE = '¡Hola! Estoy interesado en conocer más sobre los servicios de Talendo. ¿Podrían darme más información?';

   // ── Helpers ──────────────────────────────────────────────────────
   function pad(n) { return n < 10 ? '0' + n : n; }

   function currentTime() {
      var d = new Date();
      return pad(d.getHours()) + ':' + pad(d.getMinutes());
   }

   function buildWhatsAppUrl() {
      return 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(WA_MESSAGE);
   }

   // ── WhatsApp SVG icon ─────────────────────────────────────────────
   var WA_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">'
      + '<path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>'
      + '</svg>';

   // ── Build DOM ─────────────────────────────────────────────────────
   function buildWidget() {
      var waUrl = buildWhatsAppUrl();

      var widget = document.createElement('div');
      widget.className = 'wa-widget';
      widget.setAttribute('aria-label', 'Contactar por WhatsApp');

      widget.innerHTML =
         // Chat window
         '<div class="wa-chat" id="wa-chat" role="dialog" aria-label="Chat de WhatsApp" aria-hidden="true">'
         + '  <div class="wa-chat__header">'
         + '    <div class="wa-chat__avatar">' + WA_SVG + '</div>'
         + '    <div class="wa-chat__info">'
         + '      <p class="wa-chat__name">Talendo</p>'
         + '      <p class="wa-chat__status">Normalmente responde en minutos</p>'
         + '    </div>'
         + '    <button class="wa-chat__close" id="wa-close" aria-label="Cerrar chat">'
         + '      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"'
         + '           stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">'
         + '        <line x1="18" y1="6" x2="6" y2="18"></line>'
         + '        <line x1="6" y1="6" x2="18" y2="18"></line>'
         + '      </svg>'
         + '    </button>'
         + '  </div>'
         + '  <div class="wa-chat__body">'
         + '    <div class="wa-chat__bubble">'
         + '      ' + WA_MESSAGE
         + '      <div class="wa-chat__time" id="wa-time">' + currentTime() + '</div>'
         + '    </div>'
         + '  </div>'
         + '  <div class="wa-chat__footer">'
         + '    <a class="wa-chat__cta" id="wa-cta" href="' + waUrl + '" target="_blank" rel="noopener noreferrer">'
         + '      ' + WA_SVG
         + '      Contactar'
         + '    </a>'
         + '  </div>'
         + '</div>'
         // Floating button
         + '<button class="wa-btn" id="wa-btn" aria-label="Abrir chat de WhatsApp" title="Contáctanos por WhatsApp">'
         + WA_SVG
         + '</button>';

      document.body.appendChild(widget);

      // Toggle chat on button click
      document.getElementById('wa-btn').addEventListener('click', function () {
         var chat = document.getElementById('wa-chat');
         var isOpen = chat.classList.contains('is-open');
         chat.classList.toggle('is-open', !isOpen);
         chat.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
         // Refresh time each time chat opens
         if (!isOpen) {
            document.getElementById('wa-time').textContent = currentTime();
         }
      });

      // Close chat on close button
      document.getElementById('wa-close').addEventListener('click', function (e) {
         e.stopPropagation();
         var chat = document.getElementById('wa-chat');
         chat.classList.remove('is-open');
         chat.setAttribute('aria-hidden', 'true');
      });

      // Close chat when clicking outside
      document.addEventListener('click', function (e) {
         var widget = document.querySelector('.wa-widget');
         var chat   = document.getElementById('wa-chat');
         if (chat && chat.classList.contains('is-open') && !widget.contains(e.target)) {
            chat.classList.remove('is-open');
            chat.setAttribute('aria-hidden', 'true');
         }
      });
   }

   // ── Init ──────────────────────────────────────────────────────────
   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', buildWidget);
   } else {
      buildWidget();
   }
}());
