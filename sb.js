document.addEventListener("DOMContentLoaded", function () {
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transition = '0.3s ease';
            link.style.borderBottom = '2px solid #0073e6';
        });
        link.addEventListener('mouseleave', () => {
            link.style.borderBottom = 'none';
        });
    });

    //  Smooth Fade-In for Elements
    const fadeInElements = document.querySelectorAll('.welcome, .breadcrumb, .account-info, .sidebar a');
    fadeInElements.forEach((element, index) => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }, index * 100); // Stagger the animations
    });

    //  Hover Scale Effect for Sidebar and Nav-Bar Links
    const navBarLinks = document.querySelectorAll('.nav-bar a, .sidebar a');
    navBarLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.05)';
            link.style.transition = 'transform 0.2s ease-in-out';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
        });
    });

    //  Typing Animation for Welcome Message
    const welcomeText = document.querySelector('.welcome p');
    const text = welcomeText.innerHTML;
    welcomeText.innerHTML = '';
    let index = 0;
    function typeText() {
        if (index < text.length) {
            welcomeText.innerHTML += text[index];
            index++;
            setTimeout(typeText, 50);
        }
    }
    typeText();

    //  Smooth Scroll Back to Top
    const footer = document.querySelector('.footer');
    footer.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
