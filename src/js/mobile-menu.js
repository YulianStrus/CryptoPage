(() => {
  const refs = {
    openModalBtn: document.querySelectorAll('[data-mobile-open]'),
    closeModalBtn: document.querySelectorAll('[data-mobile-close]'),
    modal: document.querySelector('[data-mobile]'),
    backdrop: document.querySelector('[data-mobile-backdrop]'),
    body: document.body,
    modalItems: document.querySelectorAll('.mobile-menu__nav-item'),
    btnItems: document.querySelectorAll('.mobile-menu__buttons > *'),
  };

  refs.openModalBtn.forEach(btn => {
    btn.addEventListener('click', toggleModal);
  });

  refs.closeModalBtn.forEach(btn => {
    btn.addEventListener('click', toggleModal);
  });

  refs.backdrop?.addEventListener('click', toggleModal);

  function toggleModal() {
    const isMenuHidden = refs.modal.classList.contains(
      'mobile-menu__is-hidden'
    );
    refs.modal.classList.toggle('mobile-menu__is-hidden');
    refs.backdrop?.classList.toggle('mobile-menu__is-hidden');

    if (isMenuHidden) {
      disableScroll();
    } else {
      enableScroll();
    }
  }

  function disableScroll() {
    const scrollY = window.scrollY;
    refs.body.style.position = 'fixed';
    refs.body.style.top = `-${scrollY}px`;
    refs.body.style.left = '0';
    refs.body.style.right = '0';
    refs.body.style.width = '100%';
    refs.body.style.overflow = 'hidden';
    refs.body.dataset.scrollY = scrollY;
  }

  function enableScroll() {
    refs.body.style.position = '';
    refs.body.style.top = '';
    refs.body.style.left = '';
    refs.body.style.right = '';
    refs.body.style.width = '';
    refs.body.style.overflow = '';

    const scrollY = parseInt(refs.body.dataset.scrollY || '0');
    window.scrollTo(0, scrollY);
    delete refs.body.dataset.scrollY;
  }
})();
