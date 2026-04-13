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
let currentLang = localStorage.getItem('lang') || 'de';

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
  document.getElementById(id).classList.add('active');
  if (id !== 'screen-detail') currentDetailKey = null;
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
function showLocalGuideModal() {
  document.getElementById('modal-localguide').classList.remove('hidden');
  document.getElementById('modal-backdrop').classList.remove('hidden');
  // update modal text for language
  document.querySelectorAll('[data-de]').forEach(el => {
    el.textContent = currentLang === 'de' ? el.dataset.de : el.dataset.en;
  });
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  document.getElementById('modal-backdrop').classList.add('hidden');
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
  document.getElementById('modal-backdrop').classList.add('hidden');
}

// ─────────────────────────────────────────────────────────────
// PLACE CARDS (collapsible)
// ─────────────────────────────────────────────────────────────
function togglePlace(id) {
  const body = document.getElementById('body-' + id);
  const chevron = document.getElementById('chev-' + id);
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  if (chevron) chevron.textContent = isOpen ? '∧' : '∨';
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
        <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=740x10000:format=jpg/path/s43189f292a34c399/image/ic84a6eab1436503a/version/1776081120/image.jpg" alt="Casa Maranta" class="welcome-photo" />
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
          <button class="modal-item" onclick="showDetail('house_tv')">
            <span>${t('TV &amp; Radio', 'TV &amp; Radio')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
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
            <p><strong>Altglas &amp; PET:</strong><br>
            Altglas und PET können getrennt entsorgt werden. Die nächstgelegene Sammelstelle:</p>
            <iframe class="maps-embed" loading="lazy" allowfullscreen
              src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyCQp4IVRPBNThAtWVxI6uOTgvkkWe3YmsM&origin=46.31669206283648,10.058899635376326&destination=46.3229775,10.0556606&mode=walking">
            </iframe>
            <p>Bitte achten Sie auf eine korrekte Trennung und entsorgen Sie den Abfall regelmässig.</p>
          `, `
            <p>Official waste bags are required for household rubbish — you can buy them at the Coop, for example. Please use only these special bags, as they are required for proper disposal.</p>
            <p><strong>Rubbish disposal point:</strong><br>
            In the municipality of Poschiavo, household waste is disposed of at central collection points — unfortunately there are no bins directly at the house.</p>
            <iframe class="maps-embed" loading="lazy" allowfullscreen
              src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyCQp4IVRPBNThAtWVxI6uOTgvkkWe3YmsM&origin=46.31669206283648,10.058899635376326&destination=46.3152177266861,10.059864411044678&mode=walking">
            </iframe>
            <p><strong>Glass &amp; PET recycling:</strong><br>
            Glass and PET can be recycled separately. The nearest collection point:</p>
            <iframe class="maps-embed" loading="lazy" allowfullscreen
              src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyCQp4IVRPBNThAtWVxI6uOTgvkkWe3YmsM&origin=46.31669206283648,10.058899635376326&destination=46.3229775,10.0556606&mode=walking">
            </iframe>
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
          ${t(`<p>Informationen zu den Küchengeräten folgen.</p>`,
             `<p>Kitchen appliance information coming soon.</p>`)}
        </div>
      </div>`
  },

  house_tv: {
    title: () => t('TV & Radio', 'TV & Radio'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <div class="detail-body">
          ${t(`<p>Informationen zu TV und Radio folgen.</p>`,
             `<p>TV and radio information coming soon.</p>`)}
        </div>
      </div>`
  },

  house_garden: {
    title: () => t('Gartenmöbel & Grill', 'Garden Furniture & BBQ'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <div class="detail-body">
          ${t(`<p>Informationen zu Gartenmöbeln und Grill folgen.</p>`,
             `<p>Garden furniture and BBQ information coming soon.</p>`)}
        </div>
      </div>`
  },

  house_games: {
    title: () => t('Gesellschaftsspiele', 'Board Games'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/s43189f292a34c399/image/i4a87d5d17335be37/version/1776086648/image.jpg" alt="Gesellschaftsspiele" class="welcome-photo" />
        <div class="detail-body">
          ${t(`
            <p>Wenn das Wetter einmal nicht mitspielt oder einfach Zeit für eine Pause ist, wird bei uns gerne gespielt. Ob ehrgeizige Jassrunde, spannende Partie oder einfach ein lustiges Spiel mit den Kindern: Für Unterhaltung ist gesorgt.</p>
            <p>Im Haus finden Sie eine Auswahl an Spielen für verschiedene Altersgruppen:</p>
            <ul>
              <li><strong>Jasskarten</strong> (deutsche und französische Karten)<br>
              <a href="https://jassverzeichnis.ch/thema/jassregeln-jassarten/" target="_blank">Anleitung</a></li>
              <li><strong>Uno</strong><br>
              <a href="https://www.uno-kartenspiel.de/wp-content/uploads/2019/08/UNO-Spielregeln-Anleitung.pdf" target="_blank">Anleitung</a></li>
              <li><strong>Schach</strong><br>
              <a href="https://www.chess.com/de/schachregeln" target="_blank">Anleitung</a></li>
              <li><strong>Skip-Bo</strong><br>
              <a href="https://gzhls.at/blob/ldb/d/a/d/6/ca4fc7c7125cea9a5ab9bbc9fdffa6762b38.pdf" target="_blank">Anleitung</a></li>
              <li><strong>Fiesta de los Muertos</strong><br>
              <a href="https://www.wog.ch/nas/docs/regel_fiestadelosmuertos.pdf" target="_blank">Anleitung</a></li>
              <li><strong>Verfuxt</strong><br>
              <a href="https://amagino.ch/media/15/66/88/1604334922/Verfuxt%20Spielanleitung_DE_FR_IT.pdf" target="_blank">Anleitung</a></li>
              <li><strong>Scrabble</strong><br>
              <a href="https://www.spielezar.ch/modules/genzo_zar/views/pdf/spielregeln-scrabble-original.pdf" target="_blank">Anleitung</a></li>
              <li><strong>Ticket to Ride: San Francisco</strong><br>
              <a href="https://cdn.svc.asmodee.net/production-daysofwonder/uploads/2024/07/720364-T2RSF-Rules-DE.pdf" target="_blank">Anleitung</a></li>
              <li><strong>Kahuna</strong><br>
              <a href="https://fragkosmos.zendesk.com/hc/de/article_attachments/8086781066908" target="_blank">Anleitung</a></li>
              <li><strong>Yatzy</strong><br>
              <a href="https://jassverzeichnis.ch/yatzy-wuerfelspiel-spielregeln/" target="_blank">Anleitung</a></li>
            </ul>
            <p>Viel Spass beim Spielen!</p>
          `, `
            <p>When the weather doesn't cooperate or it's simply time for a break, we love to play games. Whether it's a competitive round of Jass, an exciting match, or a fun game with the kids — entertainment is guaranteed.</p>
            <p>You'll find a selection of games for various age groups in the house:</p>
            <ul>
              <li><strong>Jass cards</strong> (German and French cards for Switzerland's favourite card game)<br>
              <a href="https://www.swisslos.ch/en/jass/informations/jass-rules/principles-of-jass.html" target="_blank">Rules</a></li>
              <li><strong>Uno</strong><br>
              <a href="https://www.unorules.com" target="_blank">Rules</a></li>
              <li><strong>Chess</strong><br>
              <a href="https://www.chess.com/learn-how-to-play-chess" target="_blank">Rules</a></li>
              <li><strong>Skip-Bo</strong><br>
              <a href="https://service.mattel.com/instruction_sheets/42050.pdf" target="_blank">Rules</a></li>
              <li><strong>Fiesta de los Muertos</strong><br>
              <a href="https://www.wog.ch/nas/docs/regel_fiestadelosmuertos.pdf" target="_blank">Rules (DE only)</a></li>
              <li><strong>Verfuxt</strong><br>
              <a href="https://amagino.ch/media/15/66/88/1604334922/Verfuxt%20Spielanleitung_DE_FR_IT.pdf" target="_blank">Rules (DE/FR/IT)</a></li>
              <li><strong>Scrabble</strong><br>
              <a href="https://www.spielezar.ch/modules/genzo_zar/views/pdf/spielregeln-scrabble-original.pdf" target="_blank">Rules (DE only)</a></li>
              <li><strong>Ticket to Ride: San Francisco</strong><br>
              <a href="https://cdn.svc.asmodee.net/production-daysofwonder/uploads/2024/07/720064-T2RSF-Rules-EN.pdf" target="_blank">Rules</a></li>
              <li><strong>Kahuna</strong><br>
              <a href="https://cdn.1j1ju.com/medias/76/cd/cd-kahuna-rulebook.pdf" target="_blank">Rules</a></li>
              <li><strong>Yatzy</strong><br>
              <a href="https://info.lite.games/en/support/solutions/articles/60000688821-yatzy-rules" target="_blank">Rules</a></li>
            </ul>
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
          ${t(`<p>Informationen zur Leseecke folgen.</p>`,
             `<p>Reading corner information coming soon.</p>`)}
        </div>
      </div>`
  },

  house_stove: {
    title: () => t('Schwedenofen', 'Wood-Burning Stove'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <div class="detail-body">
          ${t(`<p>Informationen zum Schwedenofen folgen.</p>`,
             `<p>Wood-burning stove information coming soon.</p>`)}
        </div>
      </div>`
  },

  house_electricity: {
    title: () => t('Strom & Sicherungen', 'Electricity & Fuses'),
    backToDetail: 'accommodation',
    render: () => `
      <div class="detail-section">
        <div class="detail-body">
          ${t(`<p>Informationen zu Strom und Sicherungen folgen.</p>`,
             `<p>Electricity and fuse information coming soon.</p>`)}
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
          `, `
            <p>There is free Wi-Fi. The details are shown above.</p>
            <p>We provide this service for your enjoyment and convenience. However, please note that you are responsible for its safe and appropriate use. If there is any loss of service, please contact us.</p>
          `)}
        </div>
      </div>`
  },

  checkout: {
    title: () => t('Check-out', 'Check-out Time'),
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
          ${t(`
            <p>Das Check-out ist strikt um 10:00 Uhr.</p>
            <p>Falls Sie einen späteren Check-out benötigen, geben wir unser Bestes, dies zu ermöglichen. Bitte teilen Sie uns dies jedoch im Voraus mit.</p>
            <p>Wenn an diesem Tag neue Gäste ankommen, ist ein späterer Check-out leider kaum möglich, da die Reinigung das Haus vorbereiten muss.</p>
          `, `
            <p>Check-out time is strictly 10:00 AM.</p>
            <p>If you require a later check-out, we'll do our best to accommodate it. But please bear in mind you'll need to let us know beforehand.</p>
            <p>If we have guests arriving that day it will be almost impossible to offer a late check-out due to the cleaners needing to prepare for those guests.</p>
          `)}
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;color:var(--orange)"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.08 2.2 2 2 0 012.08.02h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span>Anna – <a href="tel:+41794221608">+41 79 422 16 08</a></span>
          </div>
        </div>
        <div class="contact-card">
          <h3>${t('Eigentümer', 'Owners')}</h3>
          <div class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;color:var(--orange)"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.08 2.2 2 2 0 012.08.02h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span>Markus – <a href="tel:+41795712790">+41 79 571 27 90</a></span>
          </div>
          <div class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;color:var(--orange)"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.08 2.2 2 2 0 012.08.02h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span>Christine – <a href="tel:+41787403180">+41 78 740 31 80</a></span>
          </div>
        </div>
        <div class="contact-card">
          <h3>${t('Notfall', 'Emergency')}</h3>
          <div class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;color:var(--orange)"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>${t('Notruf: ', 'Emergency: ')}<a href="tel:112"><strong>112</strong></a></span>
          </div>
        </div>
        <div class="contact-card">
          <h3>${t('Arzt &amp; Apotheke', 'Doctors &amp; Pharmacy')}</h3>
          <div class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;color:var(--orange)"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.08 2.2 2 2 0 012.08.02h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span>Centro Medico Valposchiavo – <a href="tel:+41818390180">+41 81 839 01 80</a></span>
          </div>
          <div class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;color:var(--orange)"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.08 2.2 2 2 0 012.08.02h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
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
        <div class="detail-body">
          ${t(`
            <p>Herzlichen Dank, dass Sie bei uns zu Gast waren. Wir hoffen, Sie haben Ihren Aufenthalt in vollen Zügen genossen!</p>
            <p>Falls es während Ihres Aufenthalts etwas zu bemängeln gab, zögern Sie nicht, uns zu informieren – wir möchten sicherstellen, dass wir es für den nächsten Gast verbessern können.</p>
            <p><strong>Wir lieben Online-Bewertungen!</strong></p>
            <p>Wenn Sie aufgefordert werden, eine Bewertung abzugeben, freuen wir uns sehr über eine Sternebewertung sowie einen kurzen Kommentar darüber, was Ihnen besonders gut gefallen hat.</p>
            <p>Falls Sie uns keine 5 Sterne geben können, wären wir Ihnen dankbar, wenn Sie uns vorher kontaktieren würden – Ihr Feedback ist uns wichtig und hilft uns, besser zu werden.</p>
            <p>Herzlichen Dank! 🙏</p>
          `, `
            <p>Thank you for staying with us, and we hope you enjoyed your stay.</p>
            <p>If there were any issues with your stay, please don't hesitate to tell us, as we want to ensure we can resolve them for the next guest.</p>
            <p><strong>We love online reviews!</strong></p>
            <p>When you're prompted to leave a review please give us a star rating, and write a sentence or two about what you liked the best during your stay. Was it the comfy bed? The detailed information and local recommendations? Or maybe the location itself?</p>
            <p>If you are unable to leave us 5 stars, please don't hesitate to contact us first to let us know why — you are key to helping us improve.</p>
            <p>Thank you! 🙏</p>
          `)}
        </div>
      </div>`
  },

  localguide: {
    title: () => t('Ausflugstipps', 'Your Local Area Guide'),
    backTo: 'screen-info',
    backNavId: 'nav-info',
    render: () => {
      showLocalGuideModal();
      return '<p style="padding:20px;color:var(--text-muted)">...</p>';
    }
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
      </div>`
  }
};

function renderPlaceCard(id, name, description, mapsUrl, imgUrl) {
  const imgHtml = imgUrl
    ? `<img src="${imgUrl}" alt="${name}" loading="lazy" onerror="this.style.display='none'">`
    : '';
  return `
    <div class="place-card">
      <div class="place-card-header" onclick="togglePlace('${id}')">
        <h3>${name}</h3>
        <span class="toggle-chevron" id="chev-${id}">∧</span>
      </div>
      <div class="place-card-body open" id="body-${id}">
        ${imgHtml}
        <p>${description}</p>
        <div class="place-card-actions">
          <div style="display:flex;gap:8px">
            <a href="${mapsUrl}" target="_blank" class="place-action-btn" title="Karte / Map">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </a>
          </div>
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
  // Grocery
  { lat: 46.323868231066385, lng: 10.054737839227855, title_de: 'Coop Poschiavo', title_en: 'Coop Poschiavo', cat: 'grocery' },
  // Activities
  { lat: 46.399211037342894, lng: 10.125656483564159, title_de: 'Lago di Saoseo', title_en: 'Lago di Saoseo', cat: 'activity' },
  { lat: 46.36029205314771, lng: 10.04814332573707, title_de: 'Gletschergarten Cavaglia', title_en: 'Cavaglia Glacier Garden', cat: 'activity' },
  { lat: 46.291932798977086, lng: 10.079160798747822, title_de: 'Minigolf Le Prese', title_en: 'Minigolf Le Prese', cat: 'activity' },
  { lat: 46.32605125708701, lng: 10.053413802043673, title_de: 'Legend Trail', title_en: 'Legend Trail', cat: 'activity' },
];

let googleMap = null;
let markers = [];
let mapInitialized = false;

function getMarkerIcon(cat) {
  const defs = {
    home: {
      bg: '#1E2D40',
      body: '<path d="M18 8L29 16v13H7V16z" fill="white"/><rect x="15" y="21" width="6" height="8" fill="#1E2D40"/>'
    },
    restaurant: {
      bg: '#E8200A',
      body: '<line x1="13" y1="9" x2="13" y2="27" stroke="white" stroke-width="1.8" stroke-linecap="round"/>' +
            '<line x1="11" y1="9" x2="11" y2="13" stroke="white" stroke-width="1.8" stroke-linecap="round"/>' +
            '<line x1="15" y1="9" x2="15" y2="13" stroke="white" stroke-width="1.8" stroke-linecap="round"/>' +
            '<path d="M11 13Q13 15 15 13" fill="none" stroke="white" stroke-width="1.5"/>' +
            '<path d="M22 9C25 9 26 12 24.5 15L23.5 27" fill="none" stroke="white" stroke-width="1.9" stroke-linecap="round"/>'
    },
    grocery: {
      bg: '#E88A0A',
      body: '<path d="M7 13H11L15 24H25L27 15H12" fill="none" stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>' +
            '<circle cx="15" cy="28" r="2" fill="white"/>' +
            '<circle cx="23" cy="28" r="2" fill="white"/>'
    },
    activity: {
      bg: '#0A7AE8',
      body: '<path d="M4 29L12 16l4 5 5-9 11 17z" fill="white"/>'
    }
  };
  const { bg, body } = defs[cat] || defs.activity;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><circle cx="18" cy="18" r="17" fill="${bg}" stroke="white" stroke-width="2"/>${body}</svg>`;
  return {
    url: 'data:image/svg+xml,' + encodeURIComponent(svg),
    scaledSize: new google.maps.Size(36, 36),
    anchor: new google.maps.Point(18, 18)
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
    const infoWindow = new google.maps.InfoWindow({
      content: `<strong>${currentLang === 'de' ? place.title_de : place.title_en}</strong>`
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
  const arrow = document.getElementById('map-filter-arrow');
  const hidden = panel.classList.toggle('hidden');
  arrow.textContent = hidden ? '▲' : '▼';
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
  { type: 'section', key: 'wifi', term_de: 'WLAN Internet Passwort LaRasiga', term_en: 'WiFi Internet Password Network', navId: 'nav-info' },
  { type: 'section', key: 'checkout', term_de: 'Check-out Abreise', term_en: 'Check-out Departure', navId: 'nav-info' },
  { type: 'section', key: 'contacts', term_de: 'Kontakt Notfall Arzt Apotheke Anna', term_en: 'Contact Emergency Doctor Pharmacy Anna', navId: 'nav-info' },
  { type: 'section', key: 'farewell', term_de: 'Auf Wiedersehen Bewertung Danke', term_en: 'Farewell Thank You Review', navId: 'nav-info' },
  { type: 'section', key: 'restaurants', term_de: 'Restaurants Essen', term_en: 'Restaurants Food Dining', navId: 'nav-info' },
  { type: 'section', key: 'grocery', term_de: 'Einkaufen Supermarkt Metzger Bäcker', term_en: 'Grocery Shopping Supermarket Butcher Bakery', navId: 'nav-info' },
  { type: 'section', key: 'activities', term_de: 'Aktivitäten Ausflug Wandern', term_en: 'Activities Excursion Hiking', navId: 'nav-info' },
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
  previousScreen = 'screen-info';
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

  // Override localguide grid card to show modal instead of navigating away
  const gridCards = document.querySelectorAll('.grid-card');
  gridCards.forEach(card => {
    const onclick = card.getAttribute('onclick');
    if (onclick && onclick.includes("'localguide'")) {
      card.setAttribute('onclick', "showLocalGuideModal()");
    }
  });

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
  panel.style.display = isVisible ? 'none' : 'block';
  btn.classList.toggle('active', !isVisible);
}
