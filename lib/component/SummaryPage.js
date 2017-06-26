import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
/* eslint-disable react/no-array-index-key */

import React from 'react';
import Relay from 'react-relay';

import moment from 'moment';
import isMatch from 'lodash/isMatch';
import keys from 'lodash/keys';
import pick from 'lodash/pick';
import sortBy from 'lodash/sortBy';
import some from 'lodash/some';
import polyline from 'polyline-encoded';
import { FormattedMessage } from 'react-intl';

import DesktopView from '../component/DesktopView';
import MobileView from '../component/MobileView';
import Map from '../component/map/Map';
import ItineraryTab from './ItineraryTab';

import SummaryPlanContainer from './SummaryPlanContainer';
import SummaryNavigation from './SummaryNavigation';
import ItineraryLine from '../component/map/ItineraryLine';
import LocationMarker from '../component/map/LocationMarker';
import MobileItineraryWrapper from './MobileItineraryWrapper';
import { otpToLocation } from '../util/otpStrings';
import Loading from './Loading';

function getActiveIndex(state) {
  return state && state.summaryPageSelected || 0;
}

var SummaryPage = function (_React$Component) {
  _inherits(SummaryPage, _React$Component);

  function SummaryPage() {
    var _temp, _this, _ret;

    _classCallCheck(this, SummaryPage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = { center: null }, _this.componentWillMount = function () {
      return _this.initCustomizableParameters(_this.context.config);
    }, _this.initCustomizableParameters = function (config) {
      _this.customizableParameters = _extends({}, SummaryPage.hcParameters, {
        modes: Object.keys(config.transportModes).filter(function (mode) {
          return config.transportModes[mode].defaultValue === true;
        }).map(function (mode) {
          return config.modeToOTP[mode];
        }).concat(Object.keys(config.streetModes).filter(function (mode) {
          return config.streetModes[mode].defaultValue === true;
        }).map(function (mode) {
          return config.modeToOTP[mode];
        })).sort().join(','),
        maxWalkDistance: config.maxWalkDistance,
        preferred: { agencies: config.preferredAgency || '' }
      });
    }, _this.updateCenter = function (lat, lon) {
      _this.setState({ center: { lat: lat, lon: lon } });
    }, _this.hasDefaultPreferences = function () {
      var a = pick(_this.customizableParameters, keys(_this.props));
      var b = pick(_this.props, keys(_this.customizableParameters));
      return isMatch(a, b);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SummaryPage.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps, newContext) {
    if (newContext.breakpoint === 'large' && this.state.center) {
      this.setState({ center: null });
    }
  };

  SummaryPage.prototype.renderMap = function renderMap() {
    var _ref;

    var _props = this.props,
        plan = _props.plan.plan,
        _props$location = _props.location,
        state = _props$location.state,
        query = _props$location.query,
        from = _props.from,
        to = _props.to;

    var activeIndex = getActiveIndex(state);
    var itineraries = plan.itineraries || [];

    var leafletObjs = sortBy(itineraries.map(function (itinerary, i) {
      return React.createElement(ItineraryLine, {
        key: i,
        hash: i,
        legs: itinerary.legs,
        passive: i !== activeIndex
      });
    }),
    // Make sure active line isn't rendered over
    function (i) {
      return i.props.passive === false;
    });

    if (from.lat && from.lon) {
      leafletObjs.push(React.createElement(LocationMarker, {
        key: 'fromMarker',
        position: from,
        className: 'from'
      }));
    }

    if (to.lat && to.lon) {
      leafletObjs.push(React.createElement(LocationMarker, {
        key: 'toMarker',
        position: to,
        className: 'to'
      }));
    }

    if (query && query.intermediatePlaces) {
      if (Array.isArray(query.intermediatePlaces)) {
        query.intermediatePlaces.map(otpToLocation).forEach(function (location, i) {
          leafletObjs.push(React.createElement(LocationMarker, {
            key: 'via_' + i,
            position: location,
            className: 'via',
            noText: true
          }));
        });
      } else {
        leafletObjs.push(React.createElement(LocationMarker, {
          key: 'via',
          position: otpToLocation(query.intermediatePlaces),
          className: 'via',
          noText: true
        }));
      }
    }

    // Decode all legs of all itineraries into latlong arrays,
    // and concatenate into one big latlong array
    var bounds = (_ref = []).concat.apply(_ref, [[[from.lat, from.lon], [to.lat, to.lon]]].concat(itineraries.map(function (itinerary) {
      var _ref2;

      return (_ref2 = []).concat.apply(_ref2, itinerary.legs.map(function (leg) {
        return polyline.decode(leg.legGeometry.points);
      }));
    })));

    return React.createElement(Map, {
      className: 'summary-map',
      leafletObjs: leafletObjs,
      fitBounds: true,
      bounds: bounds,
      showScaleBar: true
    });
  };

  SummaryPage.prototype.render = function render() {
    var _this2 = this;

    var _context = this.context,
        breakpoint = _context.breakpoint,
        _context$queryAggrega = _context.queryAggregator.readyState,
        done = _context$queryAggrega.done,
        error = _context$queryAggrega.error;
    // Call props.map directly in order to render to same map instance

    var map = this.props.map ? this.props.map.type(_extends({
      itinerary: this.props.plan.plan.itineraries && this.props.plan.plan.itineraries[this.props.params.hash],
      center: this.state.center
    }, this.props), this.context) : this.renderMap();

    var earliestStartTime = void 0;
    var latestArrivalTime = void 0;

    if (this.props.plan && this.props.plan.plan && this.props.plan.plan.itineraries) {
      earliestStartTime = Math.min.apply(Math, this.props.plan.plan.itineraries.map(function (i) {
        return i.startTime;
      }));
      latestArrivalTime = Math.max.apply(Math, this.props.plan.plan.itineraries.map(function (i) {
        return i.endTime;
      }));
    }

    var hasDefaultPreferences = this.hasDefaultPreferences();

    if (breakpoint === 'large') {
      var _content = void 0;

      if (done || error !== null) {
        _content = React.createElement(
          SummaryPlanContainer,
          {
            plan: this.props.plan.plan,
            itineraries: this.props.plan.plan.itineraries,
            params: this.props.params,
            error: error
          },
          this.props.content && React.cloneElement(this.props.content, {
            itinerary: this.props.plan.plan.itineraries[this.props.params.hash],
            focus: this.updateCenter
          })
        );
      } else {
        _content = React.createElement(
          'div',
          { style: { position: 'relative', height: 200 } },
          React.createElement(Loading, null)
        );
      }

      return React.createElement(DesktopView, {
        title: React.createElement(FormattedMessage, {
          id: 'summary-page.title',
          defaultMessage: 'Itinerary suggestions'
        }),
        header: React.createElement(SummaryNavigation, {
          params: this.props.params,
          hasDefaultPreferences: hasDefaultPreferences,
          startTime: earliestStartTime,
          endTime: latestArrivalTime
        })
        // TODO: Chceck preferences
        , content: _content,
        map: map
      });
    }

    var content = void 0;

    if (!done && !error) {
      content = React.createElement(
        'div',
        { style: { position: 'relative', height: 200 } },
        React.createElement(Loading, null)
      );
    } else if (this.props.params.hash) {
      content = React.createElement(
        MobileItineraryWrapper,
        {
          itineraries: this.props.plan.plan.itineraries,
          params: this.props.params,
          fullscreenMap: some(this.props.routes.map(function (route) {
            return route.fullscreenMap;
          })),
          focus: this.updateCenter
        },
        this.props.content && this.props.plan.plan.itineraries.map(function (itinerary, i) {
          return React.cloneElement(_this2.props.content, { key: i, itinerary: itinerary });
        })
      );
    } else {
      content = React.createElement(SummaryPlanContainer, {
        plan: this.props.plan.plan,
        itineraries: this.props.plan.plan.itineraries,
        params: this.props.params
      });
    }

    return React.createElement(MobileView, {
      header: !this.props.params.hash ? React.createElement(SummaryNavigation, {
        hasDefaultPreferences: hasDefaultPreferences,
        params: this.props.params,
        startTime: earliestStartTime,
        endTime: latestArrivalTime
      }) : false,
      content: content,
      map: map
    });
  };

  return SummaryPage;
}(React.Component);

SummaryPage.contextTypes = {
  breakpoint: PropTypes.string.isRequired,
  queryAggregator: PropTypes.shape({
    readyState: PropTypes.shape({
      done: PropTypes.bool.isRequired,
      error: PropTypes.string
    }).isRequired
  }).isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  config: PropTypes.object
};
SummaryPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object
  }).isRequired,
  params: PropTypes.shape({
    hash: PropTypes.string
  }).isRequired,
  plan: PropTypes.shape({
    plan: PropTypes.shape({
      itineraries: PropTypes.array
    }).isRequired
  }).isRequired,
  content: PropTypes.node,
  map: PropTypes.shape({
    type: PropTypes.func.isRequired
  }),
  from: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
  }).isRequired,
  to: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
  }).isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({
    fullscreenMap: PropTypes.bool
  }).isRequired).isRequired
};
SummaryPage.hcParameters = {
  walkReluctance: 2,
  walkBoardCost: 600,
  minTransferTime: 180,
  walkSpeed: 1.2,
  wheelchair: false
};


export default Relay.createContainer(SummaryPage, {
  fragments: {
    plan: function plan() {
      return function (RQL_0, RQL_1, RQL_2, RQL_3, RQL_4) {
        return {
          children: [{
            calls: [{
              kind: 'Call',
              metadata: {},
              name: 'fromPlace',
              value: {
                kind: 'CallVariable',
                callVariableName: 'fromPlace'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'toPlace',
              value: {
                kind: 'CallVariable',
                callVariableName: 'toPlace'
              }
            }, {
              kind: 'Call',
              metadata: {
                type: '[InputCoordinates]'
              },
              name: 'intermediatePlaces',
              value: {
                kind: 'CallVariable',
                callVariableName: 'intermediatePlaces'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'numItineraries',
              value: {
                kind: 'CallVariable',
                callVariableName: 'numItineraries'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'modes',
              value: {
                kind: 'CallVariable',
                callVariableName: 'modes'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'date',
              value: {
                kind: 'CallVariable',
                callVariableName: 'date'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'time',
              value: {
                kind: 'CallVariable',
                callVariableName: 'time'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'walkReluctance',
              value: {
                kind: 'CallVariable',
                callVariableName: 'walkReluctance'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'walkBoardCost',
              value: {
                kind: 'CallVariable',
                callVariableName: 'walkBoardCost'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'minTransferTime',
              value: {
                kind: 'CallVariable',
                callVariableName: 'minTransferTime'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'walkSpeed',
              value: {
                kind: 'CallVariable',
                callVariableName: 'walkSpeed'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'maxWalkDistance',
              value: {
                kind: 'CallVariable',
                callVariableName: 'maxWalkDistance'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'wheelchair',
              value: {
                kind: 'CallVariable',
                callVariableName: 'wheelchair'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'disableRemainingWeightHeuristic',
              value: {
                kind: 'CallVariable',
                callVariableName: 'disableRemainingWeightHeuristic'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'arriveBy',
              value: {
                kind: 'CallVariable',
                callVariableName: 'arriveBy'
              }
            }, {
              kind: 'Call',
              metadata: {
                type: 'InputPreferred'
              },
              name: 'preferred',
              value: {
                kind: 'CallVariable',
                callVariableName: 'preferred'
              }
            }],
            children: [].concat.apply([], [{
              children: [].concat.apply([], [{
                fieldName: 'startTime',
                kind: 'Field',
                metadata: {},
                type: 'Long'
              }, {
                fieldName: 'endTime',
                kind: 'Field',
                metadata: {},
                type: 'Long'
              }, {
                children: [].concat.apply([], [{
                  fieldName: 'transitLeg',
                  kind: 'Field',
                  metadata: {},
                  type: 'Boolean'
                }, {
                  children: [{
                    fieldName: 'points',
                    kind: 'Field',
                    metadata: {},
                    type: 'String'
                  }],
                  fieldName: 'legGeometry',
                  kind: 'Field',
                  metadata: {
                    canHaveSubselections: true
                  },
                  type: 'LegGeometry'
                }, Relay.QL.__frag(RQL_4)]),
                fieldName: 'legs',
                kind: 'Field',
                metadata: {
                  canHaveSubselections: true,
                  isPlural: true
                },
                type: 'Leg'
              }, Relay.QL.__frag(RQL_2), Relay.QL.__frag(RQL_3)]),
              fieldName: 'itineraries',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                isPlural: true
              },
              type: 'Itinerary'
            }, Relay.QL.__frag(RQL_0), Relay.QL.__frag(RQL_1)]),
            fieldName: 'plan',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true
            },
            type: 'Plan'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'SummaryPage_PlanRelayQL',
          type: 'QueryType'
        };
      }(SummaryPlanContainer.getFragment('plan'), ItineraryTab.getFragment('searchTime'), ItineraryTab.getFragment('itinerary'), SummaryPlanContainer.getFragment('itineraries'), ItineraryLine.getFragment('legs'));
    }
  },
  initialVariables: _extends({
    from: null,
    to: null,
    fromPlace: null,
    toPlace: null,
    intermediatePlaces: null,
    numItineraries: typeof matchMedia !== 'undefined' && matchMedia('(min-width: 900px)').matches ? 5 : 3,
    date: moment().format('YYYY-MM-DD'),
    time: moment().format('HH:mm:ss'),
    arriveBy: false,
    disableRemainingWeightHeuristic: false,
    modes: null,
    maxWalkDistance: 0,
    preferred: null
  }, SummaryPage.hcParameters)
});