/* ================================================================
   CASA MARANTA – Guest Guide App
   app.js – Language, Navigation, Content, Maps, Search
================================================================ */

// ─────────────────────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────────────────────
(function () {
  if (sessionStorage.getItem('cm_auth') === '1') {
    document.getElementById('login-overlay').classList.add('hidden');
  }
  document.getElementById('login-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') checkLogin();
  });
})();

function checkLogin() {
  const val = document.getElementById('login-input').value;
  if (val === 'larasiga585') {
    sessionStorage.setItem('cm_auth', '1');
    document.getElementById('login-overlay').classList.add('hidden');
  } else {
    const err = document.getElementById('login-error');
    err.textContent = 'Falsches Passwort / Wrong password';
    document.getElementById('login-input').value = '';
    document.getElementById('login-input').focus();
  }
}

// ─────────────────────────────────────────────────────────────
// LANGUAGE
// ─────────────────────────────────────────────────────────────
let currentLang = 'de';

document.addEventListener('DOMContentLoaded', () => {
  setLang(localStorage.getItem('lang') || 'de');
});

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-de]').forEach(el => {
    el.textContent = lang === 'de' ? el.dataset.de : el.dataset.en;
  });
  document.querySelectorAll('#lang-de, #lang-en').forEach(btn => btn.classList.remove('active'));
  document.getElementById('lang-' + lang).classList.add('active');
  const si = document.getElementById('search-input');
  if (si) si.placeholder = lang === 'de' ? si.dataset.placeholderDe : si.dataset.placeholderEn;
  // Re-render open detail if any
  if (currentDetailKey) showDetail(currentDetailKey);
}

function t(de, en) { return currentLang === 'de' ? de : en; }

// ─────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────
let previousScreen = 'screen-info';
let currentDetailKey = null;

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(id);
  screen.classList.add('active');
  screen.scrollTop = 0;
  if (id !== 'screen-detail') currentDetailKey = null;
  replayPlates(screen);
  if (id === 'screen-home') startJourney();
  else stopJourney();
}

// The plates settle onto the mast each time the signpost is opened.
function replayPlates(root) {
  if (!root) return;
  const plates = root.querySelectorAll('.signpost .plate, .modal-list .plate');
  if (!plates.length) return;
  plates.forEach(p => {
    p.style.animation = 'none';
    void p.offsetWidth;
    p.style.animation = '';
  });
}

function setNavActive(id) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showDetail(key) {
  currentDetailKey = key;
  const cfg = DETAIL_PAGES[key];
  if (!cfg) return;
  document.getElementById('detail-title').textContent = cfg.title();
  document.getElementById('detail-content').innerHTML = cfg.render();
  document.getElementById('screen-detail').scrollTop = 0;
  if (key === 'checkout') {
    const saved = JSON.parse(localStorage.getItem('cm_checkout_checks') || '{}');
    document.querySelectorAll('.checklist-cb').forEach(cb => {
      if (saved[cb.id]) cb.checked = true;
      cb.addEventListener('change', () => {
        const s = JSON.parse(localStorage.getItem('cm_checkout_checks') || '{}');
        s[cb.id] = cb.checked;
        localStorage.setItem('cm_checkout_checks', JSON.stringify(s));
      });
    });
  }
  document.getElementById('detail-back-btn').onclick = cfg.backToDetail
    ? () => showDetail(cfg.backToDetail)
    : cfg.backTo
      ? () => { showScreen(cfg.backTo); cfg.backNavId && setNavActive(cfg.backNavId); }
      : hideDetail;
  showScreen('screen-detail');
}

function hideDetail() {
  showScreen(previousScreen);
}

// When local area guide card is clicked, show modal
// Ausflugstipps is a destination, not an interruption: one route, one schema.
function showLocalGuideModal() {
  showDetail('localguide');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
  const bd = document.getElementById('modal-backdrop');
  if (bd) bd.classList.add('hidden');
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
  const bd = document.getElementById('modal-backdrop');
  if (bd) bd.classList.add('hidden');
}

// ─────────────────────────────────────────────────────────────
// PLACE CARDS (collapsible)
// ─────────────────────────────────────────────────────────────
function togglePlace(id) {
  const body = document.getElementById('body-' + id);
  const head = document.getElementById('head-' + id);
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  if (head) {
    head.classList.toggle('is-open', !isOpen);
    head.setAttribute('aria-expanded', String(!isOpen));
  }
}

// ─────────────────────────────────────────────────────────────
// CONTENT DATA
// ─────────────────────────────────────────────────────────────

const DETAIL_PAGES = {

  welcome: {
    title: () => t('Willkommen', 'Welcome'),
    backTo: 'screen-info',
    backNavId: 'nav-info',
    render: () => `
      <div class="detail-section">
        <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/i9d2beec054121602/version/1776072036/image.jpg" alt="Christine &amp; Markus" class="welcome-photo" />
        <div class="detail-body">
          ${t(`
            <p>Wir sind Christine und Markus – zusammen mit unseren Töchtern Nora und Olivia – und freuen uns sehr, Sie in unserem Ferienhaus begrüssen zu dürfen.</p>
            <p>Dieses Haus ist seit Generationen im Besitz der Familie Maranta. Christines Vater wurde hier geboren und verbrachte seine Kindheit und Jugend in diesen Mauern, bevor er in seinen Zwanzigern nach Zürich ging. In den 1970er-Jahren, nach dem Tod seiner Eltern, übernahm er das Haus und machte es zu einem Ferienort für die Familie.</p>
            <p>Für Christine war Poschiavo immer ein Ort voller schöner Erinnerungen. Viele glückliche Ferientage haben sie hier geprägt. Im Jahr 2013 durften wir das Haus übernehmen und mit viel Sorgfalt und Herzblut renovieren. Unsere Verbundenheit mit Poschiavo – seiner Natur, den Menschen und der wunderbaren Küche – ist seither stetig gewachsen.</p>
            <p>In diesem Guide finden Sie nicht nur alle wichtigen Informationen rund um das Haus, sondern auch unsere ganz persönlichen Highlights: Lieblingsrestaurants, Ausflugsziele, schöne Orte zum Entdecken sowie Tipps zum Einkaufen und Geniessen.</p>
            <p>Herzliche Grüsse<br><strong>Christine &amp; Markus</strong></p>
          `, `
            <p>We are Christine and Markus, together with our daughters Nora and Olivia, and we are delighted to welcome you to our holiday home.</p>
            <p>This house has been in the Maranta family for generations. Christine's father was born here and spent his childhood and youth within these walls before leaving for Zurich in his twenties. In the 1970s, after the passing of his parents, he took over the house and turned it into a family holiday home.</p>
            <p>For Christine, Poschiavo has always been a place full of special memories, shaped by many happy family holidays. In 2013, we were fortunate to take over the house ourselves and carefully renovate it with great care and love.</p>
            <p>In this guide, you will find not only all the important information about the house, but also our personal highlights: favourite restaurants, excursion ideas, places to explore, and tips for shopping and enjoying the region.</p>
            <p>Warm regards,<br><strong>Christine &amp; Markus</strong></p>
          `)}
        </div>
      </div>`
  },

  arrival: {
    title: () => t('Anreise-Info', 'Arrival Information'),
    backTo: 'screen-info',
    backNavId: 'nav-info',
    render: () => `
      <div class="detail-section">
        <div class="wifi-box">
          <div class="wifi-row">
            <span class="wifi-label">${t('Check-in ab', 'Check-in after')}</span>
            <span class="wifi-value">16:00</span>
          </div>
        </div>
        <div class="detail-body">
          ${t(`
            <p>Casa Maranta befindet sich an der Via da la Rasiga 12 in Li Curt, einem kleinen Weiler in der Nähe von Poschiavo. Das Haus liegt idyllisch am Rande des Dorfes mit herrlichem Blick auf die umliegenden Berge.</p>
            <p>📍 <a href="https://maps.google.com/?q=46.31669206283648,10.058899635376326" target="_blank">Via da la Rasiga 12, Li Curt, 7745 Poschiavo, CH</a></p>
            <p><strong>Zugangscode / Anleitung</strong><br>
            Wir stellen Ihnen vor Ihrer Anreise einen Zugangscode zur Verfügung, der während Ihres Aufenthalts als Haustürschlüssel dient. Wenn Sie uns ungefähr mitteilen, wann Sie ankommen, wird Sie unsere lokale Ansprechpartnerin Anna gerne begrüssen und Ihnen alles zeigen.</p>
            <p><strong>Früherer Check-in</strong><br>
            In manchen Fällen können wir einen früheren Check-in ermöglichen. Bitte kontaktieren Sie uns, falls Sie früher anreisen möchten. Falls Sie früh ankommen, werfen Sie gerne einen Blick in den Abschnitt „Ausflugstipps" – dort finden Sie viele Ideen für die Wartezeit.</p>
            <p><strong>🚂 Anreise mit der Bahn</strong><br>
            Mit der Bahn oder dem Postauto bis Bahnhof Poschiavo, dann zu Fuss über Via da Clalt bis Via da la Rasiga 12. Distanz ca. 1,1 km (ca. 15 Min.).<br>
            Alternativ können Sie auch ein Taxi vorbuchen: <a href="https://www.balzarolo.ch" target="_blank">balzarolo.ch</a> · <a href="mailto:info@balzarolo.ch">info@balzarolo.ch</a> · <a href="tel:+41818441042">+41 81 844 10 42</a></p>
            <p><strong>🚗 Anreise mit dem Auto</strong><br>
            Mit dem Auto direkt bis Via da la Rasiga 12, 7745 Li Curt. Direkt vor dem Haus gibt es Platz für 3 Autos.</p>
          `, `
            <p>Casa Maranta is located at Via da la Rasiga 12 in Li Curt, a small hamlet near Poschiavo. The house is idyllically situated on the edge of the village with wonderful views of the surrounding mountains.</p>
            <p>📍 <a href="https://maps.google.com/?q=46.31669206283648,10.058899635376326" target="_blank">Via da la Rasiga 12, Li Curt, 7745 Poschiavo, CH</a></p>
            <p><strong>Access Codes / Instructions</strong><br>
            We will provide you with an access code before your arrival, which will serve as your door key during your stay. If you let us know approximately what time you expect to arrive, our local contact, Anna, will be happy to welcome you and show you around.</p>
            <p><strong>Early Check-in</strong><br>
            We can sometimes arrange an early check-in, so please contact us if you plan to arrive early and we'll do our best to accommodate you. If you are arriving early, have a look at the "Local Area Guide" section for things to do while you're waiting.</p>
            <p><strong>🚂 Arriving by Train</strong><br>
            Take the train or PostBus to Poschiavo station, then walk via Via da Clalt to Via da la Rasiga 12. Distance approx. 1.1 km (about 15 min).<br>
            Alternatively, you can pre-book a taxi: <a href="https://www.balzarolo.ch" target="_blank">balzarolo.ch</a> · <a href="mailto:info@balzarolo.ch">info@balzarolo.ch</a> · <a href="tel:+41818441042">+41 81 844 10 42</a></p>
            <p><strong>🚗 Arriving by Car</strong><br>
            Drive directly to Via da la Rasiga 12, 7745 Li Curt. There is space for 3 cars directly in front of the house.</p>
          `)}
        </div>
      </div>`
  },

  accommodation: {
    title: () => t('Das Haus', 'About the Accommodation'),
    backTo: 'screen-info',
    backNavId: 'nav-info',
    render: () => `
      <div class="detail-section">
        <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/iec6caefdbf66df07/version/1776631199/image.jpg" alt="Casa Maranta" class="welcome-photo" />
        <div class="detail-body">
          ${t(`
            <p>Wir haben unser Ferienhaus mit viel Sorgfalt so eingerichtet, dass es für uns und für unsere Gäste möglichst gemütlich, komfortabel und funktional ist. Unser Ziel ist, dass Sie sich hier genauso wohlfühlen wie wir selbst.</p>
            <p>Auf den folgenden Seiten finden Sie hilfreiche Informationen rund ums Haus – von der Nutzung der Einrichtungen bis hin zu praktischen Hinweisen für den Alltag.</p>
          `, `
            <p>We have furnished our holiday home with great care to make it as cosy, comfortable and functional as possible – for us and for our guests. Our goal is that you feel just as at home here as we do ourselves.</p>
            <p>On the following pages you will find helpful information about the house – from using the facilities to practical tips for everyday life.</p>
          `)}
        </div>
        <div class="modal-list" style="margin-top:16px">
          <button class="modal-item" onclick="showDetail('house_waste')">
            <span>${t('Abfall &amp; Entsorgung', 'Waste &amp; Disposal')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button class="modal-item" onclick="showDetail('house_garden')">
            <span>${t('Gartenmöbel &amp; Grill', 'Garden Furniture &amp; BBQ')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button class="modal-item" onclick="showDetail('house_games')">
            <span>${t('Gesellschaftsspiele', 'Board Games')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button class="modal-item" onclick="showDetail('house_kitchen')">
            <span>${t('Küchengeräte', 'Kitchen Appliances')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button class="modal-item" onclick="showDetail('house_reading')">
            <span>${t('Leseecke', 'Reading Corner')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button class="modal-item" onclick="showDetail('house_stove')">
            <span>${t('Schwedenofen', 'Wood-Burning Stove')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button class="modal-item" onclick="showDetail('house_electricity')">
            <span>${t('Strom &amp; Sicherungen', 'Electricity &amp; Fuses')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button class="modal-item" onclick="showDetail('house_doors')">
            <span>${t('Türen &amp; Fenster', 'Doors &amp; Windows')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button class="modal-item" onclick="showDetail('house_tv')">
            <span>${t('TV &amp; Radio', 'TV &amp; Radio')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button class="modal-item" onclick="showDetail('house_kids')">
            <span>${t('Ausstattung für Kinder', 'Equipment for Children')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button class="modal-item" onclick="showDetail('house_cleaning')">
            <span>${t('Putzschrank', 'Cleaning Cupboard')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>`
  },

  house_cleaning: {
    title: () => t('Putzschrank', 'Cleaning Cupboard'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <div class="detail-body">
          ${t(`
            <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/ieddb159937fcccde/version/1777886728/image.jpg" alt="Putzschrank" style="max-width:100%;margin-bottom:0.75rem;">
            <p>Im Putzschrank hinter der Küche finden Sie die wichtigsten Utensilien für die Reinigung. Dort befinden sich auch ein Bügeleisen und ein Bügelbrett.</p>
            <p>Sollte etwas fehlen, bitten wir Sie, unseren lokalen Kontakt Anna zu informieren.</p>
          `, `
            <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/ieddb159937fcccde/version/1777886728/image.jpg" alt="Cleaning Cupboard" style="max-width:100%;margin-bottom:0.75rem;">
            <p>In the cleaning cupboard behind the kitchen you will find the most important cleaning supplies. You will also find an iron and an ironing board there.</p>
            <p>If anything is missing, please let our local contact Anna know.</p>
          `)}
        </div>
      </div>`
  },

  house_kids: {
    title: () => t('Ausstattung für Kinder', 'Equipment for Children'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <div class="detail-body">
          ${t(`
            <p>Die folgenden Artikel sind auf Anfrage verfügbar. Bitte geben Sie uns vor Ihrer Anreise Bescheid, falls Sie etwas davon benötigen.</p>
            <ul>
              <li>2 Tripp-Trapp-Stühle (ohne Sicherung)</li>
              <li>1 IKEA Hochstuhl (mit Sicherung)</li>
              <li>1 Windeleimer</li>
              <li>2 Bett-Ausfallschutzgitter</li>
              <li>1 Baby-Reisebett mit Matratze</li>
              <li>1 WC-Sitz für Kinder</li>
              <li>1 Hocker für das Waschbecken</li>
            </ul>
          `, `
            <p>The following items are available on request. Please let us know before your arrival if you need any of them.</p>
            <ul>
              <li>2 Tripp Trapp chairs (without harness)</li>
              <li>1 IKEA high chair (with harness)</li>
              <li>1 nappy bin</li>
              <li>2 bed guard rails</li>
              <li>1 travel cot with mattress</li>
              <li>1 children's toilet seat</li>
              <li>1 step stool for the washbasin</li>
            </ul>
          `)}
        </div>
      </div>`
  },

  house_waste: {
    title: () => t('Abfall & Entsorgung', 'Waste & Disposal'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <div class="detail-body">
          ${t(`
            <p>Für den Hauskehricht sind offizielle Abfallsäcke erforderlich, die Sie z.B. im Coop beziehen können. Bitte verwenden Sie ausschliesslich diese speziellen Säcke, da nur so die Entsorgung gewährleistet ist.</p>
            <p><strong>Kehrichtstelle Hausmüll:</strong><br>
            In der Gemeinde Poschiavo wird der Hauskehricht über zentrale Sammelstellen entsorgt – es gibt leider keine Abfallcontainer direkt beim Haus.</p>
            <iframe class="maps-embed" loading="lazy" allowfullscreen
              src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyCQp4IVRPBNThAtWVxI6uOTgvkkWe3YmsM&origin=46.31669206283648,10.058899635376326&destination=46.3152177266861,10.059864411044678&mode=walking">
            </iframe>
            <a class="place-action-btn maps-route" target="_blank" rel="noopener noreferrer" data-label="Route in Google Maps öffnen" href="https://www.google.com/maps/dir/?api=1&origin=46.31669206283648,10.058899635376326&destination=46.3152177266861,10.059864411044678&travelmode=walking"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg></a>
            <p><strong>Altglas &amp; PET:</strong><br>
            Altglas und PET können getrennt entsorgt werden. Die nächstgelegene Sammelstelle:</p>
            <iframe class="maps-embed" loading="lazy" allowfullscreen
              src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyCQp4IVRPBNThAtWVxI6uOTgvkkWe3YmsM&origin=46.31669206283648,10.058899635376326&destination=46.3229775,10.0556606&mode=walking">
            </iframe>
            <a class="place-action-btn maps-route" target="_blank" rel="noopener noreferrer" data-label="Route in Google Maps öffnen" href="https://www.google.com/maps/dir/?api=1&origin=46.31669206283648,10.058899635376326&destination=46.3229775,10.0556606&travelmode=walking"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg></a>
            <p>Bitte achten Sie auf eine korrekte Trennung und entsorgen Sie den Abfall regelmässig.</p>
          `, `
            <p>Official waste bags are required for household rubbish — you can buy them at the Coop, for example. Please use only these special bags, as they are required for proper disposal.</p>
            <p><strong>Rubbish disposal point:</strong><br>
            In the municipality of Poschiavo, household waste is disposed of at central collection points — unfortunately there are no bins directly at the house.</p>
            <iframe class="maps-embed" loading="lazy" allowfullscreen
              src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyCQp4IVRPBNThAtWVxI6uOTgvkkWe3YmsM&origin=46.31669206283648,10.058899635376326&destination=46.3152177266861,10.059864411044678&mode=walking">
            </iframe>
            <a class="place-action-btn maps-route" target="_blank" rel="noopener noreferrer" data-label="Open route in Google Maps" href="https://www.google.com/maps/dir/?api=1&origin=46.31669206283648,10.058899635376326&destination=46.3152177266861,10.059864411044678&travelmode=walking"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg></a>
            <p><strong>Glass &amp; PET recycling:</strong><br>
            Glass and PET can be recycled separately. The nearest collection point:</p>
            <iframe class="maps-embed" loading="lazy" allowfullscreen
              src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyCQp4IVRPBNThAtWVxI6uOTgvkkWe3YmsM&origin=46.31669206283648,10.058899635376326&destination=46.3229775,10.0556606&mode=walking">
            </iframe>
            <a class="place-action-btn maps-route" target="_blank" rel="noopener noreferrer" data-label="Open route in Google Maps" href="https://www.google.com/maps/dir/?api=1&origin=46.31669206283648,10.058899635376326&destination=46.3229775,10.0556606&travelmode=walking"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg></a>
            <p>Please sort your waste correctly and dispose of it regularly.</p>
          `)}
        </div>
      </div>`
  },

  house_kitchen: {
    title: () => t('Küchengeräte', 'Kitchen Appliances'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <div class="detail-body">
          ${t(`
            <details class="appliance-section">
              <summary>Herd</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/icf38368539050731/version/1776714283/image.jpg" alt="Herd" class="welcome-photo" />
              <p><a href="https://media3.bsh-group.com/Documents/9001148208_C.pdf" target="_blank">Betriebsanleitung (DE)</a></p>

              <h4>Einschalten</h4>
              <ul>
                <li>Gerät einschalten <strong>(1)</strong></li>
                <li>Kochplatte wählen <strong>(2)</strong></li>
                <li>Im Einstellbereich die gewünschte Temperatur wählen <strong>(3)</strong></li>
              </ul>
              <h4>Kochplatte ausschalten</h4>
              <ul>
                <li>Kochplatte wählen <strong>(2)</strong></li>
                <li>Im Einstellbereich auf <strong>0</strong> tippen <strong>(4)</strong></li>
              </ul>
              <h4>Kindersicherung</h4>
              <p>Das Kochfeld muss ausgeschaltet sein.</p>
              <ul>
                <li><strong>Einschalten:</strong> Schlüssel-Symbol <strong>(5)</strong> ca. 4 Sekunden berühren. Die Anzeigelampe leuchtet 10 Sekunden – das Kochfeld ist gesperrt.</li>
                <li><strong>Ausschalten:</strong> Schlüssel-Symbol <strong>(5)</strong> erneut ca. 4 Sekunden berühren. Die Sperre ist aufgehoben.</li>
              </ul>
            </details>

            <details class="appliance-section">
              <summary>Geschirrspüler</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/icd9c77548f0fca49/version/1776714015/image.jpg" alt="Geschirrspüler" class="welcome-photo" />
              <p><a href="https://media3.bsh-group.com/Documents/9000795435_A.pdf" target="_blank">Kurzanleitung (DE)</a> · <a href="https://www.manualslib.de/manual/664410/Siemens-Sn-Serie.html?page=2#manual" target="_blank">Betriebsanleitung (DE)</a></p>
              <p>Hinter dem Abfalleimer finden Sie die Spültabs, Klarspüler und Salz für den Bedarfsfall.</p>
              <p>Wir empfehlen das <strong>Eco-Programm</strong> und nur bei starker Verschmutzung das Intensiv-Programm.</p>
              <div class="notice">⚠️ <strong>Bitte keine teflonbeschichteten Pfannen und Töpfe in den Geschirrspüler geben.</strong></div>
              <h4>Einschalten</h4>
              <ul>
                <li>Gerät einschalten <strong>(1)</strong></li>
                <li>Eco-Programm wählen <strong>(2)</strong></li>
                <li>Start drücken <strong>(3)</strong></li>
              </ul>
              <p><strong>Hinweis:</strong> Während des Programmablaufs erscheint ein roter Lichtpunkt auf dem Fussboden unterhalb der Gerätetür. Die Geschirrspülertür erst öffnen, wenn der Lichtpunkt nicht mehr sichtbar ist.</p>
            </details>

            <details class="appliance-section">
              <summary>Dampfabzug</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/if6067981cf4078c3/version/1776714795/image.jpg" alt="Dampfabzug" class="welcome-photo" />
              <p><a href="https://www.bedienungsanleitu.ng/elica/65414590a/anleitung" target="_blank">Betriebsanleitung (DE/EN)</a></p>
              <ul>
                <li>Stand-by: LED ausgeschaltet</li>
                <li>Stufe 1: grünes LED</li>
                <li>Stufe 2: gelbes LED (bernsteinfarbig)</li>
                <li>Stufe 3: rotes LED</li>
                <li>Stufe 4: rot blinkendes LED <em>(schaltet nach 5 Minuten automatisch auf Stufe 2 zurück)</em></li>
              </ul>
              <h4>Beleuchtung</h4>
              <ul>
                <li><strong>Kurz tippen</strong> auf Beleuchtungstaste <strong>(2)</strong>: untere Lichter ein/aus</li>
                <li><strong>Gedrückt halten</strong> der Beleuchtungstaste <strong>(2)</strong>: obere Deckenlichter ein/aus</li>
              </ul>
            </details>

            <details class="appliance-section">
              <summary>Mikrowelle</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/i7bbaf1bf1d9fa79d/version/1776714670/image.jpg" alt="Mikrowelle" class="welcome-photo" />
              <p><a href="https://d.otto.de/files/e2a72c22-b9ab-4ef9-9024-e8bb6587cf21.pdf" target="_blank">Betriebsanleitung (DE)</a></p>

              <h4>Einschalten</h4>
              <ul>
                <li>Mikrowellen-Symbol wählen <strong>(1)</strong></li>
                <li>Start drücken <strong>(2)</strong></li>
                <li>Temperatur über +/–-Taste einstellen <strong>(3)</strong></li>
                <li>Start drücken <strong>(2)</strong></li>
              </ul>
            </details>
          `, `
            <details class="appliance-section">
              <summary>Hob / Cooktop</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/icf38368539050731/version/1776714283/image.jpg" alt="Hob" class="welcome-photo" />
              <p><a href="https://media3.bsh-group.com/Documents/9001154082_C.pdf" target="_blank">Operating manual (EN)</a></p>

              <h4>Switching on</h4>
              <ul>
                <li>Switch the appliance on <strong>(1)</strong></li>
                <li>Select the cooking zone <strong>(2)</strong></li>
                <li>Select the desired temperature in the control area <strong>(3)</strong></li>
              </ul>
              <h4>Switching off a zone</h4>
              <ul>
                <li>Select the cooking zone <strong>(2)</strong></li>
                <li>Tap <strong>0</strong> in the control area <strong>(4)</strong></li>
              </ul>
              <h4>Child lock</h4>
              <p>The hob must be switched off.</p>
              <ul>
                <li><strong>Activate:</strong> Touch the key symbol <strong>(5)</strong> for approx. 4 seconds. The indicator light will glow for 10 seconds – the hob is locked.</li>
                <li><strong>Deactivate:</strong> Touch the key symbol <strong>(5)</strong> again for approx. 4 seconds. The lock is released.</li>
              </ul>
            </details>

            <details class="appliance-section">
              <summary>Dishwasher</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/icd9c77548f0fca49/version/1776714015/image.jpg" alt="Dishwasher" class="welcome-photo" />
              <p><a href="https://media3.bsh-group.com/Documents/9000795435_A.pdf" target="_blank">Quick guide (DE)</a> · <a href="https://www.manualslib.de/manual/664410/Siemens-Sn-Serie.html?page=2#manual" target="_blank">Operating manual (DE)</a></p>
              <p>Behind the bin you will find dishwasher tabs, rinse aid and salt for when they run out.</p>
              <p>We recommend the <strong>Eco programme</strong> and only Intensive for heavily soiled loads.</p>
              <div class="notice">⚠️ <strong>Please do not put Teflon-coated pans and pots in the dishwasher.</strong></div>
              <h4>Switching on</h4>
              <ul>
                <li>Switch the appliance on <strong>(1)</strong></li>
                <li>Select the Eco programme <strong>(2)</strong></li>
                <li>Press Start <strong>(3)</strong></li>
              </ul>
              <p><strong>Note:</strong> During the programme, a red light dot appears on the floor beneath the appliance door. Only open the door once the light dot is no longer visible.</p>
            </details>

            <details class="appliance-section">
              <summary>Extractor Hood</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/if6067981cf4078c3/version/1776714795/image.jpg" alt="Extractor Hood" class="welcome-photo" />
              <p><a href="https://www.bedienungsanleitu.ng/elica/65414590a/anleitung" target="_blank">Operating manual (DE/EN)</a></p>
              <ul>
                <li>Stand-by: LED off</li>
                <li>Speed 1: green LED</li>
                <li>Speed 2: yellow LED (amber)</li>
                <li>Speed 3: red LED</li>
                <li>Speed 4: flashing red LED <em>(automatically returns to speed 2 after 5 minutes)</em></li>
              </ul>
              <h4>Lighting</h4>
              <ul>
                <li><strong>Short tap</strong> on lighting button <strong>(2)</strong>: lower lights on/off</li>
                <li><strong>Hold</strong> lighting button <strong>(2)</strong>: upper ceiling lights on/off</li>
              </ul>
            </details>

            <details class="appliance-section">
              <summary>Microwave</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/i7bbaf1bf1d9fa79d/version/1776714670/image.jpg" alt="Microwave" class="welcome-photo" />
              <p><a href="https://www.manua.ls/bauknecht/mw-254-sm/manual?p=6" target="_blank">Operating manual (EN)</a></p>

              <h4>Switching on</h4>
              <ul>
                <li>Select the microwave symbol <strong>(1)</strong></li>
                <li>Press Start <strong>(2)</strong></li>
                <li>Adjust power using the +/– button <strong>(3)</strong></li>
                <li>Press Start <strong>(2)</strong></li>
              </ul>
            </details>
          `)}
        </div>
      </div>`
  },

  house_doors: {
    title: () => t('Türen & Fenster', 'Doors & Windows'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <div class="detail-body">
          ${t(`
            <details class="appliance-section">
              <summary>Hauseingangstüre</summary>
              <p>Die Hauseingangstüre ist mit einem Nuki Go sowie einem Keypad an der Aussenseite ausgestattet. Sie können die Türe bequem über den Code am Keypad öffnen. Die Türe verriegelt sich automatisch jeden Abend um 23:00 Uhr. Bitte achten Sie darauf, den korrekten Code zu verwenden und die Türe nach dem Eintreten vollständig zu schliessen.</p>
              <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/i64d1fb88fd9ffce8/version/1776114586/image.jpg" alt="Nuki Schloss" class="welcome-photo" style="max-height:none;object-fit:contain;" />
              <p>Für Notfälle befindet sich ein Schlüssel in einem Schlüsselsafe in der Pergola (hintere linke Ecke). Den Code erhalten Sie auf Anfrage bei unserem lokalen Kontakt Anna (<a href="tel:+41794221608">+41 79 422 16 08</a>) oder beim Eigentümer Markus (<a href="tel:+41795712790">+41 79 571 27 90</a>) bzw. Christine (<a href="tel:+41787403180">+41 78 740 31 80</a>).</p>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/i59b1251cce46d40f/version/1777886984/image.jpg" alt="Schlüsselsafe Pergola" style="max-width:100%;margin-bottom:0.75rem;">
            </details>
            <details class="appliance-section">
              <summary>Dachfenster</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/i9a805bd62f755264/version/1777885936/image.jpg" alt="Dachfenster" style="max-width:100%;margin-bottom:0.75rem;">
              <p>Die Dachfenster lassen sich mit einer Stange öffnen und schliessen – diese befindet sich hinter der Tür im Dachschlafzimmer. Mit derselben Stange kann auch das Rollo geschlossen werden. Bitte achten Sie darauf, die Fenster bei schlechter Witterung sowie beim Verlassen des Hauses immer zu schliessen.</p>
            </details>
            <details class="appliance-section">
              <summary>Verschlossene Türen im Erdgeschoss</summary>
              <p>Die entsprechend gekennzeichneten Türen im Erdgeschoss führen zu Keller- und Heizungsräumen und sind nicht zugänglich. Sie sind mit <strong>„Privat"</strong> beschriftet.</p>
            </details>
            <details class="appliance-section">
              <summary>Verschlossene Tür im Dachgeschoss</summary>
              <p>Auch im Dachgeschoss gibt es eine als <strong>„Privat"</strong> gekennzeichnete Tür. Dieser Raum ist nicht zugänglich.</p>
            </details>
          `, `
            <details class="appliance-section">
              <summary>Front Door</summary>
              <p>The front door is equipped with a Nuki Go smart lock and an external keypad. You can open the door conveniently using the code on the keypad. The door locks automatically every evening at 11:00 pm. Please make sure to use the correct code and close the door fully behind you.</p>
              <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/i43c9c5b48ebbd6f4/version/1776114581/image.jpg" alt="Nuki Lock" class="welcome-photo" style="max-height:none;object-fit:contain;" />
              <p>In case of emergency, a spare key is stored in a key safe in the pergola (rear left corner). The code is available on request from our local contact Anna (<a href="tel:+41794221608">+41 79 422 16 08</a>) or from the owners Markus (<a href="tel:+41795712790">+41 79 571 27 90</a>) or Christine (<a href="tel:+41787403180">+41 78 740 31 80</a>).</p>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/i59b1251cce46d40f/version/1777886984/image.jpg" alt="Key Safe Pergola" style="max-width:100%;margin-bottom:0.75rem;">
            </details>
            <details class="appliance-section">
              <summary>Skylight Windows</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/i9a805bd62f755264/version/1777885936/image.jpg" alt="Skylight Windows" style="max-width:100%;margin-bottom:0.75rem;">
              <p>The skylight windows in the attic can be opened and closed using a pole — you'll find it behind the door in the attic bedroom. The same pole can also be used to close the blind. Please always close the windows when the weather turns or when leaving the house.</p>
            </details>
            <details class="appliance-section">
              <summary>Locked Doors on the Ground Floor</summary>
              <p>The marked doors on the ground floor lead to the cellar and utility rooms and are not accessible to guests. They are labelled <strong>"Privat"</strong>.</p>
            </details>
            <details class="appliance-section">
              <summary>Locked Door in the Attic</summary>
              <p>There is also a door in the attic marked <strong>"Privat"</strong>. This room is not accessible to guests.</p>
            </details>
          `)}
        </div>
      </div>`
  },

  house_tv: {
    title: () => t('TV & Radio', 'TV & Radio'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <div class="detail-body">
          ${t(`
            <details class="appliance-section">
              <summary>Fernsehgerät Wohnzimmer</summary>
              <p><a href="https://www.manualslib.de/manual/1007774/Technisat-S3-Isio.html?page=2#manual" target="_blank">Betriebsanleitung TechniSat (DE)</a></p>
              <p>Das Haus ist mit Satellit-TV ausgestattet. Dieses System bietet keine modernen Funktionen wie Pause, Replay oder 7-Tage-Rückblick – das Programm wird klassisch live empfangen.</p>
              <p>Sie können Ihr Handy, Tablet oder Laptop über HDMI oder USB-C anschliessen, um auf Streaming-Dienste und eigene Wiedergabefunktionen zuzugreifen.</p>
              <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/ie61664a20f7fb4ec/version/1777878218/image.jpg" alt="TV Fernbedienung" style="max-width:100%;margin-bottom:0.75rem;">
              <h4>Satellit-TV</h4>
              <ul>
                <li>Fernseher über die <strong>LG Fernbedienung</strong> einschalten <strong>(1)</strong></li>
                <li>Satellitenreceiver über die <strong>TechniSat Fernbedienung</strong> einschalten <strong>(A)</strong></li>
                <li>Kein Bild? HDMI-Eingang <strong>HDMI1 (2)</strong> wählen</li>
                <li>Programmübersicht: Taste <strong>SFI (C)</strong> oder mit <strong>+P– (B)</strong> zappen</li>
                <li>Zurück: Taste <strong>Zurück (D)</strong></li>
              </ul>
              <h4>Eigenes Gerät (Streaming)</h4>
              <ul>
                <li>Gerät über das mit <strong>„HDMI2"</strong> beschriftete HDMI-Kabel verbinden (HDMI oder USB-C Adapter)</li>
                <li>Fernseher über die <strong>LG Fernbedienung</strong> einschalten <strong>(1)</strong></li>
                <li>Eingang <strong>HDMI2 (2)</strong> wählen</li>
              </ul>
            </details>

            <details class="appliance-section">
              <summary>Fernsehgerät Dachgeschoss</summary>
              <p>Dieses Gerät verfügt über keinen Satelliten- oder Kabelempfang. Sie können jedoch Ihr eigenes Gerät per HDMI oder USB-C verbinden.</p>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/i84101a0a5a76f8af/version/1777884830/image.jpg" alt="PS3 Dachgeschoss" style="max-width:100%;margin-bottom:0.75rem;">
              <p>Im Dachgeschoss steht ausserdem eine <strong>PlayStation 3 (PS3)</strong> mit verschiedenen Spielen zur Verfügung, die Sie gerne benutzen dürfen. Bitte gehen Sie sorgfältig mit den Spiel-DVDs um.</p>
            </details>

            <details class="appliance-section">
              <summary>Radio Esszimmer</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/i4b3e91c160254c55/version/1777884844/image.jpg" alt="Radio Esszimmer" style="max-width:100%;margin-bottom:0.75rem;">
              <p>Über das Radio beim Esstisch können Sie DAB+ Sender empfangen oder Ihr eigenes Gerät per <strong>Bluetooth</strong> verbinden und Musik abspielen.</p>
              <ul>
                <li><strong>(1)</strong> Ein-/Ausschalten</li>
                <li><strong>(2)</strong> Modus wählen – mit der <strong>„MODE"</strong>-Taste zwischen den Funktionen wechseln:
                  <ul>
                    <li>DAB+ (Digitalradio)</li>
                    <li>Bluetooth (für Verbindung mit dem Handy)</li>
                  </ul>
                </li>
                <li><strong>(3)</strong> Sender wählen und durch Drücken bestätigen</li>
              </ul>
              <p><strong>Tipp:</strong> Für den besten Empfang bei DAB+ bitte die Antenne ausziehen.</p>
            </details>
          `, `
            <details class="appliance-section">
              <summary>TV – Living Room</summary>
              <p><a href="https://www.manualslib.de/manual/1007774/Technisat-S3-Isio.html?page=2#manual" target="_blank">Operating manual TechniSat (DE)</a></p>
              <p>The house has satellite TV. The system does not offer modern features such as pause, replay or a 7-day catch-up – it is classic live TV only.</p>
              <p>You can connect your phone, tablet or laptop via HDMI or USB-C to access streaming services and your own playback.</p>
              <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/ie61664a20f7fb4ec/version/1777878218/image.jpg" alt="TV Remote Control" style="max-width:100%;margin-bottom:0.75rem;">
              <h4>Satellite TV</h4>
              <ul>
                <li>Switch on the TV using the <strong>LG remote</strong> <strong>(1)</strong></li>
                <li>Switch on the satellite receiver using the <strong>TechniSat remote</strong> <strong>(A)</strong></li>
                <li>No picture? Select input <strong>HDMI1 (2)</strong></li>
                <li>Programme guide: press <strong>SFI (C)</strong> or browse with <strong>+P– (B)</strong></li>
                <li>Go back: press <strong>Back (D)</strong></li>
              </ul>
              <h4>Your own device (streaming)</h4>
              <ul>
                <li>Connect your device using the HDMI cable labelled <strong>"HDMI2"</strong> (with or without USB-C adapter)</li>
                <li>Switch on the TV using the <strong>LG remote</strong> <strong>(1)</strong></li>
                <li>Select input <strong>HDMI2 (2)</strong></li>
              </ul>
            </details>

            <details class="appliance-section">
              <summary>TV – Attic</summary>
              <p>This TV has no satellite or cable reception. You are welcome to connect your own device via HDMI or USB-C.</p>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/i84101a0a5a76f8af/version/1777884830/image.jpg" alt="PS3 Attic" style="max-width:100%;margin-bottom:0.75rem;">
              <p>There is also a <strong>PlayStation 3 (PS3)</strong> with various games in the attic, which you are welcome to use. Please handle the game DVDs with care.</p>
            </details>

            <details class="appliance-section">
              <summary>Radio – Dining Room</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/i4b3e91c160254c55/version/1777884844/image.jpg" alt="Radio – Dining Room" style="max-width:100%;margin-bottom:0.75rem;">
              <p>The radio next to the dining table receives <strong>DAB+</strong> stations and can also be connected to your own device via <strong>Bluetooth</strong> for music playback.</p>
              <ul>
                <li><strong>(1)</strong> Power on/off</li>
                <li><strong>(2)</strong> Select mode – use the <strong>"MODE"</strong> button to switch between:
                  <ul>
                    <li>DAB+ (digital radio)</li>
                    <li>Bluetooth (to connect your phone)</li>
                  </ul>
                </li>
                <li><strong>(3)</strong> Select a station and confirm by pressing</li>
              </ul>
              <p><strong>Tip:</strong> For the best DAB+ reception, please extend the antenna.</p>
            </details>
          `)}
        </div>
      </div>`
  },

  house_garden: {
    title: () => t('Gartenmöbel & Grill', 'Garden Furniture & BBQ'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <div class="detail-body">
          ${t(`
            <details class="appliance-section">
              <summary>Hängematten</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/ifa6c18f05905d17a/version/1776110400/image.jpg" alt="Hängematten" class="welcome-photo" />
              <p>Gönnen Sie sich eine wohlverdiente Auszeit in einer unserer Hängematten. Zu beiden Seiten der Pergola befinden sich Metallringe, in die Sie die Karabiner einhaken können. Bitte nehmen Sie die Hängematten jeweils am Abend und bei schlechtem Wetter wieder mit ins Haus.</p>
            </details>
            <details class="appliance-section">
              <summary>Spielhaus</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=441x10000:format=jpg/path/s43189f292a34c399/image/i95cf1bfa57506cd1/version/1776110340/image.jpg" alt="Spielhaus" class="welcome-photo" />
              <p>Unsere Kinder lieben dieses Spielhaus – und wir hoffen, Ihren Kindern geht es genauso! Wir freuen uns über einen sorgsamen Umgang.</p>
            </details>
            <details class="appliance-section">
              <summary>Liegestühle</summary>
              <p>Weitere Liegestühle und Sitzgelegenheiten finden Sie unter der Treppe im Haus.</p>
            </details>
            <details class="appliance-section">
              <summary>Feuerschale und Grillrost</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/i3a613047bf17fa35/version/1776110877/image.jpg" alt="Feuerschale und Grillrost" class="welcome-photo" />
              <p>Was gibt es Schöneres als ein gutes Stück Fleisch vom Grill? Sie können das Feuerholz aus dem Vorrat beim Schwedenofen verwenden. Bitte entsorgen Sie die vollständig abgekühlte Asche im Feuereimer neben dem Schwedenofen. Den Grillrost bitten wir Sie nach dem Gebrauch zu reinigen – damit auch der nächste Gast seine Freude daran hat.</p>
              <p class="notice"><strong>⚠️ Wichtig:</strong> Die Feuerschale darf nicht unter der Pergola benutzt werden. Sie steht lediglich dort, um sie vor dem Wetter zu schützen. Bitte stellen Sie sie vor dem Gebrauch ins Freie.</p>
            </details>
          `, `
            <details class="appliance-section">
              <summary>Hammocks</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/ifa6c18f05905d17a/version/1776110400/image.jpg" alt="Hammocks" class="welcome-photo" />
              <p>Treat yourself to a well-deserved break in one of our hammocks. Metal rings on both sides of the pergola allow you to attach the carabiners easily. Please bring the hammocks inside each evening and whenever the weather turns.</p>
            </details>
            <details class="appliance-section">
              <summary>Playhouse</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=441x10000:format=jpg/path/s43189f292a34c399/image/i95cf1bfa57506cd1/version/1776110340/image.jpg" alt="Playhouse" class="welcome-photo" />
              <p>Our children adore this little playhouse — and we hope yours will too! We simply ask that you treat it with care.</p>
            </details>
            <details class="appliance-section">
              <summary>Sun Loungers</summary>
              <p>Additional sun loungers and chairs are stored under the stairs inside the house.</p>
            </details>
            <details class="appliance-section">
              <summary>Fire Bowl and BBQ Grate</summary>
              <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/i3a613047bf17fa35/version/1776110877/image.jpg" alt="Fire Bowl and BBQ Grate" class="welcome-photo" />
              <p>Is there anything better than a good piece of meat fresh off the grill? Feel free to use the firewood stored by the Swedish stove. Please dispose of fully cooled ash in the fire bucket next to the stove, and give the grill grate a quick clean after use — so the next guests can enjoy it just as much.</p>
              <p class="notice"><strong>⚠️ Important:</strong> The fire bowl must not be used under the pergola. It is stored there only to protect it from the weather. Please move it into the open before use.</p>
            </details>
          `)}
        </div>
      </div>`
  },

  house_games: {
    title: () => t('Gesellschaftsspiele', 'Board Games'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=10000x740:format=jpg:rotate=270/path/s43189f292a34c399/image/i68bbfd93c4dd7ced/version/1776632127/image.jpg" alt="Gesellschaftsspiele" class="welcome-photo" />
        <div class="detail-body">
          ${t(`
            <p>Wenn das Wetter einmal nicht mitspielt oder einfach Zeit für eine Pause ist, wird bei uns gerne gespielt. Ob ehrgeizige Jassrunde, spannende Partie oder einfach ein lustiges Spiel mit den Kindern: Für Unterhaltung ist gesorgt.</p>
            <p>Im Haus finden Sie eine Auswahl an Spielen für verschiedene Altersgruppen:</p>
            ${renderGamePlates()}
            <p>Viel Spass beim Spielen!</p>
          `, `
            <p>When the weather doesn't cooperate or it's simply time for a break, we love to play games. Whether it's a competitive round of Jass, an exciting match, or a fun game with the kids — entertainment is guaranteed.</p>
            <p>You'll find a selection of games for various age groups in the house:</p>
            ${renderGamePlates()}
            <p>Have fun playing!</p>
          `)}
        </div>
      </div>`
  },

  house_reading: {
    title: () => t('Leseecke', 'Reading Corner'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <div class="detail-body">
          ${t(`
            <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/id75b187f1dc6bb10/version/1776112971/image.jpg" alt="Leseecke" class="welcome-photo" />
            <p>Im Dachgeschoss finden Sie eine kleine, eher zufällige Büchersammlung. Sie sind herzlich eingeladen, darin zu stöbern und sich ein Buch zu schnappen.</p>
            <p>Wir bitten Sie, die Bücher im Haus zu lassen – damit sich auch die nächsten Gäste daran erfreuen können.</p>
          `, `
            <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/id75b187f1dc6bb10/version/1776112971/image.jpg" alt="Reading Corner" class="welcome-photo" />
            <p>Up in the attic you'll find a small, eclectic collection of books. You are very welcome to browse through them and pick something to read.</p>
            <p>Please leave the books in the house so that future guests can enjoy them too.</p>
          `)}
        </div>
      </div>`
  },

  house_stove: {
    title: () => t('Schwedenofen', 'Wood-Burning Stove'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <div class="detail-body">
          ${t(`
            <div class="notice">
              <strong style="font-size:1.05em;">⚠️ ACHTUNG</strong><br>
              Der Ofen im Dachgeschoss ist ein reines Dekorationsstück – er ist <strong>nicht angeschlossen</strong> und darf <strong>nicht benutzt werden</strong>.
              <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/i2c3c2a7c9746bee5/version/1777887247/image.jpg" alt="Deko-Ofen Dachgeschoss" style="max-width:100%;margin-top:0.75rem;border-radius:4px;">
            </div>
            <h3>Schwedenofen im Wohnzimmer</h3>
            <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/i0515b57424e5fe51/version/1776632934/image.jpg" alt="Schwedenofen" class="welcome-photo" />
            <p>Den Abend vor einem knisternden Feuer ausklingen zu lassen gehört für uns zu den schönsten Momenten im Ferienhaus. Damit Sie den Schwedenofen sicher und unkompliziert nutzen können, beachten Sie bitte folgende Hinweise:</p>
            <h4>Sicherheitsregeln</h4>
            <ul>
              <li>Sicherstellen, dass das Abluftrohr geöffnet ist (der Hebel muss senkrecht stehen)</li>
              <li>Die Türe immer geschlossen halten</li>
              <li>Nichts auf den Schwedenofen stellen</li>
              <li>Asche immer vollständig abkühlen lassen, bevor sie in den Ascheeimer gegeben wird</li>
              <li>Bei Unsicherheiten bitte unseren lokalen Kontakt Anna kontaktieren</li>
            </ul>
            <h4>Nach Gebrauch</h4>
            <ul>
              <li>Kalte Asche in den Eimer neben dem Schwedenofen entsorgen</li>
              <li>Bei Bedarf die Scheibe reinigen</li>
            </ul>
            <p>Vielen Dank für einen sorgfältigen Umgang – und viel Freude beim Heizen!</p>
          `, `
            <div class="notice">
              <strong style="font-size:1.05em;">⚠️ IMPORTANT</strong><br>
              The stove in the attic is purely decorative – it is <strong>not connected</strong> and must <strong>not be used</strong>.
              <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/i2c3c2a7c9746bee5/version/1777887247/image.jpg" alt="Decorative Stove Attic" style="max-width:100%;margin-top:0.75rem;border-radius:4px;">
            </div>
            <h3>Wood-Burning Stove in the Living Room</h3>
            <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/i24f5c7a4ed947a35/version/1776632945/image.jpg" alt="Wood-Burning Stove" class="welcome-photo" />
            <p>For us, ending the evening by a crackling fire is one of the most special moments in this holiday home. To help you use the stove safely and easily, please follow the guidelines below:</p>
            <h4>Safety Rules</h4>
            <ul>
              <li>Make sure the flue is open (the lever must be vertical)</li>
              <li>Always keep the door closed while the stove is in use</li>
              <li>Do not place anything on top of the stove</li>
              <li>Always allow ash to cool completely before placing it in the ash bucket</li>
              <li>If you are unsure about anything, please contact our local contact Anna</li>
            </ul>
            <h4>After Use</h4>
            <ul>
              <li>Dispose of cooled ash in the bucket next to the stove</li>
              <li>Clean the glass if needed</li>
            </ul>
            <p>Thank you for taking good care of it – and enjoy the warmth!</p>
          `)}
        </div>
      </div>`
  },

  house_electricity: {
    title: () => t('Strom & Sicherungen', 'Electricity & Fuses'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <div class="detail-body">
          ${t(`
            <h4>Sicherungskasten (Treppenhaus, über der Kommode)</h4>
            <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/i8812bfa63c1d8811/version/1777884162/image.jpg" alt="Sicherungskasten" style="max-width:100%;margin-bottom:0.75rem;">
            <p>Der Sicherungskasten befindet sich im Treppenhaus oberhalb der Kommode.</p>
            <ul>
              <li>Falls der Strom in einem Bereich ausfällt, prüfen Sie die Sicherungen (Schalter mit Zahlen).</li>
              <li>Eine ausgelöste Sicherung steht meist auf „OFF" oder in Mittelstellung.</li>
              <li>Schalten Sie die entsprechende Sicherung wieder nach oben auf „ON".</li>
            </ul>
            <h4 style="margin-top:1.25rem;">Belegung der Sicherungen</h4>
            <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/id63405a3727435b4/version/1777884075/image.jpg" alt="Sicherungsbelegung" style="max-width:100%;margin-bottom:0.75rem;">
            <ul>
              <li><strong>1</strong> – 2. Stock: Licht Zimmer / WC &amp; Dusche</li>
              <li><strong>2</strong> – 1. Stock: Licht Zimmer mit zwei Betten / Küche / Wohnzimmer / WLAN</li>
              <li><strong>3</strong> – 1. Stock: Licht Zimmer West / Treppe &amp; Dusche</li>
              <li><strong>4</strong> – Geschirrspüler</li>
              <li><strong>5</strong> – Kühlschrank</li>
              <li><strong>6</strong> – Herd / Backofen</li>
            </ul>
            <h4 style="margin-top:1.25rem;">Wichtige Hinweise</h4>
            <ul>
              <li>Bitte nur die markierten Sicherungen (1–6) verwenden.</li>
              <li>Die durchgestrichenen Sicherungen nicht bedienen.</li>
              <li>Wenn eine Sicherung erneut auslöst, angeschlossene Geräte im betroffenen Bereich ausschalten und nochmals versuchen.</li>
              <li>Bei anhaltenden Problemen bitte unseren lokalen Kontakt Anna kontaktieren.</li>
            </ul>
          `, `
            <h4>Fuse Box (Stairwell, above the dresser)</h4>
            <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/i8812bfa63c1d8811/version/1777884162/image.jpg" alt="Fuse Box" style="max-width:100%;margin-bottom:0.75rem;">
            <p>The fuse box is located in the stairwell above the dresser.</p>
            <ul>
              <li>If the power goes out in a particular area, check the fuses (switches with numbers).</li>
              <li>A tripped fuse is usually in the "OFF" position or in a middle position.</li>
              <li>Flip the relevant fuse back up to the "ON" position.</li>
            </ul>
            <h4 style="margin-top:1.25rem;">Fuse Assignment</h4>
            <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/id63405a3727435b4/version/1777884075/image.jpg" alt="Fuse Assignment" style="max-width:100%;margin-bottom:0.75rem;">
            <ul>
              <li><strong>1</strong> – 2nd floor: bedroom lights / WC &amp; shower</li>
              <li><strong>2</strong> – 1st floor: twin bedroom lights / kitchen / living room / Wi-Fi</li>
              <li><strong>3</strong> – 1st floor: west bedroom lights / stairs &amp; shower</li>
              <li><strong>4</strong> – Dishwasher</li>
              <li><strong>5</strong> – Refrigerator</li>
              <li><strong>6</strong> – Hob / oven</li>
            </ul>
            <h4 style="margin-top:1.25rem;">Important Notes</h4>
            <ul>
              <li>Please only use the labelled fuses (1–6).</li>
              <li>Do not operate the crossed-out fuses.</li>
              <li>If a fuse trips again, switch off connected devices in the affected area and try again.</li>
              <li>If the problem persists, please contact our local contact Anna.</li>
            </ul>
          `)}
        </div>
      </div>`
  },

  wifi: {
    title: () => t('WLAN / Internet', 'WiFi / Internet Details'),
    backTo: 'screen-info',
    backNavId: 'nav-info',
    render: () => `
      <div class="detail-section">
        <div class="wifi-box">
          <div class="wifi-row">
            <span class="wifi-label">${t('Netzwerk', 'Network')}</span>
            <span class="wifi-value">LaRasigaGuest</span>
          </div>
          <div class="wifi-row">
            <span class="wifi-label">${t('Passwort', 'Password')}</span>
            <span class="wifi-value">larasiga585</span>
          </div>
        </div>
        <button class="wifi-qr-btn" onclick="toggleWifiQR(this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
            <line x1="14" y1="14" x2="14" y2="14.01"/><line x1="17" y1="14" x2="17" y2="14.01"/>
            <line x1="20" y1="14" x2="20" y2="14.01"/><line x1="14" y1="17" x2="14" y2="17.01"/>
            <line x1="17" y1="17" x2="17" y2="17.01"/><line x1="20" y1="17" x2="20" y2="17.01"/>
            <line x1="14" y1="20" x2="14" y2="20.01"/><line x1="17" y1="20" x2="17" y2="20.01"/>
            <line x1="20" y1="20" x2="20" y2="20.01"/>
          </svg>
          ${t('QR-Code zum Verbinden anzeigen', 'Show QR code to connect')}
        </button>
        <div class="wifi-qr-panel" id="wifi-qr-panel" style="display:none">
          <p class="wifi-qr-hint">${t('Kamera-App auf Ihr Handy öffnen und QR-Code scannen — Verbindung erfolgt automatisch.', 'Open your camera app and scan the QR code — your phone connects automatically.')}</p>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&ecc=M&data=WIFI%3AT%3AWPA%3BS%3ALaRasigaGuest%3BP%3Alarasiga585%3B%3B"
            alt="WiFi QR Code"
            class="wifi-qr-img"
          />
          <p class="wifi-qr-network">LaRasigaGuest</p>
        </div>
        <div class="detail-body">
          ${t(`
            <p>Es gibt kostenloses WLAN. Die Zugangsdaten sind oben aufgeführt.</p>
            <p>Wir stellen diesen Service zu Ihrer Freude und Bequemlichkeit zur Verfügung. Bitte beachten Sie jedoch, dass Sie für eine sichere und angemessene Nutzung verantwortlich sind. Falls es zu Verbindungsproblemen kommt, wenden Sie sich bitte an uns.</p>
            <h4>Fehlerbehebung</h4>
            <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/i691c483c00b18490/version/1777880764/image.jpg" alt="Router TP-Link" style="max-width:100%;margin-bottom:0.75rem;">
            <p>Falls das Internet nicht richtig funktioniert, führen Sie bitte folgende Überprüfungen/Massnahmen durch:</p>
            <ul>
              <li>Die Kontrollleuchte am TP-Link Router im Wohnzimmer leuchtet <strong>grün</strong>. In diesem Fall sollte das Internet einwandfrei funktionieren.</li>
              <li>Falls die Leuchte <strong>rot</strong> ist, ziehen Sie das Netzkabel mit der Aufschrift „Internet" aus der Steckdose, warten Sie 10 Sekunden und stecken Sie es wieder ein. Dadurch wird die Verbindung zurückgesetzt. Es kann bis zu 10 Minuten dauern, bis das Internet wieder verfügbar ist. Falls es danach immer noch nicht funktioniert, wenden Sie sich bitte an den Eigentümer Markus: <strong>+41 79 571 27 90</strong>.</li>
            </ul>
          `, `
            <p>There is free Wi-Fi. The details are shown above.</p>
            <p>We provide this service for your enjoyment and convenience. However, please note that you are responsible for its safe and appropriate use. If there is any loss of service, please contact us.</p>
            <h4>Troubleshooting</h4>
            <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/i691c483c00b18490/version/1777880764/image.jpg" alt="TP-Link Router" style="max-width:100%;margin-bottom:0.75rem;">
            <p>If the internet is not working properly, please perform the following checks/actions:</p>
            <ul>
              <li>The light on the TP-Link router in the living room is <strong>green</strong>. If this is the case, the internet should be working properly.</li>
              <li>If the light is <strong>red</strong>, pull the power cable labelled "Internet" from the socket, wait 10 seconds and plug it back in. This should reset the connection. It can take up to 10 minutes for the internet to come back. If it is still not working, please contact the owner Markus: <strong>+41 79 571 27 90</strong>.</li>
            </ul>
          `)}
        </div>
      </div>`
  },

  checkout: {
    title: () => t('Check-out Checkliste', 'Check-out Checklist'),
    backTo: 'screen-info',
    backNavId: 'nav-info',
    render: () => `
      <div class="detail-section">
        <div class="wifi-box">
          <div class="wifi-row">
            <span class="wifi-label">${t('Check-out bis spätestens', 'Check-out no later than')}</span>
            <span class="wifi-value">10:00</span>
          </div>
        </div>
        <div class="detail-body">
          ${t(
            '<p>Das Check-out ist strikt um 10:00 Uhr.</p><p>Falls Sie einen späteren Check-out benötigen, teilen Sie uns dies bitte im Voraus mit.</p>',
            '<p>Check-out time is strictly 10:00 AM.</p><p>If you require a later check-out, please let us know in advance.</p>'
          )}
        </div>
        <div class="detail-body" style="padding-top:0">
          <div class="notice">
            ${t(
              'Um Ihnen eventuelle Mehrkosten zu ersparen, möchten wir Sie freundlich bitten, die nachfolgenden Punkte vor Ihrer Abreise zu beachten. Sie erhalten diese Punkte auch noch als Papier-Checkliste, welche Sie bitte vor Ihrer Abreise abgeben.',
              'To help you avoid any additional charges, we kindly ask you to go through the following points before your departure. You will also receive these points as a paper checklist, which we ask you to hand in before leaving.'
            )}
          </div>
        </div>
        <div class="checklist" style="padding-top:20px;">
          ${[
            t('Herd, Kochfelder und alle Lichter sind ausgeschaltet.', 'The oven, hobs and all lights are switched off.'),
            t('Der Kühlschrank ist leer.', 'The fridge is empty.'),
            t('Das Geschirr ist sauber und eingeräumt.', 'Dishes are clean and put in their place.'),
            t('Alle Wasserhähne sind zugedreht.', 'All the taps are closed.'),
            t('Die Bettwäsche wurde abgezogen und zusammen mit den Handtüchern in der roten Interhome-Tasche abgelegt.', "All bedding was removed and collected with the towels in Interhome's provided red bag."),
            t('Alle Fenster und Balkontüren sind vollständig geschlossen (nicht gekippt).', 'All windows and balcony doors are fully closed (not tilted).'),
            t('Das Mobiliar steht an seinem angestammten Platz.', 'The furniture is in its original place.'),
            t('Die Wohnung ist aufgeräumt und eventuelle Beschädigungen wurden gemeldet.', 'The apartment has been tidied up and any damage has been reported.'),
            t('Alle Abfälle wurden entsorgt: Kehricht zur Sammelstelle, Recyclingmaterial (Glas, PET, Papier etc.) zur Recyclingstation. <a href="#" onclick="event.preventDefault();showDetail(\'house_waste\')" class="accent">→ Abfall &amp; Entsorgung</a>', 'All waste has been disposed of: general waste to the collection point, recyclables (glass, PET, paper, etc.) to the recycling station. <a href="#" onclick="event.preventDefault();showDetail(\'house_waste\')" class="accent">→ Waste &amp; Disposal</a>'),
            t('Asche aus dem Schwedenofen und der Feuerschale ist vollständig abgekühlt und wurde im Ascheeimer (neben dem Schwedenofen) entsorgt.', 'Ash from the wood-burning stove and fire bowl has fully cooled and been disposed of in the ash bucket (next to the stove).'),
            t('Alle Gartenmöbel (Hängematten, Liegestühle, Sitzkissen) wurden wieder im Haus verräumt.<br><small class="muted">Hinweis: Nur der Tisch unter der Pergola und die dazugehörigen Stühle (ohne Sitzkissen) können draussen bleiben.</small>', 'All garden furniture (hammocks, sun loungers, seat cushions) has been put back inside the house.<br><small class="muted">Note: Only the table under the pergola and its chairs (without cushions) may remain outside.</small>'),
          ].map((text, i) => `
            <label class="checklist-item">
              <input type="checkbox" class="checklist-cb" id="chk-co-${i}">
              <span class="checklist-icon"><svg viewBox="0 0 12 10" fill="none"><polyline points="1,5 4,9 11,1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              <span class="checklist-text">${text}</span>
            </label>
          `).join('')}
        </div>
      </div>`
  },

  contacts: {
    title: () => t('Notfallnummern & Kontakte', 'Useful Contact Numbers'),
    backTo: 'screen-info',
    backNavId: 'nav-info',
    render: () => `
      <div class="detail-section">
        <div class="contact-card">
          <h3>${t('Lokale Ansprechpartnerin', 'Local Contact')}</h3>
          <div class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ci-ico"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.08 2.2 2 2 0 012.08.02h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span>Anna – <a href="tel:+41794221608">+41 79 422 16 08</a></span>
          </div>
        </div>
        <div class="contact-card">
          <h3>${t('Eigentümer', 'Owners')}</h3>
          <div class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ci-ico"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.08 2.2 2 2 0 012.08.02h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span>Markus – <a href="tel:+41795712790">+41 79 571 27 90</a></span>
          </div>
          <div class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ci-ico"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.08 2.2 2 2 0 012.08.02h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span>Christine – <a href="tel:+41787403180">+41 78 740 31 80</a></span>
          </div>
        </div>
        <div class="contact-card">
          <h3>${t('Notfall', 'Emergency')}</h3>
          <div class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ci-ico"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>${t('Notruf: ', 'Emergency: ')}<a href="tel:112"><strong>112</strong></a></span>
          </div>
        </div>
        <div class="contact-card">
          <h3>${t('Arzt &amp; Apotheke', 'Doctors &amp; Pharmacy')}</h3>
          <div class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ci-ico"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.08 2.2 2 2 0 012.08.02h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span>Centro Medico Valposchiavo – <a href="tel:+41818390180">+41 81 839 01 80</a></span>
          </div>
          <div class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ci-ico"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.08 2.2 2 2 0 012.08.02h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span>Apotheke Bernina – <a href="tel:+41818440251">+41 81 844 02 51</a></span>
          </div>
        </div>
      </div>`
  },

  farewell: {
    title: () => t('Auf Wiedersehen', 'So Long, Farewell!'),
    backTo: 'screen-info',
    backNavId: 'nav-info',
    render: () => `
      <div class="detail-section">
        <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/ic84a6eab1436503a/version/1776081120/image.jpg" alt="Casa Maranta" class="welcome-photo" />
        <div class="detail-body">
          ${t(`
            <p>Herzlichen Dank, dass Sie bei uns zu Gast waren. Wir hoffen, Sie haben Ihren Aufenthalt in vollen Zügen genossen!</p>
            <p>Falls es während Ihres Aufenthalts etwas zu bemängeln gab, zögern Sie nicht, uns zu informieren – wir möchten sicherstellen, dass wir es für den nächsten Gast verbessern können.</p>
            <p>Kommen Sie gut nach Hause und bis auf hoffentlich bald im schönen Poschiavo.</p>
            <p>Liebe Grüsse<br>Christine &amp; Markus</p>
          `, `
            <p>Thank you so much for staying with us. We hope you enjoyed every moment of your time here!</p>
            <p>If there was anything that didn't meet your expectations during your stay, please don't hesitate to let us know – we'd love to make it even better for the next guest.</p>
            <p>Safe travels home, and we hope to see you again soon in beautiful Poschiavo.</p>
            <p>Warm regards,<br>Christine &amp; Markus</p>
          `)}
        </div>
      </div>`
  },

  localguide: {
    title: () => t('Ausflugstipps', 'Your Local Area Guide'),
    backTo: 'screen-info',
    backNavId: 'nav-info',
    render: () => `
      <div class="detail-section">
        <div class="signpost signpost--flush">
          <div class="signpost-mast" aria-hidden="true"></div>
          <button class="plate plate--out" onclick="showDetail('restaurants')" style="--i:0">
            <span class="plate-bolt"></span>
            <svg class="plate-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v7a2 2 0 004 0V3M8 12v9"/><path d="M17 3c-1.7 1-2.5 2.8-2.5 5s.8 3 2 3.2L16 21"/></svg>
            <span class="plate-name">${t('Restaurants', 'Restaurants')}</span>
          </button>
          <button class="plate plate--out" onclick="showDetail('grocery')" style="--i:1">
            <span class="plate-bolt"></span>
            <svg class="plate-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h2.4l2.3 9.5h9.1L19 8H7"/><circle cx="9" cy="19" r="1.5"/><circle cx="16.5" cy="19" r="1.5"/></svg>
            <span class="plate-name">${t('Einkaufen', 'Grocery Shopping')}</span>
          </button>
          <button class="plate plate--out" onclick="showDetail('activities')" style="--i:2">
            <span class="plate-bolt"></span>
            <svg class="plate-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20l6-10 3.2 4.4L15 8l6 12z"/></svg>
            <span class="plate-name">${t('Aktivitäten', 'Activities')}</span>
          </button>
        </div>
      </div>`
  },

  restaurants: {
    title: () => t('Restaurants', 'Restaurants'),
    backTo: null,
    render: () => `
      <div class="detail-section">
        <div class="info-box">
          ${t(
            'Beim Essen können Sie in Poschiavo eigentlich nichts falsch machen – die Qualität der Restaurants in der Region ist durchwegs ausgezeichnet. Von einfacher, regionaler Küche bis hin zu besonderen Spezialitäten ist für jeden Geschmack etwas dabei.<br><br>Hier finden Sie eine Auswahl unserer persönlichen Favoriten.<br><br><strong>Gourmet-Tipp:</strong> Apéro in der Hostaria del Borgo, Hauptspeise in der Pizzeria Albrici und zum Dessert eine Portion Eis im Bio-Bistro Semadeni.',
            'You really can\'t go wrong with food in Poschiavo – the quality of restaurants in the region is consistently excellent. From simple, regional cuisine to special local specialities, there is something for every taste.<br><br>Here is a selection of our personal favourites.<br><br><strong>Gourmet tip:</strong> Aperitivo at Hostaria del Borgo, main course at Pizzeria Albrici, and for dessert a scoop of ice cream at Bio-Bistro Semadeni.'
          )}
        </div>
        ${renderPlaceCard('albrici', t('Pizzeria Albrici','Pizzeria Albrici'),
          t('Dieses Restaurant, direkt am Dorfplatz von Poschiavo gelegen, bietet köstliche Pizzen, Qualitätsfleisch und lokale Spezialitäten.',
            'This restaurant, located right in the middle of Poschiavo\'s town square, offers delicious pizzas, quality meats, and local specialties.'),
          'https://maps.google.com/maps?q=Pizzeria+Albrici+Poschiavo',
          'https://www.gaultmillau.ch/fp/660/440/1280/854/sites/default/files/hotel_albrici_.jpg'
        )}
        ${renderPlaceCard('semadeni', t('Bio-Bistro Semadeni','Bio-Bistro Semadeni'),
          t('Kaffee mit fantastischem italienischem Eis.',
            'Coffee with amazing Italian Ice Cream.'),
          'https://maps.google.com/maps?q=Bio+Bistro+Semadeni+Poschiavo',
          'https://img.oastatic.com/imgsrc/42081867/.jpg'
        )}
        ${renderPlaceCard('crocebianca', t('Ristorante Croce Bianca','Ristorante Croce Bianca'),
          t('Ausgezeichnete Küche und elegantes Ambiente.',
            'Excellent cuisine and a refined atmosphere.'),
          'https://maps.google.com/maps?q=Ristorante+Croce+Bianca+Poschiavo',
          'https://www.croce-bianca.ch/de/img/asset/YXNzZXRzL2hlcm8vaG9tZS1yaXN0b3JhbnRlLmpwZw/home-ristorante.jpg?fm=webp&q=80&fit=crop&s=6877315a59998d39049fb712f1aa51d1'
        )}
        ${renderPlaceCard('bernina', t('Risturant al Bernina','Risturant al Bernina'),
          t('Geniessen Sie eine Mischung aus regionaler Küche und klassischen Gerichten – von einfachen, herzhaften Speisen bis hin zu Pizza und Desserts. Die Atmosphäre ist unkompliziert und freundlich – ideal für einen gemütlichen Abend im Dorf.',
            'Enjoy a mix of regional cuisine and classic dishes – from simple, hearty meals to pizza and desserts. The atmosphere is relaxed and friendly – ideal for a cosy evening in the village.'),
          'https://maps.google.com/maps?q=Ristorante+al+Bernina+Poschiavo',
          'https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,width=1024,height=763/image/508065883/ee6781fc-441b-4863-8d46-15cd7caaf590.png'
        )}
        ${renderPlaceCard('romantica', t('Ristorante giardino – Hotel La Romantica','Ristorante giardino – Hotel La Romantica'),
          t('Nahe dem Lago di Poschiavo gelegen, bietet dieses Restaurant einen wunderschönen Garten, hervorragendes Essen und freundliches Personal. Es gibt auch einen Spielplatz für Kinder, und der Minigolf-Platz befindet sich gleich nebenan.',
            'Near Lake Poschiavo, this restaurant features a beautiful garden, excellent food, and friendly staff. There is also a great playground for children, and the mini-golf course is located right next door.'),
          'https://maps.google.com/maps?q=Hotel+La+Romantica+Le+Prese+Poschiavo',
          'https://www.freedreams.ch/media/detail/hotel/229491-hotel-la-romantica-le-prese-906423f852af266f.jpg'
        )}
        ${renderPlaceCard('miralago', t('Ristorante Grotto Miralago','Ristorante Grotto Miralago'),
          t('Das Grotto Miralago liegt direkt am Ufer des Lago di Poschiavo und gehört zu den besonders stimmungsvollen Restaurants der Region. In historischem Ambiente – vom alten Grotto über eine umgebaute Stallung bis zur Terrasse mit Seeblick – werden regionale und saisonale Gerichte mit frischen Zutaten serviert.',
            'The Grotto Miralago sits right on the bank of Lake Poschiavo and is one of the most atmospheric restaurants in the region. In a historic setting — from the old grotto to a converted stable to a terrace with lake views — regional and seasonal dishes are served using fresh local ingredients.'),
          'https://maps.google.com/maps?q=Grotto+Miralago+Poschiavo',
          'https://www.albergomiralago.ch/wp-content/uploads/2023/04/8_optimized.jpg'
        )}
        ${renderPlaceCard('raselli', t('Hotel Sport / Raselli – Restaurant','Hotel Sport / Raselli – Restaurant'),
          t('Das Restaurant im Raselli Sport Hotel ist ein klassisches, familiengeführtes Haus mit viel Charme und Tradition. Hier erwartet Sie eine gemütliche Atmosphäre mit typischer Bündner Stube, Terrasse und Veranda. Serviert werden regionale Spezialitäten aus dem Valposchiavo sowie italienische Klassiker und Pizza aus dem Holzofen. Besonders geschätzt werden die Gerichte mit lokalen und teilweise hausgemachten Bio-Zutaten.',
            'The restaurant at Raselli Sport Hotel is a classic, family-run establishment full of charm and tradition. You\'ll find a cosy atmosphere with a typical Graubünden dining room, terrace and veranda. The menu features regional specialities from Valposchiavo as well as Italian classics and wood-fired pizza. Dishes made with local and partly home-grown organic ingredients are particularly popular.'),
          'https://maps.google.com/maps?q=Hotel+Sport+Raselli+Poschiavo',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/fd/cb/cd/wintergarten.jpg?w=500&h=-1&s=1'
        )}
        ${renderPlaceCard('hostaria', t('Hostaria del Borgo','Hostaria del Borgo'),
          t('Die Hostaria del Borgo ist eine kleine, stilvolle Wein- und Aperobar im historischen Zentrum von Poschiavo. Der Fokus liegt auf lokalen Weinen aus dem Valposchiavo sowie einer sorgfältig ausgewählten Karte mit kleinen regionalen Spezialitäten. Hier treffen sich Touristen und Einheimische gleichermassen.',
            'The Hostaria del Borgo is a small, stylish wine and aperitivo bar in the historic centre of Poschiavo. The focus is on local wines from Valposchiavo and a carefully curated menu of small regional specialities. A meeting place for tourists and locals alike.'),
          'https://maps.google.com/maps?q=Hostaria+del+Borgo+Poschiavo',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/07/d1/a3/caption.jpg?w=1100&h=1100&s=1'
        )}
        ${renderPlaceCard('selva', t('Ristorante Selva','Ristorante Selva'),
          t('Die Speisekarte ist bewusst klein und unspektakulär – im Ristorante Selva steht nicht das Essen im Vordergrund, sondern der Ort selbst. Auf rund 1\'800 m ü.M. gelegen bietet das Restaurant eine ruhige, abgeschiedene Lage inmitten der Natur. Die Aussicht und die Atmosphäre machen es zu einem idealen Ort für eine Pause während einer Wanderung oder eines Ausflugs im oberen Valposchiavo. Ein einfacher, authentischer Ort zum Durchatmen und Abschalten. Hinweis: Die Anfahrt mit dem Auto ist möglich, aber die Strasse ist eng.',
            'The menu is intentionally small and unpretentious – at Ristorante Selva, it\'s not the food that takes centre stage, but the place itself. Situated at around 1,800 m above sea level, the restaurant offers a peaceful, secluded setting in the heart of nature. The views and atmosphere make it an ideal spot for a break during a hike or excursion in the upper Valposchiavo. A simple, authentic place to breathe and unwind. Note: Access by car is possible, but the road is narrow.'),
          'https://maps.google.com/maps?q=Ristorante+Selva+Poschiavo',
          'https://www.valposchiavo.org/pensioneselva/gestate.jpg'
        )}
        ${renderPlaceCard('alpgrum', t('Alp Grüm Restaurant','Alp Grüm Restaurant'),
          t('Das Restaurant auf Alp Grüm liegt spektakulär auf 2\u2019091 m ü. M. und ist Teil der bekannten Station der Berninabahn. Von hier aus geniessen Sie einen beeindruckenden Blick über das Valposchiavo und auf den Palügletscher. Der ideale Start oder Abschluss einer der schönen Wanderungen in der Gegend.',
            'The restaurant at Alp Grüm is spectacularly located at 2,091 m above sea level and is part of the well-known Bernina Railway station. From here you enjoy an impressive view over the Valposchiavo and the Palü glacier. The perfect start or end to a hike in the area.'),
          'https://maps.google.com/maps?q=Alp+Grum+Restaurant',
          'https://media-cdn.tripadvisor.com/media/photo-s/1e/c7/54/1b/aussicht-panorama-von.jpg'
        )}
        ${renderPlaceCard('castelgrumello', t('Ristoro Castel Grumello','Ristoro Castel Grumello'),
          t('Bereits in Italien gelegen, liegt das Ristoro Castel Grumello etwas oberhalb von Tirano, direkt bei den Ruinen des Castello di Grumello. Die Lage verbindet Geschichte mit einer schönen Aussicht über das Veltlin.',
            'Already in Italy, the Ristoro Castel Grumello sits just above Tirano, right next to the ruins of Castello di Grumello. The location combines history with a beautiful view over the Valtellina.'),
          'https://maps.google.com/maps?q=Ristoro+Castel+Grumello+Tirano',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/a2/0e/b8/ristoro-castel-grumello.jpg?w=1100&h=1100&s=1'
        )}
      </div>`
  },

  grocery: {
    title: () => t('Einkaufen', 'Grocery Shopping'),
    backTo: null,
    render: () => `
      <div class="detail-section">
        ${renderPlaceCard('coop', t('Supermarkt (Coop) Poschiavo','Supermarket (Coop) Poschiavo'),
          t('Der grösste Supermarkt in der Umgebung.',
            'The largest supermarket in the area.'),
          'https://maps.google.com/maps?q=Coop+Poschiavo'
        )}
        ${renderPlaceCard('pozzi', t('Mini-Markt Pozzi Alimentari – Prima Poschiavo','Mini-market Pozzi Alimentari – Prima Poschiavo'),
          t('Kleiner Nahversorger im Dorf.',
            'Small local grocery store in the village.'),
          'https://maps.google.com/maps?q=Pozzi+Alimentari+Poschiavo'
        )}
        ${renderPlaceCard('scalino', t('Metzgerei Scalino','Butcher Scalino'),
          t('Die besten Fleischprodukte weit und breit – ein absolutes Muss. Glauben Sie uns, Sie werden es nicht bereuen.',
            'The best meat products far and wide — you have to check this out. Believe us, you won\'t regret it.'),
          'https://maps.google.com/maps?q=Scalino+Poschiavo'
        )}
        ${renderPlaceCard('bordoni', t('Bäckerei Bordoni – Panetteria Pasticceria','Bakery Bordoni – Panetteria Pasticceria'),
          t('Frische Backwaren und Patisserie, Via da Spultri, Poschiavo.',
            'Fresh baked goods and pastries, Via da Spultri, Poschiavo.'),
          'https://maps.google.com/maps?q=Panetteria+Bordoni+Poschiavo'
        )}
        ${renderPlaceCard('zanetti', t('Metzgerei Zanetti','Butcher Zanetti'),
          t('Lokale Metzgerei mit hervorragenden Produkten.',
            'Local butcher with excellent products.'),
          'https://maps.google.com/maps?q=Zanetti+Poschiavo'
        )}
      </div>`
  },

  activities: {
    title: () => t('Aktivitäten', 'Activities'),
    backTo: null,
    render: () => `
      <div class="detail-section">
        <div class="info-box">
          ${t(
            'Es gibt so viel zu sehen und zu erleben in der Region – wir teilen hier einige unserer persönlichen Highlights, die wir besonders lieben. Für noch mehr Ideen und Aktivitäten besuchen Sie das Tourismusbüro Valposchiavo oder deren Website unter <a href="https://www.valposchiavo.ch/de/explore" target="_blank">valposchiavo.ch/de/explore</a> – dort ist wirklich für jeden etwas dabei!',
            'There is so much to see and experience in the region, and we would like to share a few of our personal highlights that we especially enjoy. For many more ideas and activities, you can also visit Valposchiavo Tourism Office or explore their website at <a href="https://www.valposchiavo.ch/de/explore" target="_blank">valposchiavo.ch/de/explore</a> – there is truly something for everyone!'
          )}
        </div>
        ${renderPlaceCard('saoseo', t('Lago di Saoseo','Lago di Saoseo'),
          t('Der Lagh da Saoseo ist absolut eines der beeindruckendsten Ziele, die wir kennen – ein echtes Highlight der Region. Umgeben von Lärchen, Arven und dramatischer Alpenkulisse schaffen die intensiv blauen Gewässer des Sees ein atemberaubendes Bild, das wir immer wieder besuchen möchten. Sie können durch das Naturschutzgebiet Val da Camp ab Sfazù wandern oder den PostAuto-Dienst nutzen. Vom PostBus-Halt in Sfazù fährt ein kleiner Bus nach Lungacqua oder Alp Camp – die Plätze sind begrenzt, also unbedingt vorher reservieren.',
            'The Lagh da Saoseo is absolutely one of the most stunning destinations we know — a true highlight of the region. Surrounded by larches, stone pines, and dramatic alpine scenery, the intense blue waters of the lake create a breathtaking and unforgettable setting. You can hike through the peaceful Val da Camp nature reserve from Sfazù, or use the local PostBus service. From the PostBus stop at Sfazù, a small bus takes you up to Lungacqua or Alp Camp — seats are limited and you need to book in advance.'),
          'https://maps.google.com/maps?q=Lago+di+Saoseo+Valposchiavo',
          'https://media.myswitzerland.com/image/fetch/c_lfill,g_auto,w_3200,h_1800/f_auto,q_80,fl_keep_iptc/https://www.myswitzerland.com/-/media/st/gadmin/images/web-team%20only/images%20from%20id%2075/sth5750h_45930.jpg'
        )}
        ${renderPlaceCard('cavaglia', t('Gletschergarten Cavaglia','The Cavaglia Glacier Garden'),
          t('Der Gletschergarten Cavaglia ist einer unserer absoluten Lieblingsorte in der Region. Geformt durch uralte Gletscher ist diese bemerkenswerte Naturstätte bekannt für ihre eindrucksvollen Gletschermühlen, alpine Vegetation und eine überraschend vielfältige Flora. Der Gletschergarten ist bequem vom Bahnhof Cavaglia der berühmten Rhätischen Bahn (UNESCO-Welterbe) erreichbar. Seit 2021 erschliesst ein neuer Weg entlang der Cavaglia-Schlucht noch faszinantere Felsformationen.',
            'The Cavaglia Glacier Garden is one of our absolute favourite places in the region. Shaped by ancient glaciers, this remarkable natural site is known for its impressive giants\' pots, alpine vegetation, and surprisingly diverse flora. The Glacier Garden is easily reached from Cavaglia station on the famous Rhaetian Railway Red Train, a UNESCO World Heritage route. Since 2021, a new path along the Cavaglia Gorge reveals even more fascinating rock formations.'),
          'https://maps.google.com/maps?q=Gletschergarten+Cavaglia',
          'https://ggc.swiss/images/orrido/passerella-orrido.jpg'
        )}
        ${renderPlaceCard('minigolf', t('Minigolf Le Prese','Minigolf Le Prese'),
          t('Wir lieben es, mit unseren Töchtern und Freunden hierher zu kommen. Direkt neben dem Albergo La Romantica gelegen, ist dieser charmante 18-Loch-Minigolfplatz perfekt für entspannte Familienzeit – und für etwas freundschaftlichen Wettbewerb. Hinweis: Nur Barzahlung.',
            'We love coming to Minigolf Le Prese with our daughters and friends. Located right next to Albergo La Romantica, this charming 18-hole minigolf course is perfect for relaxed family time. Set in a green garden surrounded by colourful flowers and lush plants. Please note: payment is cash only.'),
          'https://maps.google.com/maps?q=Minigolf+Le+Prese+Poschiavo',
          'https://www.datocms-assets.com/118512/1740061856-minigolf_ok.tiff?crop=focalpoint&fit=crop&q=75&w=1920&auto=compress&fm=avif&ar=800%3A1000&fp-x=0.50000000&fp-y=0.50000000'
        )}
        ${renderPlaceCard('legend', t('Legend Trail','Legend Trail'),
          t('Der Legend Trail beginnt in der Nähe der Kirche San Piero und führt durch alte Lärchen, Tannen und farbige Laubbäume. Es ist ein Kunstweg, der für alle geeignet ist, auch für Familien und Schulgruppen. Knapp 2 km lang, ohne besondere Schwierigkeiten. Anlässlich der Valposchiavo Expo 2018 schufen mehrere Künstler und Bildhauer Skulpturen, die Figuren aus Heldengedichten darstellen.',
            'The Legend Trail starts near the church of San Piero and winds through old larches, firs, and colorful deciduous trees. It is an artistic route suitable for everyone, including families and school groups. Just under 2 km long, it does not present particular difficulties. On the occasion of the Valposchiavo Expo 2018, several artists and sculptors created statues representing various characters from epic poems.'),
          'https://maps.google.com/maps?q=Legend+Trail+San+Piero+Poschiavo',
          'https://media-v2.discover.swiss/image/img_4kq_gaebfiie?nobiblio=true&width=1050&height=560'
        )}
        ${renderPlaceCard('sanromerio', t('Chiesa di San Romerio','Chiesa di San Romerio'),
          t('Die Chiesa di San Romerio liegt spektakulär auf einer Felskante hoch über dem Lago di Poschiavo und gehört zu den eindrücklichsten Aussichtspunkten der Region. Die kleine Kirche stammt aus dem Mittelalter und ist ein beliebtes Ziel für Wanderungen.',
            'The Chiesa di San Romerio is spectacularly situated on a rocky ledge high above Lake Poschiavo and is one of the most impressive viewpoints in the region. The small church dates from the Middle Ages and is a popular hiking destination.'),
          'https://maps.google.com/maps?q=Chiesa+di+San+Romerio+Poschiavo',
          'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFTCkxXb5LHNd7X_MtRMJHjoCnL1WrEzHcXcT5YHR7uq-ImeSvoJglg3NAjU6KuJVhG4wApR8Bbv8uHfln2ZswSH9EgTVx6N-UXdToBhgX_NYuNL1sHWO_RtUWOW2Hq4y98ChXk=w408-h544-k-no'
        )}
        ${renderPlaceCard('diavolezza', t('Diavolezza','Diavolezza'),
          t('Auf der Diavolezza treffen sich Ausflügler, Wanderer, Schneesportler und Alpinisten – gemeinsam ist allen die Faszination für das Bernina-Massiv und die Gletscherwelt. Piz Palü und Piz Bernina sind allgegenwärtig: auf der Gletscherabfahrt nach Morteratsch, auf den Klettersteigen beim Piz Trovat oder der Sonnenterrasse des Berghauses.',
            'Diavolezza brings together day-trippers, hikers, snow sports enthusiasts and alpinists — all united by a fascination for the Bernina massif and the glacier world. Piz Palü and Piz Bernina are ever-present: on the glacier descent to Morteratsch, on the via ferratas near Piz Trovat, or from the sun terrace of the mountain restaurant.'),
          'https://maps.google.com/maps?q=Diavolezza+Pontresina',
          'https://www.corvatsch-diavolezza.ch/typo3temp/assets/_processed_/1/f/csm_942afb2cccfa9244d8a38860dca3d066d2f34e29-fp-16-9-6-35_8e7b7bca77.jpg'
        )}
      </div>`
  }
};

// ─────────────────────────────────────────────────────────────
// DISTANCES — every plate that points outward carries a real one,
// computed from the coordinates in MAP_PLACES. No place we cannot
// locate gets a number.
// ─────────────────────────────────────────────────────────────
const HOUSE = { lat: 46.31673649875822, lng: 10.05904302485825 };
const DETOUR = 1.25;      // straight line → plausible road/path
const WALK_KMH = 4.5;
const VALLEY_FLOOR_KM = 3;   // beyond this, ascent dominates and a time would lie

function haversineKm(a, b) {
  const R = 6371, rad = d => d * Math.PI / 180;
  const dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng);
  const s = Math.sin(dLat / 2) ** 2 +
            Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

function normName(s) {
  return String(s).toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
}

// Words shared across many places carry no identifying power.
const GENERIC_NAME_WORDS = new Set([
  'ristorante','restaurant','risturant','ristoro','hotel','pizzeria','bistro','bio',
  'markt','market','minimarkt','minimarket','mini','metzgerei','butcher','baeckerei',
  'bakery','panetteria','pasticceria','alimentari','prima','hostaria','grotto','borgo',
  'poschiavo','giardino','della','delle','del','die','der','das','und','and','the'
]);

function nameTokens(s) {
  return String(s).toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z0-9]+/)
    .filter(w => w.length >= 4 && !GENERIC_NAME_WORDS.has(w));
}

function findPlace(name) {
  const n = normName(name);
  if (!n) return null;
  for (const p of MAP_PLACES) {
    for (const title of [p.title_de, p.title_en]) {
      const tn = normName(title);
      if (tn && (tn === n || tn.includes(n) || n.includes(tn))) return p;
    }
  }
  // Card names and map titles drift apart across languages ("Butcher Scalino"
  // vs "Metzgerei Scalino"). Fall back to the distinctive proper noun.
  const want = nameTokens(name);
  if (!want.length) return null;
  for (const p of MAP_PLACES) {
    const have = nameTokens(p.title_de + ' ' + p.title_en);
    if (want.some(w => have.includes(w))) return p;
  }
  return null;
}

function distanceLabel(name) {
  const p = findPlace(name);
  if (!p) return '';
  const km = haversineKm(HOUSE, p) * DETOUR;
  if (km < 0.15) return t('Hier', 'Here');
  // Only the valley floor gets a time. Anything further is a mountain
  // destination whose ascent we hold no data for, so it gets distance.
  if (km <= VALLEY_FLOOR_KM) {
    const min = Math.max(5, Math.round(km / WALK_KMH * 60 / 5) * 5);
    if (min < 60) return min + ' min';
    const h = Math.floor(min / 60), m = min % 60;
    return m ? `${h} h ${m}` : `${h} h`;
  }
  const v = km < 10 ? km.toFixed(1) : String(Math.round(km));
  return (currentLang === 'de' ? v.replace('.', ',') : v) + ' km';
}

function renderPlaceCard(id, name, description, mapsUrl, imgUrl) {
  const imgHtml = imgUrl
    ? `<img src="${imgUrl}" alt="${name}" loading="lazy" onerror="this.style.display='none'">`
    : '';
  const dist = distanceLabel(name);
  const distHtml = dist ? `<span class="place-dist">${dist}</span>` : '';
  return `
    <div class="place-card">
      <div class="place-card-header is-open" id="head-${id}" role="button" tabindex="0"
           aria-expanded="true" aria-controls="body-${id}"
           onclick="togglePlace('${id}')"
           onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();togglePlace('${id}')}">
        <h3>${name}</h3>
        ${distHtml}
        <span class="toggle-chevron" id="chev-${id}" aria-hidden="true"></span>
      </div>
      <div class="place-card-body open" id="body-${id}">
        ${imgHtml}
        <p>${description}</p>
        <div class="place-card-actions">
          <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer"
             class="place-action-btn" data-label="${t('Route', 'Directions')}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </div>
    </div>`;
}

// ─────────────────────────────────────────────────────────────
// GOOGLE MAPS
// ─────────────────────────────────────────────────────────────
const MAP_PLACES = [
  // Property (Li Curt, Via da la Rasiga 12)
  { lat: 46.31673649875822, lng: 10.05904302485825, title_de: 'Casa Maranta', title_en: 'Casa Maranta', cat: 'home' },
  // Restaurants
  { lat: 46.326483260058644, lng: 10.05801262573524, title_de: 'Pizzeria Albrici', title_en: 'Pizzeria Albrici', cat: 'restaurant' },
  { lat: 46.326436624979245, lng: 10.05838072573526, title_de: 'Bio-Bistro Semadeni', title_en: 'Bio-Bistro Semadeni', cat: 'restaurant' },
  { lat: 46.32371684059596, lng: 10.05781412573512, title_de: 'Ristorante Croce Bianca', title_en: 'Ristorante Croce Bianca', cat: 'restaurant' },
  { lat: 46.32557005329137, lng: 10.057939365789553, title_de: 'Risturant al Bernina', title_en: 'Risturant al Bernina', cat: 'restaurant' },
  { lat: 46.291544834706954, lng: 10.078285812240575, title_de: 'Ristorante giardino – La Romantica', title_en: 'Ristorante giardino – La Romantica', cat: 'restaurant' },
  { lat: 46.273340602802236, lng: 10.100875239225077, title_de: 'Ristorante Grotto Miralago', title_en: 'Ristorante Grotto Miralago', cat: 'restaurant' },
  { lat: 46.29148516719607, lng: 10.078040969912049, title_de: 'Hotel Sport / Raselli – Restaurant', title_en: 'Hotel Sport / Raselli – Restaurant', cat: 'restaurant' },
  { lat: 46.32623344312135, lng: 10.05788153922796, title_de: 'Hostaria del Borgo', title_en: 'Hostaria del Borgo', cat: 'restaurant' },
  { lat: 46.301240784683685, lng: 10.049722196898104, title_de: 'Ristorante Selva', title_en: 'Ristorante Selva', cat: 'restaurant' },
  { lat: 46.3745729203996, lng: 10.031257060556033, title_de: 'Alp Grüm Restaurant', title_en: 'Alp Grüm Restaurant', cat: 'restaurant' },
  { lat: 46.17400106321347, lng: 9.898421646671483, title_de: 'Ristoro Castel Grumello', title_en: 'Ristoro Castel Grumello', cat: 'restaurant' },
  // Grocery
  { lat: 46.323868231066385, lng: 10.054737839227855, title_de: 'Coop Poschiavo', title_en: 'Coop Poschiavo', cat: 'grocery' },
  { lat: 46.3243730480346, lng: 10.057473795049141, title_de: 'Mini-Markt Pozzi Alimentari – Prima Poschiavo', title_en: 'Mini-Markt Pozzi Alimentari – Prima Poschiavo', cat: 'grocery' },
  { lat: 46.31406828008419, lng: 10.06082644107752, title_de: 'Metzgerei Scalino', title_en: 'Metzgerei Scalino', cat: 'grocery' },
  { lat: 46.32644174257124, lng: 10.05649741224247, title_de: 'Bäckerei Bordoni – Panetteria Pasticceria', title_en: 'Bäckerei Bordoni – Panetteria Pasticceria', cat: 'grocery' },
  { lat: 46.32580274425881, lng: 10.05764252573522, title_de: 'Metzgerei Zanetti', title_en: 'Metzgerei Zanetti', cat: 'grocery' },
  // Activities
  { lat: 46.399211037342894, lng: 10.125656483564159, title_de: 'Lago di Saoseo', title_en: 'Lago di Saoseo', cat: 'activity' },
  { lat: 46.36029205314771, lng: 10.04814332573707, title_de: 'Gletschergarten Cavaglia', title_en: 'Cavaglia Glacier Garden', cat: 'activity' },
  { lat: 46.291932798977086, lng: 10.079160798747822, title_de: 'Minigolf Le Prese', title_en: 'Minigolf Le Prese', cat: 'activity' },
  { lat: 46.32605125708701, lng: 10.053413802043673, title_de: 'Legend Trail', title_en: 'Legend Trail', cat: 'activity' },
  { lat: 46.282314979738565, lng: 10.116724935399883, title_de: 'Chiesa di San Romerio', title_en: 'Chiesa di San Romerio', cat: 'activity' },
  { lat: 46.441046491006276, lng: 9.983496645286683, title_de: 'Diavolezza', title_en: 'Diavolezza', cat: 'activity' },
];

let googleMap = null;
let markers = [];
let mapInitialized = false;

// Markers are the same signage as the app: a yellow enamel plate,
// pointed, bolted to the map at the bolt hole. Category reads from the
// pictogram, never from a new colour. Only the house inverts.
function getMarkerIcon(cat) {
  const glyphs = {
    home:       '<path d="M14.6 15.4 20 11l5.4 4.4v5.2h-3.5v-3.1h-3.8v3.1h-3.5z"/>',
    restaurant: '<path d="M16.6 9.6v4.3a1.3 1.3 0 0 0 2.6 0V9.6"/><path d="M17.9 14.6v6"/>' +
                '<path d="M23.6 9.6c-1.1.8-1.6 2-1.6 3.4 0 1.3.5 2 1.2 2.2l-.3 5.4"/>',
    grocery:    '<path d="M14.2 11.2h1.6l1.6 6.3h6l1.3-4.4H16.4"/>' +
                '<path d="M18.4 20.3h.01"/><path d="M22.6 20.3h.01"/>',
    activity:   '<path d="M14.2 20.4l4-6.6 2.1 2.9 2.2-4 4.1 7.7z"/>'
  };
  const isHome = cat === 'home';
  const plate = isHome ? '#14181C' : '#FFCC00';
  const ink   = isHome ? '#FFCC00' : '#14181C';
  const glyph = glyphs[cat] || glyphs.activity;
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 30">' +
      `<path d="M4 4h28l10 11-10 11H4z" fill="${plate}" stroke="#0C0F12" stroke-width="1.2" stroke-linejoin="round"/>` +
      `<circle cx="9" cy="15" r="2" fill="${ink}"/>` +
      `<g fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${glyph}</g>` +
    '</svg>';
  return {
    url: 'data:image/svg+xml,' + encodeURIComponent(svg),
    scaledSize: new google.maps.Size(44, 30),
    anchor: new google.maps.Point(9, 15)
  };
}

function initMap() {
  if (mapInitialized || typeof google === 'undefined') return;
  mapInitialized = true;
  googleMap = new google.maps.Map(document.getElementById('google-map'), {
    center: { lat: 46.3195, lng: 10.0665 },
    zoom: 13,
    mapTypeControl: true,
    fullscreenControl: false,
    streetViewControl: true,
    zoomControl: true,
  });
  MAP_PLACES.forEach(place => {
    const marker = new google.maps.Marker({
      position: { lat: place.lat, lng: place.lng },
      map: googleMap,
      title: currentLang === 'de' ? place.title_de : place.title_en,
      icon: getMarkerIcon(place.cat)
    });
    const mapsNavUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
    const infoWindow = new google.maps.InfoWindow({
      content: `<div style="font-family:sans-serif;min-width:140px">` +
        `<strong>${currentLang === 'de' ? place.title_de : place.title_en}</strong>` +
        `<br><a href="${mapsNavUrl}" target="_blank" rel="noopener noreferrer" ` +
        `style="display:inline-flex;align-items:center;gap:4px;margin-top:6px;font-size:13px;color:#14181C;text-decoration:none">` +
        `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>` +
        `${currentLang === 'de' ? 'In Google Maps öffnen' : 'Open in Google Maps'}</a>` +
        `</div>`
    });
    marker.addListener('click', () => infoWindow.open(googleMap, marker));
    marker._cat = place.cat;
    markers.push(marker);
  });
}

function updateMapMarkers() {
  const activeCats = Array.from(document.querySelectorAll('.map-cat:checked')).map(el => el.value);
  markers.forEach(m => {
    m.setVisible(m._cat === 'home' || activeCats.includes(m._cat));
  });
}

function toggleMapFilter() {
  const panel = document.getElementById('map-filter-panel');
  const bar = document.getElementById('map-filter-bar');
  const hidden = panel.classList.toggle('hidden');
  bar.classList.toggle('is-open', !hidden);
  bar.setAttribute('aria-expanded', String(!hidden));
}

// Google Maps callback (called once API loads)
window.initGoogleMap = function() {
  if (document.getElementById('screen-map').classList.contains('active')) {
    initMap();
  }
};

// ─────────────────────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────────────────────
const SEARCH_INDEX = [
  // section headings
  { type: 'section', key: 'welcome', term_de: 'Willkommen', term_en: 'Welcome', navId: 'nav-info' },
  { type: 'section', key: 'arrival', term_de: 'Anreise Check-in Zugangscode', term_en: 'Arrival Check-in Access Code', navId: 'nav-info' },
  { type: 'section', key: 'wifi', term_de: 'WLAN Internet Passwort LaRasiga Fehlerbehebung Router WiFi', term_en: 'WiFi Internet Password Network Troubleshooting Router', navId: 'nav-info' },
  { type: 'section', key: 'checkout', term_de: 'Check-out Abreise', term_en: 'Check-out Departure', navId: 'nav-info' },
  { type: 'section', key: 'contacts', term_de: 'Kontakt Notfall Arzt Apotheke Anna', term_en: 'Contact Emergency Doctor Pharmacy Anna', navId: 'nav-info' },
  { type: 'section', key: 'farewell', term_de: 'Auf Wiedersehen Bewertung Danke', term_en: 'Farewell Thank You Review', navId: 'nav-info' },
  { type: 'section', key: 'restaurants', term_de: 'Restaurants Essen', term_en: 'Restaurants Food Dining', navId: 'nav-info' },
  { type: 'section', key: 'grocery', term_de: 'Einkaufen Supermarkt Metzger Bäcker', term_en: 'Grocery Shopping Supermarket Butcher Bakery', navId: 'nav-info' },
  { type: 'section', key: 'activities', term_de: 'Aktivitäten Ausflug Wandern', term_en: 'Activities Excursion Hiking', navId: 'nav-info' },
  { type: 'section', key: 'accommodation', term_de: 'Das Haus Unterkunft Übersicht', term_en: 'House Accommodation Overview', navId: 'nav-info' },
  { type: 'section', key: 'house_electricity', term_de: 'Strom Sicherungen Sicherungskasten Stromausfall', term_en: 'Electricity Fuses Fuse Box Power Outage', navId: 'nav-info' },
  { type: 'section', key: 'house_cleaning', term_de: 'Putzschrank Reinigung Putzmittel Bügeleisen Bügelbrett', term_en: 'Cleaning Cupboard Supplies Iron Ironing Board', navId: 'nav-info' },
  { type: 'section', key: 'house_kids', term_de: 'Kinder Hochstuhl Kinderstuhl Reisebett Babybett Gitterschutz Windeleimer', term_en: 'Children Kids High Chair Travel Cot Bed Guard', navId: 'nav-info' },
  { type: 'section', key: 'house_stove', term_de: 'Schwedenofen Kamin Holzofen Feuer Anzünden Kaminofen', term_en: 'Wood-Burning Stove Fireplace Fire Lighting', navId: 'nav-info' },
  { type: 'section', key: 'house_garden', term_de: 'Feuerschale Grill Garten Hängematte Liegestuhl Pergola BBQ', term_en: 'Fire Bowl BBQ Garden Hammock Sun Lounger Pergola', navId: 'nav-info' },
  { type: 'section', key: 'house_waste', term_de: 'Abfall Entsorgung Müll Kehricht Altglas PET Recycling Abfallsack', term_en: 'Waste Disposal Rubbish Recycling Glass PET Bin Bags', navId: 'nav-info' },
  { type: 'section', key: 'house_kitchen', term_de: 'Küchengeräte Herd Geschirrspüler Dampfabzug Mikrowelle Kochen Kindersicherung', term_en: 'Kitchen Appliances Hob Dishwasher Extractor Hood Microwave Cooking Child Lock', navId: 'nav-info' },
  { type: 'section', key: 'house_doors', term_de: 'Türen Fenster Haustür Nuki Zugangscode Schlüsselsafe Dachfenster', term_en: 'Doors Windows Front Door Nuki Access Code Key Safe Skylight', navId: 'nav-info' },
  { type: 'section', key: 'house_tv', term_de: 'TV Fernseher Radio Satellit PlayStation PS3 DAB Bluetooth Streaming HDMI', term_en: 'TV Television Radio Satellite PlayStation PS3 DAB Bluetooth Streaming HDMI', navId: 'nav-info' },
  { type: 'section', key: 'house_games', term_de: 'Gesellschaftsspiele Spiele Jass Schach Uno Scrabble Rummikub Yatzy', term_en: 'Board Games Games Chess Uno Scrabble Rummikub Yatzy Cards', navId: 'nav-info' },
  { type: 'section', key: 'house_reading', term_de: 'Leseecke Bücher Lesen Bibliothek', term_en: 'Reading Corner Books Library', navId: 'nav-info' },
  { type: 'section', key: 'localguide', term_de: 'Ausflugstipps Umgebung Sehenswürdigkeiten Region', term_en: 'Local Area Guide Excursions Sights Region', navId: 'nav-info' },
  // places with pins
  { type: 'place', key: 'restaurants', term_de: 'Pizzeria Albrici', term_en: 'Pizzeria Albrici', navId: 'nav-info' },
  { type: 'place', key: 'restaurants', term_de: 'Semadeni Bistro', term_en: 'Semadeni Bistro', navId: 'nav-info' },
  { type: 'place', key: 'restaurants', term_de: 'Croce Bianca', term_en: 'Croce Bianca', navId: 'nav-info' },
  { type: 'place', key: 'restaurants', term_de: 'La Romantica Giardino', term_en: 'La Romantica Giardino', navId: 'nav-info' },
  { type: 'place', key: 'restaurants', term_de: 'Grotto Miralago', term_en: 'Grotto Miralago', navId: 'nav-info' },
  { type: 'place', key: 'grocery', term_de: 'Coop Supermarkt Pozzi', term_en: 'Coop Supermarket Pozzi', navId: 'nav-info' },
  { type: 'place', key: 'grocery', term_de: 'Metzger Scalino Zanetti Fleisch', term_en: 'Butcher Scalino Zanetti Meat', navId: 'nav-info' },
  { type: 'place', key: 'grocery', term_de: 'Bäcker Bordoni Panetteria', term_en: 'Bakery Bordoni Panetteria', navId: 'nav-info' },
  { type: 'place', key: 'activities', term_de: 'Lago Saoseo See Wandern', term_en: 'Lago Saoseo Lake Hiking', navId: 'nav-info' },
  { type: 'place', key: 'activities', term_de: 'Gletschergarten Cavaglia Gletscher PIN', term_en: 'Cavaglia Glacier Garden PIN', navId: 'nav-info' },
  { type: 'place', key: 'activities', term_de: 'Minigolf Le Prese', term_en: 'Minigolf Le Prese', navId: 'nav-info' },
  { type: 'place', key: 'activities', term_de: 'Legend Trail Skulptur Kunstweg San Piero', term_en: 'Legend Trail sculpture art trail San Piero', navId: 'nav-info' },
  { type: 'place', key: 'welcome', term_de: 'Christine Markus Familie Maranta Geschichte PIN', term_en: 'Christine Markus Family Maranta History PIN', navId: 'nav-info' },
  { type: 'section', key: 'contacts', term_de: 'Notfallnummern PIN', term_en: 'Useful Contact Numbers', navId: 'nav-info' },
  { type: 'place', key: 'farewell', term_de: 'Auf Wiedersehen PIN Danke', term_en: 'Thank You For Staying With Us', navId: 'nav-info' },
];

function doSearch() {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  const results = document.getElementById('search-results');
  if (!query) { results.innerHTML = ''; return; }

  const termKey = currentLang === 'de' ? 'term_de' : 'term_en';
  const sectionMatches = [];
  const placeMatches = [];

  SEARCH_INDEX.forEach(item => {
    if (item[termKey].toLowerCase().includes(query)) {
      if (item.type === 'section') sectionMatches.push(item);
      else placeMatches.push(item);
    }
  });

  let html = '';
  if (sectionMatches.length === 0 && placeMatches.length === 0) {
    html = `<p class="search-empty">${t('Keine Ergebnisse für', 'No results for')} «${query}»</p>`;
  }
  if (sectionMatches.length > 0) {
    html += `<p class="search-group-title">${t('Treffer in Überschriften', 'Matches in a section heading')}</p>`;
    sectionMatches.forEach(item => {
      const label = DETAIL_PAGES[item.key] ? DETAIL_PAGES[item.key].title() : item[termKey].split(' ')[0];
      html += `<button class="search-result-item" onclick="searchGo('${item.key}','${item.navId}')">${label}</button>`;
    });
  }
  if (placeMatches.length > 0) {
    html += `<p class="search-group-title">${t('Treffer in Beschreibungen', 'Matches in a place or topic description')}</p>`;
    placeMatches.forEach(item => {
      const label = item[termKey].split(' ')[0].replace('PIN','').trim() || DETAIL_PAGES[item.key].title();
      const displayLabel = item[termKey].split(' ').filter(w => w !== 'PIN').slice(0,3).join(' ');
      html += `<button class="search-result-item" onclick="searchGo('${item.key}','${item.navId}')">
        ${displayLabel}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
      </button>`;
    });
  }
  results.innerHTML = html;
}

function searchGo(key, navId) {
  previousScreen = 'screen-search';
  showDetail(key);
  setNavActive(navId || 'nav-info');
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  document.getElementById('search-results').innerHTML = '';
}

// ─────────────────────────────────────────────────────────────
// WIRE UP: localguide grid card → modal
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Set language from storage
  setLang(currentLang);

  buildJourney();
  startJourney();

  // previousScreen tracking
  document.querySelectorAll('[onclick*="showScreen"]').forEach(el => {
    const match = el.getAttribute('onclick') && el.getAttribute('onclick').match(/showScreen\('([^']+)'\)/);
    if (match) {
      el.addEventListener('click', () => {
        if (match[1] !== 'screen-detail') previousScreen = match[1];
      });
    }
  });
});

function toggleWifiQR(btn) {
  const panel = document.getElementById('wifi-qr-panel');
  const isVisible = panel.style.display !== 'none';
  panel.style.display = isVisible ? 'none' : 'flex';
  btn.classList.toggle('active', !isVisible);
  btn.setAttribute('aria-expanded', String(!isVisible));
}


// ─────────────────────────────────────────────────────────────
// THE JOURNEY — cinematic home-screen Streckenplan. The camera
// rides beside the train from seven real origins: Zürich direct;
// Bern, Basel, Genf, St. Gallen and Luzern through the true rail
// network (Lausanne–Fribourg; Olten; Sargans joining at Chur; Zug);
// and Lugano arriving FROM THE SOUTH — the Bernina Express route
// over Tirano, up the valley past the Brusio spiral viaduct.
// Landmarks pop up as the train passes. The dashed walking trail
// ends at a home icon above the post title. 45°-only geometry;
// on the main line horizontal drift encodes real altitude.
// ─────────────────────────────────────────────────────────────
const JVIEW = { w: 390, h: 726, cx: 195, cy: 320, zoom: 2.4 };

const JNODES = {
  genf:     { x: 20,  y: 20,  n: 'Genf',       lx: 33,  ly: 24.5 },
  lausanne: { x: 20,  y: 50,  n: 'Lausanne',   lx: 33,  ly: 54.5 },
  fribourg: { x: 50,  y: 80,  n: 'Fribourg',   lx: 63,  ly: 84.5 },
  bern:     { x: 80,  y: 110, n: 'Bern',       lx: 93,  ly: 114.5 },
  basel:    { x: 178, y: 20,  n: 'Basel',      lx: 191, ly: 24.5 },
  olten:    { x: 110, y: 140, n: 'Olten',      lx: 123, ly: 144.5 },
  aarau:    { x: 140, y: 170, n: 'Aarau',      lx: 153, ly: 174.5 },
  stgallen: { x: 348, y: 72,  n: 'St. Gallen', lx: 336, ly: 76.5, anchor: 'end' },
  sargans:  { x: 288, y: 132, n: 'Sargans',    lx: 301, ly: 136.5 },
  luzern:   { x: 238, y: 120, n: 'Luzern',     lx: 226, ly: 124.5, anchor: 'end' },
  zug:      { x: 198, y: 160, n: 'Zug',        lx: 211, ly: 164.5 },
  lugano:   { x: 352, y: 706, n: 'Lugano',     lx: 340, ly: 700,  anchor: 'end' },
  tirano:   { x: 236, y: 706, n: 'Tirano',     lx: 236, ly: 721,  anchor: 'middle' },
  brusio:   { x: 202, y: 672, n: 'Brusio',     lx: 215, ly: 676.5 },
  leprese:  { x: 169, y: 639, n: 'Le Prese',   lx: 182, ly: 643.5 },
};

function JV(id) { const o = JNODES[id]; return { x: o.x, y: o.y, id: id }; }
const JTAIL = [JV('olten'), JV('aarau'), { x: 140, y: 173 }, { x: 81, y: 232 }];

const JOURNEY = {
  cycle: [
    { chain: null },
    { chain: 'bern' },
    { chain: 'basel' },
    { chain: 'genf' },
    { chain: 'stgallen' },
    { chain: 'luzern' },
    { chain: 'lugano' },
  ],
  chains: {
    bern:     [JV('bern')].concat(JTAIL),
    basel:    [JV('basel'), { x: 178, y: 92 }].concat(JTAIL),
    genf:     [JV('genf'), JV('lausanne'), JV('fribourg'), JV('bern')].concat(JTAIL),
    stgallen: [JV('stgallen'), JV('sargans'), { x: 155, y: 265 }, { x: 97, y: 265 }],
    luzern:   [JV('luzern'), JV('zug'), { x: 126, y: 232 }, { x: 81, y: 232 }],
    lugano:   [JV('lugano'), JV('tirano'), JV('brusio'), JV('leprese'), { x: 135, y: 605 }],
  },
  joins: { bern: 0, basel: 0, genf: 0, stgallen: 1, luzern: 0, lugano: 'south' },
  stations: [
    { n: 'Zürich HB',       alt: 408,  x: 81,  y: 232, showAlt: true },
    { n: 'Chur',            alt: 585,  x: 97,  y: 265 },
    { n: 'Filisur',         alt: 1032, x: 137, y: 313 },
    { n: 'Preda',           alt: 1789, x: 204, y: 383 },
    { n: 'Samedan',         alt: 1721, x: 198, y: 407 },
    { n: 'Pontresina',      alt: 1774, x: 203, y: 429 },
    { n: 'Ospizio Bernina', alt: 2253, x: 246, y: 476, showAlt: true, summit: true },
    { n: 'Alp Grüm',        alt: 2091, x: 231, y: 503, showAlt: true },
    { n: 'Poschiavo',       alt: 1014, x: 135, y: 605, showAlt: true, end: true },
  ],
  walkD: 'M135 605 L135 608 L17 726',
};

// Schematic elbow: vertical first, then a 45° diagonal into the station.
function journeyPathD(pts) {
  let d = 'M' + pts[0].x + ' ' + pts[0].y;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    const adx = Math.abs(b.x - a.x), v = (b.y - a.y) - adx;
    if (v > 0.5) d += ' L' + a.x + ' ' + (a.y + v);
    d += ' L' + b.x + ' ' + b.y;
  }
  return d;
}

function journeySegLens(pts) {
  const lens = [0];
  let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    const adx = Math.abs(b.x - a.x), v = Math.max(0, (b.y - a.y) - adx);
    acc += v + adx * Math.SQRT2;
    lens.push(acc);
  }
  return lens;
}

// Chains are explicit polylines (bends included), so length is exact.
function jPolyD(pts) {
  return pts.map((p, i) => (i ? 'L' : 'M') + p.x + ' ' + p.y).join(' ');
}
function jPolyLens(pts) {
  const lens = [0];
  let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    acc += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    lens.push(acc);
  }
  return lens;
}

function buildJourney() {
  const host = document.getElementById('journey');
  if (!host) return;
  const S = JOURNEY.stations;
  const railD = journeyPathD(S);

  let net = '';
  Object.keys(JOURNEY.chains).forEach(key => {
    net += '<path class="j-feeder" d="' + jPolyD(JOURNEY.chains[key]) + '"/>';
  });
  Object.keys(JOURNEY.chains).forEach(key => {
    net += '<path class="j-feeder-t" data-f="' + key + '" d="' + jPolyD(JOURNEY.chains[key]) + '"/>';
  });

  let nodeDots = '';
  Object.keys(JNODES).forEach(id => {
    const o = JNODES[id];
    nodeDots +=
      '<g class="j-stop" data-node="' + id + '">' +
        '<circle cx="' + o.x + '" cy="' + o.y + '" r="4.5"/>' +
        '<text class="j-name"' + (o.anchor ? ' text-anchor="' + o.anchor + '"' : '') +
          ' x="' + o.lx + '" y="' + o.ly + '">' + o.n + '</text>' +
      '</g>';
  });

  let stops = '';
  S.forEach((st, i) => {
    const r = st.end ? 6.5 : 5;
    stops +=
      '<g class="j-stop" data-idx="' + i + '">' +
        '<circle cx="' + st.x + '" cy="' + st.y + '" r="' + r + '"/>' +
        '<text class="j-name" x="' + (st.x + 16) + '" y="' + (st.y + 4.5) + '">' + st.n + '</text>' +
        (st.showAlt
          ? '<text class="j-alt" x="' + (st.x + 16) + '" y="' + (st.y + 18) + '">' + st.alt + ' m</text>'
          : '') +
      '</g>' +
      (st.summit
        ? '<path class="j-summit" d="M' + st.x + ' ' + (st.y - 20) + ' l5.5 9 h-11 z"/>'
        : '');
  });

  host.innerHTML =
    '<svg id="journey-svg" viewBox="0 0 ' + JVIEW.w + ' ' + JVIEW.h + '" preserveAspectRatio="xMidYMid meet">' +
      '<g id="jcam">' +
        net +
        '<path class="j-base" d="' + railD + '"/>' +
        '<path class="j-travel" d="' + railD + '"/>' +
        '<path class="j-walk" d="' + JOURNEY.walkD + '"/>' +
        '<text class="j-walklabel" x="88" y="636" text-anchor="end" data-de="15 Min. zu Fuss" data-en="15 min on foot">' +
          t('15 Min. zu Fuss', '15 min on foot') + '</text>' +
        nodeDots +
        stops +
        '<g class="j-train" opacity="0"><circle class="j-train-o" r="7"/><circle class="j-train-i" r="2.4"/></g>' +
      '</g>' +
    '</svg>';
}

const jAnim = { raf: 0, timer: 0, cycle: 0, cam: { tx: 0, ty: 0, z: 1 } };

function stopJourney() {
  cancelAnimationFrame(jAnim.raf);
  clearTimeout(jAnim.timer);
}

function jCamDesired(wx, wy, z) {
  let tx = JVIEW.cx - z * wx;
  let ty = JVIEW.cy - z * wy;
  tx = Math.min(0, Math.max(JVIEW.w * (1 - z), tx));
  ty = Math.min(0, Math.max(JVIEW.h * (1 - z), ty));
  return { tx: tx, ty: ty, z: z };
}

function jCamApply(svg) {
  const c = jAnim.cam;
  svg.querySelector('#jcam').setAttribute('transform',
    'translate(' + c.tx.toFixed(2) + ' ' + c.ty.toFixed(2) + ') scale(' + c.z.toFixed(4) + ')');
}

function jCamChase(svg, wx, wy, z) {
  const d = jCamDesired(wx, wy, z);
  const c = jAnim.cam;
  c.tx += (d.tx - c.tx) * 0.085;
  c.ty += (d.ty - c.ty) * 0.085;
  c.z  += (d.z  - c.z)  * 0.085;
  jCamApply(svg);
}

function jCamFly(svg, wx, wy, z, ms, done) {
  const from = { tx: jAnim.cam.tx, ty: jAnim.cam.ty, z: jAnim.cam.z };
  const to = jCamDesired(wx, wy, z);
  if (ms <= 0) { jAnim.cam = to; jCamApply(svg); done(); return; }
  const ease = p => 1 - Math.pow(1 - p, 3);
  const begin = performance.now();
  const frame = now => {
    const p = Math.min(1, (now - begin) / ms), e = ease(p);
    jAnim.cam = {
      tx: from.tx + (to.tx - from.tx) * e,
      ty: from.ty + (to.ty - from.ty) * e,
      z:  from.z  + (to.z  - from.z)  * e,
    };
    jCamApply(svg);
    if (p < 1) jAnim.raf = requestAnimationFrame(frame);
    else done();
  };
  jAnim.raf = requestAnimationFrame(frame);
}

function jResetBoard(svg) {
  const travel = svg.querySelector('.j-travel');
  const total = travel.getTotalLength();
  travel.style.strokeDasharray = total;
  travel.style.strokeDashoffset = total;
  svg.querySelectorAll('.j-stop').forEach(s => s.classList.remove('lit'));
  svg.querySelectorAll('.j-summit').forEach(s => s.classList.remove('lit'));
  svg.querySelectorAll('.j-feeder-t').forEach(p => {
    const l = p.getTotalLength();
    p.style.strokeDasharray = l;
    p.style.strokeDashoffset = l;
  });
  svg.querySelector('.j-walk').classList.remove('go');
  svg.querySelector('.j-walklabel').classList.remove('go');
  svg.querySelector('.j-train').setAttribute('opacity', '0');
}

function jLight(svg, key) {
  if (key.charAt(0) === 'n') {
    const el = svg.querySelector('.j-stop[data-node="' + key.slice(2) + '"]');
    if (el) el.classList.add('lit');
  } else {
    const i = +key.slice(2);
    const el = svg.querySelector('.j-stop[data-idx="' + i + '"]');
    if (el) el.classList.add('lit');
    if (i === 6) svg.querySelectorAll('.j-summit').forEach(x => x.classList.add('lit'));
  }
}

function jSchedule(lens, msTotal) {
  const segs = [];
  for (let i = 1; i < lens.length; i++) segs.push(lens[i] - lens[i - 1]);
  const weights = segs.map(s => Math.pow(s, 0.75));
  const wsum = weights.reduce((x, y) => x + y, 0);
  const durs = weights.map(w => Math.max(420, (w / wsum) * msTotal));
  const starts = [];
  let t0 = 120;
  durs.forEach(d => { starts.push(t0); t0 += d; });
  return { segs: segs, durs: durs, starts: starts, totalT: t0 };
}

const jEase = p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

function jProgress(sch, lens, el) {
  if (el < sch.starts[0]) return 0;
  let i = sch.segs.length - 1;
  for (let k = 0; k < sch.segs.length; k++) {
    if (el < sch.starts[k] + sch.durs[k]) { i = k; break; }
  }
  const p = Math.min(1, (el - sch.starts[i]) / sch.durs[i]);
  return lens[i] + jEase(p) * sch.segs[i];
}

// The train rides a feeder polyline; nodes and landmarks light as passed.
function jRunChain(svg, key, done) {
  const pts = JOURNEY.chains[key];
  const lens = jPolyLens(pts);
  const fpath = svg.querySelector('.j-feeder-t[data-f="' + key + '"]');
  const train = svg.querySelector('.j-train');
  const total = lens[lens.length - 1];
  const milestones = pts.map((p, i) => p.id ? { len: lens[i], key: 'n:' + p.id, hit: false } : null).filter(Boolean);
  if (key === 'lugano') milestones.push({ len: total, key: 'm:8', hit: false });
  const sch = jSchedule(lens, Math.max(1500, total / 500 * 6800));
  const begin = performance.now();
  train.setAttribute('opacity', '1');
  const frame = now => {
    const L = jProgress(sch, lens, now - begin);
    fpath.style.strokeDashoffset = Math.max(0, total - L);
    const pt = fpath.getPointAtLength(Math.min(L, total));
    train.setAttribute('transform', 'translate(' + pt.x + ' ' + pt.y + ')');
    milestones.forEach(m => { if (!m.hit && m.len <= L + 0.5) { m.hit = true; jLight(svg, m.key); } });
    jCamChase(svg, pt.x, pt.y, JVIEW.zoom);
    if (now - begin < sch.totalT) jAnim.raf = requestAnimationFrame(frame);
    else done();
  };
  jAnim.raf = requestAnimationFrame(frame);
}

// The main line, ridden from fromIdx (St. Gallen joins at Chur).
function jRunMain(svg, fromIdx, done) {
  const S = JOURNEY.stations;
  const travel = svg.querySelector('.j-travel');
  const train = svg.querySelector('.j-train');
  const full = journeySegLens(S);
  const fullTotal = travel.getTotalLength();
  const sub = S.slice(fromIdx);
  const lens = journeySegLens(sub);
  const base = full[fromIdx];
  const total = lens[lens.length - 1];
  const milestones = sub.map((st, k) => ({ len: lens[k], key: 'm:' + (fromIdx + k), hit: false }));
  const sch = jSchedule(lens, 6800 * (total / full[full.length - 1]));
  const begin = performance.now();
  train.setAttribute('opacity', '1');
  travel.style.strokeDashoffset = 0;
  const frame = now => {
    const L = jProgress(sch, lens, now - begin);
    travel.style.strokeDasharray = '0 ' + base + ' ' + L + ' ' + fullTotal;
    const pt = travel.getPointAtLength(Math.min(base + L, fullTotal));
    train.setAttribute('transform', 'translate(' + pt.x + ' ' + pt.y + ')');
    milestones.forEach(m => { if (!m.hit && m.len <= L + 0.5) { m.hit = true; jLight(svg, m.key); } });
    jCamChase(svg, pt.x, pt.y, JVIEW.zoom);
    if (now - begin < sch.totalT) jAnim.raf = requestAnimationFrame(frame);
    else done();
  };
  jAnim.raf = requestAnimationFrame(frame);
}

function startJourney() {
  const svg = document.getElementById('journey-svg');
  if (!svg) return;
  stopJourney();
  jResetBoard(svg);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    jAnim.cam = { tx: 0, ty: 0, z: 1 };
    jCamApply(svg);
    svg.querySelector('.j-travel').style.strokeDashoffset = 0;
    svg.querySelectorAll('.j-stop[data-idx]').forEach(s => s.classList.add('lit'));
    svg.querySelectorAll('.j-summit').forEach(s => s.classList.add('lit'));
    svg.querySelector('.j-walk').classList.add('go');
    svg.querySelector('.j-walklabel').classList.add('go');
    return;
  }
  jAnim.cycle = 0;
  jRunCycle(svg, true);
}

function jRunCycle(svg, first) {
  const c = JOURNEY.cycle[jAnim.cycle % JOURNEY.cycle.length];
  jResetBoard(svg);
  const chainPts = c.chain ? JOURNEY.chains[c.chain] : null;
  const origin = chainPts ? chainPts[0] : JOURNEY.stations[0];
  const train = svg.querySelector('.j-train');
  train.setAttribute('transform', 'translate(' + origin.x + ' ' + origin.y + ')');

  const arrive = () => {
    train.setAttribute('opacity', '0');
    jAnim.timer = setTimeout(() => {
      jCamFly(svg, JVIEW.cx, JVIEW.cy, 1, 1300, () => {
        svg.querySelector('.j-walk').classList.add('go');
        svg.querySelector('.j-walklabel').classList.add('go');
        const hm = document.querySelector('#screen-home .home-mark');
        if (hm) { hm.classList.remove('arrived'); void hm.getBoundingClientRect(); hm.classList.add('arrived'); }
        if (jAnim.cycle === 0) {
          const plate = document.querySelector('#screen-home .plate--action');
          if (plate) { plate.classList.remove('arrived'); void plate.offsetWidth; plate.classList.add('arrived'); }
        }
        jAnim.timer = setTimeout(() => {
          jAnim.cycle++;
          jRunCycle(svg, false);
        }, 4600);
      });
    }, 480);
  };

  const ride = () => {
    if (!c.chain) { jRunMain(svg, 0, arrive); return; }
    const join = JOURNEY.joins[c.chain];
    if (join === 'south') jRunChain(svg, c.chain, arrive);
    else jRunChain(svg, c.chain, () => jRunMain(svg, join, arrive));
  };

  jCamFly(svg, origin.x, origin.y, JVIEW.zoom, first ? 0 : 1000, () => {
    jAnim.timer = setTimeout(ride, first ? 700 : 420);
  });
}

// ─────────────────────────────────────────────────────────────
// BOARD GAMES — each game is a plate that points at its rules.
// Names, labels and links are exactly the owners’ own.
// ─────────────────────────────────────────────────────────────
const HOUSE_GAMES = [
  { n_de: 'Jasskarten', n_en: 'Jass cards', s_de: 'deutsche und französische Karten', s_en: 'German and French cards for Switzerland\'s favourite card game', l_de: 'Anleitung', l_en: 'Rules', u_de: 'https://jassverzeichnis.ch/thema/jassregeln-jassarten/', u_en: 'https://www.swisslos.ch/en/jass/informations/jass-rules/principles-of-jass.html' },
  { n_de: 'Uno', n_en: 'Uno', s_de: '', s_en: '', l_de: 'Anleitung', l_en: 'Rules', u_de: 'https://www.uno-kartenspiel.de/wp-content/uploads/2019/08/UNO-Spielregeln-Anleitung.pdf', u_en: 'https://www.unorules.com' },
  { n_de: 'Schach', n_en: 'Chess', s_de: '', s_en: '', l_de: 'Anleitung', l_en: 'Rules', u_de: 'https://www.chess.com/de/schachregeln', u_en: 'https://www.chess.com/learn-how-to-play-chess' },
  { n_de: 'Skip-Bo', n_en: 'Skip-Bo', s_de: '', s_en: '', l_de: 'Anleitung', l_en: 'Rules', u_de: 'https://gzhls.at/blob/ldb/d/a/d/6/ca4fc7c7125cea9a5ab9bbc9fdffa6762b38.pdf', u_en: 'https://service.mattel.com/instruction_sheets/42050.pdf' },
  { n_de: 'Fiesta de los Muertos', n_en: 'Fiesta de los Muertos', s_de: '', s_en: '', l_de: 'Anleitung', l_en: 'Rules (DE only)', u_de: 'https://www.wog.ch/nas/docs/regel_fiestadelosmuertos.pdf', u_en: 'https://www.wog.ch/nas/docs/regel_fiestadelosmuertos.pdf' },
  { n_de: 'Verfuxt', n_en: 'Verfuxt', s_de: '', s_en: '', l_de: 'Anleitung', l_en: 'Rules (DE/FR/IT)', u_de: 'https://amagino.ch/media/15/66/88/1604334922/Verfuxt%20Spielanleitung_DE_FR_IT.pdf', u_en: 'https://amagino.ch/media/15/66/88/1604334922/Verfuxt%20Spielanleitung_DE_FR_IT.pdf' },
  { n_de: 'Scrabble', n_en: 'Scrabble', s_de: '', s_en: '', l_de: 'Anleitung', l_en: 'Rules (DE only)', u_de: 'https://www.spielezar.ch/modules/genzo_zar/views/pdf/spielregeln-scrabble-original.pdf', u_en: 'https://www.spielezar.ch/modules/genzo_zar/views/pdf/spielregeln-scrabble-original.pdf' },
  { n_de: 'Ticket to Ride: San Francisco', n_en: 'Ticket to Ride: San Francisco', s_de: '', s_en: '', l_de: 'Anleitung', l_en: 'Rules', u_de: 'https://cdn.svc.asmodee.net/production-daysofwonder/uploads/2024/07/720364-T2RSF-Rules-DE.pdf', u_en: 'https://cdn.svc.asmodee.net/production-daysofwonder/uploads/2024/07/720064-T2RSF-Rules-EN.pdf' },
  { n_de: 'Kahuna', n_en: 'Kahuna', s_de: '', s_en: '', l_de: 'Anleitung', l_en: 'Rules', u_de: 'https://fragkosmos.zendesk.com/hc/de/article_attachments/8086781066908', u_en: 'https://cdn.1j1ju.com/medias/76/cd/cd-kahuna-rulebook.pdf' },
  { n_de: 'Yatzy', n_en: 'Yatzy', s_de: '', s_en: '', l_de: 'Anleitung', l_en: 'Rules', u_de: 'https://jassverzeichnis.ch/yatzy-wuerfelspiel-spielregeln/', u_en: 'https://info.lite.games/en/support/solutions/articles/60000688821-yatzy-rules' },
  { n_de: 'Rummikub', n_en: 'Rummikub', s_de: '', s_en: '', l_de: 'Anleitung', l_en: 'Rules', u_de: 'https://rummikub.com/wp-content/uploads/2019/12/2600-Germany.pdf', u_en: 'https://rummikub.com/wp-content/uploads/2019/12/2600-Germany.pdf' },
  { n_de: 'The Walking Pet', n_en: 'The Walking Pet', s_de: '', s_en: '', l_de: 'Anleitung', l_en: 'Rules (DE only)', u_de: 'https://fragkosmos.zendesk.com/hc/de/article_attachments/8095269961884', u_en: 'https://fragkosmos.zendesk.com/hc/de/article_attachments/8095269961884' }
];

function renderGamePlates() {
  return '<div class="signpost signpost--flush signpost--games">' +
    '<div class="signpost-mast" aria-hidden="true"></div>' +
    HOUSE_GAMES.map(function (g, i) {
      var sub = t(g.s_de, g.s_en);
      return '<a class="plate plate--out plate--game" style="--i:' + i + '"' +
        ' href="' + t(g.u_de, g.u_en) + '" target="_blank" rel="noopener noreferrer">' +
          '<span class="plate-bolt"></span>' +
          '<span class="plate-name">' + t(g.n_de, g.n_en) +
            (sub ? '<small class="plate-sub">' + sub + '</small>' : '') + '</span>' +
          '<span class="plate-dist">' + t(g.l_de, g.l_en) + '</span>' +
        '</a>';
    }).join('') +
  '</div>';
}
