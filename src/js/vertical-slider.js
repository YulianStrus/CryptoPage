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
  let currentIndex = 0;

  const visibleCards = 3;
const maxIndex = cards.length - visibleCards;
const maxOffset = -maxIndex * cardHeight;

function updateCardsPosition(index) {
  const offset = Math.max(-index * cardHeight, maxOffset);

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
    end: `+=${cardHeight * maxIndex}`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onEnter: () => {
      const pinSpacer = scrollingRow.parentElement;
      if (pinSpacer?.classList.contains('pin-spacer')) {
      }
    },

    onUpdate: self => {
      const newIndex = Math.min(
        cards.length - 1,
        Math.round(self.progress * (cards.length - 1))
      );
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateCardsPosition(currentIndex);
      }
    },
  });

  updateCardsPosition(currentIndex);
});