document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const cardsInner = document.querySelector('.cards-inner');
  const cards = document.querySelectorAll('.card');
  const title = document.querySelector('#active-title');
  const text = document.querySelector('#active-text');
  const scrollingRow = document.querySelector('.scrolling-row');

  const data = [
    {
      title: '1.Lörem ipsum dorade boktig till geosylig postmodern.',
      text: '1.Lörem ipsum sosm niliga syntris.',
    },
    {
      title: '2.Lörem ipsum dorade boktig till geosylig postmodern.',
      text: '2.Lörem ipsum sosm niliga syntris.',
    },
    {
      title: '3.Lörem ipsum dorade boktig till geosylig postmodern.',
      text: '3.Lörem ipsum sosm niliga syntris.',
    },
    {
      title: '4.Lörem ipsum dorade boktig till geosylig postmodern.',
      text: '4.Lörem ipsum sosm niliga syntris.',
    },
    {
      title: '5.Lörem ipsum dorade boktig till geosylig postmodern.',
      text: '5.Lörem ipsum sosm niliga syntris.',
    },
    {
      title: '6.Lörem ipsum dorade boktig till geosylig postmodern.',
      text: '6.Lörem ipsum sosm niliga syntris.',
    },
    {
      title: '7.Lörem ipsum dorade boktig till geosylig postmodern.',
      text: '7.Lörem ipsum sosm niliga syntris.',
    },
  ];

  const cardHeight = 150;
  let currentIndex = 0;

  function setInitialCards() {
    cardsInner.style.transform = 'translateY(0px)';
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === 0);
    });
    title.textContent = data[0].title;
    text.textContent = data[0].text;
  }
  setInitialCards();

  function updateCardsPosition(index) {
    const maxOffset = -(cards.length - 3) * cardHeight;
    const offset = Math.max(-index * cardHeight, maxOffset);

    cardsInner.style.transform = `translateY(${offset}px)`;

    cards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });

    title.textContent = data[index].title;
    text.textContent = data[index].text;

    gsap.fromTo([title, text], { opacity: 0 }, { opacity: 1, duration: 0.3 });
  }

  ScrollTrigger.create({
    trigger: scrollingRow,
    start: 'center center',
    end: `+=${cardHeight * (cards.length - 3)}`,
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
});
