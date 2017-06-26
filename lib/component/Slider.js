import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

var Slider = function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider() {
    var _temp, _this, _ret;

    _classCallCheck(this, Slider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.defaultValue = _this.props.defaultValue != null ? _this.props.defaultValue : Math.floor((_this.props.min + _this.props.max) / 2), _this.state = {
      modified: _this.props.initialValue !== _this.defaultValue
    }, _this.componentWillMount = function () {
      return _this.props.value === _this.defaultValue ? _this.setState({ modified: false }) : _this.setState({ modified: true });
    }, _this.componentDidMount = function () {
      return _this.slider && _this.slider.addEventListener('touchmove', function (e) {
        return e.stopPropagation();
      }) && (_this.props.value === _this.defaultValue ? _this.setState({ modified: false }) : _this.setState({ modified: true }));
    }, _this.componentWillReceiveProps = function () {
      if (parseInt(_this.props.value, 10) !== _this.defaultValue) {
        _this.setState({ modified: true });
      } else {
        _this.setState({ modified: false });
      }
    }, _this.componentWillUnmount = function () {
      return _this.slider && _this.slider.removeEventListener('touchmove', function (e) {
        return e.stopPropagation();
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // eslint-disable-next-line


  Slider.prototype.render = function render() {
    var _this2 = this;

    var showWrittenValue = void 0;
    if (this.props.writtenValue) {
      showWrittenValue = React.createElement(
        'div',
        { className: 'sub-header-h5 right' },
        this.props.writtenValue
      );
    }

    return React.createElement(
      'div',
      {
        ref: function ref(el) {
          _this2.slider = el;
        },
        className: cx('slider-container', this.props.className, this.state.modified ? 'modified' : '')
      },
      React.createElement(
        'div',
        { className: 'slider-container-headers' },
        React.createElement(
          'div',
          { className: 'left' },
          React.createElement(
            'h4',
            null,
            this.props.headerText
          )
        ),
        showWrittenValue
      ),
      React.createElement('input', {
        id: this.props.id,
        className: cx('slider'),
        type: 'range',
        min: this.props.min,
        max: this.props.max,
        step: this.props.step,
        onMouseUp: function onMouseUp(e) {
          _this2.props.onSliderChange(e);
        },
        onChange: function onChange(e) {
          _this2.props.onSliderChange(e);
        },
        value: this.props.value
      }),
      React.createElement(
        'span',
        { className: 'sub-header-h5 left' },
        this.props.minText
      ),
      React.createElement(
        'span',
        { className: 'sub-header-h5 right' },
        this.props.maxText
      )
    );
  };

  return Slider;
}(React.Component);

Slider.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  defaultValue: PropTypes.number,
  initialValue: PropTypes.number.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  headerText: PropTypes.string,
  minText: PropTypes.string,
  maxText: PropTypes.string,
  writtenValue: PropTypes.string,
  value: PropTypes.number
};
Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  headerText: '',
  minText: '',
  maxText: ''
};


export default Slider;