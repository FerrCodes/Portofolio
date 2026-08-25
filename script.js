document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // SIDE PANEL - AMAN (TIDAK ERROR WALAU ELEMEN HILANG)
    // ============================================================
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const sidePanel = document.getElementById('sidePanel');
    const overlay = document.getElementById('overlay');

    function openPanel() {
        if (!sidePanel || !overlay) {
            console.warn('Side panel atau overlay tidak ditemukan.');
            return;
        }
        sidePanel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePanel() {
        if (!sidePanel || !overlay) {
            console.warn('Side panel atau overlay tidak ditemukan.');
            return;
        }
        sidePanel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', openPanel);
    } else {
        console.warn('Tombol menuToggle tidak ditemukan.');
    }

    if (menuClose) {
        menuClose.addEventListener('click', closePanel);
    } else {
        console.warn('Tombol menuClose tidak ditemukan.');
    }

    if (overlay) {
        overlay.addEventListener('click', closePanel);
    } else {
        console.warn('Overlay tidak ditemukan.');
    }

    // ============================================================
    // NAVBAR SCROLL EFFECT
    // ============================================================
    const navbar = document.querySelector('.navbar-custom');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ============================================================
    // ACTIVE LINK ON SCROLL (HANYA JIKA ADA SECTION)
    // ============================================================
    const sections = document.querySelectorAll('section[id]');
    const panelLinks = document.querySelectorAll('.panel-links a');
    if (sections.length > 0 && panelLinks.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(function(section) {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            panelLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ============================================================
    // SMOOTH SCROLL UNTUK ANCHOR LINK
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    });

    // ============================================================
    // DROPDOWN PROJEK DI SIDE PANEL
    // ============================================================
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu-custom');
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdownMenu.classList.toggle('open');
            dropdownToggle.classList.toggle('open');
        });
    }

    // ============================================================
    // FILTER PROJEK (DI projek.html)
    // ============================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-case-card');
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const filter = btn.getAttribute('data-filter');
                filterButtons.forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
                projectCards.forEach(function(card) {
                    const match = filter === 'all' || card.getAttribute('data-category') === filter;
                    card.classList.toggle('is-hidden', !match);
                });
            });
        });
    }

    // ============================================================
    // EMAILJS (HANYA JIKA ADA FORM)
    // ============================================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const alertMessage = document.getElementById('alertMessage');

    if (contactForm && submitBtn && alertMessage && typeof emailjs !== 'undefined') {
        emailjs.init("Nz7EQLCcWn0ujcsin");

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

            emailjs.send('service_jikxbjd', 'template_beqfhmy', formData)
                .then(function() {
                    alertMessage.className = 'alert alert-success mt-2';
                    alertMessage.style.display = 'block';
                    alertMessage.innerHTML = '<strong>Berhasil!</strong> Pesan terkirim. Terima kasih!';
                    contactForm.reset();
                    setTimeout(function() { alertMessage.style.display = 'none'; }, 5000);
                })
                .catch(function(error) {
                    alertMessage.className = 'alert alert-danger mt-2';
                    alertMessage.style.display = 'block';
                    alertMessage.innerHTML = '<strong>Gagal!</strong> ' + JSON.stringify(error);
                    setTimeout(function() { alertMessage.style.display = 'none'; }, 7000);
                })
                .finally(function() {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = defaultLabel;
                });
        });
    }

    // ============================================================
    // GANTI FOTO PROFIL (HANYA JIKA ADA)
    // ============================================================
    window.changePhoto = function(filename, button) {
        const img = document.getElementById('profileImage');
        if (img) {
            img.src = 'assets/images/me/' + filename;
            document.querySelectorAll('.profile-switch-btn').forEach(function(btn) {
                btn.classList.remove('active');
            });
            if (button) {
                button.classList.add('active');
            }
        }
    };

    // ============================================================
    // MODAL SERTIFIKAT
    // ============================================================
    window.openCertModal = function(certId) {
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
        const cert = certData[certId];
        if (!cert) return;
        const modalTitle = document.getElementById('modalCertTitle');
        const modalIssuer = document.getElementById('modalCertIssuer');
        const modalImg = document.getElementById('modalCertImg');
        if (modalTitle) modalTitle.textContent = cert.title;
        if (modalIssuer) modalIssuer.textContent = cert.issuer;
        if (modalImg) modalImg.src = cert.img;
        const modal = document.getElementById('certModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeCertModal = function() {
        const modal = document.getElementById('certModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // ============================================================
    // MODAL PREVIEW PROJEK
    // ============================================================
    window.openProjectModal = function(imageSrc, title) {
        const modal = document.getElementById('projectModal');
        const img = document.getElementById('modalPreviewImg');
        const titleEl = document.getElementById('modalPreviewTitle');
        if (modal && img && titleEl) {
            img.src = imageSrc;
            titleEl.textContent = title || 'Preview';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeProjectModal = function() {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Tutup modal dengan ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const certModal = document.getElementById('certModal');
            if (certModal && certModal.classList.contains('active')) {
                window.closeCertModal();
            }
            const projectModal = document.getElementById('projectModal');
            if (projectModal && projectModal.classList.contains('active')) {
                window.closeProjectModal();
            }
        }
    });

    // Tutup modal saat klik overlay
    document.addEventListener('click', function(e) {
        const certModal = document.getElementById('certModal');
        if (certModal && e.target === certModal) {
            window.closeCertModal();
        }
        const projectModal = document.getElementById('projectModal');
        if (projectModal && e.target === projectModal) {
            window.closeProjectModal();
        }
    });
});