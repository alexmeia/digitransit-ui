import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Store from 'fluxible/addons/BaseStore';
import reactCookie from 'react-cookie';
import { isLangMockEn } from '../util/browser';

/* Language is stored in cookie, server should set the language based on browser
 * accepted languages
 */

var PreferencesStore = function (_Store) {
  _inherits(PreferencesStore, _Store);

  function PreferencesStore(dispatcher) {
    _classCallCheck(this, PreferencesStore);

    var _this = _possibleConstructorReturn(this, _Store.call(this, dispatcher));

    var config = dispatcher.getContext().config;
    _this.availableLanguages = config.availableLanguages;
    _this.defaultLanguage = config.defaultLanguage;

    if (isLangMockEn) {
      _this.setLanguage('en');
    }

    var language = reactCookie.load('lang');
    if (_this.availableLanguages.indexOf(language) === -1) {
      // illegal selection, use default
      _this.language = _this.defaultLanguage;
    } else {
      _this.language = language;
    }
    return _this;
  }

  PreferencesStore.prototype.getLanguage = function getLanguage() {
    return this.language;
  };

  PreferencesStore.prototype.setLanguage = function setLanguage(language) {
    if (this.availableLanguages.indexOf(language) === -1) {
      return;
    }

    reactCookie.save('lang', language, {
      // Good up to one year
      maxAge: 365 * 24 * 60 * 60,
      path: '/'
    });
    this.language = language;
    this.emitChange();
  };

  return PreferencesStore;
}(Store);

PreferencesStore.storeName = 'PreferencesStore';
PreferencesStore.handlers = {

  SetLanguage: 'setLanguage'
};


export default PreferencesStore;