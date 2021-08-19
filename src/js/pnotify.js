import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';

import { defaults, error } from '@pnotify/core/dist/PNotify';

function rejected() {
  defaults.styling = 'material';
  defaults.icons = 'material';
  defaults.width = '300px';
  return error({ text: 'There has been a problem with your fetch operation: ' });
}

export default rejected;
