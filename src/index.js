// const debounce = require('lodash.debounce');
// import loadBtn from './js/load-element';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';

import { error } from '@pnotify/core/dist/PNotify';

import ServiceImage from './js/apiService';
// import rejected from './js/pnotify';

import refs from './js/refs';
import imageCardTpl from './templates/image-card.hbs';

const apiService = new ServiceImage();

function onInputChange(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.query.value.trim();
  //   if (event.currentTarget.elements.query.value === '') {
  //     rejected();
  //     return;
  //   }

  apiService.resetPage();
  clearGallery();

  apiService.fetchImage().then(data => {
    if (data.length === 0) {
      error({
        title: 'Not found',
        text: 'Please enter a more specific query',
        addClass: 'error',
        delay: 1500,
      });
    } else if (apiService.query.trim() === '') {
      error({
        title: 'Not found',
        text: 'Please enter a more specific query',
        addClass: 'error',
        delay: 1500,
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
      refs.loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    });
}

function clearGallery() {
  refs.galleryList.innerHTML = '';
  refs.loadMoreBtn.classList.add('hide');
}

function appendImagesMarkup(hits) {
  refs.galleryList.insertAdjacentHTML('beforeend', imageCardTpl(hits));
}

refs.formInput.addEventListener('submit', onInputChange);
refs.loadMoreBtn.addEventListener('click', onMoreLoad);
