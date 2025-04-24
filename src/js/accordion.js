document.addEventListener('DOMContentLoaded', () => {
  const mobileAccordionItems = document.querySelectorAll(
    '.accordion__list-mobile .accordion__item'
  );
  let activeItem = null;

  function closeAccordionItem(item) {
    const content = item.querySelector('.accordion__item-content');
    if (!content) return;

    content.style.maxHeight = content.scrollHeight + 'px';
    content.offsetHeight;
    content.style.maxHeight = '0';

    content.addEventListener('transitionend', function handler() {
      item.classList.remove('accordion__item--active');
      content.removeEventListener('transitionend', handler);
    });
  }

  function openAccordionItem(item) {
    const content = item.querySelector('.accordion__item-content');
    if (!content) return;

    item.classList.add('accordion__item--active');
    content.style.maxHeight = content.scrollHeight + 'px';
  }

  mobileAccordionItems.forEach(item => {
    const button = item.querySelector('.accordion__item-wrapper');
    if (!button) return;

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('accordion__item--active');

      if (isActive) {
        closeAccordionItem(item);
        activeItem = null;
      } else {
        if (activeItem) {
          closeAccordionItem(activeItem);
        }
        openAccordionItem(item);
        activeItem = item;
      }
    });
  });

  const firstMenuItem = document.querySelector(
    '.accordion__list-desktop .accordion__item'
  );
  if (firstMenuItem) {
    firstMenuItem.classList.add('accordion__item--active');
  }
});

const contentData = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris commodo consequat.
                
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla 
                gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum 
                elit.`,
    footer: 'Lorem ipsum',
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor',
    text: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
                cillum dolore eu fugiat nulla pariatur.
                
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                mollit anim id est laborum. Curabitur pretium tincidunt lacus.`,
    footer: 'Lorem ipsum dolor',
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor sit amet',
    text: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis 
                et quasi architecto beatae vitae dicta sunt explicabo.
                
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
    footer: 'Dolor sit amet',
  },
  {
    id: 4,
    title: 'Lorem ipsum dolor',
    text: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
                praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias 
                excepturi sint occaecati cupiditate non provident.
                
                Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum 
                fuga. Et harum quidem rerum facilis est et expedita distinctio.`,
    footer: 'Ipsum dolor',
  },
  {
    id: 5,
    title: 'Lorem ipsum',
    text: `Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo 
                minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor 
                repellendus.
                
                Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe 
                eveniet ut et voluptates repudiandae sint et molestiae non recusandae.`,
    footer: 'Lorem',
  },
  {
    id: 6,
    title: 'Lorem ipsum dolor sit',
    text: `Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis 
                voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.`,
    footer: 'Ipsum dolor sit',
  },
];
const menuItems = document.querySelectorAll('.accordion__item');
const contentTitle = document.querySelector('.accordion__content-title');
const contentText = document.querySelector('.accordion__content-text');
const contentFooter = document.querySelector('.accordion__content-footer');

function updateContent(id) {
  const content = contentData.find(item => item.id === parseInt(id));
  if (content) {
    contentTitle.textContent = content.title;

    const paragraphs = content.text.split('\n\n');

    const existingParagraphs = document.querySelectorAll(
      '.accordion__content-text'
    );
    for (let i = 1; i < existingParagraphs.length; i++) {
      existingParagraphs[i].remove();
    }

    contentText.textContent = paragraphs[0].trim();

    const contentSection = document.querySelector('.accordion__item-content');
    const footerElement = document.querySelector('.accordion__content-footer');

    for (let i = 1; i < paragraphs.length; i++) {
      const p = document.createElement('p');
      p.className = 'accordion__content-text';
      p.textContent = paragraphs[i].trim();
      contentSection.insertBefore(p, footerElement);
    }

    contentFooter.textContent = content.footer;
  }
}

menuItems.forEach(item => {
  item.addEventListener('click', function () {
    menuItems.forEach(i => i.classList.remove('accordion__item--active'));

    this.classList.add('accordion__item--active');

    const id = this.getAttribute('data-id');
    updateContent(id);
  });
});

updateContent(1);
