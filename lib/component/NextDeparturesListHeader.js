import React from 'react';
import { FormattedMessage } from 'react-intl';
import ComponentUsageExample from './ComponentUsageExample';

var NextDeparturesListHeader = function NextDeparturesListHeader() {
  return React.createElement(
    'div',
    { className: 'next-departures-list-header padding-vertical-small' },
    React.createElement(
      'span',
      { className: 'time-header' },
      React.createElement(FormattedMessage, { id: 'next', defaultMessage: 'Next' })
    ),
    React.createElement(
      'span',
      { className: 'time-header' },
      React.createElement(FormattedMessage, { id: 'leaves', defaultMessage: 'Leaves' })
    ),
    React.createElement(
      'span',
      { className: 'distance-header' },
      React.createElement(FormattedMessage, { id: 'to-stop', defaultMessage: 'To stop' })
    ),
    React.createElement(
      'span',
      { className: 'route-number-header' },
      React.createElement(FormattedMessage, { id: 'route', defaultMessage: 'Route' })
    ),
    React.createElement(
      'span',
      { className: 'route-destination-header' },
      React.createElement(FormattedMessage, { id: 'destination', defaultMessage: 'Destination' })
    )
  );
};

NextDeparturesListHeader.displayName = 'NextDeparturesListHeader';

NextDeparturesListHeader.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(NextDeparturesListHeader, null)
    )
  );
};

export default NextDeparturesListHeader;