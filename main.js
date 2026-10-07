document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar scroll effect ──────────────────────────────────────────────────
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            navbar.style.background = 'rgba(253, 251, 247, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
            navbar.style.background = 'rgba(253, 251, 247, 0.95)';
        }
    });

    // ── Speisekarte: Tab switching ────────────────────────────────────────────
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const target = document.getElementById('tab-' + btn.dataset.tab);
            if (target) target.classList.add('active');
        });
    });

    // ── Reservierungs-Modal: Formular ─────────────────────────────────────────
    const form = document.getElementById('reservation-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.classList.add('hidden');
            const success = document.getElementById('reservation-success');
            if (success) success.classList.remove('hidden');
            // Schließt das Modal nach 3 Sekunden und setzt das Formular zurück
            setTimeout(() => {
                closeModal();
                setTimeout(() => {
                    form.classList.remove('hidden');
                    if (success) success.classList.add('hidden');
                    form.reset();
                }, 400);
            }, 3000);
        });
    }

    // ── The Secret Trigger Event Logic ────────────────────────────────────────
    // Notice how it just casually hooks into the SVG element that rests in the footer
    const secretTrigger = document.getElementById('secret-trigger');
    if (secretTrigger) {
        secretTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            // Redirect smoothly to the hidden login
            window.location.href = 'login.html';
        });
    }

});

// ── Modal Controls (global scope for onclick attributes) ──────────────────────
function openModal() {
    const modal = document.getElementById('reservation-modal');
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('reservation-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function closeModalOutside(e) {
    if (e.target === document.getElementById('reservation-modal')) {
        closeModal();
    }
}
