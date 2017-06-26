import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import { isMobile } from '../util/browser';

var ItineraryTimePicker = function (_React$Component) {
  _inherits(ItineraryTimePicker, _React$Component);

  function ItineraryTimePicker(props) {
    _classCallCheck(this, ItineraryTimePicker);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onChangeTime = function (event) {
      var isHour = _this.isHours(event.target.id);
      var timePropertyId = isHour ? 'hours' : 'minutes';
      var oldPropertyId = isHour ? 'oldHour' : 'oldMinute';
      var focusropertyId = isHour ? 'focusHours' : 'focusMinutes';

      if (_this.state[focusropertyId] === true) {
        var _this$setState2;

        // just focused, accept 1 digit
        if (event.target.value === '') {
          var _this$setState;

          _this.setState((_this$setState = {}, _this$setState[focusropertyId] = false, _this$setState[timePropertyId] = event.target.value, _this$setState));
          return;
        }
        _this.setState((_this$setState2 = {}, _this$setState2[focusropertyId] = false, _this$setState2));
      } else if (_this.state[timePropertyId].length > event.target.value.length) {
        var _this$setState3;

        _this.setState((_this$setState3 = {}, _this$setState3[timePropertyId] = '', _this$setState3));
        return;
      }
      // Accept only numbers
      if (/^\d+$/.test(event.target.value)) {
        // Check if there's a leading zero
        var input = _this.checkZero(event.target.value);
        if (input.length < 3) {
          var _this$setState4;

          // Clean up the input
          var newTime = input.length > 1 ? _this.fixDigits({
            val: input,
            max: isHour ? 23 : 59
          }) : input;
          // Send new time request
          var requestString = isHour ? newTime + ' ' + _this.state.minutes : _this.state.hours + ' ' + newTime;
          _this.props.changeTime({ target: { value: requestString } }, function () {
            // If set hours are 3-9 or two digits, switch to minute input
            if ((newTime.length === 2 || newTime < 10 && newTime > 2) && isHour) {
              // move to minutes field
              _this.hourEl.blur();
              _this.minEl.focus();
              setTimeout(function () {
                _this.minEl.setSelectionRange(0, 2);
              }, 0);
            }
          });
          _this.setState((_this$setState4 = {}, _this$setState4[timePropertyId] = newTime, _this$setState4));
        } else if (input.length === 3) {
          var _this$setState5;

          var _requestString = isHour ? event.target.value.slice(-1) + ' ' + _this.state.minutes : _this.state.hours + ' ' + event.target.value.slice(-1);
          _this.props.changeTime({ target: { value: _requestString } });
          _this.setState((_this$setState5 = {}, _this$setState5[timePropertyId] = event.target.value.slice(-1), _this$setState5[oldPropertyId] = event.target.value.slice(-1), _this$setState5));
        } else {
          _this.event.target.value = _this.state[timePropertyId];
        }
      }
    };

    _this.onBlur = function (stateName, newValue, oldValue) {
      if (newValue === '') {
        var _this$setState6;

        // restore old
        _this.setState((_this$setState6 = {}, _this$setState6[stateName] = oldValue, _this$setState6));
      } else {
        var _this$setState7;

        _this.setState((_this$setState7 = {}, _this$setState7[stateName] = _this.padDigits(newValue), _this$setState7));
      }
    };

    _this.setSelectionRange = function (e) {
      return e.target.setSelectionRange(0, 2);
    };

    _this.getState = function (_ref, currentState) {
      var initHours = _ref.initHours,
          initMin = _ref.initMin;

      var newState = {
        oldHour: initHours,
        oldMinute: initMin
      };

      if (Number(currentState.hours) !== Number(initHours)) {
        newState.hours = initHours;
      }
      if (Number(currentState.minutes) !== Number(initMin)) {
        newState.minutes = initMin;
      }
      return newState;
    };

    _this.toggleTime = function (event) {
      var isHour = _this.isHours(event.target.id);
      var id = _this.stateId(event.target.id);
      var max = isHour ? 23 : 59;
      var newTime = _this.checkInt(event.target.value);
      var newChanges = void 0;
      if (event.keyCode === 38) {
        // Up
        newChanges = _this.constructToggle({
          time: newTime < max ? newTime + 1 : 0,
          id: id,
          max: max,
          add: 1
        });
      }
      if (event.keyCode === 40) {
        // Down
        newChanges = _this.constructToggle({
          time: newTime !== 0 ? newTime - 1 : max,
          id: id,
          max: max,
          add: -1
        });
      }
      _this.setState(newChanges.toggledState);
      _this.props.changeTime({ target: { value: newChanges.requestString } });
    };

    _this.constructToggle = function (val) {
      var toggledState = void 0;
      var requestString = void 0;
      if (val.id === 'minutes' && (val.time === 0 && val.add === 1 || val.time === 59 && val.add === -1)) {
        // If the minute value is increased so it loops to the min value, add one hour
        // If the minute value is decreased so it loops to the max value, reduce one hour
        var toggledHour = _this.state.hours < 1 ? 23 : parseInt(_this.state.hours, 10) + val.add;
        toggledState = {
          hours: toggledHour < 0 ? 23 : toggledHour,
          minutes: val.time
        };
        requestString = parseInt(_this.state.hours, 10) + val.add + ' ' + val.time;
      } else {
        var _toggledState;

        toggledState = (_toggledState = {}, _toggledState[val.id] = val.time, _toggledState);
        requestString = val.id === 'hours' ? val.time + ' ' + _this.state.minutes : _this.state.hours + ' ' + val.time;
      }
      return { toggledState: toggledState, requestString: requestString };
    };

    _this.handleKeyDown = function (event) {
      if (event.keyCode === 38 || event.keyCode === 40) {
        // up or down
        _this.toggleTime(event);
      }
    };

    _this.fixDigits = function (digit) {
      return digit.val.length === 2 && digit.val > digit.max ? digit.val.substr(1) : _this.padDigits(digit.val);
    };

    _this.checkZero = function (digit) {
      return digit.charAt(0) === '0' && digit.length > 2 ? digit.substr(1) : digit;
    };

    _this.checkInt = function (val) {
      return typeof val !== 'string' ? val : parseInt(val, 10);
    };

    _this.isHours = function (id) {
      return id === 'inputHours';
    };

    _this.isMinutes = function (id) {
      return !_this.isHours(id);
    };

    _this.stateId = function (id) {
      return _this.isHours(id) ? 'hours' : 'minutes';
    };

    _this.handleBlur = function (event) {
      var isHour = _this.isHours(event.target.id);
      if (isHour) {
        _this.onBlur('hours', event.target.value, _this.state.oldHour);
      } else {
        _this.onBlur('minutes', event.target.value, _this.state.oldMinute);
      }
    };

    _this.handleFocus = function (event) {
      var isHour = _this.isHours(event.target.id);
      if (isHour) {
        _this.setState({
          focusHours: true
        });
      } else {
        _this.setState({
          focusMinutes: true
        });
      }
    };

    _this.padDigits = function (digit) {
      var testDigit = digit.toString();
      return testDigit.length === 1 ? '0' + testDigit : testDigit;
    };

    _this.state = _this.getState(props, {});
    return _this;
  }

  ItineraryTimePicker.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref2) {
    var initHours = _ref2.initHours,
        initMin = _ref2.initMin;

    if (Number(this.state.initHours) !== Number(initHours) || Number(this.state.initMin) !== Number(initMin)) {
      this.setState(this.getState({ initHours: initHours, initMin: initMin }, this.state));
    }
  };

  // Pad Digits to create leading zero in case of single-digit numbers


  ItineraryTimePicker.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      {
        className: 'time-input-container time-selector ' + (!isMobile ? 'time-selector' : '')
      },
      React.createElement('input', {
        type: 'tel',
        ref: function ref(el) {
          if (el !== null) {
            _this2.hourEl = el;
          }
        },
        id: 'inputHours',
        className: 'time-input-field',
        value: this.state.hours,
        maxLength: 3,
        onChange: this.onChangeTime,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onClick: this.setSelectionRange,
        onKeyDown: this.handleKeyDown
      }),
      React.createElement(
        'div',
        { className: 'digit-separator' },
        ':'
      ),
      React.createElement('input', {
        type: 'tel',
        ref: function ref(el) {
          if (el !== null) {
            _this2.minEl = el;
          }
        },
        id: 'inputMinutes',
        className: 'time-input-field',
        value: this.state.minutes,
        maxLength: 3,
        onChange: this.onChangeTime,
        onClick: this.setSelectionRange,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onKeyDown: this.handleKeyDown
      })
    );
  };

  return ItineraryTimePicker;
}(React.Component);

ItineraryTimePicker.propTypes = {
  changeTime: PropTypes.func.isRequired,
  initHours: PropTypes.string.isRequired,
  initMin: PropTypes.string.isRequired
};
export default ItineraryTimePicker;