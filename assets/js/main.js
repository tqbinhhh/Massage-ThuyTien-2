document.addEventListener('DOMContentLoaded', function () {
    // 1. KHỞI TẠO THƯ VIỆN AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // 2. CÁC BIẾN CẦN THIẾT CHO HEADER
    const header = document.querySelector('.header');
    const headerToggle = document.querySelector('.header-toggle');
    const desktopMenu = document.querySelector('.header .inner-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;

    // 3. TỰ ĐỘNG SAO CHÉP MENU DESKTOP SANG MOBILE
    if (desktopMenu && mobileMenuOverlay) {
        mobileMenuOverlay.innerHTML = desktopMenu.innerHTML;
    }

    // 4. HIỆU ỨNG HEADER KHI CUỘN
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('is-scrolled', window.scrollY > 50);
        });
    }

    // 5. LOGIC ĐÓNG/MỞ MENU
    function toggleMenu() {
        if (!mobileMenuOverlay || !headerToggle || !body) return;

        const isOpen = mobileMenuOverlay.classList.toggle('is-open');
        headerToggle.classList.toggle('is-active', isOpen);
        body.classList.toggle('overlay-active', isOpen);

        const icon = headerToggle.querySelector('i');
        if (icon) {
            icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        }
    }

    if (headerToggle) {
        headerToggle.addEventListener('click', toggleMenu);
    }

    // 6. ĐÓNG MENU KHI BẤM LINK
    const navLinks = mobileMenuOverlay.querySelectorAll('a');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (mobileMenuOverlay.classList.contains('is-open')) {
                toggleMenu();
            }

            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            }
        });
    });
});
