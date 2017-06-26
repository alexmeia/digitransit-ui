import PropTypes from 'prop-types';
import React from 'react';

var StopCode = function StopCode(_ref) {
  var code = _ref.code;
  return code && React.createElement(
    'span',
    { className: 'itinerary-stop-code' },
    code
  );
};

StopCode.displayName = 'StopCode';
StopCode.propTypes = {
  code: PropTypes.string.isRequired
};
export default StopCode;