import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import ComponentUsageExample from './ComponentUsageExample';
import { plan as examplePlan } from './ExampleData';
import Icon from './Icon';
import ExternalLink from './ExternalLink';

export default function TicketInformation(_ref, _ref2) {
  var fares = _ref.fares;
  var config = _ref2.config;

  var currency = void 0;
  var regularFare = void 0;
  if (fares != null) {
    regularFare = fares.filter(function (fare) {
      return fare.type === 'regular';
    })[0];
  }

  if (!regularFare || regularFare.cents === -1) {
    return null;
  }

  switch (regularFare.currency) {
    case 'EUR':
    default:
      currency = '€';
  }

  // XXX for now we only use single (first) component
  var fareId = get(regularFare, 'components[0].fareId');
  var fareMapping = get(config, 'fareMapping', {});

  var mappedFareId = fareId ? fareMapping[fareId] : null;

  return React.createElement(
    'div',
    { className: 'row itinerary-ticket-information' },
    React.createElement(
      'div',
      { className: 'itinerary-ticket-layout-left' },
      React.createElement(Icon, { img: 'icon-icon_ticket' })
    ),
    React.createElement(
      'div',
      { className: 'itinerary-ticket-layout-right' },
      React.createElement(
        'div',
        { className: 'itinerary-ticket-type' },
        React.createElement(
          'div',
          { className: 'ticket-type-zone' },
          mappedFareId && React.createElement(FormattedMessage, { id: 'ticket-type-' + mappedFareId })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: 'ticket-type-group' },
            React.createElement(FormattedMessage, { id: 'ticket-single-adult', defaultMessage: 'Adult' }),
            ',\xA0'
          ),
          React.createElement(
            'span',
            { className: 'ticket-type-fare' },
            (regularFare.cents / 100).toFixed(2) + ' ' + currency
          )
        )
      ),
      config.ticketLink && React.createElement(
        ExternalLink,
        { className: 'itinerary-ticket-external-link', href: config.ticketLink },
        React.createElement(FormattedMessage, {
          id: 'buy-ticket',
          defaultMessage: 'How to buy a ticket'
        })
      )
    )
  );
}

TicketInformation.propTypes = {
  fares: PropTypes.array
};

TicketInformation.contextTypes = {
  config: PropTypes.object,
  breakpoint: PropTypes.string
};

TicketInformation.displayName = 'TicketInformation';

TicketInformation.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Information about the required ticket for the itinerary.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(TicketInformation, { fares: examplePlan.itineraries[0].fares })
    )
  );
};