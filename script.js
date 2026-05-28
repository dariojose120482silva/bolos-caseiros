  // ── Carousel ──
  const track = document.getElementById('carouselTrack');
  const cards = track.querySelectorAll('.cake-card');
  const dotsContainer = document.getElementById('dots');
  let current = 0;

  const cardWidth = () => cards[0].offsetWidth + 24;
  const visibleCount = () => Math.floor(track.parentElement.offsetWidth / cardWidth()) || 1;
  const maxIndex = () => Math.max(0, cards.length - visibleCount());

  // Create dots
  cards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.onclick = () => goTo(i);
    dotsContainer.appendChild(d);
  });

  function updateDots() {
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex()));
    track.style.transform = `translateX(-${current * cardWidth()}px)`;
    updateDots();
  }

  window.slide = (dir) => goTo(current + dir);

  // Auto-slide
  setInterval(() => goTo(current >= maxIndex() ? 0 : current + 1), 4000);
  window.addEventListener('resize', () => goTo(Math.min(current, maxIndex())));

  // ── Smooth scroll for hero CTA ──
  document.querySelector('.hero-cta').addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('cardapio').scrollIntoView({ behavior: 'smooth' });
  });