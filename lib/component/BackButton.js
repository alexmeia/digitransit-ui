import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { routerShape } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { intlShape } from 'react-intl';
import Icon from './Icon';
import { isBrowser, isIOSApp } from '../util/browser';
import { getIndex } from '../localStorageHistory';

var hasHistoryEntries = function hasHistoryEntries() {
  return isIOSApp && getIndex() > 0 || isBrowser && window.history.length;
};

var BackButton = function (_React$Component) {
  _inherits(BackButton, _React$Component);

  function BackButton() {
    var _temp, _this, _ret;

    _classCallCheck(this, BackButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.goBack = function () {
      setTimeout(function () {
        if (hasHistoryEntries()) {
          _this.context.router.goBack();
        } else {
          _this.context.router.push('/');
        }
      }, 0);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // TODO
  // Transition back in next event loop
  // Without this mobile chrome might call back twice.
  // See: https://github.com/zilverline/react-tap-event-plugin/issues/14
  // This should be removed either when we change how pages are rendered or
  // When react-tap-plugin works better


  BackButton.prototype.render = function render() {
    return React.createElement(
      FlatButton,
      {
        className: 'back-button',
        onClick: this.goBack,
        style: {
          minWidth: '40px',
          height: '40px',
          alignSelf: 'stretch'
        },
        icon: React.createElement(Icon, { img: 'icon-icon_arrow-left', className: 'cursor-pointer back' })
      },
      React.createElement('span', {
        title: this.context.intl.formatMessage({
          id: 'back-button-title',
          defaultMessage: 'Go back to previous page'
        })
      })
    );
  };

  return BackButton;
}(React.Component);

BackButton.contextTypes = {
  intl: intlShape.isRequired,
  router: routerShape
};
export default BackButton;