import PropTypes from 'prop-types';
import React from 'react';

import BackButton from './BackButton';
import DisruptionInfo from './DisruptionInfo';
import MainMenuContainer from './MainMenuContainer';
import ComponentUsageExample from './ComponentUsageExample';

var AppBarSmall = function AppBarSmall(_ref, _ref2) {
  var disableBackButton = _ref.disableBackButton,
      showLogo = _ref.showLogo,
      title = _ref.title;
  var config = _ref2.config;
  return React.createElement(
    'div',
    null,
    React.createElement(DisruptionInfo, null),
    React.createElement(
      'nav',
      { className: 'top-bar' },
      !disableBackButton && React.createElement(BackButton, null),
      React.createElement(
        'section',
        { className: 'title' },
        showLogo && !config.textLogo ? React.createElement('div', { className: 'logo' }) : React.createElement(
          'span',
          { className: 'title' },
          title
        )
      ),
      React.createElement(MainMenuContainer, null)
    )
  );
};

AppBarSmall.displayName = 'AppBarSmall';

AppBarSmall.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'AppBar of application for small display'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(AppBarSmall, { title: 'Reittiopas.fi', className: 'fullscreen' })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'no back button' },
      React.createElement(AppBarSmall, { disableBackButton: true, title: 'Reittiopas.fi', className: 'fullscreen' })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Show logo' },
      React.createElement(AppBarSmall, { showLogo: true, disableBackButton: true, title: 'Reittiopas.fi', className: 'fullscreen' })
    )
  );
};

AppBarSmall.propTypes = {
  disableBackButton: PropTypes.bool,
  title: PropTypes.node,
  showLogo: PropTypes.bool
};

AppBarSmall.contextTypes = {
  config: PropTypes.object.isRequired
};

export default AppBarSmall;