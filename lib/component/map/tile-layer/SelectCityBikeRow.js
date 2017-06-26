import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../../Icon';
import ComponentUsageExample from '../../ComponentUsageExample';

function SelectCityBikeRow(props) {
  return React.createElement(
    'div',
    { className: 'no-margin' },
    React.createElement(
      'div',
      { className: 'cursor-pointer select-row', onClick: props.selectRow },
      React.createElement(
        'div',
        { className: 'padding-vertical-normal select-row-icon' },
        React.createElement(Icon, { img: 'icon-icon_citybike' })
      ),
      React.createElement(
        'div',
        { className: 'padding-vertical-normal select-row-text' },
        React.createElement(
          'span',
          { className: 'header-primary no-margin link-color' },
          props.name,
          ' \u203A'
        )
      ),
      React.createElement('div', { className: 'clear' })
    ),
    React.createElement('hr', { className: 'no-margin gray' })
  );
}

SelectCityBikeRow.displayName = 'SelectCityBikeRow';

SelectCityBikeRow.description = React.createElement(
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
    React.createElement(SelectCityBikeRow, { name: 'LINNANMÄKI', selectRow: function selectRow() {} })
  )
);

SelectCityBikeRow.propTypes = {
  selectRow: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default SelectCityBikeRow;