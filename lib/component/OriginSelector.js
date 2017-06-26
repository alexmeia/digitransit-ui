import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { routerShape, locationShape } from 'react-router';

import { setEndpoint } from '../action/EndpointActions';
import Icon from './Icon';
import { getIcon } from '../util/suggestionUtils';

var OriginSelectorRow = function OriginSelectorRow(_ref, _ref2) {
  var icon = _ref.icon,
      label = _ref.label,
      lat = _ref.lat,
      lon = _ref.lon;
  var executeAction = _ref2.executeAction,
      router = _ref2.router,
      location = _ref2.location;
  return React.createElement(
    'li',
    null,
    React.createElement(
      'button',
      {
        className: 'noborder',
        style: { display: 'block' },
        onClick: function onClick() {
          return executeAction(setEndpoint, {
            target: 'origin',
            endpoint: { lat: lat, lon: lon, address: label },
            router: router,
            location: location
          });
        }
      },
      React.createElement(Icon, { className: 'splash-icon ' + icon, img: icon }),
      label
    )
  );
};

OriginSelectorRow.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired
};

OriginSelectorRow.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  router: routerShape.isRequired,
  location: locationShape.isRequired
};

var OriginSelector = function OriginSelector(_ref3, _ref4) {
  var favourites = _ref3.favourites,
      oldSearches = _ref3.oldSearches;
  var config = _ref4.config;

  var notInFavourites = function notInFavourites(item) {
    return favourites.filter(function (favourite) {
      return Math.abs(favourite.lat - item.geometry.coordinates[1]) < 1e-4 && Math.abs(favourite.lon - item.geometry.coordinates[0]) < 1e-4;
    }).length === 0;
  };

  var names = favourites.map(function (f) {
    return React.createElement(OriginSelectorRow, {
      key: 'f-' + f.locationName,
      icon: getIcon('favourite'),
      label: f.locationName,
      lat: f.lat,
      lon: f.lon
    });
  }).concat(oldSearches.filter(notInFavourites).map(function (s) {
    return React.createElement(OriginSelectorRow, {
      key: 'o-' + (s.properties.label || s.properties.name),
      icon: getIcon(s.properties.layer),
      label: s.properties.label || s.properties.name,
      lat: s.geometry.coordinates && s.geometry.coordinates[1] || s.lat,
      lon: s.geometry.coordinates && s.geometry.coordinates[0] || s.lon
    });
  })).concat(config.defaultOrigins.map(function (o) {
    return React.createElement(OriginSelectorRow, _extends({ key: 'o-' + o.label }, o));
  }));
  return React.createElement(
    'ul',
    null,
    names.slice(0, 3)
  );
};

OriginSelector.propTypes = {
  favourites: PropTypes.array.isRequired,
  oldSearches: PropTypes.array.isRequired
};

OriginSelector.contextTypes = {
  config: PropTypes.object.isRequired
};

export default connectToStores(OriginSelector, ['FavouriteLocationStore', 'OldSearchesStore'], function (context) {
  return {
    favourites: context.getStore('FavouriteLocationStore').getLocations(),
    oldSearches: context.getStore('OldSearchesStore').getOldSearches('endpoint')
  };
});