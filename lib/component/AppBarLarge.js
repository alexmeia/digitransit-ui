import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
import React from 'react';
import { routerShape, locationShape } from 'react-router';
import ExternalLink from './ExternalLink';
import DisruptionInfo from './DisruptionInfo';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';
import LangSelect from './LangSelect';

var AppBarLarge = function AppBarLarge(_ref, _ref2) {
  var titleClicked = _ref.titleClicked;
  var router = _ref2.router,
      location = _ref2.location,
      config = _ref2.config;

  var openDisruptionInfo = function openDisruptionInfo() {
    router.push(_extends({}, location, {
      state: _extends({}, location.state, {
        disruptionInfoOpen: true
      })
    }));
  };

  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      { className: 'top-bar bp-large flex-horizontal' },
      React.createElement(
        'a',
        { onClick: titleClicked },
        config.textLogo ? React.createElement(
          'section',
          { className: 'title' },
          React.createElement(
            'span',
            { className: 'title' },
            config.title
          )
        ) : React.createElement('div', { className: 'navi-logo' })
      ),
      React.createElement('div', { className: 'empty-space flex-grow' }),
      React.createElement(
        'div',
        { className: 'navi-languages right-border navi-margin' },
        React.createElement(LangSelect, null)
      ),
      React.createElement(
        'div',
        { className: 'navi-icons navi-margin padding-horizontal-large' },
        React.createElement(
          'a',
          { onClick: openDisruptionInfo },
          React.createElement(Icon, { img: 'icon-icon_caution' })
        )
      ),
      React.createElement(
        'div',
        { className: 'padding-horizontal-large navi-margin' },
        React.createElement(ExternalLink, _extends({ className: 'external-top-bar' }, config.appBarLink))
      )
    ),
    React.createElement(DisruptionInfo, null)
  );
};

AppBarLarge.propTypes = {
  titleClicked: PropTypes.func.isRequired
};

AppBarLarge.displayName = 'AppBarLarge';

AppBarLarge.contextTypes = {
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  config: PropTypes.object.isRequired
};

AppBarLarge.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'AppBar of application for large display'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(AppBarLarge, { titleClicked: function titleClicked() {} })
    )
  );
};

export default AppBarLarge;