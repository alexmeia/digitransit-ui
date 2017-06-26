import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function SummaryTitle(props) {
  return React.createElement(
    'span',
    null,
    props.params.hash == null ? React.createElement(FormattedMessage, {
      id: 'summary-page.title',
      defaultMessage: 'Itinerary suggestions'
    }) : React.createElement(FormattedMessage, {
      id: 'itinerary-page.title',
      defaultMessage: 'Itinerary'
    })
  );
}

SummaryTitle.propTypes = {
  params: PropTypes.shape({
    hash: PropTypes.string
  }).isRequired
};