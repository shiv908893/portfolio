/* ═══════════════════════════════════════════════
   PORTFOLIO SCRIPT — Shailesh Shukla
═══════════════════════════════════════════════ */

/* ── Splash Screen ── */
window.addEventListener('load', () => {
  const bar   = document.getElementById('splashBar');
  const splash = document.getElementById('splash');
  bar.style.width = '100%';
  setTimeout(() => {
    splash.classList.add('hidden');
    splash.addEventListener('transitionend', () => splash.remove(), { once: true });
  }, 1600);
});

/* ── Theme Toggle ── */
const themeBtn = document.getElementById('themeToggle');
const html     = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon();

themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon();
});

function updateThemeIcon() {
  const isDark = html.getAttribute('data-theme') === 'dark';
  themeBtn.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

/* ── Scroll Progress ── */
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

/* ── Navbar Scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile Drawer ── */
const burgerBtn     = document.getElementById('burgerBtn');
const mobileDrawer  = document.getElementById('mobileDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose   = document.getElementById('drawerClose');

function openDrawer()  { mobileDrawer.classList.add('open');  drawerOverlay.classList.add('show');  document.body.style.overflow = 'hidden'; }
function closeDrawer() { mobileDrawer.classList.remove('open'); drawerOverlay.classList.remove('show'); document.body.style.overflow = ''; }

burgerBtn.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);
document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', closeDrawer));

/* ── Smooth Scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Reveal on Scroll (IntersectionObserver) ── */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObserver.observe(el));

/* ── Counter Animation ── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1600;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.impact-num').forEach(el => counterObserver.observe(el));

/* ── Timeline Accordion ── */
document.querySelectorAll('[data-acc]').forEach(card => {
  const header = card.querySelector('.tl-header');
  header.addEventListener('click', () => {
    const isOpen = card.classList.contains('open');
    document.querySelectorAll('[data-acc]').forEach(c => c.classList.remove('open'));
    if (!isOpen) card.classList.add('open');
  });
  header.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') header.click(); });
  // Open first by default
  if (card === document.querySelector('[data-acc]')) card.classList.add('open');
});

/* ── Card Tilt Effect ── */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      const rx =  (y / rect.height) * 12;
      const ry = -(x / rect.width)  * 12;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── File Upload Label ── */
const solveFile = document.getElementById('solveFile');
const fileName  = document.getElementById('fileName');
if (solveFile) {
  solveFile.addEventListener('change', () => {
    fileName.textContent = solveFile.files[0] ? '📎 ' + solveFile.files[0].name : '';
  });
}

/* ── Solve Form Submit ── */
const solveForm    = document.getElementById('solveForm');
const solveSuccess = document.getElementById('formSuccess');
if (solveForm) {
  solveForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!solveForm.checkValidity()) { solveForm.reportValidity(); return; }
    solveSuccess.classList.add('show');
    solveForm.reset();
    fileName.textContent = '';
    setTimeout(() => solveSuccess.classList.remove('show'), 5000);
  });
}

/* ── Contact Form Submit ── */
const contactForm    = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
    contactSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(() => contactSuccess.classList.remove('show'), 5000);
  });
}

/* ── Active Nav Link on Scroll ── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');
const bnavItems = document.querySelectorAll('.bnav-item');
const hudActive = document.getElementById('hudActiveSection');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  bnavItems.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  
  if (hudActive && current) {
    hudActive.textContent = current.replace('-', ' ');
  }
}, { passive: true });


/* ══════════════════════════════════════════
   ANIMATED CANVAS BACKGROUND
   Soft gradient mesh + drifting particles
   + occasional faint connecting lines
══════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('bgCanvas');
  const ctx    = canvas.getContext('2d');

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.background = 'linear-gradient(135deg, #080c14 0%, #0d1220 50%, #080c14 100%)';
    return;
  }

  const isMobile = () => window.innerWidth < 768;
  const MAX_PARTICLES_DESKTOP = 80;
  const MAX_PARTICLES_MOBILE  = 30;
  const LINK_DIST = 140;

  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticle() {
    return {
      x:   randomBetween(0, W),
      y:   randomBetween(0, H),
      vx:  randomBetween(-0.25, 0.25),
      vy:  randomBetween(-0.18, 0.18),
      r:   randomBetween(1, 2.4),
      alpha: randomBetween(0.18, 0.55),
      color: Math.random() > 0.5 ? '99,102,241' : '6,182,212',
    };
  }

  function initParticles() {
    const count = isMobile() ? MAX_PARTICLES_MOBILE : MAX_PARTICLES_DESKTOP;
    particles = Array.from({ length: count }, createParticle);
  }

  /* Gradient mesh blobs */
  function drawMesh() {
    const blobs = [
      { x: W * 0.15, y: H * 0.20, r: W * 0.38, color: 'rgba(99,102,241,0.07)'  },
      { x: W * 0.80, y: H * 0.15, r: W * 0.30, color: 'rgba(6,182,212,0.05)'   },
      { x: W * 0.50, y: H * 0.75, r: W * 0.35, color: 'rgba(139,92,246,0.06)'  },
      { x: W * 0.90, y: H * 0.80, r: W * 0.25, color: 'rgba(16,185,129,0.04)'  },
    ];
    blobs.forEach(b => {
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      g.addColorStop(0, b.color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function update() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawMesh();

    // Connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const opacity = (1 - dist / LINK_DIST) * 0.12;
          ctx.strokeStyle = `rgba(99,102,241,${opacity})`;
          ctx.lineWidth   = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    });
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  resize();
  initParticles();
  loop();

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
})();
