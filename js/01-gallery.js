// Завдання 1 - галерея зображень
// Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного зображення у модальному вікні. Подивися демо відео роботи галереї.

// Виконуй це завдання у файлах 01-gallery.html і 01-gallery.js. Розбий його на декілька підзавдань:

// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// Реалізація делегування на div.gallery і отримання url великого зображення.
// Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.
// Розмітка елемента галереї
// Посилання на оригінальне зображення повинно зберігатися в data-атрибуті source на елементі <img>, і вказуватися в href посилання. Не додавай інші HTML теги або CSS класи, крім тих, що містяться в цьому шаблоні.

// <div class="gallery__item">
//   <a class="gallery__link" href="large-image.jpg">
//     <img
//       class="gallery__image"
//       src="small-image.jpg"
//       data-source="large-image.jpg"
//       alt="Image description"
//     />
//   </a>
// </div>
// Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням користувач буде перенаправлений на іншу сторінку. Заборони цю поведінку за замовчуванням.

// Закриття з клавіатури
// УВАГА
// Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.

// Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно. Бібліотекаи basicLightbox містить метод для програмного закриття модального вікна.

import { galleryItems } from './gallery-items.js';
// Change code below this line

// получаем доступ к div где будет храниться коллекция
const galleryContainer = document.querySelector('.gallery');
// создаем переменую где будет храниться вся галерея
const cardMarkup = createGalleryCardsMarkup(galleryItems);

// добавляем созданную галерею в разметку
galleryContainer.insertAdjacentHTML('beforeend', cardMarkup);

function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item ">
    <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" 
    data-source="${original}"
    alt="${description}" />
    </a>
    
    
    </div>`;
    })
    .join('');
}

galleryContainer.addEventListener('click', onModal);
function onModal(evt) {
  evt.preventDefault();
  // const test = evt.target.classList.contains('gallery__item');
  // if (test) {
  //   console.log(evt.target);
  const instance = basicLightbox.create(`<img src="${evt.target.dataset.source}">`, {
    onShow: instance => {
      window.addEventListener('keydown', onCloseEsc);
    },

    onClose: instance => {
      window.removeEventListener('keydown', onCloseEsc);
    },
  });

  function onCloseEsc(evt) {
    if (evt.code === 'Escape') {
      instance.close();
    } else {
      return;
    }
  }
  //   console.log(evt);
  instance.show();
  // return instance;
  // } else {
  // return;
  // }
}
