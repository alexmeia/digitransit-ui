import PropTypes from 'prop-types';
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';

var AboutPage = function AboutPage(_ref, context) {
  var currentLanguage = _ref.currentLanguage;

  var about = context.config.aboutThisService[currentLanguage];
  return React.createElement(
    'div',
    { className: 'about-page fullscreen' },
    React.createElement(
      'div',
      { className: 'page-frame fullscreen momentum-scroll' },
      about.map(function (section, i) {
        return section.paragraphs && section.paragraphs.length || section.link ? React.createElement(
          'div',
          { key: 'about-section-' + i },
          React.createElement(
            'h1',
            { className: 'about-header' },
            section.header
          ),
          section.paragraphs && section.paragraphs.map(function (p, j) {
            return React.createElement(
              'p',
              { key: 'about-section-' + i + '-p-' + j },
              p
            );
          }),
          section.link && React.createElement(
            Link,
            { to: section.link },
            section.link
          )
        ) : false;
      }),
      React.createElement(
        Link,
        { to: '/' },
        React.createElement(
          'div',
          { className: 'call-to-action-button' },
          React.createElement(FormattedMessage, {
            id: 'back-to-front-page', defaultMessage: 'Back to front page'
          })
        )
      )
    )
  );
};

AboutPage.propTypes = {
  currentLanguage: PropTypes.string.isRequired
};

AboutPage.contextTypes = {
  config: PropTypes.object.isRequired
};

export default connectToStores(AboutPage, ['PreferencesStore'], function (context) {
  return {
    currentLanguage: context.getStore('PreferencesStore').getLanguage()
  };
});