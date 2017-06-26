import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import ComponentUsageExample from './ComponentUsageExample';
import { setLanguage } from '../action/userPreferencesActions';

var selectLanguage = function selectLanguage(executeAction, lang) {
  return function () {
    return executeAction(setLanguage, lang);
  };
};

var language = function language(lang, currentLanguage, highlight, executeAction) {
  return React.createElement(
    'button',
    {
      id: 'lang-' + lang,
      key: lang,
      className: (highlight && 'selected' || '') + ' noborder lang',
      onClick: selectLanguage(executeAction, lang)
    },
    lang
  );
};

var LangSelect = function LangSelect(_ref, _ref2) {
  var currentLanguage = _ref.currentLanguage;
  var executeAction = _ref2.executeAction,
      config = _ref2.config;
  return React.createElement(
    'div',
    { key: 'lang-select', id: 'lang-select' },
    config.availableLanguages.map(function (lang) {
      return language(lang, currentLanguage, lang === currentLanguage, executeAction);
    })
  );
};

LangSelect.displayName = 'LangSelect';

LangSelect.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Language selection component, language selection comes from config.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(
        'div',
        { style: { width: '200px', background: 'rgb(51, 51, 51)' } },
        React.createElement(LangSelect, { currentLanguage: 'en' })
      )
    )
  );
};

LangSelect.propTypes = {
  currentLanguage: PropTypes.string.isRequired
};

LangSelect.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired
};

var connected = connectToStores(LangSelect, ['PreferencesStore'], function (context) {
  return {
    currentLanguage: context.getStore('PreferencesStore').getLanguage()
  };
});

export { connected as default, LangSelect as Component };