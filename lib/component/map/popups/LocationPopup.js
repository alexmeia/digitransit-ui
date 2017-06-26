import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import Card from '../../Card';
import CardHeader from '../../CardHeader';
import MarkerPopupBottom from '../MarkerPopupBottom';

export default function LocationPopup(_ref, _ref2) {
  var name = _ref.name,
      lat = _ref.lat,
      lon = _ref.lon;
  var intl = _ref2.intl;

  return React.createElement(
    Card,
    null,
    React.createElement(
      'div',
      { className: 'padding-small' },
      React.createElement(CardHeader, {
        name: intl.formatMessage({ id: 'location-from-map', defaultMessage: 'Selected location' }),
        description: name,
        unlinked: true,
        className: 'padding-small'
      })
    ),
    React.createElement(MarkerPopupBottom, {
      location: {
        // XXX Use name here when it's implemented.
        address: intl.formatMessage({
          id: 'location-from-map',
          defaultMessage: 'Picked location'
        }),
        lat: lat,
        lon: lon
      }
    })
  );
}

LocationPopup.contextTypes = {
  intl: intlShape.isRequired
};

LocationPopup.propTypes = {
  name: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired
};