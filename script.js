document.addEventListener('DOMContentLoaded', function() {

    // ===== SIDE PANEL TOGGLE =====
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const sidePanel = document.getElementById('sidePanel');
    const overlay = document.getElementById('overlay');
    const panelLinks = document.querySelectorAll('.panel-links a');

    function openPanel() {
        sidePanel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePanel() {
        sidePanel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle) menuToggle.addEventListener('click', openPanel);
    if (menuClose) menuClose.addEventListener('click', closePanel);
    if (overlay) overlay.addEventListener('click', closePanel);
    panelLinks.forEach(link => {
        link.addEventListener('click', () => setTimeout(closePanel, 200));
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar-custom');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== ACTIVE LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        panelLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ===== SMOOTH SCROLL (DENGAN FILTER AMAN) =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const href = anchor.getAttribute('href');
        // Hanya proses jika href valid dan bukan link eksternal
        try {
            if (href && href.startsWith('#') && href.length > 1) {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            }
        } catch (err) {
            console.warn('Skipping invalid anchor:', href);
        }
    });

    // ===== EMAILJS INTEGRATION =====
    if (typeof emailjs !== 'undefined') {
        emailjs.init("Nz7EQLCcWn0ujcsin");
    }

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const alertMessage = document.getElementById('alertMessage');

    if (contactForm && submitBtn && alertMessage) {
        const defaultLabel = submitBtn.innerHTML;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Mengirim...';
            
            const formData = {
                user_name: document.getElementById('user_name')?.value || '',
                user_email: document.getElementById('user_email')?.value || '',
                message: document.getElementById('message')?.value || ''
            };

            if (typeof emailjs === 'undefined') {
                alertMessage.className = 'alert alert-danger mt-2';
                alertMessage.style.display = 'block';
                alertMessage.innerHTML = '<strong>Gagal!</strong> EmailJS tidak termuat.';
                submitBtn.disabled = false;
                submitBtn.innerHTML = defaultLabel;
                return;
            }

            emailjs.send('service_jikxbjd', 'template_beqfhmy', formData)
                .then(function() {
                    alertMessage.className = 'alert alert-success mt-2';
                    alertMessage.style.display = 'block';
                    alertMessage.innerHTML = '<strong>Berhasil!</strong> Pesan terkirim. Terima kasih!';
                    contactForm.reset();
                    setTimeout(() => { alertMessage.style.display = 'none'; }, 5000);
                })
                .catch(function(error) {
                    alertMessage.className = 'alert alert-danger mt-2';
                    alertMessage.style.display = 'block';
                    alertMessage.innerHTML = '<strong>Gagal!</strong> ' + JSON.stringify(error);
                    setTimeout(() => { alertMessage.style.display = 'none'; }, 7000);
                })
                .finally(function() {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = defaultLabel;
                });
        });
    }
});

// ===== CERTIFICATE MODAL LOGIC =====
const certData = {
    dicoding: {
        title: "Dicoding Indonesia",
        issuer: "Belajar Dasar AI",
        img: "assets/images/sertifikat/1.png",
    },
    kaggle: {
        title: "Kaggle",
        issuer: "Intro to Machine Learning",
        img: "assets/images/sertifikat/ML.png",
    },
    claude: {
        title: "Claude Code",
        issuer: "Claude Code 101",
        img: "assets/images/sertifikat/claude.png",
    }
};
function openCertModal(certId) {
    const cert = certData[certId];
    if (!cert) return;
    document.getElementById('modalCertTitle').textContent = cert.title;
    document.getElementById('modalCertIssuer').textContent = cert.issuer;
    document.getElementById('modalCertImg').src = cert.img;
    
    const modal = document.getElementById('certModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeCertModal() {
    const modal = document.getElementById('certModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}
// Event Listener untuk menutup modal saat klik area luar atau tombol ESC
document.addEventListener('click', function(e) {
    const modal = document.getElementById('certModal');
    if (e.target === modal) closeCertModal();
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('certModal');
        if (modal && modal.classList.contains('active')) closeCertModal();
    }
});

// ===== MODAL PREVIEW PROJEK =====
function openProjectModal(imageSrc, title) {
    const modal = document.getElementById('projectModal');
    const img = document.getElementById('modalPreviewImg');
    const titleEl = document.getElementById('modalPreviewTitle');
    img.src = imageSrc;
    titleEl.textContent = title || 'Preview';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Tutup dengan tombol ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('projectModal');
        if (modal && modal.classList.contains('active')) {
            closeProjectModal();
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-case-card')
    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const filter = btn.getAttribute('data-filter')
            filterButtons.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active')
            projectCards.forEach(function (card) {
                const match = filter === 'all' || card.getAttribute('data-category') === filter;
                card.classList.toggle('is-hidden', !match);
            });
        });
    });
});