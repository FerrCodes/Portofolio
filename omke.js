// ===== EMAILJS INIT =====
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("Nz7EQLCcWn0ujcsin");
    }
})();

// ===== NAVIGASI PROYEK =====
function changeWeb(type) {
    const urls = {
        game: "http://103.186.167.18:8002/rpl3/game/rocket_league/",
        webku:    "https://ferr-hanni.github.io/To-Do-List/",
        trim:     "http://103.186.167.18:8002/rpl3/laravel/pengepul-meme/public/memes",
        face:     "https://github.com/Ferr-Hanni/FaceRecognition-Final",
    };
    if (urls[type]) window.location.href = urls[type];
}

// ===== DROPDOWN ICON (halaman pertama) =====
let isClicked = false;
function omkeGasm() {
    const icon = document.getElementById("ikondrop");
    if (!icon) return;
    isClicked = !isClicked;
    icon.style.transform  = isClicked ? "rotate(180deg)" : "rotate(0deg)";
    icon.style.transition = "ease 0.2s";
}

document.addEventListener('DOMContentLoaded', function () {

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('dramaticNavbar') || document.getElementById('mainNavbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ===== BACK TO TOP =====
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            backToTop.classList.toggle('show', window.scrollY > 300);
        });
    }

    // ===== LIGHTBOX =====
    window.bukaLightbox = function (src, caption) {
        const overlay = document.getElementById('lightboxOverlay');
        if (!overlay) return;
        document.getElementById('lightboxImg').src        = src;
        document.getElementById('lightboxCaption').textContent = caption;
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    window.tutupLightbox = function () {
        const overlay = document.getElementById('lightboxOverlay');
        if (!overlay) return;
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    };

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') window.tutupLightbox();
    });

 // ===== TOGGLE PROJECTS (SHOW/HIDE) =====
window.toggleProjects = function () {
    const hiddenProjects = document.querySelectorAll('.project-hidden');
    const btn = document.getElementById('toggleProjectsBtn');
    const btnText = btn ? btn.querySelector('.btn-text') : null;

    if (!btn || !hiddenProjects.length) return;

    const isExpanded = btn.classList.contains('expanded');

    hiddenProjects.forEach(function (item, index) {
        if (isExpanded) {
            item.classList.remove('project-visible');
        } else {
            setTimeout(function () {
                item.classList.add('project-visible');
            }, index * 90);
        }
    });

    btn.classList.toggle('expanded');

    if (btnText) {
        btnText.textContent = isExpanded ? 'Lihat Project Lainnya' : 'Sembunyikan Project';
    }
};

    // ===== CONTACT FORM (EmailJS) =====
    // index.html: id="contact-Form" | index2.html: id="contactForm"
    const contactForm  = document.getElementById('contact-Form') || document.getElementById('contactForm');
    const submitBtn    = document.getElementById('submitBtn');
    const alertMessage = document.getElementById('alertMessage');

    if (contactForm && submitBtn && alertMessage) {
        const defaultLabel = submitBtn.innerHTML;

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Mengirim...';

            const formData = {
                user_name:  document.getElementById('user_name')?.value  || '',
                user_email: document.getElementById('user_email')?.value || '',
                message:    document.getElementById('message')?.value    || ''
            };

            if (typeof emailjs === 'undefined') {
                alertMessage.className    = 'alert alert-danger mt-2';
                alertMessage.style.display = 'block';
                alertMessage.innerHTML    = '<strong>Gagal!</strong> EmailJS tidak termuat.';
                submitBtn.disabled = false;
                submitBtn.innerHTML = defaultLabel;
                return;
            }

            emailjs.send('service_jikxbjd', 'template_beqfhmy', formData)
                .then(function () {
                    alertMessage.className    = 'alert alert-success mt-2';
                    alertMessage.style.display = 'block';
                    alertMessage.innerHTML    = '<strong>Berhasil!</strong> Pesan terkirim. Terima kasih!';
                    contactForm.reset();
                    setTimeout(function () { alertMessage.style.display = 'none'; }, 5000);
                }, function (error) {
                    alertMessage.className    = 'alert alert-danger mt-2';
                    alertMessage.style.display = 'block';
                    alertMessage.innerHTML    = '<strong>Gagal!</strong> ' + JSON.stringify(error);
                    setTimeout(function () { alertMessage.style.display = 'none'; }, 7000);
                })
                .finally(function () {
                    submitBtn.disabled  = false;
                    submitBtn.innerHTML = defaultLabel;
                });
        });
    }

});