import PropTypes from 'prop-types';
import React from 'react';

import MarkerPopupBottom from '../MarkerPopupBottom';
import Card from '../../Card';
import CardHeader from '../../CardHeader';
import ComponentUsageExample from '../../ComponentUsageExample';

export function getIcon(type) {
  switch (type) {
    case 'Palvelupiste':
      return 'icon-icon_service-point';
    case 'HSL Automaatti MNL':
      return 'icon-icon_ticket-machine';
    case 'HSL Automaatti KL':
      return 'icon-icon_ticket-machine-single';
    case 'Myyntipiste':
      return 'icon-icon_ticket-sales-point';
    case 'R-kioski':
      return 'icon-icon_ticket-sales-point';
    default:
      console.log('Unknown ticket sales type: ' + type);
      return 'icon-icon_ticket-sales-point';
  }
}

function TicketSalesPopup(props) {
  return React.createElement(
    'div',
    { className: 'card' },
    React.createElement(
      Card,
      { className: 'padding-small' },
      React.createElement(CardHeader, {
        name: props.NIMI,
        description: props.OSOITE,
        icon: getIcon(props.TYYPPI),
        unlinked: true
      })
    ),
    React.createElement(MarkerPopupBottom, {
      location: {
        address: props.NIMI,
        lat: props.LAT,
        lon: props.LON
      }
    })
  );
}

TicketSalesPopup.description = React.createElement(
  'div',
  null,
  React.createElement(
    'p',
    null,
    'Renders a ticket sales popup.'
  ),
  React.createElement(
    ComponentUsageExample,
    { description: '' },
    React.createElement(TicketSalesPopup, { context: 'context object here' })
  )
);

TicketSalesPopup.propTypes = {
  TYYPPI: PropTypes.string.isRequired,
  NIMI: PropTypes.string.isRequired,
  OSOITE: PropTypes.string.isRequired,
  LAT: PropTypes.number.isRequired,
  LON: PropTypes.number.isRequired
};

export default TicketSalesPopup;