import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import Icon from '../../Icon';
import ComponentUsageExample from '../../ComponentUsageExample';

function SelectParkAndRideRow(props, _ref) {
  var intl = _ref.intl;

  return React.createElement(
    'div',
    { className: 'no-margin' },
    React.createElement(
      'div',
      { className: 'cursor-pointer select-row', onClick: props.selectRow },
      React.createElement(
        'div',
        { className: 'padding-vertical-normal select-row-icon' },
        React.createElement(Icon, { img: 'icon-icon_car' })
      ),
      React.createElement(
        'div',
        { className: 'padding-vertical-normal select-row-text' },
        React.createElement(
          'span',
          { className: 'header-primary no-margin link-color' },
          JSON.parse(props.name)[intl.locale],
          ' \u203A'
        )
      ),
      React.createElement('div', { className: 'clear' })
    ),
    React.createElement('hr', { className: 'no-margin gray' })
  );
}

SelectParkAndRideRow.displayName = 'SelectParkAndRideRow';

SelectParkAndRideRow.description = React.createElement(
  'div',
  null,
  React.createElement(
    'p',
    null,
    'Renders a select citybike row'
  ),
  React.createElement(
    ComponentUsageExample,
    { description: '' },
    React.createElement(SelectParkAndRideRow, {
      name: '{"en": "Leppävaara", "fi": "Leppävaara", "sv": "Leppävaara"}',
      selectRow: function selectRow() {}
    })
  )
);

SelectParkAndRideRow.propTypes = {
  selectRow: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

SelectParkAndRideRow.contextTypes = {
  intl: intlShape
};

export default SelectParkAndRideRow;