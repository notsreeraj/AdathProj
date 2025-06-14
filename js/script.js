// filepath: c:\Users\sreer\Demo\js\script.js
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.1 
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    // Optional: remove class if you want animation to re-trigger on scroll up
                    // entry.target.classList.remove('is-visible'); 
                }
            });
        };

        const animationObserver = new IntersectionObserver(observerCallback, observerOptions);

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    }

    // The old JavaScript for mailto: link has been removed as formsubmit.co handles submission.
});