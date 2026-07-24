// ===== EMAILJS INIT =====
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("Nz7EQLCcWn0ujcsin");
    }
})();

// ===== DROPDOWN ICON (halaman pertama) =====
let isClicked = false;
function omkeGasm() {
    const icon = document.getElementById("ikondrop");
    if (!icon) return;
    isClicked = !isClicked;
    icon.style.transform = isClicked ? "rotate(180deg)" : "rotate(0deg)";
    icon.style.transition = "ease 0.2s";
}

document.addEventListener('DOMContentLoaded', function () {

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('dramaticNavbar') || document.getElementById('mainNavbar');
    const backToTop = document.getElementById('backToTop');
    
    if (navbar || backToTop) {
        let ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    if (navbar) {
                        navbar.classList.toggle('scrolled', window.scrollY > 50);
                    }
                    if (backToTop) {
                        backToTop.classList.toggle('show', window.scrollY > 300);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ===== LIGHTBOX =====
    window.bukaLightbox = function (src, caption) {
        const overlay = document.getElementById('lightboxOverlay');
        if (!overlay) return;
        document.getElementById('lightboxImg').src = src;
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

    // ===== CV MODAL =====
    window.bukaCV = function () {
        const cvModal = document.getElementById('cvModal');
        if (cvModal) cvModal.classList.add('show');
    };

    window.tutupCV = function () {
        const cvModal = document.getElementById('cvModal');
        if (cvModal) cvModal.classList.remove('show');
    };

    window.zoomCVToLightbox = function () {
        const cvImg = document.getElementById('cvImg');
        if (cvImg && cvImg.src) {
            window.open(cvImg.src, '_blank');
        }
    };

    window.zoomLightbox = function () {
        const lightboxImg = document.getElementById('lightboxImg');
        if (lightboxImg.src) {
            window.open(lightboxImg.src, '_blank');
        }
    };

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
    const contactForm = document.getElementById('contact-Form') || document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const alertMessage = document.getElementById('alertMessage');

    if (contactForm && submitBtn && alertMessage) {
        const defaultLabel = submitBtn.innerHTML;

        contactForm.addEventListener('submit', function (e) {
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
                .then(function () {
                    alertMessage.className = 'alert alert-success mt-2';
                    alertMessage.style.display = 'block';
                    alertMessage.innerHTML = '<strong>Berhasil!</strong> Pesan terkirim. Terima kasih!';
                    contactForm.reset();
                    setTimeout(function () { alertMessage.style.display = 'none'; }, 5000);
                }, function (error) {
                    alertMessage.className = 'alert alert-danger mt-2';
                    alertMessage.style.display = 'block';
                    alertMessage.innerHTML = '<strong>Gagal!</strong> ' + JSON.stringify(error);
                    setTimeout(function () { alertMessage.style.display = 'none'; }, 7000);
                })
                .finally(function () {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = defaultLabel;
                });
        });
    }

});

// ===== SIDE PANEL NAVBAR =====
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('navToggleBtn');
    const closeBtn = document.getElementById('navCloseBtn');
    const overlay = document.getElementById('navOverlay');
    const panel = document.getElementById('navPanel');
    const panelLinks = document.querySelectorAll('.nav-panel-link');

    // Fungsi buka panel
    function openPanel() {
        panel.classList.add('active');
        overlay.classList.add('active');
        toggleBtn.classList.add('active');
        document.body.style.overflow = 'hidden'; // nonaktifkan scroll
    }

    // Fungsi tutup panel
    function closePanel() {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        toggleBtn.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event: Tombol hamburger
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (panel.classList.contains('active')) {
                closePanel();
            } else {
                openPanel();
            }
        });
    }

    // Event: Tombol close (X)
    if (closeBtn) {
        closeBtn.addEventListener('click', closePanel);
    }

    // Event: Klik overlay (area gelap di belakang panel)
    if (overlay) {
        overlay.addEventListener('click', closePanel);
    }

    // Event: Setiap link di panel (tutup panel setelah diklik)
    if (panelLinks.length) {
        panelLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Hapus active dari semua link
                panelLinks.forEach(function(l) {
                    l.classList.remove('active');
                });
                // Tambahkan active ke link yang diklik
                this.classList.add('active');
                // Tutup panel setelah delay kecil (biar animasi smooth)
                setTimeout(closePanel, 150);
            });
        });
    }

    // Event: Tombol Escape untuk tutup panel
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && panel.classList.contains('active')) {
            closePanel();
        }
    });
});

// ===== ACTIVE NAV LINK BERDASARKAN SCROLL =====
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const desktopLinks = document.querySelectorAll('.nav-link-custom');
    const mobileLinks = document.querySelectorAll('.nav-panel-link');

    function updateActiveLink() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Jika tidak ada section yang cocok (misal di atas semua section), gunakan 'home'
        if (!currentSectionId && window.scrollY < 100) {
            currentSectionId = 'home';
        }

        // Update desktop links
        desktopLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });

        // Update mobile links (side panel)
        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    // Jalankan saat scroll
    window.addEventListener('scroll', updateActiveLink);
    // Jalankan saat halaman dimuat
    updateActiveLink();
});

// ===== GLOBAL FUNCTIONS (untuk dipanggil dari HTML) =====

// Toggle Photo Function - untuk halaman pertama
window.togglePhoto = function() {
    const profileImage = document.getElementById('profileImage');
    if (!profileImage) return;
    
    let currentPhoto = profileImage.src.includes('Me.jpg') ? 2 : 1;
    const photos = [
        'assets/images/fotoku.jpeg',
        'assets/images/Me.jpg'
    ];
    
    currentPhoto = currentPhoto === 1 ? 2 : 1;
    profileImage.src = photos[currentPhoto - 1];
    
    profileImage.style.opacity = '0';
    setTimeout(() => {
        profileImage.style.opacity = '1';
    }, 150);
};

// Toggle Skills Card Function - untuk halaman pertama
window.toggleSkills = function() {
    const skillsCard = document.getElementById('skillsCard');
    const toggleBtn = document.getElementById('toggleSkillsBtn');
    const toggleText = document.getElementById('toggleSkillsText');
    
    if (!skillsCard || !toggleBtn || !toggleText) return;
    
    const icon = toggleBtn.querySelector('i');
    
    if (skillsCard.style.display === 'none' || !skillsCard.style.display) {
        skillsCard.style.display = 'flex';
        setTimeout(() => {
            skillsCard.style.opacity = '1';
            skillsCard.style.transform = 'translateY(0)';
        }, 10);
        
        toggleText.textContent = 'Sembunyikan Tech Stack';
        if (icon) {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
        
        setTimeout(() => {
            skillsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        skillsCard.style.opacity = '0';
        skillsCard.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            skillsCard.style.display = 'none';
        }, 300);
        
        toggleText.textContent = 'Lihat Tech Stack';
        if (icon) {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
};

// ===== DESKTOP DROPDOWN TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.getElementById('dropdownToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (dropdownToggle && dropdownMenu) {
        // Toggle dropdown saat tombol diklik
        dropdownToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
            dropdownToggle.classList.toggle('active');
        });

        // Tutup dropdown saat klik di luar
        document.addEventListener('click', function(e) {
            if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
                dropdownToggle.classList.remove('active');
            }
        });

        // Tutup dropdown dengan Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdownMenu.classList.remove('show');
                dropdownToggle.classList.remove('active');
            }
        });

        // Tutup dropdown saat link di klik (navigasi)
        dropdownMenu.querySelectorAll('.dropdown-link').forEach(function(link) {
            link.addEventListener('click', function() {
                dropdownMenu.classList.remove('show');
                dropdownToggle.classList.remove('active');
            });
        });
    }
});