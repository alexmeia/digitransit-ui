import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import withReducer from 'recompose/withReducer';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import ComponentUsageExample from '../ComponentUsageExample';
import Map from './Map';
import ToggleMapTracking from '../ToggleMapTracking';

function mapStateReducer(state, action) {
  switch (action.type) {
    case 'enable':
      return _extends({}, state, {
        initialZoom: false,
        mapTracking: true,
        focusOnOrigin: false
      });
    case 'disable':
      return _extends({}, state, {
        initialZoom: false,
        mapTracking: false,
        focusOnOrigin: false
      });
    case 'useOrigin':
      return _extends({}, state, {
        initialZoom: false,
        mapTracking: false,
        focusOnOrigin: true,
        previousOrigin: action.origin
      });
    case 'usePosition':
      return _extends({}, state, {
        initialZoom: false,
        mapTracking: true,
        focusOnOrigin: false,
        previousOrigin: action.origin
      });
    default:
      return state;
  }
}

var withMapStateTracking = withReducer('mapState', 'dispatch', mapStateReducer, function () {
  return {
    initialZoom: true,
    mapTracking: true,
    focusOnOrigin: false
  };
});

var onlyUpdateCoordChanges = onlyUpdateForKeys(
// searchModalIsOpen and selectedTab keys here's just to get map updated
// when those props change (in large view tabs are inside map)
['breakpoint', 'lat', 'lon', 'zoom', 'mapTracking', 'lang', 'tab', 'searchModalIsOpen', 'selectedTab']);

var MapWithTracking = withMapStateTracking(connectToStores(onlyUpdateCoordChanges(Map), ['PositionStore', 'EndpointStore', 'PreferencesStore'], function (context, props) {
  var mapTracking = props.mapState.mapTracking;

  var PositionStore = context.getStore('PositionStore');
  var position = PositionStore.getLocationState();
  var origin = context.getStore('EndpointStore').getOrigin();
  var language = context.getStore('PreferencesStore').getLanguage();

  var location = function () {
    if (props.mapState.focusOnOrigin && !origin.useCurrentPosition) {
      return origin;
    } else if (mapTracking && position.hasLocation) {
      return position;
    }
    return false;
  }();

  if (!origin.useCurrentPosition && origin !== props.mapState.previousOrigin) {
    setTimeout(props.dispatch, 0, {
      type: 'useOrigin',
      origin: origin
    });
    location = origin;
  } else if (origin.useCurrentPosition && props.mapState.previousOrigin && origin !== props.mapState.previousOrigin) {
    setTimeout(props.dispatch, 0, {
      type: 'usePosition',
      origin: origin
    });
    location = position;
  }

  function enableMapTracking() {
    if (!mapTracking) {
      props.dispatch({
        type: 'enable'
      });
    }
  }

  function disableMapTracking() {
    if (mapTracking) {
      props.dispatch({
        type: 'disable'
      });
    }
  }

  var children = React.Children.toArray(props.children);

  var mapToggle = React.createElement(ToggleMapTracking, {
    key: 'toggleMapTracking',
    handleClick: mapTracking ? disableMapTracking : enableMapTracking,
    className: 'icon-mapMarker-toggle-positioning-' + (mapTracking ? 'online' : 'offline')
  });

  if (position.hasLocation) {
    children.push(mapToggle);
  }

  return {
    lat: location ? location.lat : null,
    lon: location ? location.lon : null,
    zoom: props.mapState.initialZoom && 16 || undefined,
    lang: language, // passing this prop just because we want map to
    // update on lang changes, lang is not used
    mapTracking: mapTracking,
    position: position,
    className: 'flex-grow',
    displayOriginPopup: true,
    leafletEvents: {
      onDragstart: disableMapTracking,
      onZoomend: disableMapTracking
    },
    disableMapTracking: disableMapTracking,
    children: children
  };
}));

MapWithTracking.contextTypes = {
  getStore: PropTypes.func.isRequired
};

MapWithTracking.description = React.createElement(
  'div',
  null,
  React.createElement(
    'p',
    null,
    'Renders a map with map-tracking functionality'
  ),
  React.createElement(
    ComponentUsageExample,
    { description: '' },
    React.createElement(MapWithTracking, null)
  )
);

export default MapWithTracking;