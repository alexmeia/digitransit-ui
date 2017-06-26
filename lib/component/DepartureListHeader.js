import React from 'react';
import { FormattedMessage } from 'react-intl';
import ComponentUsageExample from './ComponentUsageExample';

var DepartureListHeader = function DepartureListHeader() {
  return React.createElement(
    'div',
    { className: 'departure-list-header row padding-vertical-small border-top' },
    React.createElement(
      'span',
      { className: 'time-header' },
      React.createElement(FormattedMessage, {
        id: 'leaves',
        defaultMessage: 'Leaves'
      })
    ),
    React.createElement(
      'span',
      { className: 'route-number-header' },
      React.createElement(FormattedMessage, {
        id: 'route',
        defaultMessage: 'Route'
      })
    ),
    React.createElement(
      'span',
      { className: 'route-destination-header' },
      React.createElement(FormattedMessage, {
        id: 'destination',
        defaultMessage: 'Destination'
      })
    )
  );
};

DepartureListHeader.displayName = 'DepartureListHeader';

DepartureListHeader.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(DepartureListHeader, null)
    )
  );
};

export default DepartureListHeader;