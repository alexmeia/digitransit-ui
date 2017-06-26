import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import { routerShape, locationShape } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { setEndpoint } from '../../action/EndpointActions';
import { withCurrentTime } from '../../util/searchUtils';

var MarkerPopupBottom = function (_React$Component) {
  _inherits(MarkerPopupBottom, _React$Component);

  function MarkerPopupBottom() {
    var _temp, _this, _ret;

    _classCallCheck(this, MarkerPopupBottom);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.routeFrom = function () {
      var locationWithTime = withCurrentTime(_this.context.getStore, _this.context.location);
      _this.context.executeAction(setEndpoint, {
        target: 'origin',
        endpoint: _this.props.location,
        router: _this.context.router,
        location: locationWithTime
      });
    }, _this.routeTo = function () {
      var locationWithTime = withCurrentTime(_this.context.getStore, _this.context.location);
      _this.context.executeAction(setEndpoint, {
        target: 'destination',
        endpoint: _this.props.location,
        router: _this.context.router,
        location: locationWithTime
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MarkerPopupBottom.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      { className: 'bottom location' },
      React.createElement(
        'div',
        { onClick: function onClick() {
            return _this2.routeFrom();
          }, className: 'route cursor-pointer' },
        React.createElement(FormattedMessage, { id: 'route-from-here', defaultMessage: 'Route from here' })
      ),
      React.createElement(
        'div',
        { onClick: function onClick() {
            return _this2.routeTo();
          }, className: 'route cursor-pointer' },
        React.createElement(FormattedMessage, { id: 'route-here', defaultMessage: 'Route here' })
      )
    );
  };

  return MarkerPopupBottom;
}(React.Component);

MarkerPopupBottom.displayName = 'MarkerPopupBottom';
MarkerPopupBottom.propTypes = {
  location: PropTypes.object.isRequired
};
MarkerPopupBottom.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  getStore: PropTypes.func.isRequired
};


export default MarkerPopupBottom;