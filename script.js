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