import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Modal from './Modal';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';

var NoRoutePopup = function (_React$Component) {
  _inherits(NoRoutePopup, _React$Component);

  function NoRoutePopup() {
    var _temp, _this, _ret;

    _classCallCheck(this, NoRoutePopup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      open: true
    }, _this.toggle = function (state) {
      var newState = void 0;

      if (state === true || state === false) {
        newState = state;
      } else {
        newState = !_this.state.open;
      }

      _this.setState({
        open: newState
      }, function () {
        return _this.forceUpdate();
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  NoRoutePopup.prototype.render = function render() {
    return React.createElement(
      Modal,
      { allowClicks: true, open: this.state.open, title: '', toggleVisibility: this.toggle },
      React.createElement(
        'div',
        { className: 'no-route-found' },
        React.createElement(Icon, { className: 'no-route-found-icon', img: 'icon-icon_no_route_found' }),
        React.createElement(
          'p',
          null,
          React.createElement(FormattedMessage, {
            id: 'no-route-msg',
            defaultMessage: 'Unfortunately no route was found between the locations you gave. ' + 'Please change origin and/or destination address.'
          })
        ),
        React.createElement(
          'p',
          null,
          React.createElement(
            'a',
            null,
            React.createElement(FormattedMessage, { id: 'close', defaultMessage: 'Close' })
          )
        )
      )
    );
  };

  return NoRoutePopup;
}(React.Component);

NoRoutePopup.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Popup informing the user that no route was found.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(NoRoutePopup, null)
    )
  );
};

export default NoRoutePopup;