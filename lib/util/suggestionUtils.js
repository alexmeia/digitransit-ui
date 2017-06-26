import React from 'react';
import { FormattedMessage } from 'react-intl';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import memoize from 'lodash/memoize';
import escapeRegExp from 'lodash/escapeRegExp';
import cloneDeep from 'lodash/cloneDeep';

import StopCode from '../component/StopCode';

var getLocality = function getLocality(suggestion) {
  return suggestion.localadmin || suggestion.locality || '';
};

memoize.Cache = Map;

export var getStopCode = function getStopCode(_ref) {
  var id = _ref.id,
      code = _ref.code;

  if (code) {
    return code;
  }
  if (id === undefined || id.indexOf('#') === -1) {
    return undefined;
  }
  // id from pelias
  return id.substring(id.indexOf('#') + 1);
};

export var getGTFSId = function getGTFSId(_ref2) {
  var id = _ref2.id,
      gtfsId = _ref2.gtfsId;

  if (gtfsId) {
    return gtfsId;
  }
  if (id === undefined || id.indexOf('#') === -1) {
    return undefined;
  }
  // id from pelias
  return id.substring(5, id.indexOf('#'));
};

export var isStop = function isStop(_ref3) {
  var layer = _ref3.layer;
  return layer === 'stop' || layer === 'favouriteStop';
};

export var getLabel = memoize(function (suggestion) {
  var plain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  switch (suggestion.layer) {
    case 'currentPosition':
      return [suggestion.labelId, null];
    case 'favouritePlace':
      return [suggestion.locationName, suggestion.address];
    case 'favouriteRoute':
    case 'route-BUS':
    case 'route-TRAM':
    case 'route-RAIL':
    case 'route-SUBWAY':
    case 'route-FERRY':
    case 'route-AIRPLANE':
      return suggestion.shortName ? [React.createElement(
        'span',
        { key: suggestion.gtfsId },
        React.createElement(
          'span',
          { className: suggestion.mode.toLowerCase() },
          suggestion.shortName
        ),
        React.createElement(
          'span',
          { className: 'suggestion-type' },
          '\xA0-\xA0',
          React.createElement(FormattedMessage, { id: 'route', defaultMessage: 'Route' })
        )
      ), suggestion.longName] : [suggestion.longName, null];
    case 'venue':
    case 'address':
      return [suggestion.name, suggestion.label.replace(new RegExp(escapeRegExp(suggestion.name) + '(,)?( )?'), '')];

    case 'favouriteStop':
    case 'stop':
      return plain ? [suggestion.name || suggestion.label, getLocality(suggestion)] : [suggestion.name, React.createElement(
        'span',
        { key: suggestion.id },
        getStopCode(suggestion) && React.createElement(StopCode, { code: getStopCode(suggestion) }),
        suggestion.desc
      )];
    case 'station':
    default:
      return [suggestion.name || suggestion.label, getLocality(suggestion)];
  }
}, function (item, plain) {
  var i = cloneDeep(item);
  i.plain = plain;
  return i;
});

export function uniqByLabel(features) {
  return uniqWith(features, function (feat1, feat2) {
    return isEqual(getLabel(feat1.properties), getLabel(feat2.properties)) && feat1.properties.layer === feat2.properties.layer;
  });
}

export function getIcon(layer) {
  var layerIcon = new Map([['favouritePlace', 'icon-icon_star'], ['favouriteRoute', 'icon-icon_star'], ['favouriteStop', 'icon-icon_star'], ['favourite', 'icon-icon_star'], ['address', 'icon-icon_place'], ['stop', 'icon-icon_bus-stop'], ['locality', 'icon-icon_city'], ['station', 'icon-icon_station'], ['localadmin', 'icon-icon_city'], ['neighbourhood', 'icon-icon_city'], ['route-BUS', 'icon-icon_bus-withoutBox'], ['route-TRAM', 'icon-icon_tram-withoutBox'], ['route-RAIL', 'icon-icon_rail-withoutBox'], ['route-SUBWAY', 'icon-icon_subway-withoutBox'], ['route-FERRY', 'icon-icon_ferry-withoutBox'], ['route-AIRPLANE', 'icon-icon_airplane-withoutBox']]);

  var defaultIcon = 'icon-icon_place';
  return layerIcon.get(layer) || defaultIcon;
}