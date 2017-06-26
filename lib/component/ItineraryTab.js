import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import cx from 'classnames';

import TicketInformation from './TicketInformation';
import RouteInformation from './RouteInformation';
import ItinerarySummary from './ItinerarySummary';
import TimeFrame from './TimeFrame';
import DateWarning from './DateWarning';
import ItineraryLegs from './ItineraryLegs';
import LegAgencyInfo from './LegAgencyInfo';
import CityBikeMarker from './map/non-tile-layer/CityBikeMarker';

var ItineraryTab = function (_React$Component) {
  _inherits(ItineraryTab, _React$Component);

  function ItineraryTab() {
    var _temp, _this, _ret;

    _classCallCheck(this, ItineraryTab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      fullscreen: false,
      lat: undefined,
      lon: undefined
    }, _this.getState = function () {
      return {
        lat: _this.state.lat || _this.props.itinerary.legs[0].from.lat,
        lon: _this.state.lon || _this.props.itinerary.legs[0].from.lon
      };
    }, _this.handleFocus = function (lat, lon) {
      _this.props.focus(lat, lon);

      return _this.setState({
        lat: lat,
        lon: lon
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ItineraryTab.prototype.render = function render() {
    var config = this.context.config;
    var routeInformation = config.showRouteInformation && React.createElement(RouteInformation, null);

    return React.createElement(
      'div',
      { className: 'itinerary-tab' },
      this.context.breakpoint !== 'large' && React.createElement(
        ItinerarySummary,
        { itinerary: this.props.itinerary },
        React.createElement(TimeFrame, {
          startTime: this.props.itinerary.startTime,
          endTime: this.props.itinerary.endTime,
          refTime: this.props.searchTime,
          className: 'timeframe--itinerary-summary'
        })
      ),
      this.context.breakpoint === 'large' && React.createElement(
        'div',
        { className: 'itinerary-timeframe' },
        React.createElement(DateWarning, { date: this.props.itinerary.startTime, refTime: this.props.searchTime })
      ),
      React.createElement(
        'div',
        { className: 'momentum-scroll itinerary-tabs__scroll' },
        React.createElement(
          'div',
          {
            className: cx('itinerary-main', { 'bp-large': this.context.breakpoint === 'large' })
          },
          React.createElement(ItineraryLegs, {
            itinerary: this.props.itinerary,
            focusMap: this.handleFocus
          }),
          config.showTicketInformation && React.createElement(TicketInformation, { fares: this.props.itinerary.fares }),
          routeInformation
        )
      )
    );
  };

  return ItineraryTab;
}(React.Component);

ItineraryTab.propTypes = {
  searchTime: PropTypes.number.isRequired,
  itinerary: PropTypes.object.isRequired,
  focus: PropTypes.func.isRequired
};
ItineraryTab.contextTypes = {
  breakpoint: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired
};


export default Relay.createContainer(ItineraryTab, {
  fragments: {
    searchTime: function searchTime() {
      return function () {
        return {
          children: [{
            fieldName: 'date',
            kind: 'Field',
            metadata: {},
            type: 'Long'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'ItineraryTab_SearchTimeRelayQL',
          type: 'Plan'
        };
      }();
    },
    itinerary: function itinerary() {
      return function (RQL_0, RQL_1, RQL_2) {
        return {
          children: [{
            fieldName: 'walkDistance',
            kind: 'Field',
            metadata: {},
            type: 'Float'
          }, {
            fieldName: 'duration',
            kind: 'Field',
            metadata: {},
            type: 'Long'
          }, {
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
            children: [{
              fieldName: 'type',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'currency',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'cents',
              kind: 'Field',
              metadata: {},
              type: 'Int'
            }, {
              children: [{
                fieldName: 'fareId',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }],
              fieldName: 'components',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                isPlural: true
              },
              type: 'fareComponent'
            }],
            fieldName: 'fares',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              isPlural: true
            },
            type: 'fare'
          }, {
            children: [].concat.apply([], [{
              fieldName: 'mode',
              kind: 'Field',
              metadata: {},
              type: 'Mode'
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
              }, {
                fieldName: 'name',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'vertexType',
                kind: 'Field',
                metadata: {},
                type: 'VertexType'
              }, {
                children: [].concat.apply([], [{
                  fieldName: 'id',
                  kind: 'Field',
                  metadata: {
                    isGenerated: true,
                    isRequisite: true
                  },
                  type: 'ID'
                }, Relay.QL.__frag(RQL_1)]),
                fieldName: 'bikeRentalStation',
                kind: 'Field',
                metadata: {
                  canHaveSubselections: true,
                  inferredRootCallName: 'node',
                  inferredPrimaryKey: 'id'
                },
                type: 'BikeRentalStation'
              }, {
                children: [{
                  fieldName: 'gtfsId',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  fieldName: 'code',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  fieldName: 'platformCode',
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
                fieldName: 'stop',
                kind: 'Field',
                metadata: {
                  canHaveSubselections: true,
                  inferredRootCallName: 'node',
                  inferredPrimaryKey: 'id'
                },
                type: 'Stop'
              }],
              fieldName: 'from',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true
              },
              type: 'Place'
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
              }, {
                fieldName: 'name',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'vertexType',
                kind: 'Field',
                metadata: {},
                type: 'VertexType'
              }, {
                children: [].concat.apply([], [{
                  fieldName: 'id',
                  kind: 'Field',
                  metadata: {
                    isGenerated: true,
                    isRequisite: true
                  },
                  type: 'ID'
                }, Relay.QL.__frag(RQL_2)]),
                fieldName: 'bikeRentalStation',
                kind: 'Field',
                metadata: {
                  canHaveSubselections: true,
                  inferredRootCallName: 'node',
                  inferredPrimaryKey: 'id'
                },
                type: 'BikeRentalStation'
              }, {
                children: [{
                  fieldName: 'gtfsId',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  fieldName: 'code',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  fieldName: 'platformCode',
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
                fieldName: 'stop',
                kind: 'Field',
                metadata: {
                  canHaveSubselections: true,
                  inferredRootCallName: 'node',
                  inferredPrimaryKey: 'id'
                },
                type: 'Stop'
              }],
              fieldName: 'to',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true
              },
              type: 'Place'
            }, {
              children: [{
                fieldName: 'length',
                kind: 'Field',
                metadata: {},
                type: 'Int'
              }, {
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
            }, {
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
                fieldName: 'code',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'platformCode',
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
              fieldName: 'intermediateStops',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                inferredRootCallName: 'node',
                inferredPrimaryKey: 'id',
                isPlural: true
              },
              type: 'Stop'
            }, {
              fieldName: 'realTime',
              kind: 'Field',
              metadata: {},
              type: 'Boolean'
            }, {
              fieldName: 'transitLeg',
              kind: 'Field',
              metadata: {},
              type: 'Boolean'
            }, {
              fieldName: 'rentedBike',
              kind: 'Field',
              metadata: {},
              type: 'Boolean'
            }, {
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
              fieldName: 'mode',
              kind: 'Field',
              metadata: {},
              type: 'Mode'
            }, {
              fieldName: 'distance',
              kind: 'Field',
              metadata: {},
              type: 'Float'
            }, {
              fieldName: 'duration',
              kind: 'Field',
              metadata: {},
              type: 'Float'
            }, {
              fieldName: 'intermediatePlace',
              kind: 'Field',
              metadata: {},
              type: 'Boolean'
            }, {
              children: [{
                fieldName: 'shortName',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'gtfsId',
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
                  fieldName: 'phone',
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
                fieldName: 'id',
                kind: 'Field',
                metadata: {
                  isGenerated: true,
                  isRequisite: true
                },
                type: 'ID'
              }],
              fieldName: 'route',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                inferredRootCallName: 'node',
                inferredPrimaryKey: 'id'
              },
              type: 'Route'
            }, {
              children: [{
                fieldName: 'gtfsId',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'tripHeadsign',
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
                fieldName: 'pattern',
                kind: 'Field',
                metadata: {
                  canHaveSubselections: true,
                  inferredRootCallName: 'node',
                  inferredPrimaryKey: 'id'
                },
                type: 'Pattern'
              }, {
                children: [{
                  fieldName: 'pickupType',
                  kind: 'Field',
                  metadata: {},
                  type: 'PickupDropoffType'
                }, {
                  children: [{
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
                  }],
                  fieldName: 'stop',
                  kind: 'Field',
                  metadata: {
                    canHaveSubselections: true,
                    inferredRootCallName: 'node',
                    inferredPrimaryKey: 'id'
                  },
                  type: 'Stop'
                }],
                fieldName: 'stoptimes',
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
              fieldName: 'trip',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                inferredRootCallName: 'node',
                inferredPrimaryKey: 'id'
              },
              type: 'Trip'
            }, Relay.QL.__frag(RQL_0)]),
            fieldName: 'legs',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              isPlural: true
            },
            type: 'Leg'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'ItineraryTab_ItineraryRelayQL',
          type: 'Itinerary'
        };
      }(LegAgencyInfo.getFragment('leg'), CityBikeMarker.getFragment('station'), CityBikeMarker.getFragment('station'));
    }
  }
});