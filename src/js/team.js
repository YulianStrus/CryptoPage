document.addEventListener('DOMContentLoaded', () => {
  const prevButton = document.querySelector('.team__slide-prev-button');
  const nextButton = document.querySelector('.team__slide-next-button');
  const dots = document.querySelectorAll('.team__slide-nav-dot');

  const profileImage = document.getElementById('profile-image');
  const profileTitle = document.getElementById('profile-title');
  const profileName = document.getElementById('profile-name');
  const profileSubtitle = document.getElementById('profile-subtitle');
  const infoTitle = document.getElementById('info-title');
  const infoSubtitle = document.getElementById('info-subtitle');
  const infoDescription = document.getElementById('info-description');

  const slidesData = [
    {
      image: {
        srcset: '/img/team/team-1.webp 1x, /img/team/team-1@2x.webp 2x',
        src: '/img/team/team-1.webp',
        alt: 'William Wilson',
      },
      profile: {
        title: 'DIAM VOLUTPAT',
        name: 'William Wilson',
        subtitle: 'Varius quam quisque',
      },
      info: {
        title: 'Android App Development',
        subtitle: 'Tincidunt vitae semper quis lectus nulla.',
        description:
          'Rutrum quisque non tellus orci ac auctor augue mauris augue. Fermentum dui faucibus in ornare quam viverra. Mollis aliquam ut porttitor leo a diam. Mattis molestie a iaculis at erat pellentesque adipiscing.',
      },
    },
    {
      image: {
        srcset: '/img/team/team-2.webp 1x, /img/team/team-2@2x.webp 2x',
        src: '/img/team/team-2.webp',
        alt: 'Emily Johnson',
      },
      profile: {
        title: 'DIAM VOLUTPAT',
        name: 'Emily Johnson',
        subtitle: 'Varius quam quisque',
      },
      info: {
        title: 'Android App Development',
        subtitle: 'Tincidunt vitae semper quis lectus nulla.',
        description:
          'Rutrum quisque non tellus orci ac auctor augue mauris augue. Fermentum dui faucibus in ornare quam viverra. Mollis aliquam ut porttitor leo a diam. Mattis molestie a iaculis at erat pellentesque adipiscing.',
      },
    },
    {
      image: {
        srcset: '/img/team/team-3.webp 1x, /img/team/team-3@2x.webp 2x',
        src: '/img/team/team-3.webp',
        alt: 'Alexander Smith',
      },
      profile: {
        title: 'DIAM VOLUTPAT',
        name: 'Alexander Smith',
        subtitle: 'Varius quam quisque',
      },
      info: {
        title: 'Android App Development',
        subtitle: 'Tincidunt vitae semper quis lectus nulla.',
        description:
          'Rutrum quisque non tellus orci ac auctor augue mauris augue. Fermentum dui faucibus in ornare quam viverra. Mollis aliquam ut porttitor leo a diam. Mattis molestie a iaculis at erat pellentesque adipiscing.',
      },
    },
  ];

  let currentSlide = 0;

  function updateSlide(slideIndex) {
    const slideData = slidesData[slideIndex];

    const elements = [
      profileImage,
      profileTitle,
      profileName,
      profileSubtitle,
      infoTitle,
      infoSubtitle,
      infoDescription,
    ];
    elements.forEach(el => el.classList.add('fade-out'));

    setTimeout(() => {
      profileImage.srcset = slideData.image.srcset;
      profileImage.src = slideData.image.src;
      profileImage.alt = slideData.image.alt;

      profileTitle.textContent = slideData.profile.title;
      profileName.textContent = slideData.profile.name;
      profileSubtitle.textContent = slideData.profile.subtitle;

      infoTitle.textContent = slideData.info.title;
      infoSubtitle.textContent = slideData.info.subtitle;
      infoDescription.textContent = slideData.info.description;

      elements.forEach(el => {
        el.classList.remove('fade-out');
        el.classList.add('fade-in');
      });

      setTimeout(() => {
        elements.forEach(el => el.classList.remove('fade-in'));
      }, 300);
    }, 300);

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === slideIndex);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slidesData.length;
    updateSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slidesData.length) % slidesData.length;
    updateSlide(currentSlide);
  }

  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-index'));
      currentSlide = slideIndex;
      updateSlide(currentSlide);
    });
  });
});
