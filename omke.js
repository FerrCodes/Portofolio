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

// ===== DROPDOWN NAVBAR HANDLER (khusus untuk halaman kedua) =====
document.addEventListener('DOMContentLoaded', function () {
    const navDropdownWrap = document.getElementById('navDropdownWrap');
    const navDropdownToggle = document.getElementById('menuDropdown');

    if (navDropdownWrap && navDropdownToggle) {
        // Click/tap untuk toggle dropdown
        navDropdownToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = navDropdownWrap.classList.toggle('show');
            navDropdownToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Tutup menu setelah item diklik
        navDropdownWrap.querySelectorAll('.dropdown-item').forEach(function (item) {
            item.addEventListener('click', function () {
                navDropdownWrap.classList.remove('show');
                navDropdownToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Tutup menu ketika klik di luar
        document.addEventListener('click', function (e) {
            if (!navDropdownWrap.contains(e.target)) {
                navDropdownWrap.classList.remove('show');
                navDropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Tutup menu dengan tombol Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                navDropdownWrap.classList.remove('show');
                navDropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});