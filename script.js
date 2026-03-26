document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
    });

    // 2. Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Handle "Solve a Problem" Form
    const problemForm = document.getElementById('problem-form');
    if (problemForm) {
        problemForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Thanks! I've received your query and will get back to you soon.");
            problemForm.reset();
        });
    }
});