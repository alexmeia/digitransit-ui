import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import connectToStores from 'fluxible-addons-react/connectToStores';
import some from 'lodash/some';

import Icon from './Icon';
import Map from './map/Map';
import RouteLine from './map/route/RouteLine';
import VehicleMarkerContainer from './map/VehicleMarkerContainer';
import StopCardHeaderContainer from './StopCardHeaderContainer';
import { getStartTime } from '../util/timeUtils';

function RouteMapContainer(_ref, _ref2) {
  var pattern = _ref.pattern,
      trip = _ref.trip,
      vehicles = _ref.vehicles,
      routes = _ref.routes;
  var router = _ref2.router,
      location = _ref2.location,
      breakpoint = _ref2.breakpoint;

  if (!pattern) return false;

  var selectedVehicle = void 0;
  var fitBounds = true;
  var zoom = void 0;
  var tripStart = void 0;

  if (trip) {
    tripStart = getStartTime(trip.stoptimesForDate[0].scheduledDeparture);
    var vehiclesWithCorrectStartTime = Object.keys(vehicles).map(function (key) {
      return vehicles[key];
    }).filter(function (vehicle) {
      return vehicle.tripStartTime === tripStart;
    });

    selectedVehicle = vehiclesWithCorrectStartTime && vehiclesWithCorrectStartTime.length > 0 && vehiclesWithCorrectStartTime[0];

    if (selectedVehicle) {
      fitBounds = false;
      zoom = 15;
    }
  }

  var fullscreen = some(routes, function (route) {
    return route.fullscreenMap;
  });

  var toggleFullscreenMap = function toggleFullscreenMap() {
    if (fullscreen) {
      router.goBack();
      return;
    }
    router.push(location.pathname + '/kartta');
  };

  var leafletObjs = [React.createElement(RouteLine, { key: 'line', pattern: pattern }), React.createElement(VehicleMarkerContainer, {
    key: 'vehicles',
    direction: pattern.directionId,
    pattern: pattern.code,
    tripStart: tripStart,
    useSmallIcons: false
  })];

  var showScale = fullscreen || breakpoint === 'large';

  var filteredPoints = void 0;
  if (pattern.geometry) {
    filteredPoints = pattern.geometry.filter(function (point) {
      return point.lat !== null && point.lon !== null;
    });
  }
  return React.createElement(
    Map,
    {
      lat: selectedVehicle && selectedVehicle.lat || undefined,
      lon: selectedVehicle && selectedVehicle.long || undefined,
      className: 'full',
      leafletObjs: leafletObjs,
      fitBounds: fitBounds,
      bounds: (filteredPoints || pattern.stops).map(function (p) {
        return [p.lat, p.lon];
      }),
      zoom: zoom,
      showScaleBar: showScale
    },
    breakpoint !== 'large' && !fullscreen && React.createElement('div', { className: 'map-click-prevent-overlay', onClick: toggleFullscreenMap, key: 'overlay' }),
    breakpoint !== 'large' && React.createElement(
      'div',
      { className: 'fullscreen-toggle', onClick: toggleFullscreenMap },
      fullscreen ? React.createElement(Icon, { img: 'icon-icon_minimize', className: 'cursor-pointer' }) : React.createElement(Icon, { img: 'icon-icon_maximize', className: 'cursor-pointer' })
    )
  );
}

RouteMapContainer.contextTypes = {
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  breakpoint: PropTypes.string.isRequired
};

RouteMapContainer.propTypes = {
  trip: PropTypes.shape({
    stoptimesForDate: PropTypes.arrayOf(PropTypes.shape({
      scheduledDeparture: PropTypes.number.isRequired
    })).isRequired
  }),
  routes: PropTypes.arrayOf(PropTypes.shape({
    fullscreenMap: PropTypes.bool
  })).isRequired,
  pattern: PropTypes.object.isRequired,
  vehicles: PropTypes.object
};

export var RouteMapFragments = {
  pattern: function pattern() {
    return function (RQL_0, RQL_1) {
      return {
        children: [].concat.apply([], [{
          fieldName: 'code',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }, {
          fieldName: 'directionId',
          kind: 'Field',
          metadata: {},
          type: 'Int'
        }, {
          children: [{
            fieldName: 'lat',
            kind: 'Field',
            metadata: {},
            type: 'Float'
          }, {
            fieldName: 'lon',
            kind: 'Field',
            metadata: {},
            type: 'Float'
          }],
          fieldName: 'geometry',
          kind: 'Field',
          metadata: {
            canHaveSubselections: true,
            isPlural: true
          },
          type: 'Coordinates'
        }, {
          children: [].concat.apply([], [{
            fieldName: 'lat',
            kind: 'Field',
            metadata: {},
            type: 'Float'
          }, {
            fieldName: 'lon',
            kind: 'Field',
            metadata: {},
            type: 'Float'
          }, {
            fieldName: 'name',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'gtfsId',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'ID'
          }, Relay.QL.__frag(RQL_0)]),
          fieldName: 'stops',
          kind: 'Field',
          metadata: {
            canHaveSubselections: true,
            inferredRootCallName: 'node',
            inferredPrimaryKey: 'id',
            isPlural: true
          },
          type: 'Stop'
        }, {
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }, Relay.QL.__frag(RQL_1)]),
        id: Relay.QL.__id(),
        kind: 'Fragment',
        metadata: {},
        name: 'RouteMapContainer_PatternRelayQL',
        type: 'Pattern'
      };
    }(StopCardHeaderContainer.getFragment('stop'), RouteLine.getFragment('pattern'));
  },
  trip: function trip() {
    return function () {
      return {
        children: [{
          children: [{
            fieldName: 'scheduledDeparture',
            kind: 'Field',
            metadata: {},
            type: 'Int'
          }],
          fieldName: 'stoptimesForDate',
          kind: 'Field',
          metadata: {
            canHaveSubselections: true,
            isPlural: true
          },
          type: 'Stoptime'
        }, {
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }],
        id: Relay.QL.__id(),
        kind: 'Fragment',
        metadata: {},
        name: 'RouteMapContainer_TripRelayQL',
        type: 'Trip'
      };
    }();
  }
};

var RouteMapContainerWithVehicles = connectToStores(RouteMapContainer, ['RealTimeInformationStore'], function (_ref3) {
  var getStore = _ref3.getStore;
  return {
    vehicles: getStore('RealTimeInformationStore').vehicles
  };
});

export default Relay.createContainer(RouteMapContainerWithVehicles, {
  fragments: RouteMapFragments
});