import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from './Icon';

var ItineraryCircleLine = function (_React$Component) {
  _inherits(ItineraryCircleLine, _React$Component);

  function ItineraryCircleLine() {
    var _temp, _this, _ret;

    _classCallCheck(this, ItineraryCircleLine);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.getMarker = function () {
      if (_this.props.index === 0 && _this.props.isVia === false) {
        return React.createElement(
          'div',
          { className: 'itinerary-icon-container' },
          React.createElement(Icon, { img: 'icon-icon_mapMarker-point', className: 'itinerary-icon from from-it' })
        );
      } else if (_this.props.isVia === true) {
        return React.createElement(
          'div',
          { className: 'itinerary-icon-container' },
          React.createElement(Icon, { img: 'icon-icon_place', className: 'itinerary-icon via via-it' })
        );
      }
      return React.createElement(
        'div',
        { className: 'leg-before-circle circle ' + _this.props.modeClassName },
        React.createElement(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: 28, height: 28 },
          React.createElement('circle', { stroke: 'white', strokeWidth: '2', width: 28, cx: 11, cy: 10, r: 6 }),
          React.createElement('circle', { strokeWidth: '2', width: 28, cx: 11, cy: 10, r: 4 })
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ItineraryCircleLine.prototype.render = function render() {
    var marker = this.getMarker();
    return React.createElement(
      'div',
      { className: 'leg-before ' + this.props.modeClassName },
      marker,
      React.createElement('div', { className: 'leg-before-line ' + this.props.modeClassName })
    );
  };

  return ItineraryCircleLine;
}(React.Component);

ItineraryCircleLine.defaultProps = {
  isVia: false
};
ItineraryCircleLine.propTypes = {
  index: PropTypes.number.isRequired,
  modeClassName: PropTypes.string.isRequired,
  isVia: PropTypes.bool
};


export default ItineraryCircleLine;