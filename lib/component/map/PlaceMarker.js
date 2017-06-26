import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import OriginPopup from './OriginPopup';
import Icon from '../Icon';
import { isBrowser } from '../../util/browser';

var L = void 0;
var Marker = void 0;

/* eslint-disable global-require */
if (isBrowser) {
  L = require('leaflet');
  Marker = require('react-leaflet/lib/Marker').default;
}
/* eslint-enable global-require */

export default function PlaceMarker(_ref, _ref2) {
  var displayOriginPopup = _ref.displayOriginPopup,
      position = _ref.position;
  var intl = _ref2.intl;

  var popup = void 0;

  if (displayOriginPopup) {
    popup = React.createElement(OriginPopup, {
      shouldOpen: true,
      header: intl.formatMessage({ id: 'origin', defaultMessage: 'From' }),
      text: position.address,
      keyboard: false,
      yOffset: 14
    });
  }

  return React.createElement(
    'div',
    null,
    React.createElement(Marker, {
      zIndexOffset: 10,
      position: position,
      keyboard: false,
      icon: L.divIcon({
        html: Icon.asString('icon-icon_mapMarker-point'),
        className: 'place halo',
        iconAnchor: [12, 24]
      })
    }),
    React.createElement(
      Marker,
      {
        keyboard: false,
        zIndexOffset: 10,
        position: position,
        icon: L.divIcon({
          html: Icon.asString('icon-icon_place'),
          className: 'place',
          iconAnchor: [12, 24]
        })
      },
      popup
    )
  );
}

PlaceMarker.contextTypes = {
  intl: intlShape.isRequired
};

PlaceMarker.propTypes = {
  displayOriginPopup: PropTypes.bool,
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
  }).isRequired
};