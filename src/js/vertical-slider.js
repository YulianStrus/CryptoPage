document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const cardsInner = document.querySelector('.cards-inner');
  const cards = document.querySelectorAll('.card');
  const title = document.querySelector('#active-title');
  const text = document.querySelector('#active-text');
  const scrollingRow = document.querySelector('.scrolling-row');

  const data = Array.from(cards).map(card => ({
    title: card.getAttribute('data-title') || '',
    text: card.getAttribute('data-text') || '',
  }));

  const cardHeight = cards[0]?.offsetHeight || 150;
  const visibleCards = 3;
  const totalCards = cards.length;
  const scrollableCards = totalCards - visibleCards;// тут міняємо!
  let currentIndex = 0;

  function updateCardsPosition(index) {
    const offset = -index * cardHeight;
    cardsInner.style.transform = `translateY(${offset}px)`;

    cards.forEach((card, i) => {
      card.classList.toggle('active-slide', i === index);
    });

    title.textContent = data[index]?.title || '';
    text.textContent = data[index]?.text || '';

    gsap.fromTo([title, text], { opacity: 0 }, { opacity: 1, duration: 0.3 });
  }

  ScrollTrigger.create({
    trigger: scrollingRow,
    start: 'center center',
    end: `+=${scrollableCards * cardHeight}`, // тобто 8 * 150px
    pin: true,
    pinSpacing: true,
    scrub: 1,
    snap: {
      snapTo: 1 / scrollableCards, // теж на 8 частин
      duration: 0.3,
      ease: "power1.inOut"
    },
    onUpdate: self => {
      const newIndex = Math.min(
        totalCards - 1,
        Math.round(self.progress * (totalCards - 1))
      );
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateCardsPosition(currentIndex);
      }
    },
  });

  updateCardsPosition(currentIndex);
});
