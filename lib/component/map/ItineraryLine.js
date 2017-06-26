import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
/* eslint-disable react/no-array-index-key */

import React from 'react';
import Relay from 'react-relay';
import polyUtil from 'polyline-encoded';
import get from 'lodash/get';

import StopMarker from './non-tile-layer/StopMarker';
import LegMarker from './non-tile-layer/LegMarker';
import Line from './Line';
import CityBikeMarker from './non-tile-layer/CityBikeMarker';
import { getMiddleOf } from '../../util/geo-utils';
import { isBrowser } from '../../util/browser';
import { isCallAgencyPickupType } from '../../util/legUtils';
import IconMarker from './IconMarker';

var getLegText = function getLegText(leg, config) {
  if (!leg.route) return '';
  var showAgency = get(config, 'agency.show', false);
  if (leg.transitLeg && leg.route.shortName) {
    return leg.route.shortName;
  } else if (showAgency && leg.route.agency) {
    return leg.route.agency.name;
  }
  return '';
};

var ItineraryLine = function (_React$Component) {
  _inherits(ItineraryLine, _React$Component);

  function ItineraryLine() {
    _classCallCheck(this, ItineraryLine);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ItineraryLine.prototype.render = function render() {
    var _this2 = this;

    if (!isBrowser) {
      return false;
    }

    var objs = [];

    var usingOwnBicycle = this.props.legs[0] != null && this.props.legs[0].mode === 'BICYCLE' && !this.props.legs[0].rentedBike;

    this.props.legs.forEach(function (leg, i) {
      if (leg.mode === 'WAIT') {
        return;
      }

      var mode = leg.mode;


      if (leg.rentedBike) {
        mode = 'CITYBIKE';
      }

      if (usingOwnBicycle && leg.mode === 'WALK') {
        mode = 'BICYCLE_WALK';
      }

      var modePlusClass = mode.toLowerCase() + (_this2.props.passive ? ' passive' : '');

      var geometry = polyUtil.decode(leg.legGeometry.points);
      var middle = getMiddleOf(geometry);

      objs.push(React.createElement(Line, {
        key: _this2.props.hash + '_' + i + '_' + mode,
        geometry: geometry,
        mode: isCallAgencyPickupType(leg) ? 'call' : mode.toLowerCase(),
        passive: _this2.props.passive
      }));

      if (!_this2.props.passive) {
        if (_this2.props.showIntermediateStops && leg.intermediateStops != null) {
          leg.intermediateStops.forEach(function (stop) {
            return objs.push(React.createElement(StopMarker, {
              disableModeIcons: true,
              stop: stop,
              key: 'intermediate-' + stop.gtfsId,
              mode: modePlusClass,
              thin: true
            }));
          });
        }

        if (leg.from.vertexType === 'BIKESHARE') {
          objs.push(React.createElement(CityBikeMarker, {
            key: leg.from.bikeRentalStation.stationId,
            transit: true,
            station: leg.from.bikeRentalStation
          }));
        } else if (leg.transitLeg) {
          var name = getLegText(leg, _this2.context.config);
          if (isCallAgencyPickupType(leg)) {
            objs.push(React.createElement(IconMarker, {
              key: 'call',
              position: {
                lat: middle.lat,
                lon: middle.lon
              },
              className: 'call',
              icon: 'icon-icon_call'
            }));
          } else {
            objs.push(React.createElement(LegMarker, {
              key: i + ',' + leg.mode + 'legmarker',
              disableModeIcons: true,
              renderName: true,
              leg: {
                from: leg.from,
                to: leg.to,
                lat: middle.lat,
                lon: middle.lon,
                name: name,
                gtfsId: leg.from.stop.gtfsId,
                code: leg.from.stop.code
              },
              mode: mode.toLowerCase()
            }));

            objs.push(React.createElement(StopMarker, {
              key: i + ',' + leg.mode + 'marker,from',
              disableModeIcons: true,
              stop: _extends({}, leg.from, {
                gtfsId: leg.from.stop.gtfsId,
                code: leg.from.stop.code,
                platformCode: leg.from.stop.platformCode,
                transfer: true
              }),
              mode: mode.toLowerCase(),
              renderText: leg.transitLeg && _this2.props.showTransferLabels
            }));
            objs.push(React.createElement(StopMarker, {
              key: i + ',' + leg.mode + 'marker,to',
              disableModeIcons: true,
              stop: _extends({}, leg.to, {
                gtfsId: leg.to.stop.gtfsId,
                code: leg.to.stop.code,
                platformCode: leg.to.stop.platformCode,
                transfer: true
              }),
              mode: mode.toLowerCase(),
              renderText: leg.transitLeg && _this2.props.showTransferLabels
            }));
          }
        }
      }
    });

    return React.createElement(
      'div',
      { style: { display: 'none' } },
      objs
    );
  };

  return ItineraryLine;
}(React.Component);

ItineraryLine.contextTypes = {
  getStore: PropTypes.func.isRequired
};


ItineraryLine.propTypes = {
  legs: PropTypes.array,
  passive: PropTypes.bool,
  hash: PropTypes.number,
  showTransferLabels: PropTypes.bool,
  showIntermediateStops: PropTypes.bool
};

ItineraryLine.contextTypes = {
  config: PropTypes.object.isRequired
};

export default Relay.createContainer(ItineraryLine, {
  fragments: {
    legs: function legs() {
      return function (RQL_0, RQL_1) {
        return {
          children: [{
            fieldName: 'mode',
            kind: 'Field',
            metadata: {},
            type: 'Mode'
          }, {
            fieldName: 'rentedBike',
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
          }, {
            fieldName: 'transitLeg',
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
              }, Relay.QL.__frag(RQL_0)]),
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
            fieldName: 'to',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true
            },
            type: 'Place'
          }, {
            children: [{
              children: [{
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
              }, {
                fieldName: 'pickupType',
                kind: 'Field',
                metadata: {},
                type: 'PickupDropoffType'
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
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {
            plural: true
          },
          name: 'ItineraryLine_LegsRelayQL',
          type: 'Leg'
        };
      }(CityBikeMarker.getFragment('station'), CityBikeMarker.getFragment('station'));
    }
  }
});