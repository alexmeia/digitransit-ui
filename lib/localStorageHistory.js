import _extends from 'babel-runtime/helpers/extends';

var _this = this;

import { createMemoryHistory } from 'history';
import { setHistory, getHistory } from './store/localStorage';

function getHistoryConsideringTime() {
  var history = getHistory();
  if (history.time > Date.now() - 60 * 60 * 1000) {
    return history;
  }
  return { entries: ['/'], index: 0, time: 0 };
}

// minimial serializable history state (just the paths)
var history = getHistoryConsideringTime();

var isInitialized = false;

var saveHistory = function saveHistory() {
  setHistory(_extends({}, history, { time: Date.now() }));
};

var PUSH = function PUSH(entry) {
  history.entries.splice(history.index + 1);
  history.entries.push(entry.pathname);
  history.index += 1;
  saveHistory();
};

var POP = function POP() {
  if (isInitialized && history.index > 0) {
    history.index -= 1;
    saveHistory();
  } else if (!isInitialized) {
    isInitialized = true;
  }
};

var REPLACE = function REPLACE(entry) {
  history.entries.splice(history.index);
  history.entries.push(entry.pathname);
  saveHistory();
};

var getEntries = function getEntries() {
  return history.entries;
};
var getIndex = function getIndex() {
  return history.index;
};

var createLocalStorageHistory = function createLocalStorageHistory() {
  var hist = createMemoryHistory({
    current: getIndex(),
    entries: getEntries()
  });
  hist.listen(function (event) {
    switch (event.action) {
      case 'POP':
        POP(event);break;
      case 'REPLACE':
        REPLACE(event);break;
      case 'PUSH':
        PUSH(event);break;
      default:
        console.error('unhandled history event:', event);
    }
    if (_this[event.action] !== undefined) {
      _this[event.action](event);
    }
  });
  return hist;
};

export { createLocalStorageHistory as default, getIndex };