// const debounce = require('lodash.debounce');

import ServiceImage from './js/apiService';

import refs from './js/refs';
import imageCardTpl from './templates/image-card.hbs';

const apiService = new ServiceImage();

function onInputChange(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.query.value;
  apiService.resetPage();
  clearGallery();

  apiService
    .fetchImage()
    .then(hits => {
      appendImagesMarkup(hits);
      apiService.getPage();
    })
    .catch(event => {
      console.log('There has been a problem with your fetch operation: ' + event.message);
    });
}

function onMoreLoad(event) {
  apiService
    .fetchImage()
    .then(appendImagesMarkup)
    .then(data => {
      refs.loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    });
}

function appendImagesMarkup(hits) {
  refs.galleryList.insertAdjacentHTML('beforeend', imageCardTpl(hits));
}

function clearGallery() {
  refs.galleryList.innerHTML = '';
}

refs.formInput.addEventListener('submit', onInputChange);
refs.loadMoreBtn.addEventListener('click', onMoreLoad);
