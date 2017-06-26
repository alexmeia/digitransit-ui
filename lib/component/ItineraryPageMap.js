import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
import React from 'react';
import some from 'lodash/some';
import polyline from 'polyline-encoded';

import LocationMarker from './map/LocationMarker';
import ItineraryLine from './map/ItineraryLine';
import Map from './map/Map';
import Icon from './Icon';
import { otpToLocation } from '../util/otpStrings';
import { isBrowser } from '../util/browser';

var L = void 0;

if (isBrowser) {
  // eslint-disable-next-line
  L = require('leaflet');
}

export default function ItineraryPageMap(_ref, _ref2) {
  var itinerary = _ref.itinerary,
      params = _ref.params,
      from = _ref.from,
      to = _ref.to,
      routes = _ref.routes,
      center = _ref.center;
  var breakpoint = _ref2.breakpoint,
      router = _ref2.router,
      location = _ref2.location;

  var leafletObjs = [React.createElement(LocationMarker, {
    key: 'fromMarker',
    position: from || otpToLocation(params.from),
    className: 'from'
  }), React.createElement(LocationMarker, {
    key: 'toMarker',
    position: to || otpToLocation(params.to),
    className: 'to'
  })];

  if (location.query && location.query.intermediatePlaces) {
    if (Array.isArray(location.query.intermediatePlaces)) {
      location.query.intermediatePlaces.map(otpToLocation).forEach(function (markerLocation, i) {
        leafletObjs.push(React.createElement(LocationMarker, {
          key: 'via_' + i // eslint-disable-line react/no-array-index-key
          , position: markerLocation,
          className: 'via',
          noText: true
        }));
      });
    } else {
      leafletObjs.push(React.createElement(LocationMarker, {
        key: 'via',
        position: otpToLocation(location.query.intermediatePlaces),
        className: 'via',
        noText: true
      }));
    }
  }

  if (itinerary) {
    leafletObjs.push(React.createElement(ItineraryLine, {
      key: 'line',
      legs: itinerary.legs,
      showTransferLabels: true,
      showIntermediateStops: true
    }));
  }
  var fullscreen = some(routes.map(function (route) {
    return route.fullscreenMap;
  }));

  var toggleFullscreenMap = fullscreen ? router.goBack : function () {
    return router.push(_extends({}, location, {
      pathname: location.pathname + '/kartta'
    }));
  };

  var overlay = fullscreen ? undefined : React.createElement('div', {
    className: 'map-click-prevent-overlay',
    onClick: toggleFullscreenMap
  });

  var bounds = void 0;

  if (!center && itinerary && !itinerary.legs[0].transitLeg) {
    bounds = polyline.decode(itinerary.legs[0].legGeometry.points);
  }

  var showScale = fullscreen || breakpoint === 'large';

  // onCenterMap() used to check if the layer has a marker for an itinerary
  // stop, emulate a click on the map to open up the popup
  var onCenterMap = function onCenterMap(element) {
    if (!element || !center) {
      return;
    }
    element.map.leafletElement.closePopup();
    if (fullscreen || breakpoint === 'large') {
      var latlngPoint = new L.LatLng(center.lat, center.lon);
      element.map.leafletElement.eachLayer(function (layer) {
        if (layer instanceof L.Marker && layer.getLatLng().equals(latlngPoint)) {
          layer.fireEvent('click', {
            latlng: latlngPoint,
            layerPoint: element.map.leafletElement.latLngToLayerPoint(latlngPoint),
            containerPoint: element.map.leafletElement.latLngToContainerPoint(latlngPoint)
          });
        }
      });
    }
  };

  return React.createElement(
    Map,
    {
      className: 'full itinerary',
      leafletObjs: leafletObjs,
      lat: center ? center.lat : from.lat,
      lon: center ? center.lon : from.lon,
      zoom: bounds ? undefined : 16,
      bounds: bounds,
      fitBounds: Boolean(bounds),
      boundsOptions: { maxZoom: 16 },
      showScaleBar: showScale,
      ref: onCenterMap,
      hideOrigin: true
    },
    breakpoint !== 'large' && overlay,
    breakpoint !== 'large' && React.createElement(
      'div',
      {
        className: 'fullscreen-toggle',
        onClick: toggleFullscreenMap
      },
      React.createElement(Icon, {
        img: 'icon-icon_maximize',
        className: 'cursor-pointer'
      })
    )
  );
}

ItineraryPageMap.propTypes = {
  itinerary: PropTypes.object,
  params: PropTypes.shape({
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
  }).isRequired,
  from: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
  }),
  to: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
  }),
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
  }),
  routes: PropTypes.arrayOf(PropTypes.shape({
    fullscreenMap: PropTypes.bool
  }).isRequired).isRequired
};