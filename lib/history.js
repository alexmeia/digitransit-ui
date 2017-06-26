import { createHistory, createMemoryHistory } from 'history';
import { useRouterHistory } from 'react-router';
import createLocalStorageHistory from './localStorageHistory';
import { isIOSApp, isBrowser } from './util/browser';

var createHistoryFunction = void 0;

if (isIOSApp) {
  createHistoryFunction = createLocalStorageHistory;
} else if (isBrowser) {
  createHistoryFunction = createHistory;
} else {
  createHistoryFunction = createMemoryHistory;
}

var history = function history(config) {
  return useRouterHistory(createHistoryFunction)({
    basename: config.APP_PATH
  });
};

export default history;