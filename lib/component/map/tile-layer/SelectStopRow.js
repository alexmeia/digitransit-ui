import PropTypes from 'prop-types';
import React from 'react';

import { FormattedMessage } from 'react-intl';
import uniqBy from 'lodash/uniqBy';
import reject from 'lodash/reject';

import RouteDestination from '../../RouteDestination';
import routeCompare from '../../../util/route-compare';
import ComponentUsageExample from '../../ComponentUsageExample';

function getName(pattern) {
  if (pattern.shortName) {
    return React.createElement(
      'span',
      {
        key: pattern.shortName,
        className: pattern.type.toLowerCase() + ' vehicle-number'
      },
      pattern.shortName
    );
  }
  return null;
}

function SelectStopRow(props) {
  var patternData = JSON.parse(props.patterns).sort(routeCompare);
  var patterns = [];

  patterns.push(React.createElement(
    'div',
    { key: 'first', className: 'route-detail-text' },
    React.createElement(
      'span',
      { className: patternData[0].type.toLowerCase() + ' vehicle-number no-padding' },
      patternData[0].shortName
    ),
    '\xA0',
    React.createElement(RouteDestination, { mode: patternData[0].type, destination: patternData[0].headsign })
  ));

  if (patternData.length > 1) {
    var otherPatterns = reject(patternData, ['shortName', patternData[0].shortName]);
    if (otherPatterns.length > 0) {
      patterns.push(React.createElement(
        'div',
        { key: 'second', className: 'route-detail-text' },
        React.createElement(
          'span',
          { className: 'gray' },
          React.createElement(FormattedMessage, { id: 'in-addition', defaultMessage: 'In addition' })
        ),
        uniqBy(otherPatterns, function (pattern) {
          return pattern.shortName;
        }).map(getName)
      ));
    }
  }

  return React.createElement(
    'div',
    { className: 'no-margin' },
    React.createElement(
      'div',
      { className: 'cursor-pointer select-row', onClick: props.selectRow },
      React.createElement(
        'div',
        { className: 'padding-vertical-normal select-row-icon' },
        React.createElement(
          'svg',
          {
            viewBox: '0 0 30 30',
            width: '30',
            height: '30',
            style: { position: 'relative', left: 5 },
            className: props.type.toLowerCase() + ' left'
          },
          React.createElement('circle', {
            r: '8',
            cx: '15',
            cy: '15',
            strokeWidth: '3',
            fill: 'None',
            stroke: 'currentColor'
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'padding-vertical-normal select-row-text' },
        React.createElement(
          'span',
          { className: 'header-primary no-margin link-color' },
          props.name,
          ' \u203A'
        ),
        patterns
      ),
      React.createElement('div', { className: 'clear' })
    ),
    React.createElement('hr', { className: 'no-margin gray' })
  );
}

SelectStopRow.displayName = 'SelectStopRow';

SelectStopRow.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Renders a select stop row'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(SelectStopRow, {
        name: 'DIAKONIAPUISTO',
        selectRow: function selectRow() {},
        type: 'BUS',
        patterns: '[{"headsign":"Kuninkaanmäki","type":"BUS","shortName":"518"}]'
      })
    )
  );
};

SelectStopRow.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selectRow: PropTypes.func.isRequired,
  patterns: PropTypes.string.isRequired
};

export default SelectStopRow;