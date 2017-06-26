import PropTypes from 'prop-types';
import React from 'react';

import ComponentUsageExample from './ComponentUsageExample';

var SelectedStopPopupContent = function SelectedStopPopupContent(_ref) {
  var stop = _ref.stop;
  return React.createElement(
    'div',
    { className: 'origin-popup' },
    React.createElement(
      'div',
      { className: 'origin-popup-header' },
      React.createElement(
        'div',
        { className: 'selected-stop-header' },
        stop.name
      )
    ),
    (stop.code || stop.desc) && React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'origin-popup-name' },
        React.createElement(
          'div',
          { className: 'selected-stop-popup' },
          stop.code && React.createElement(
            'p',
            { className: 'card-code' },
            stop.code
          ),
          React.createElement(
            'span',
            { className: 'description' },
            stop.desc
          )
        )
      ),
      React.createElement('div', { className: 'shade-to-white' })
    )
  );
};

SelectedStopPopupContent.propTypes = {
  stop: PropTypes.object.isRequired
};

SelectedStopPopupContent.displayName = 'SelectedStopPopupContent';

SelectedStopPopupContent.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Renders a popup with the selected stop'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'example' },
      React.createElement(SelectedStopPopupContent, {
        stop: { name: 'Name', code: '123', desc: 'Desc' }
      })
    )
  );
};

export default SelectedStopPopupContent;