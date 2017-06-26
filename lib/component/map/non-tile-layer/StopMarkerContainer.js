import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';

import StopMarkerLayer from './StopMarkerLayer';
import StopMarkerLayerRoute from '../../../route/StopMarkerLayerRoute';

export default function StopMarkerContainer(_ref, _ref2) {
  var hilightedStops = _ref.hilightedStops;
  var map = _ref2.map,
      config = _ref2.config;

  var bounds = void 0;
  var maxLon = void 0;
  var maxLat = void 0;
  var minLon = void 0;
  var minLat = void 0;

  if (map.getZoom() < config.stopsMinZoom) {
    minLat = 0.1;
    minLon = 0.1;
    maxLat = 0.1;
    maxLon = 0.1;
  } else {
    bounds = map.getBounds();
    minLat = bounds.getSouth();
    minLon = bounds.getWest();
    maxLat = bounds.getNorth();
    maxLon = bounds.getEast();
  }

  return React.createElement(Relay.RootContainer, {
    Component: StopMarkerLayer,
    route: new StopMarkerLayerRoute({
      minLat: minLat,
      minLon: minLon,
      maxLat: maxLat,
      maxLon: maxLon,
      agency: config.preferredAgency || null
    }),
    renderFetched: function renderFetched(data) {
      return React.createElement(StopMarkerLayer, _extends({}, data, {
        hilightedStops: hilightedStops,
        minLat: minLat,
        minLon: minLon,
        maxLat: maxLat,
        maxLon: maxLon,
        agency: config.preferredAgency || null
      }));
    }
  });
}

StopMarkerContainer.propTypes = {
  hilightedStops: PropTypes.array
};

StopMarkerContainer.contextTypes = {
  map: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};