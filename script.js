document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                navLinks.forEach(nav => nav.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Highlight active navigation link on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7 // Adjust as needed, a higher threshold means more of the section must be visible
    };

    const observer = new IntersectionObserver((entries) => {
        // Choose the intersecting entry with the largest intersectionRatio
        let bestEntry = null;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
                    bestEntry = entry;
                }
            }
        });

        if (bestEntry) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${bestEntry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});