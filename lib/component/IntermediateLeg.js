import PropTypes from 'prop-types';
import React from 'react';
import StopCode from './StopCode';

function IntermediateLeg(_ref) {
  var mode = _ref.mode,
      name = _ref.name,
      stopCode = _ref.stopCode,
      focusFunction = _ref.focusFunction;

  var modeClassName = '' + mode.toLowerCase();

  return React.createElement(
    'div',
    { style: { width: '100%' }, className: 'row itinerary-row', onClick: function onClick(e) {
        return focusFunction(e);
      } },
    React.createElement(
      'div',
      { className: 'leg-before ' + modeClassName },
      React.createElement(
        'div',
        { className: 'leg-before-circle circle-fill ' + modeClassName },
        React.createElement(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: 28, height: 28 },
          React.createElement('circle', { strokeWidth: '2', width: 28, cx: 11, cy: 10, r: 4 })
        )
      ),
      React.createElement('div', { className: 'leg-before-line ' + modeClassName })
    ),
    React.createElement(
      'div',
      { className: 'small-9 columns itinerary-instruction-column intermediate ' + modeClassName },
      React.createElement(
        'div',
        { className: 'itinerary-leg-first-row' },
        React.createElement(
          'div',
          { className: 'itinerary-intermediate-stop-name' },
          name,
          ' ',
          React.createElement(StopCode, { code: stopCode })
        )
      ),
      React.createElement('div', { className: 'itinerary-leg-action' })
    )
  );
}

IntermediateLeg.propTypes = {
  focusFunction: PropTypes.func.isRequired,
  waitTime: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  stopCode: PropTypes.string.isRequired
};

export default IntermediateLeg;