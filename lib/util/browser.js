export var isBrowser = typeof window !== 'undefined' && window !== null;
export var isIOSApp = isBrowser && navigator.standalone;

export var isWindowsPhone = isBrowser && navigator.userAgent.match(/Windows Phone/) != null;
export var isLangMockEn = isBrowser && window.location.search.indexOf('enmock') !== -1;
export var isDebugTiles = isBrowser && window.location.search.indexOf('debugTiles') !== -1;
export var isMobile = isBrowser && navigator.userAgent.match(/Mobile/) != null;
export var isFirefox = isBrowser && navigator.userAgent.match(/Firefox/) != null;
export var isAndroid = isBrowser && navigator.userAgent.match(/Android/) != null;
export var isChrome = isBrowser && navigator.userAgent.match(/Chrome/) != null;
export var isSamsungBrowser = isBrowser && navigator.userAgent.match(/SamsungBrowser/) != null;
export var isImperial = function isImperial(config) {
  if (config.imperialEnabled && (String(navigator.userLanguage).toLowerCase() === 'en-us' || String(navigator.language).toLowerCase() === 'en-us')) {
    return true;
  }
  return false;
};