export function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const drawer = document.getElementById('nav-drawer');
    if (!toggle || !drawer) return;

    const closeMenu = () => {
        toggle.classList.remove('active');
        drawer.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        const backdrop = document.querySelector('.menu-backdrop');
        if (backdrop) {
            backdrop.classList.remove('active');
            setTimeout(() => backdrop.remove(), 300);
        }
    };

    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !expanded);
        toggle.classList.toggle('active');
        drawer.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        let backdrop = document.querySelector('.menu-backdrop');
        if (!backdrop && drawer.classList.contains('active')) {
            backdrop = document.createElement('div');
            backdrop.className = 'menu-backdrop';
            document.body.appendChild(backdrop);
            setTimeout(() => backdrop.classList.add('active'), 10);
            backdrop.addEventListener('click', closeMenu);
        } else if (backdrop) {
            backdrop.classList.toggle('active');
            if (!backdrop.classList.contains('active')) {
                setTimeout(() => backdrop.remove(), 300);
            }
        }

        if (drawer.classList.contains('active')) {
            setTimeout(() => {
                const firstLink = drawer.querySelector('a');
                if (firstLink) firstLink.focus();
            }, 300);
        }
    });

    drawer.querySelectorAll('a').forEach(link =>
        link.addEventListener('click', closeMenu)
    );

    document.addEventListener('click', (e) => {
        if (!drawer.contains(e.target) && !toggle.contains(e.target) && drawer.classList.contains('active')) {
            closeMenu();
        }
    });
}
