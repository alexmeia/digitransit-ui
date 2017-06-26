import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import includes from 'lodash/includes';
import pull from 'lodash/pull';
import without from 'lodash/without';

import ModeFilterContainer from './ModeFilterContainer';
import NearestRoutesContainer from './NearestRoutesContainer';
import NextDeparturesListHeader from './NextDeparturesListHeader';

function NearbyRoutesPanel(_ref, context) {
  var location = _ref.location,
      currentTime = _ref.currentTime,
      modes = _ref.modes,
      placeTypes = _ref.placeTypes;

  return React.createElement(
    'div',
    { className: 'frontpage-panel nearby-routes fullscreen' },
    context.config.showModeFilter && React.createElement(
      'div',
      { className: 'row border-bottom' },
      React.createElement(
        'div',
        { className: 'small-12 column' },
        React.createElement(ModeFilterContainer, { id: 'nearby-routes-mode' })
      )
    ),
    React.createElement(NextDeparturesListHeader, null),
    React.createElement(
      'div',
      {
        className: 'scrollable momentum-scroll nearby',
        id: 'scrollable-routes'
      },
      React.createElement(NearestRoutesContainer, {
        lat: location.lat,
        lon: location.lon,
        currentTime: currentTime,
        modes: modes,
        placeTypes: placeTypes,
        maxDistance: context.config.nearbyRoutes.radius,
        maxResults: context.config.nearbyRoutes.results || 50,
        timeRange: context.config.nearbyRoutes.timeRange || 7200
      })
    )
  );
}

NearbyRoutesPanel.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
  }).isRequired,
  currentTime: PropTypes.number.isRequired,
  modes: PropTypes.array.isRequired,
  placeTypes: PropTypes.array.isRequired
};

NearbyRoutesPanel.contextTypes = {
  config: PropTypes.object
};

export default connectToStores(NearbyRoutesPanel, ['EndpointStore', 'TimeStore', 'ModeStore'], function (context) {
  var position = context.getStore('PositionStore').getLocationState();
  var origin = context.getStore('EndpointStore').getOrigin();
  var modes = context.getStore('ModeStore').getMode();
  var bicycleRent = includes(modes, 'BICYCLE_RENT');
  var modeFilter = without(modes, 'BICYCLE_RENT');
  var placeTypeFilter = ['DEPARTURE_ROW', 'BICYCLE_RENT'];

  if (!bicycleRent) {
    pull(placeTypeFilter, 'BICYCLE_RENT');
  } else if (modes.length === 1) {
    placeTypeFilter = ['BICYCLE_RENT'];
  }

  return {
    location: origin.useCurrentPosition ? position : origin,
    currentTime: context.getStore('TimeStore').getCurrentTime().unix(),
    modes: modeFilter,
    placeTypes: placeTypeFilter
  };
});