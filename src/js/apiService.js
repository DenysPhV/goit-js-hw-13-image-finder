// https://pixabay.com/api/?key=22979201-d3b88ee555cfd640fb3d2f529&q=yellow+flowers&image_type=photo&pretty=true
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import { info } from '@pnotify/core';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_ACC = '22979201-d3b88ee555cfd640fb3d2f529';

class ServiceImage {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImage() {
    return fetch(
      `${BASE_URL}?q=${this.searchQuery}&image_type=photo&orientation=horizontal&${this.page}&per_page=12&key=${KEY_ACC}`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(({ hits }) => {
        return hits;
      });
  }

  getPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export default ServiceImage;
