import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../../Icon';
import ComponentUsageExample from '../../ComponentUsageExample';
import { getIcon } from '../popups/TicketSalesPopup';

function SelectTicketSalesRow(props) {
  return React.createElement(
    'div',
    { className: 'no-margin' },
    React.createElement(
      'div',
      { className: 'cursor-pointer select-row', onClick: props.selectRow },
      React.createElement(
        'div',
        { className: 'padding-vertical-normal select-row-icon' },
        React.createElement(Icon, { img: getIcon(props.TYYPPI) })
      ),
      React.createElement(
        'div',
        { className: 'padding-vertical-normal select-row-text' },
        React.createElement(
          'span',
          { className: 'header-primary no-margin link-color' },
          props.NIMI,
          ' \u203A'
        )
      ),
      React.createElement('div', { className: 'clear' })
    ),
    React.createElement('hr', { className: 'no-margin gray' })
  );
}

SelectTicketSalesRow.displayName = 'SelectTicketSalesRow';

SelectTicketSalesRow.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Renders a select ticket sales row'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(SelectTicketSalesRow, { selectRow: function selectRow() {} })
    )
  );
};

SelectTicketSalesRow.propTypes = {
  selectRow: PropTypes.func.isRequired,
  TYYPPI: PropTypes.string.isRequired,
  NIMI: PropTypes.string.isRequired
};

export default SelectTicketSalesRow;