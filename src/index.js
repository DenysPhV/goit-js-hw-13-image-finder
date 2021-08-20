// const debounce = require('lodash.debounce');
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import { error } from '@pnotify/core';

import ServiceImage from './js/apiService';

import refs from './js/refs';
import imageCardTpl from './templates/image-card.hbs';

const apiService = new ServiceImage();

function onInputChange(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.query.value.trim();
  apiService.resetPage();
  clearGallery();

  apiService.fetchImage().then(data => {
    if (data.length === 0 || apiService.query.trim() === '') {
      error({
        title: 'NOT FOUND',
        text: 'Please enter a more specific query',
        addClass: 'error',
        delay: 2000,
      });
    } else {
      appendImagesMarkup(data);
      refs.loadMoreBtn.classList.remove('hide');
    }
  });
}

function onMoreLoad(event) {
  apiService
    .fetchImage()
    .then(appendImagesMarkup)
    .then(() => {
      scrollGallery();
    });
}

function appendImagesMarkup(hits) {
  refs.galleryList.insertAdjacentHTML('beforeend', imageCardTpl(hits));
}

function clearGallery() {
  refs.galleryList.innerHTML = '';
  refs.loadMoreBtn.classList.add('hide');
}

function scrollGallery() {
  refs.loadMoreBtn.scrollIntoView({
    top: refs.galleryList.scrollHeight,
    behavior: 'smooth',

    // block: 'end',
  });
}
refs.formInput.addEventListener('submit', onInputChange);
refs.loadMoreBtn.addEventListener('click', onMoreLoad);
