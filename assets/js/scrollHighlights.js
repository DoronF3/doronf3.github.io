export function initScrollHighlight() {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-links a');

    const debounce = (fn, wait = 20) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), wait);
        };
    };

    const highlight = () => {
        let current = '';
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.clientHeight;
            if (scrollY >= top && scrollY <= top + height) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', debounce(highlight, 50));
}
