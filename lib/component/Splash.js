import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import OneTabSearchModal from './OneTabSearchModal';
import Icon from './Icon';
import GeopositionSelector from './GeopositionSelector';
import OriginSelector from './OriginSelector';
import Intro from './Intro';

var Splash = function (_React$Component) {
  _inherits(Splash, _React$Component);

  function Splash() {
    var _temp, _this, _ret;

    _classCallCheck(this, Splash);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.openModal = function () {
      _this.context.router.push(_extends({}, _this.context.location, {
        state: _extends({}, _this.context.location.state, {
          oneTabSearchModalOpen: true
        })
      }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Splash.prototype.renderContents = function renderContents() {
    var modalOpen = Boolean(this.context.location.state && this.context.location.state.oneTabSearchModalOpen);
    return React.createElement(
      'div',
      { key: 'contents', className: 'flex-vertical' },
      React.createElement(
        'h3',
        null,
        React.createElement(FormattedMessage, {
          id: 'splash-welcome',
          defaultMessage: 'How do you wish to start?'
        })
      ),
      React.createElement(GeopositionSelector, { searchModalIsOpen: modalOpen }),
      React.createElement(
        'div',
        { className: 'splash-separator' },
        React.createElement(FormattedMessage, { id: 'splash-you-can-also', defaultMessage: 'or' })
      ),
      React.createElement(
        'div',
        { id: 'splash-search-field-container', className: 'flex-vertical' },
        React.createElement(
          'span',
          { id: 'splash-searchfield' },
          React.createElement(
            'button',
            { className: 'noborder', onClick: this.openModal, style: { display: 'block' } },
            React.createElement(FormattedMessage, { id: 'give-origin', defaultMessage: 'Enter your origin' }),
            React.createElement(Icon, { className: 'icon-edit', img: 'icon-icon_edit' })
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'splash-separator' },
        React.createElement(FormattedMessage, { id: 'splash-or-choose', defaultMessage: 'or select your origin' })
      ),
      React.createElement(OriginSelector, null)
    );
  };

  Splash.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'fullscreen' },
      React.createElement(OneTabSearchModal, { target: 'origin' }),
      React.createElement(
        'div',
        { className: 'front-page fullscreen' },
        React.createElement(
          'div',
          { id: 'splash-map', className: 'fullscreen' },
          React.createElement(
            'div',
            { className: 'map fullscreen' },
            React.createElement('div', { className: 'background-gradient' })
          )
        )
      ),
      React.createElement(
        'div',
        { id: 'splash-wrapper' },
        React.createElement(
          'div',
          { id: 'splash' },
          this.props.shouldShowIntro ? React.createElement(Intro, {
            onIntroFinished: this.props.setIntroShown,
            finalSlide: this.renderContents()
          }) : this.renderContents()
        )
      )
    );
  };

  return Splash;
}(React.Component);

Splash.contextTypes = {
  router: PropTypes.object,
  location: PropTypes.object
};
Splash.propTypes = {
  shouldShowIntro: PropTypes.bool.isRequired,
  setIntroShown: PropTypes.func.isRequired
};


export default Splash;