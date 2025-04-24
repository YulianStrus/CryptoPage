let swiper = new Swiper('.swiper', {
  initialSlide: 1,
  spaceBetween: getSpaceBetween(),
  slidesPerView: getSlidesPerView(),
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next-custom',
    prevEl: '.swiper-button-prev-custom',
  },
});

function getSpaceBetween() {
  return window.innerWidth >= 1280 ? 50 : 18;
}

function getSlidesPerView() {
  return window.innerWidth >= 1280 ? 3 : 1;
}

window.addEventListener('resize', () => {
  swiper.params.spaceBetween = getSpaceBetween();
  swiper.params.slidesPerView = getSlidesPerView();
  swiper.update();
});
