document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust offset for sticky navbar
                        behavior: 'smooth'
                    });

                    // Update active class
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                    // For Bootstrap 5, also update aria-current
                    navLinks.forEach(nav => nav.removeAttribute('aria-current'));
                    this.setAttribute('aria-current', 'page');
                }
            }
        });
    });

    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // Optional: remove class if you want animation to repeat on scroll up
                // entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Service Card Pagination
    const cardsContainer = document.querySelector('.service-cards-container');
    if (cardsContainer) { // Check if the container exists
        const serviceCards = Array.from(cardsContainer.querySelectorAll('.service-card-item'));
        const prevButton = document.getElementById('prevPage');
        const nextButton = document.getElementById('nextPage');
        
        const cardsPerPage = 3;
        let currentPage = 1;
        const totalCards = serviceCards.length;
        const totalPages = Math.ceil(totalCards / cardsPerPage);

        function showPage(page) {
            // Hide all cards first
            serviceCards.forEach(card => card.classList.remove('active'));

            const startIndex = (page - 1) * cardsPerPage;
            const endIndex = startIndex + cardsPerPage;
            
            const cardsToShow = serviceCards.slice(startIndex, endIndex);
            
            // Ensure cards are visible before trying to animate
            // This might require a slight delay or ensuring 'is-visible' is added after 'active'
            // For simplicity, we'll add 'active' first. Animation might need adjustment if it relies on initial state.
            cardsToShow.forEach(card => {
                card.classList.add('active');
                // Re-trigger animation if cards are re-shown and were previously hidden by pagination
                // This depends on how your .is-visible and .animate-on-scroll classes interact
                // A simple way is to re-observe or manually add the class if needed
                // For now, let's assume the IntersectionObserver handles new 'active' cards if they become visible in viewport
            });


            // Update button states
            if (prevButton) {
                prevButton.classList.toggle('disabled', page === 1);
            }
            if (nextButton) {
                nextButton.classList.toggle('disabled', page === totalPages || totalCards === 0);
            }
        }

        if (prevButton) {
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    showPage(currentPage);
                }
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                if (currentPage < totalPages) {
                    currentPage++;
                    showPage(currentPage);
                }
            });
        }

        // Initial display
        if (totalCards > 0) {
            showPage(currentPage);
        } else { // If no cards, disable pagination and hide controls if desired
            if(prevButton) prevButton.classList.add('disabled');
            if(nextButton) nextButton.classList.add('disabled');
            // Optionally hide the whole pagination nav if no cards:
            // if (prevButton && nextButton) {
            //     const paginationNav = prevButton.closest('nav');
            //     if (paginationNav) paginationNav.style.display = 'none';
            // }
        }
    }
});