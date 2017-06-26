import PropTypes from 'prop-types';
import React from 'react';

import routeCompare from '../../../util/route-compare';
import ComponentUsageExample from '../../ComponentUsageExample';
import Icon from '../../Icon';

function getName(route) {
  if (route.shortName) {
    return React.createElement(
      'span',
      {
        key: route.shortName,
        className: route.mode.toLowerCase() + ' vehicle-number'
      },
      route.shortName
    );
  }
  return null;
}

function SelectTerminalRow(props) {
  var routeData = JSON.parse(props.routes).sort(routeCompare);
  var ellipsis = null;

  if (routeData.length > 18) {
    routeData = routeData.slice(0, 19);
    ellipsis = React.createElement(
      'span',
      { className: routeData[18].mode.toLowerCase() },
      '...'
    );
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
        React.createElement(Icon, { img: 'icon-icon_' + props.type.toLowerCase() })
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
        React.createElement(
          'div',
          { className: 'route-detail-text' },
          routeData.map(getName),
          ' ',
          ellipsis
        )
      ),
      React.createElement('div', { className: 'clear' })
    ),
    React.createElement('hr', { className: 'no-margin gray' })
  );
}

SelectTerminalRow.displayName = 'SelectTerminalRow';

SelectTerminalRow.description = React.createElement(
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
    React.createElement(SelectTerminalRow, {
      name: 'Pasilan Asema',
      selectRow: function selectRow() {},
      type: 'BUS',
      routes: '[{"mode":"BUS","shortName":"154"},{"mode":"BUS","shortName":"111T"}]'
    })
  )
);

SelectTerminalRow.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selectRow: PropTypes.func.isRequired,
  routes: PropTypes.string.isRequired
};

export default SelectTerminalRow;