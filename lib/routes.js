import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
// Libraries
import React from 'react';
import Relay from 'react-relay';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import ContainerDimensions from 'react-container-dimensions';

import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

import moment from 'moment';

// React pages
import IndexPage from './component/IndexPage';
import Error404 from './component/404';
import NetworkError from './component/NetworkError';
import Loading from './component/LoadingPage';
import SplashOrChildren from './component/SplashOrChildren';

import { otpToLocation } from './util/otpStrings';

import TopLevel from './component/TopLevel';
import Title from './component/Title';

import { isBrowser } from './util/browser';

// Localstorage data
import { getCustomizedSettings } from './store/localStorage';

var ComponentLoading404Renderer = {
  /* eslint-disable react/prop-types */
  header: function header(_ref) {
    var error = _ref.error,
        props = _ref.props,
        element = _ref.element,
        retry = _ref.retry;

    if (error) {
      if (error.message === 'Failed to fetch' // Chrome
      || error.message === 'Network request failed' // Safari && FF && IE
      ) {
          return React.createElement(NetworkError, { retry: retry });
        }
      return React.createElement(Error404, null);
    } else if (props) {
      return React.cloneElement(element, props);
    }
    return React.createElement(Loading, null);
  },
  map: function map(_ref2) {
    var error = _ref2.error,
        props = _ref2.props,
        element = _ref2.element;

    if (error) {
      return null;
    } else if (props) {
      return React.cloneElement(element, props);
    }
    return undefined;
  },
  title: function title(_ref3) {
    var props = _ref3.props,
        element = _ref3.element;
    return React.cloneElement(element, _extends({ route: null }, props));
  },
  content: function content(_ref4) {
    var props = _ref4.props,
        element = _ref4.element;
    return props ? React.cloneElement(element, props) : React.createElement('div', { className: 'flex-grow' });
  }
  /* eslint-enable react/prop-types */
};

var StopQueries = {
  stop: function stop() {
    return function () {
      return {
        calls: [{
          kind: 'Call',
          metadata: {
            type: 'String!'
          },
          name: 'id',
          value: {
            kind: 'CallVariable',
            callVariableName: 'stopId'
          }
        }],
        children: [{
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }],
        fieldName: 'stop',
        kind: 'Query',
        metadata: {
          identifyingArgName: 'id',
          identifyingArgType: 'String!'
        },
        name: 'Routes',
        type: 'Stop'
      };
    }();
  }
};

var RouteQueries = {
  route: function route() {
    return function () {
      return {
        calls: [{
          kind: 'Call',
          metadata: {
            type: 'String!'
          },
          name: 'id',
          value: {
            kind: 'CallVariable',
            callVariableName: 'routeId'
          }
        }],
        children: [{
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }],
        fieldName: 'route',
        kind: 'Query',
        metadata: {
          identifyingArgName: 'id',
          identifyingArgType: 'String!'
        },
        name: 'Routes',
        type: 'Route'
      };
    }();
  }
};

var PatternQueries = {
  pattern: function pattern() {
    return function () {
      return {
        calls: [{
          kind: 'Call',
          metadata: {
            type: 'String!'
          },
          name: 'id',
          value: {
            kind: 'CallVariable',
            callVariableName: 'patternId'
          }
        }],
        children: [{
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }],
        fieldName: 'pattern',
        kind: 'Query',
        metadata: {
          identifyingArgName: 'id',
          identifyingArgType: 'String!'
        },
        name: 'Routes',
        type: 'Pattern'
      };
    }();
  }
};

var TripQueries = {
  trip: function trip() {
    return function () {
      return {
        calls: [{
          kind: 'Call',
          metadata: {
            type: 'String!'
          },
          name: 'id',
          value: {
            kind: 'CallVariable',
            callVariableName: 'tripId'
          }
        }],
        children: [{
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }],
        fieldName: 'trip',
        kind: 'Query',
        metadata: {
          identifyingArgName: 'id',
          identifyingArgType: 'String!'
        },
        name: 'Routes',
        type: 'Trip'
      };
    }();
  },
  pattern: function pattern() {
    return function () {
      return {
        calls: [{
          kind: 'Call',
          metadata: {
            type: 'String!'
          },
          name: 'id',
          value: {
            kind: 'CallVariable',
            callVariableName: 'patternId'
          }
        }],
        children: [{
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }],
        fieldName: 'pattern',
        kind: 'Query',
        metadata: {
          identifyingArgName: 'id',
          identifyingArgType: 'String!'
        },
        name: 'Routes',
        type: 'Pattern'
      };
    }();
  }
};

var terminalQueries = {
  stop: function stop() {
    return function () {
      return {
        calls: [{
          kind: 'Call',
          metadata: {
            type: 'String!'
          },
          name: 'id',
          value: {
            kind: 'CallVariable',
            callVariableName: 'terminalId'
          }
        }],
        children: [{
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }],
        fieldName: 'station',
        kind: 'Query',
        metadata: {
          identifyingArgName: 'id',
          identifyingArgType: 'String!'
        },
        name: 'Routes',
        type: 'Stop'
      };
    }();
  }
};

var planQueries = {
  plan: function plan(Component, variables) {
    return function (RQL_0) {
      return {
        children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]),
        fieldName: 'viewer',
        kind: 'Query',
        metadata: {},
        name: 'Routes',
        type: 'QueryType'
      };
    }(Component.getFragment('plan', variables));
  }
};

function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
  return function (module) {
    return cb(null, module.default);
  };
}

function getDefault(module) {
  return module.default;
}

function getIntermediatePlaces(intermediatePlaces) {
  if (!intermediatePlaces) {
    return [];
  } else if (Array.isArray(intermediatePlaces)) {
    return intermediatePlaces.map(otpToLocation);
  } else if (typeof intermediatePlaces === 'string') {
    return [otpToLocation(intermediatePlaces)];
  }
  return [];
}

function getSettings() {
  var custSettings = getCustomizedSettings();

  return {
    walkSpeed: custSettings.walkSpeed ? Number(custSettings.walkSpeed) : undefined,
    walkReluctance: custSettings.walkReluctance ? Number(custSettings.walkReluctance) : undefined,
    walkBoardCost: custSettings.walkBoardCost ? Number(custSettings.walkBoardCost) : undefined,
    modes: custSettings.modes ? custSettings.modes.toString().split(',').map(function (mode) {
      return mode === 'CITYBIKE' ? 'BICYCLE_RENT' : mode;
    }).sort().join(',') : undefined,
    minTransferTime: custSettings.minTransferTime ? Number(custSettings.minTransferTime) : undefined,
    accessibilityOption: custSettings.accessibilityOption ? custSettings.accessibilityOption : undefined
  };
}

export default (function (config) {
  var preparePlanParams = function preparePlanParams(_ref5, _ref6) {
    var from = _ref5.from,
        to = _ref5.to;
    var _ref6$location$query = _ref6.location.query,
        intermediatePlaces = _ref6$location$query.intermediatePlaces,
        numItineraries = _ref6$location$query.numItineraries,
        time = _ref6$location$query.time,
        arriveBy = _ref6$location$query.arriveBy,
        walkReluctance = _ref6$location$query.walkReluctance,
        walkSpeed = _ref6$location$query.walkSpeed,
        walkBoardCost = _ref6$location$query.walkBoardCost,
        minTransferTime = _ref6$location$query.minTransferTime,
        modes = _ref6$location$query.modes,
        accessibilityOption = _ref6$location$query.accessibilityOption;

    var settings = getSettings();
    return omitBy({
      fromPlace: from,
      toPlace: to,
      from: otpToLocation(from),
      to: otpToLocation(to),
      intermediatePlaces: getIntermediatePlaces(intermediatePlaces),
      numItineraries: numItineraries ? Number(numItineraries) : undefined,
      modes: modes ? modes.split(',').map(function (mode) {
        return mode === 'CITYBIKE' ? 'BICYCLE_RENT' : mode;
      }).sort().join(',') : settings.modes,
      date: time ? moment(time * 1000).format('YYYY-MM-DD') : undefined,
      time: time ? moment(time * 1000).format('HH:mm:ss') : undefined,
      walkReluctance: walkReluctance ? Number(walkReluctance) : settings.walkReluctance,
      walkBoardCost: walkBoardCost ? Number(walkBoardCost) : settings.walkBoardCost,
      minTransferTime: minTransferTime ? Number(minTransferTime) : settings.minTransferTime,
      walkSpeed: walkSpeed ? Number(walkSpeed) : settings.walkSpeed,
      arriveBy: arriveBy ? arriveBy === 'true' : undefined,
      maxWalkDistance: typeof modes === 'undefined' || typeof modes === 'string' && !modes.split(',').includes('BICYCLE') ? config.maxWalkDistance : config.maxBikingDistance,
      wheelchair: accessibilityOption === '1' ? true : settings.accessibilityOption === '1',
      preferred: { agencies: config.preferredAgency || '' },
      disableRemainingWeightHeuristic: modes && modes.split(',').includes('CITYBIKE')
    }, isNil);
  };

  var SummaryPageWrapper = function SummaryPageWrapper(_ref7) {
    var props = _ref7.props,
        routerProps = _ref7.routerProps,
        element = _ref7.element;
    return props ? React.cloneElement(element, props) : React.cloneElement(element, _extends({}, routerProps, preparePlanParams(routerProps.params, routerProps), {
      plan: { plan: {} },
      loading: true
    }));
  };

  SummaryPageWrapper.propTypes = {
    props: PropTypes.object.isRequired,
    routerProps: PropTypes.object.isRequired
  };

  return React.createElement(
    Route,
    {
      component: function component(props) {
        return isBrowser ? React.createElement(
          ContainerDimensions,
          null,
          React.createElement(TopLevel, props)
        ) : React.createElement(TopLevel, props);
      }
    },
    React.createElement(
      Route,
      {
        path: '/', topBarOptions: { disableBackButton: true }, components: {
          title: Title,
          content: function content(props) {
            return React.createElement(
              SplashOrChildren,
              null,
              React.createElement(IndexPage, props)
            );
          }

        }
      },
      React.createElement(Route, {
        path: 'lahellasi',
        getComponents: function getComponents(location, cb) {
          return System.import('./component/NearbyRoutesPanel').then(getDefault).then(function (content) {
            return cb(null, { content: content });
          }).catch(errorLoading);
        }
      }),
      React.createElement(Route, {
        path: 'suosikit',
        getComponents: function getComponents(location, cb) {
          return System.import('./component/FavouritesPanel').then(getDefault).then(function (content) {
            return cb(null, { content: content });
          }).catch(errorLoading);
        }
      })
    ),
    React.createElement(
      Route,
      {
        path: '/?mock', topBarOptions: { disableBackButton: true }, components: {
          title: Title,
          content: function content(props) {
            return React.createElement(
              SplashOrChildren,
              null,
              React.createElement(IndexPage, props)
            );
          }
        }
      },
      React.createElement(Route, {
        path: 'lahellasi',
        getComponents: function getComponents(location, cb) {
          return System.import('./component/NearbyRoutesPanel').then(getDefault).then(function (content) {
            return cb(null, { content: content });
          }).catch(errorLoading);
        }
      }),
      React.createElement(Route, {
        path: 'suosikit',
        getComponents: function getComponents(location, cb) {
          return System.import('./component/FavouritesPanel').then(getDefault).then(function (content) {
            return cb(null, { content: content });
          }).catch(errorLoading);
        }
      })
    ),
    React.createElement(
      Route,
      { path: '/pysakit' },
      React.createElement(IndexRoute, { component: Error404 }),
      ' ',
      React.createElement(
        Route,
        {
          path: ':stopId',
          getComponents: function getComponents(location, cb) {
            Promise.all([System.import('./component/StopTitle').then(getDefault), System.import('./component/StopPageHeaderContainer').then(getDefault), System.import('./component/StopPage').then(getDefault), System.import('./component/StopPageMap').then(getDefault), System.import('./component/StopPageMeta').then(getDefault)]).then(function (_ref8) {
              var title = _ref8[0],
                  header = _ref8[1],
                  content = _ref8[2],
                  map = _ref8[3],
                  meta = _ref8[4];
              return cb(null, { title: title, header: header, content: content, map: map, meta: meta });
            });
          },
          queries: {
            header: StopQueries,
            map: StopQueries,
            meta: StopQueries
          },
          render: ComponentLoading404Renderer
        },
        React.createElement(Route, { path: 'kartta', fullscreenMap: true })
      )
    ),
    React.createElement(
      Route,
      { path: '/terminaalit' },
      React.createElement(IndexRoute, { component: Error404 }),
      ' ',
      React.createElement(
        Route,
        {
          path: ':terminalId',
          getComponents: function getComponents(location, cb) {
            Promise.all([System.import('./component/TerminalTitle').then(getDefault), System.import('./component/StopPageHeaderContainer').then(getDefault), System.import('./component/TerminalPage').then(getDefault), System.import('./component/StopPageMap').then(getDefault), System.import('./component/StopPageMeta').then(getDefault)]).then(function (_ref9) {
              var title = _ref9[0],
                  header = _ref9[1],
                  content = _ref9[2],
                  map = _ref9[3],
                  meta = _ref9[4];
              return cb(null, { title: title, header: header, content: content, map: map, meta: meta });
            });
          },
          queries: {
            header: terminalQueries,
            map: terminalQueries,
            meta: terminalQueries
          },
          render: ComponentLoading404Renderer
        },
        React.createElement(Route, { path: 'kartta', fullscreenMap: true })
      )
    ),
    React.createElement(
      Route,
      { path: '/linjat' },
      React.createElement(IndexRoute, { component: Error404 }),
      ' ',
      React.createElement(
        Route,
        { path: ':routeId' },
        React.createElement(IndexRedirect, { to: 'pysakit' }),
        React.createElement(
          Route,
          { path: 'pysakit' },
          React.createElement(IndexRedirect, { to: ':routeId%3A0%3A01' }),
          ' ',
          React.createElement(
            Route,
            { path: ':patternId' },
            React.createElement(IndexRoute, {
              getComponents: function getComponents(location, cb) {
                Promise.all([System.import('./component/RouteTitle').then(getDefault), System.import('./component/RoutePage').then(getDefault), System.import('./component/RouteMapContainer').then(getDefault), System.import('./component/PatternStopsContainer').then(getDefault), System.import('./component/RoutePageMeta').then(getDefault)]).then(function (_ref10) {
                  var title = _ref10[0],
                      header = _ref10[1],
                      map = _ref10[2],
                      content = _ref10[3],
                      meta = _ref10[4];
                  return cb(null, { title: title, header: header, map: map, content: content, meta: meta });
                });
              },
              queries: {
                title: RouteQueries,
                header: RouteQueries,
                map: PatternQueries,
                content: PatternQueries,
                meta: RouteQueries
              },
              render: ComponentLoading404Renderer
            }),
            React.createElement(Route, {
              path: 'kartta',
              getComponents: function getComponents(location, cb) {
                Promise.all([System.import('./component/RouteTitle').then(getDefault), System.import('./component/RoutePage').then(getDefault), System.import('./component/RouteMapContainer').then(getDefault), System.import('./component/PatternStopsContainer').then(getDefault), System.import('./component/RoutePageMeta').then(getDefault)]).then(function (_ref11) {
                  var title = _ref11[0],
                      header = _ref11[1],
                      map = _ref11[2],
                      content = _ref11[3],
                      meta = _ref11[4];
                  return cb(null, { title: title, header: header, map: map, content: content, meta: meta });
                });
              },
              queries: {
                title: RouteQueries,
                header: RouteQueries,
                map: PatternQueries,
                content: PatternQueries,
                meta: RouteQueries
              },
              render: ComponentLoading404Renderer,
              fullscreenMap: true
            }),
            React.createElement(
              Route,
              {
                path: ':tripId',
                getComponents: function getComponents(location, cb) {
                  Promise.all([System.import('./component/RouteTitle').then(getDefault), System.import('./component/RoutePage').then(getDefault), System.import('./component/RouteMapContainer').then(getDefault), System.import('./component/TripStopsContainer').then(getDefault), System.import('./component/RoutePageMeta').then(getDefault)]).then(function (_ref12) {
                    var title = _ref12[0],
                        header = _ref12[1],
                        map = _ref12[2],
                        content = _ref12[3],
                        meta = _ref12[4];
                    return cb(null, { title: title, header: header, map: map, content: content, meta: meta });
                  });
                },
                queries: {
                  title: RouteQueries,
                  header: RouteQueries,
                  map: TripQueries,
                  content: TripQueries,
                  meta: RouteQueries
                },
                render: ComponentLoading404Renderer
              },
              React.createElement(Route, { path: 'kartta', fullscreenMap: true })
            )
          )
        ),
        React.createElement(
          Route,
          { path: 'aikataulu' },
          React.createElement(IndexRedirect, { to: ':routeId%3A0%3A01' }),
          React.createElement(Route, {
            path: ':patternId',
            disableMapOnMobile: true,
            getComponents: function getComponents(location, cb) {
              Promise.all([System.import('./component/RouteTitle').then(getDefault), System.import('./component/RoutePage').then(getDefault), System.import('./component/RouteMapContainer').then(getDefault), System.import('./component/RouteScheduleContainer').then(getDefault), System.import('./component/RoutePageMeta').then(getDefault)]).then(function (_ref13) {
                var title = _ref13[0],
                    header = _ref13[1],
                    map = _ref13[2],
                    content = _ref13[3],
                    meta = _ref13[4];
                return cb(null, { title: title, header: header, map: map, content: content, meta: meta });
              });
            },
            queries: {
              title: RouteQueries,
              header: RouteQueries,
              map: PatternQueries,
              content: PatternQueries,
              meta: RouteQueries
            },
            render: ComponentLoading404Renderer
          })
        ),
        React.createElement(Route, {
          path: 'hairiot',
          getComponents: function getComponents(location, cb) {
            Promise.all([System.import('./component/RouteTitle').then(getDefault), System.import('./component/RoutePage').then(getDefault), System.import('./component/RouteAlertsContainer').then(getDefault), System.import('./component/RoutePageMeta').then(getDefault)]).then(function (_ref14) {
              var title = _ref14[0],
                  header = _ref14[1],
                  content = _ref14[2],
                  meta = _ref14[3];
              return cb(null, { title: title, header: header, content: content, meta: meta });
            });
          },
          queries: {
            title: RouteQueries,
            header: RouteQueries,
            content: RouteQueries,
            meta: RouteQueries
          },
          render: ComponentLoading404Renderer
        })
      )
    ),
    React.createElement(
      Route,
      {
        path: '/reitti/:from/:to',
        getComponents: function getComponents(location, cb) {
          Promise.all([System.import('./component/SummaryTitle').then(getDefault), System.import('./component/SummaryPage').then(getDefault), System.import('./component/SummaryPageMeta').then(getDefault)]).then(function (_ref15) {
            var title = _ref15[0],
                content = _ref15[1],
                meta = _ref15[2];
            return cb(null, { title: title, content: content, meta: meta });
          });
        },
        queries: { content: planQueries },
        prepareParams: preparePlanParams,
        render: { content: SummaryPageWrapper }
      },
      React.createElement(
        Route,
        {
          path: ':hash',
          getComponents: function getComponents(location, cb) {
            Promise.all([System.import('./component/ItineraryTab').then(getDefault), System.import('./component/ItineraryPageMap').then(getDefault)]).then(function (_ref16) {
              var content = _ref16[0],
                  map = _ref16[1];
              return cb(null, { content: content, map: map });
            });
          }
        },
        React.createElement(Route, { path: 'kartta', fullscreenMap: true })
      )
    ),
    React.createElement(Route, {
      path: '/styleguide',
      getComponent: function getComponent(location, cb) {
        System.import('./component/StyleGuidePage').then(loadRoute(cb)).catch(errorLoading);
      }
    }),
    React.createElement(Route, {
      path: '/styleguide/component/:componentName',
      topBarOptions: { hidden: true },
      getComponent: function getComponent(location, cb) {
        System.import('./component/StyleGuidePage').then(loadRoute(cb)).catch(errorLoading);
      }
    }),
    React.createElement(Route, {
      path: '/suosikki/uusi',
      getComponent: function getComponent(location, cb) {
        System.import('./component/AddFavouritePage').then(loadRoute(cb)).catch(errorLoading);
      }
    }),
    React.createElement(Route, {
      path: '/suosikki/muokkaa/:id',
      getComponent: function getComponent(location, cb) {
        System.import('./component/AddFavouritePage').then(loadRoute(cb)).catch(errorLoading);
      }
    }),
    React.createElement(Route, {
      path: '/tietoja-palvelusta',
      getComponents: function getComponents(location, cb) {
        Promise.all([Promise.resolve(Title), System.import('./component/AboutPage').then(getDefault)]).then(function (_ref17) {
          var title = _ref17[0],
              content = _ref17[1];
          return cb(null, { title: title, content: content });
        });
      }
    }),
    React.createElement(Route, { path: '*', component: Error404 })
  );
});