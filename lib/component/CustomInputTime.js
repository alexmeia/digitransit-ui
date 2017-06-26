import PropTypes from 'prop-types';
import React from 'react';
import { isMobile, isFirefox } from '../util/browser';

export default function CustomInputTime(_ref) {
  var _this = this;

  var changeTime = _ref.changeTime,
      time = _ref.time;

  var timeInput = null;
  return React.createElement('input', {
    type: 'time',
    className: 'time-selector ' + (!isMobile ? 'time-selector' : ''),
    value: time,
    onChange: changeTime,
    ref: function ref(input) {
      // use ref callback to bind change listener so that it works on android/firefox too
      // once https://github.com/facebook/react/issues/3659 is fixed this can be removed
      if (isMobile && isFirefox && input !== null && timeInput === null) {
        timeInput = input;
        var listener = function listener(a) {
          changeTime(a);a.target.blur();a.target.removeEventListener('change', _this);
        };
        input.addEventListener('change', listener);
      }
    }
  });
}

CustomInputTime.propTypes = {
  changeTime: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired
};