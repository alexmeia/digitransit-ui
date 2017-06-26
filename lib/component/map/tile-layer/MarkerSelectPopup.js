import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import SelectStopRow from './SelectStopRow';
import SelectTerminalRow from './SelectTerminalRow';
import SelectCityBikeRow from './SelectCityBikeRow';
import SelectParkAndRideRow from './SelectParkAndRideRow';
import SelectTicketSalesRow from './SelectTicketSalesRow';
import ComponentUsageExample from '../../ComponentUsageExample';
import { options } from '../../ExampleData';

function MarkerSelectPopup(props) {
  var rows = props.options.map(function (option) {
    if (option.layer === 'stop' && option.feature.properties.stops) {
      return React.createElement(SelectTerminalRow, _extends({}, option.feature.properties, {
        key: option.feature.properties.gtfsId,
        selectRow: function selectRow() {
          return props.selectRow(option);
        }
      }));
    } else if (option.layer === 'stop') {
      return React.createElement(SelectStopRow, _extends({}, option.feature.properties, {
        key: option.feature.properties.gtfsId,
        selectRow: function selectRow() {
          return props.selectRow(option);
        }
      }));
    } else if (option.layer === 'citybike') {
      return React.createElement(SelectCityBikeRow, _extends({}, option.feature.properties, {
        key: option.feature.properties.stationId,
        selectRow: function selectRow() {
          return props.selectRow(option);
        }
      }));
    } else if (option.layer === 'parkAndRide') {
      return React.createElement(SelectParkAndRideRow, _extends({}, option.feature.properties, {
        key: option.feature.properties.carParkId,
        selectRow: function selectRow() {
          return props.selectRow(option);
        }
      }));
    } else if (option.layer === 'ticketSales') {
      return React.createElement(SelectTicketSalesRow, _extends({}, option.feature.properties, {
        key: option.feature.properties.FID,
        selectRow: function selectRow() {
          return props.selectRow(option);
        }
      }));
    }
    return null;
  });

  return React.createElement(
    'div',
    { className: 'card marker-select-popup' },
    React.createElement(
      'h3',
      { className: 'padding-normal gray' },
      React.createElement(FormattedMessage, { id: 'choose-stop', defaultMessage: 'Choose stop' })
    ),
    React.createElement('hr', { className: 'no-margin gray' }),
    React.createElement(
      'div',
      {
        className: 'scrollable momentum-scroll card-row'
      },
      rows
    )
  );
}

MarkerSelectPopup.displayName = 'MarkerSelectPopup';

MarkerSelectPopup.description = React.createElement(
  'div',
  null,
  React.createElement(
    'p',
    null,
    'Renders a marker select popup'
  ),
  React.createElement(
    ComponentUsageExample,
    { description: '' },
    React.createElement(MarkerSelectPopup, {
      options: options,
      selectRow: function selectRow() {}
    })
  )
);

MarkerSelectPopup.propTypes = {
  options: PropTypes.array.isRequired,
  selectRow: PropTypes.func.isRequired
};

export default MarkerSelectPopup;