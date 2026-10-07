document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        // Validierung der Ermittler-Zugangsdaten (Hardcoded im Javascript für die Recherche-Übung)
        // Nutzername: NRW
        // Passwort: weissemacht
        if (user === 'NRW' && pass === 'weissemacht') {
            // Einfacher Sitzungs-Schlüssel, um den simplen Zugang zum Forum zu gewähren
            sessionStorage.setItem('auth_token', 'token_granted');
            
            // Weiterleitung zum eigentlichen Forum
            window.location.href = 'forum.html';
        } else {
            // Eingabefelder leeren
            document.getElementById('password').value = '';

            // Simuliertes Windows-Sicherheitsfenster mit gestaffelter "Tracing"-Sequenz.
            // WICHTIG: reine Social-Engineering-Simulation fuer die Schulung.
            // Es wird KEINE IP ermittelt, gespeichert oder uebertragen - alles ist clientseitig erfunden.
            showFakeTrace();
        }
    });
});

// Zeigt das gefaelschte Sicherheitsfenster und spielt eine glaubhafte,
// aber vollstaendig erfundene "IP-Ortung" ab. Lernziel: Ermittler sollen
// erkennen, dass es sich um Einschuechterung / Social Engineering handelt.
function showFakeTrace() {
    const overlay   = document.getElementById('fake-os-alert');
    const dots      = document.getElementById('alert-dots');
    const detail    = document.getElementById('alert-trace-detail');
    const ipEl       = document.getElementById('alert-ip');
    const geoEl      = document.getElementById('alert-geo');
    const ispEl      = document.getElementById('alert-isp');
    const finalEl    = document.getElementById('alert-final');
    const closeBtn   = document.getElementById('alert-close-btn');

    // Reset, falls erneut ausgeloest
    detail.style.display = 'none';
    geoEl.style.display  = 'none';
    ispEl.style.display  = 'none';
    finalEl.style.display = 'none';
    ipEl.textContent = 'wird ermittelt …';
    closeBtn.disabled = true;
    closeBtn.style.opacity = '0.5';

    overlay.style.display = 'flex';

    // Erfundene, plausibel aussehende IP (KEINE echte Ermittlung)
    const fakeIp = '84.' + (130 + Math.floor(Math.random() * 40)) + '.' +
                   Math.floor(Math.random() * 256) + '.' +
                   (1 + Math.floor(Math.random() * 254));

    // Animierte Punkte waehrend der "Analyse"
    let d = 1;
    const dotTimer = setInterval(() => {
        d = (d % 3) + 1;
        dots.textContent = '.'.repeat(d);
    }, 350);

    // Gestaffelte Enthuellung -> wirkt wie ein echter Trace
    setTimeout(() => { detail.style.display = 'block'; }, 900);
    setTimeout(() => { ipEl.textContent = fakeIp; }, 1900);
    setTimeout(() => { geoEl.style.display = 'block'; }, 2600);
    setTimeout(() => { ispEl.style.display = 'block'; }, 3200);
    setTimeout(() => {
        clearInterval(dotTimer);
        dots.parentElement.style.display = 'none'; // "Verbindung wird analysiert" ausblenden
        finalEl.style.display = 'block';
        closeBtn.disabled = false;
        closeBtn.style.opacity = '1';
    }, 4000);
}
