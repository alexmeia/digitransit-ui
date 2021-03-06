import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function SummaryTitle(props) {
  return (
    <span>
      {props.params.hash == null ?
        <FormattedMessage
          id="summary-page.title"
          defaultMessage="Itinerary suggestions"
        />
        :
        <FormattedMessage
          id="itinerary-page.title"
          defaultMessage="Itinerary"
        />
      }
    </span>
  );
}

SummaryTitle.propTypes = {
  params: PropTypes.shape({
    hash: PropTypes.string,
  }).isRequired,
};
