
document.addEventListener('DOMContentLoaded', () => {
  let currentMode = '';

  function initDesktopSlider() {
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

    const cardHeight = 150;
    const visibleCards = 3;
    const totalCards = cards.length;
    const scrollableCards = totalCards - visibleCards;
    let currentIndex = 0;

    function updateCardsPosition(index) {
      const maxOffset = -(cards.length - visibleCards) * cardHeight;
      const offset = Math.max(-index * cardHeight, maxOffset);

      cardsInner.style.transform = `translateY(${offset}px)`;

      cards.forEach((card, i) => {
        card.classList.toggle("active", i === index);
      });

      title.textContent = data[index].title;
      text.textContent = data[index].text;

      gsap.fromTo([title, text], { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }

    ScrollTrigger.create({
      trigger: scrollingRow,
      start: 'center center',
      end: `+=${scrollableCards * cardHeight}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      snap: {
        snapTo: 1 / scrollableCards,
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
  }

  function destroyDesktopSlider() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  function initMobileSlider() {
    const sliderWrapper = document.querySelector('.vertical-slider__wrapper');
    const slider = document.querySelector('.vertical-slider__slides');
    const slides = document.querySelectorAll('.vertical-slider__slide');
    const titleElement = document.getElementById('slider-title');

    if (!slider || !sliderWrapper || slides.length === 0) return;

    let currentIndex = 0;
    let totalSlides = slides.length;
    let isScrolling = false;
    let isMobile = window.innerWidth <= 768;
    let autoScrollInterval = null;

    function initSlider() {
      sliderWrapper.removeEventListener('wheel', handleWheel);
      sliderWrapper.removeEventListener('mouseenter', handleWrapperMouseEnter);
      sliderWrapper.removeEventListener('mouseleave', handleWrapperMouseLeave);
      slider.removeEventListener('scroll', handleMobileScroll);
      stopAutoScroll();

      if (isMobile) {
        setupMobileScrollHandlers();
      } else {
        setupDesktopHandlers();
      }

      updateSlideClasses();
      updateTitle();
      if (!isMobile) {
        scrollToCenterSlide(currentIndex, 'auto');
      }
    }

    function updateTitle() {
      if (titleElement && slides[currentIndex]) {
        const newTitle = slides[currentIndex].getAttribute('data-title');
        titleElement.textContent = newTitle && newTitle.trim() !== ''
          ? newTitle
          : `Slide ${currentIndex + 1}`;
      }
    }

    function scrollToCenterSlide(index, behavior = 'smooth') {
      if (!slides[index] || isMobile || totalSlides < 3) return;

      let firstVisibleIndex = Math.max(0, Math.min(index - 1, totalSlides - 3));
      const firstVisibleSlide = slides[firstVisibleIndex];
      if (!firstVisibleSlide) return;

      const targetScrollTop = firstVisibleSlide.offsetTop;

      slider.scrollTo({
        top: targetScrollTop,
        behavior: behavior,
      });
    }

    function updateSlideClasses() {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active-slide', i === currentIndex);
      });
    }

    function changeSlide(newIndex) {
      if (newIndex < 0 || newIndex >= totalSlides || newIndex === currentIndex || isScrolling) return false;

      isScrolling = true;
      currentIndex = newIndex;
      updateTitle();
      updateSlideClasses();

      if (!isMobile) {
        scrollToCenterSlide(currentIndex, 'smooth');
      }

      setTimeout(() => {
        isScrolling = false;
      }, 400);

      return true;
    }

    function slideUp() {
      if (isScrolling) return;
      changeSlide(currentIndex - 1);
    }

    function slideDown() {
      if (isScrolling) return;
      const nextIndex = (currentIndex + 1) % totalSlides;
      changeSlide(nextIndex);
    }

    function startAutoScroll() {
      stopAutoScroll();
      autoScrollInterval = setInterval(() => {
        slideDown();
      }, 2000);
    }

    function stopAutoScroll() {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    }

    function handleWheel(e) {
      stopAutoScroll();
      e.preventDefault();
      if (isScrolling) return;

      if (e.deltaY > 0) {
        slideDown();
      } else {
        slideUp();
      }
    }

    function handleWrapperMouseEnter() {
      if (isMobile || autoScrollInterval) return;
      startAutoScroll();
    }

    function handleWrapperMouseLeave() {
      if (isMobile) return;
      stopAutoScroll();
    }

    function setupDesktopHandlers() {
      sliderWrapper.addEventListener('wheel', handleWheel, { passive: false });
      sliderWrapper.addEventListener('mouseenter', handleWrapperMouseEnter);
      sliderWrapper.addEventListener('mouseleave', handleWrapperMouseLeave);
    }

    let scrollTimeout;
    function handleMobileScroll() {
      if (isScrolling) return;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        const scrollTop = slider.scrollTop;
        let closestIndex = 0;
        let minDistance = Infinity;

        slides.forEach((slide, index) => {
          const slideTop = slide.offsetTop - slider.offsetTop;
          const slideCenter = slideTop + slide.offsetHeight / 2;
          const containerCenter = scrollTop + slider.clientHeight / 2;
          const distance = Math.abs(slideCenter - containerCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });

        if (closestIndex !== currentIndex) {
          currentIndex = closestIndex;
          updateSlideClasses();
          updateTitle();
        }
      }, 150);
    }

    function setupMobileScrollHandlers() {
      slider.addEventListener('scroll', handleMobileScroll, { passive: true });
      updateSlideClasses();
    }

    function handleResize() {
      const currentlyMobile = window.innerWidth <= 768;
      if (isMobile !== currentlyMobile) {
        isMobile = currentlyMobile;
        stopAutoScroll();
        initSlider();
      }
    }

    window.addEventListener('resize', handleResize);
    initSlider();
  }

  function destroyMobileSlider() {
    // Можна тут очистити інтервали або слухачі, якщо потрібно
  }

  function setupSlider() {
    const width = window.innerWidth;
    if (width >= 1025 && currentMode !== 'desktop') {
      currentMode = 'desktop';
      destroyMobileSlider();
      initDesktopSlider();
    } else if (width < 1025 && currentMode !== 'mobile') {
      currentMode = 'mobile';
      destroyDesktopSlider();
      initMobileSlider();
    }
  }

  window.addEventListener('resize', () => {
    setupSlider();
  });

  setupSlider();
});
