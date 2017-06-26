import _extends from 'babel-runtime/helpers/extends';
import Relay from 'react-relay';

import get from 'lodash/get';
import take from 'lodash/take';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';
import debounce from 'lodash/debounce';
import flatten from 'lodash/flatten';

import { getJson } from './xhrPromise';
import routeCompare from './route-compare';
import { getLatLng } from './geo-utils';
import { uniqByLabel } from './suggestionUtils';
import mapPeliasModality from './pelias-to-modality-mapper';

function getRelayQuery(query) {
  return new Promise(function (resolve, reject) {
    var callback = function callback(readyState) {
      if (readyState.error) {
        reject(readyState.error);
      } else if (readyState.done) {
        resolve(Relay.Store.readQuery(query));
      }
    };

    Relay.Store.primeCache({ query: query }, callback);
  });
}

var mapRoute = function mapRoute(item) {
  return {
    type: 'Route',
    properties: _extends({}, item, {
      layer: 'route-' + item.mode,
      link: '/linjat/' + item.gtfsId + '/pysakit/' + item.patterns[0].code
    }),
    geometry: {
      coordinates: null
    }
  };
};

function mapStops(stops) {
  return stops.map(function (item) {
    return {
      type: 'Stop',
      properties: _extends({}, item, {
        mode: item.routes.length > 0 && item.routes[0].mode.toLowerCase(),
        layer: 'stop'
      }),
      geometry: {
        coordinates: [item.lon, item.lat]
      }
    };
  });
}

function filterMatchingToInput(list, Input, fields) {
  if (typeof Input === 'string' && Input.length > 0) {
    var input = Input.toLowerCase().trim();

    return list.filter(function (item) {
      var parts = [];
      fields.forEach(function (pName) {
        var value = get(item, pName);

        if ((pName === 'properties.label' || pName === 'address') && value) {
          // special case: drop last part i.e. city, because it is too coarse match target
          value = value.split(',');
          if (value.length > 1) {
            value.splice(value.length - 1, 1);
          }
          value = value.join();
        }
        if (value) {
          parts = parts.concat(value.toLowerCase().replace(/,/g, ' ').split(' '));
        }
      });
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].indexOf(input) === 0) {
          // accept match only at word start
          return true;
        }
      }
      return false;
    });
  }

  return list;
}

function getCurrentPositionIfEmpty(input) {
  if (typeof input !== 'string' || input.length === 0) {
    return Promise.resolve([{
      type: 'CurrentLocation',
      properties: { labelId: 'own-position', layer: 'currentPosition' }
    }]);
  }

  return Promise.resolve([]);
}

function getOldSearches(oldSearches, input, dropLayers) {
  var matchingOldSearches = filterMatchingToInput(oldSearches, input, ['properties.name', 'properties.label', 'properties.shortName', 'properties.longName', 'properties.desc']);

  if (dropLayers) {
    // don't want these
    matchingOldSearches = matchingOldSearches.filter(function (item) {
      return !dropLayers.includes(item.properties.layer);
    });
  }

  return Promise.resolve(take(matchingOldSearches, 10).map(function (item) {
    return _extends({}, item, {
      type: 'OldSearch'
    });
  }));
}

function getFavouriteLocations(favourites, input) {
  return Promise.resolve(orderBy(filterMatchingToInput(favourites, input, ['address', 'locationName']), function (feature) {
    return feature.locationName;
  }).map(function (item) {
    return {
      type: 'FavouritePlace',
      properties: _extends({}, item, { label: item.locationName, layer: 'favouritePlace' }),
      geometry: { type: 'Point', coordinates: [item.lon, item.lat] }
    };
  }));
}

export function getGeocodingResult(text, searchParams, lang, focusPoint, sources, config) {
  if (text === undefined || text === null || text.trim().length < 3) {
    return Promise.resolve([]);
  }

  var opts = _extends({ text: text }, searchParams, focusPoint, { lang: lang, sources: sources });

  return getJson(config.URL.PELIAS, opts).then(function (res) {
    return orderBy(res.features, function (feature) {
      return feature.properties.confidence;
    }, 'desc');
  }).then(function (features) {
    return mapPeliasModality(features, config);
  });
}

function getFavouriteRoutes(favourites, input) {
  var query = Relay.createQuery(function () {
    return {
      calls: [{
        kind: 'Call',
        metadata: {
          type: '[String]'
        },
        name: 'ids',
        value: {
          kind: 'CallVariable',
          callVariableName: 'ids'
        }
      }],
      children: [{
        fieldName: 'gtfsId',
        kind: 'Field',
        metadata: {},
        type: 'String'
      }, {
        children: [{
          fieldName: 'name',
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
        }],
        fieldName: 'agency',
        kind: 'Field',
        metadata: {
          canHaveSubselections: true,
          inferredRootCallName: 'node',
          inferredPrimaryKey: 'id'
        },
        type: 'Agency'
      }, {
        fieldName: 'shortName',
        kind: 'Field',
        metadata: {},
        type: 'String'
      }, {
        fieldName: 'mode',
        kind: 'Field',
        metadata: {},
        type: 'String'
      }, {
        fieldName: 'longName',
        kind: 'Field',
        metadata: {},
        type: 'String'
      }, {
        children: [{
          fieldName: 'code',
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
        }],
        fieldName: 'patterns',
        kind: 'Field',
        metadata: {
          canHaveSubselections: true,
          inferredRootCallName: 'node',
          inferredPrimaryKey: 'id',
          isPlural: true
        },
        type: 'Pattern'
      }, {
        fieldName: 'id',
        kind: 'Field',
        metadata: {
          isGenerated: true,
          isRequisite: true
        },
        type: 'ID'
      }],
      fieldName: 'routes',
      kind: 'Query',
      metadata: {
        isPlural: true,
        identifyingArgName: 'ids',
        identifyingArgType: '[String]'
      },
      name: 'FavouriteRoutes',
      type: 'Route'
    };
  }(), { ids: favourites });

  return getRelayQuery(query).then(function (favouriteRoutes) {
    return favouriteRoutes.map(mapRoute);
  }).then(function (routes) {
    return routes.map(function (favourite) {
      return _extends({}, favourite, {
        properties: _extends({}, favourite.properties, { layer: 'favouriteRoute' }),
        type: 'FavouriteRoute'
      });
    });
  }).then(function (routes) {
    return filterMatchingToInput(routes, input, ['properties.shortName', 'properties.longName']);
  }).then(function (routes) {
    return routes.sort(function (x, y) {
      return routeCompare(x.properties, y.properties);
    });
  });
}

function getFavouriteStops(favourites, input, origin) {
  var query = Relay.createQuery(function () {
    return {
      calls: [{
        kind: 'Call',
        metadata: {
          type: '[String]'
        },
        name: 'ids',
        value: {
          kind: 'CallVariable',
          callVariableName: 'ids'
        }
      }],
      children: [{
        fieldName: 'gtfsId',
        kind: 'Field',
        metadata: {},
        type: 'String'
      }, {
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
        fieldName: 'desc',
        kind: 'Field',
        metadata: {},
        type: 'String'
      }, {
        fieldName: 'code',
        kind: 'Field',
        metadata: {},
        type: 'String'
      }, {
        children: [{
          fieldName: 'mode',
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
        }],
        fieldName: 'routes',
        kind: 'Field',
        metadata: {
          canHaveSubselections: true,
          inferredRootCallName: 'node',
          inferredPrimaryKey: 'id',
          isPlural: true
        },
        type: 'Route'
      }, {
        fieldName: 'id',
        kind: 'Field',
        metadata: {
          isGenerated: true,
          isRequisite: true
        },
        type: 'ID'
      }],
      fieldName: 'stops',
      kind: 'Query',
      metadata: {
        isPlural: true,
        identifyingArgName: 'ids',
        identifyingArgType: '[String]'
      },
      name: 'FavouriteStops',
      type: 'Stop'
    };
  }(), { ids: favourites });

  var refLatLng = origin.lat && origin.lon && getLatLng(origin.lat, origin.lon);

  return getRelayQuery(query).then(function (favouriteStops) {
    return mapStops(favouriteStops).map(function (favourite) {
      return _extends({}, favourite, {
        properties: _extends({}, favourite.properties, { layer: 'favouriteStop' }),
        type: 'FavouriteStop'
      });
    });
  }).then(function (stops) {
    return filterMatchingToInput(stops, input, ['properties.name', 'properties.desc']);
  }).then(function (stops) {
    return refLatLng ? sortBy(stops, function (item) {
      return getLatLng(item.geometry.coordinates[1], item.geometry.coordinates[0]).distanceTo(refLatLng);
    }) : stops;
  });
}

function getRoutes(input, config) {
  if (typeof input !== 'string' || input.trim().length === 0) {
    return Promise.resolve([]);
  }
  var number = input.match(/^\d+$/);
  if (number && number[0].length > 3) {
    return Promise.resolve([]);
  }

  var query = Relay.createQuery(function () {
    return {
      children: [{
        calls: [{
          kind: 'Call',
          metadata: {},
          name: 'name',
          value: {
            kind: 'CallVariable',
            callVariableName: 'name'
          }
        }],
        children: [{
          fieldName: 'gtfsId',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }, {
          children: [{
            fieldName: 'name',
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
          }],
          fieldName: 'agency',
          kind: 'Field',
          metadata: {
            canHaveSubselections: true,
            inferredRootCallName: 'node',
            inferredPrimaryKey: 'id'
          },
          type: 'Agency'
        }, {
          fieldName: 'shortName',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }, {
          fieldName: 'mode',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }, {
          fieldName: 'longName',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }, {
          children: [{
            fieldName: 'code',
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
          }],
          fieldName: 'patterns',
          kind: 'Field',
          metadata: {
            canHaveSubselections: true,
            inferredRootCallName: 'node',
            inferredPrimaryKey: 'id',
            isPlural: true
          },
          type: 'Pattern'
        }, {
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }],
        fieldName: 'routes',
        kind: 'Field',
        metadata: {
          canHaveSubselections: true,
          inferredRootCallName: 'node',
          inferredPrimaryKey: 'id',
          isPlural: true
        },
        type: 'Route'
      }],
      fieldName: 'viewer',
      kind: 'Query',
      metadata: {},
      name: 'Routes',
      type: 'QueryType'
    };
  }(), { name: input });

  return getRelayQuery(query).then(function (data) {
    return data[0].routes.filter(function (item) {
      return config.feedIds === undefined || config.feedIds.indexOf(item.gtfsId.split(':')[0]) > -1;
    }).map(mapRoute).sort(function (x, y) {
      return routeCompare(x.properties, y.properties);
    });
  }).then(function (suggestions) {
    return take(suggestions, 10);
  });
}

export var getAllEndpointLayers = function getAllEndpointLayers() {
  return ['CurrentPosition', 'FavouritePlace', 'OldSearch', 'Geocoding', 'Stops'];
};

export function executeSearchImmediate(getStore, _ref, callback) {
  var input = _ref.input,
      type = _ref.type,
      layers = _ref.layers,
      config = _ref.config;

  var position = getStore('PositionStore').getLocationState();
  var endpointSearches = void 0;
  var searchSearches = void 0;
  var endpointSearchesPromise = void 0;
  var searchSearchesPromise = void 0;
  var endpointLayers = layers || getAllEndpointLayers();

  if (type === 'endpoint' || type === 'all') {
    endpointSearches = { type: 'endpoint', term: input, results: [] };
    var favouriteLocations = getStore('FavouriteLocationStore').getLocations();
    var oldSearches = getStore('OldSearchesStore').getOldSearches('endpoint');
    var language = getStore('PreferencesStore').getLanguage();
    var searchComponents = [];

    if (endpointLayers.includes('CurrentPosition') && position.hasLocation) {
      searchComponents.push(getCurrentPositionIfEmpty(input));
    }
    if (endpointLayers.includes('FavouritePlace')) {
      searchComponents.push(getFavouriteLocations(favouriteLocations, input));
    }
    if (endpointLayers.includes('OldSearch')) {
      var dropLayers = void 0;
      // old searches should also obey the layers definition
      if (!endpointLayers.includes('FavouritePlace')) {
        dropLayers = ['favouritePlace'];
      }
      searchComponents.push(getOldSearches(oldSearches, input, dropLayers));
    }

    if (endpointLayers.includes('Geocoding')) {
      var focusPoint = config.autoSuggest.locationAware && position.hasLocation ? {
        // Round coordinates to approx 1 km, in order to improve caching
        'focus.point.lat': position.lat.toFixed(2), 'focus.point.lon': position.lon.toFixed(2)
      } : {};

      var sources = get(config, 'searchSources', '').join(',');

      searchComponents.push(getGeocodingResult(input, config.searchParams, language, focusPoint, sources, config));
    }

    if (endpointLayers.includes('Stops')) {
      var _focusPoint = config.autoSuggest.locationAware && position.hasLocation ? {
        // Round coordinates to approx 1 km, in order to improve caching
        'focus.point.lat': position.lat.toFixed(2), 'focus.point.lon': position.lon.toFixed(2)
      } : {};
      var _sources = get(config, 'feedIds', []).map(function (v) {
        return 'gtfs' + v;
      }).join(',');

      searchComponents.push(getGeocodingResult(input, undefined, language, _focusPoint, _sources, config));
    }

    endpointSearchesPromise = Promise.all(searchComponents).then(function (resultsArray) {
      if (endpointLayers.includes('Stops') && endpointLayers.includes('Geocoding')) {
        // sort & combine pelias results into single array
        var modifiedResultsArray = [];
        for (var i = 0; i < resultsArray.length - 2; i++) {
          modifiedResultsArray.push(resultsArray[i]);
        }
        var sorted = orderBy(resultsArray[resultsArray.length - 1].concat(resultsArray[resultsArray.length - 2]), [function (u) {
          return u.properties.confidence;
        }], ['desc']);
        modifiedResultsArray.push(sorted);
        return modifiedResultsArray;
      }
      return resultsArray;
    }).then(flatten).then(uniqByLabel).then(function (results) {
      endpointSearches.results = results;
    }).catch(function (err) {
      endpointSearches.error = err;
    });

    if (type === 'endpoint') {
      endpointSearchesPromise.then(function () {
        return callback([endpointSearches]);
      });
      return;
    }
  }

  if (type === 'search' || type === 'all') {
    searchSearches = { type: 'search', term: input, results: [] };
    var origin = getStore('EndpointStore').getOrigin();
    var _oldSearches = getStore('OldSearchesStore').getOldSearches('search');
    var favouriteRoutes = getStore('FavouriteRoutesStore').getRoutes();
    var favouriteStops = getStore('FavouriteStopsStore').getStops();

    searchSearchesPromise = Promise.all([getFavouriteRoutes(favouriteRoutes, input), getFavouriteStops(favouriteStops, input, origin), getOldSearches(_oldSearches, input), getRoutes(input, config)]).then(flatten).then(uniqByLabel).then(function (results) {
      searchSearches.results = results;
    }).catch(function (err) {
      searchSearches.error = err;
    });

    if (type === 'search') {
      searchSearchesPromise.then(function () {
        callback([searchSearches]);
      });
      return;
    }
  }

  Promise.all([endpointSearchesPromise, searchSearchesPromise]).then(function () {
    return callback([searchSearches, endpointSearches]);
  });
}

var debouncedSearch = debounce(executeSearchImmediate, 300);

export var executeSearch = function executeSearch(getStore, data, callback) {
  callback(null); // This means 'we are searching'
  debouncedSearch(getStore, data, callback);
};

export var withCurrentTime = function withCurrentTime(getStore, location) {
  var query = location && location.query || {};

  return _extends({}, location, {
    query: _extends({}, query, {
      time: query.time ? query.time : getStore('TimeStore').getCurrentTime().unix()
    })
  });
};