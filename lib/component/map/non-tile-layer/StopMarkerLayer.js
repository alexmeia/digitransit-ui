import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import uniq from 'lodash/uniq';
import { routerShape } from 'react-router';

import StopMarker from './StopMarker';
import TerminalMarker from './TerminalMarker';

var StopMarkerLayer = function (_React$Component) {
  _inherits(StopMarkerLayer, _React$Component);

  function StopMarkerLayer() {
    var _temp, _this, _ret;

    _classCallCheck(this, StopMarkerLayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onMapMove = function () {
      var bounds = void 0;

      if (_this.context.map.getZoom() >= _this.context.config.stopsMinZoom) {
        bounds = _this.context.map.getBounds();

        _this.props.relay.setVariables({
          minLat: bounds.getSouth(),
          minLon: bounds.getWest(),
          maxLat: bounds.getNorth(),
          maxLon: bounds.getEast()
        });
      }
      _this.forceUpdate();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  StopMarkerLayer.prototype.componentDidMount = function componentDidMount() {
    this.context.map.on('moveend', this.onMapMove);
    this.onMapMove();
  };

  StopMarkerLayer.prototype.componentWillUnmount = function componentWillUnmount() {
    this.context.map.off('moveend', this.onMapMove);
  };

  StopMarkerLayer.prototype.getStops = function getStops() {
    var _this2 = this;

    var stops = [];
    var renderedNames = [];

    this.props.stopsInRectangle.stopsByBbox.forEach(function (stop) {
      if (stop.routes.length === 0) {
        return;
      }

      var modeClass = stop.routes[0].mode.toLowerCase();
      var selected = _this2.props.hilightedStops && _this2.props.hilightedStops.includes(stop.gtfsId);

      if (stop.parentStation && _this2.context.map.getZoom() <= _this2.context.config.terminalStopsMaxZoom) {
        stops.push(React.createElement(TerminalMarker, {
          key: stop.parentStation.gtfsId,
          terminal: stop.parentStation,
          selected: selected,
          mode: modeClass,
          renderName: false
        }));
        return;
      }
      stops.push(React.createElement(StopMarker, {
        key: stop.gtfsId,
        stop: stop,
        selected: selected,
        mode: modeClass,
        renderName: !renderedNames.includes(stop.name)
      }));

      renderedNames.push(stop.name);
    });

    return uniq(stops, 'key');
  };

  StopMarkerLayer.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      this.context.map.getZoom() >= this.context.config.stopsMinZoom ? this.getStops() : false
    );
  };

  return StopMarkerLayer;
}(React.Component);

StopMarkerLayer.contextTypes = {
  // Needed for passing context to dynamic popup, maybe should be done in there?
  getStore: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired,
  router: routerShape.isRequired,
  route: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};
StopMarkerLayer.propTypes = {
  relay: PropTypes.shape({
    setVariables: PropTypes.func.isRequired
  }).isRequired,
  stopsInRectangle: PropTypes.shape({
    stopsByBbox: PropTypes.array.isRequired
  }).isRequired,
  hilightedStops: PropTypes.array
};


export default Relay.createContainer(StopMarkerLayer, {
  fragments: {
    stopsInRectangle: function stopsInRectangle() {
      return function () {
        return {
          children: [{
            calls: [{
              kind: 'Call',
              metadata: {},
              name: 'minLat',
              value: {
                kind: 'CallVariable',
                callVariableName: 'minLat'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'minLon',
              value: {
                kind: 'CallVariable',
                callVariableName: 'minLon'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'maxLat',
              value: {
                kind: 'CallVariable',
                callVariableName: 'maxLat'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'maxLon',
              value: {
                kind: 'CallVariable',
                callVariableName: 'maxLon'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'agency',
              value: {
                kind: 'CallVariable',
                callVariableName: 'agency'
              }
            }],
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
              fieldName: 'gtfsId',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'name',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'locationType',
              kind: 'Field',
              metadata: {},
              type: 'LocationType'
            }, {
              fieldName: 'platformCode',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              children: [{
                fieldName: 'gtfsId',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'name',
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
                  fieldName: 'id',
                  kind: 'Field',
                  metadata: {
                    isGenerated: true,
                    isRequisite: true
                  },
                  type: 'ID'
                }],
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
              }],
              fieldName: 'parentStation',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                inferredRootCallName: 'node',
                inferredPrimaryKey: 'id'
              },
              type: 'Stop'
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
            fieldName: 'stopsByBbox',
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
          metadata: {},
          name: 'StopMarkerLayer_StopsInRectangleRelayQL',
          type: 'QueryType'
        };
      }();
    }
  },

  initialVariables: {
    minLat: null,
    minLon: null,
    maxLat: null,
    maxLon: null,
    agency: null
  }
});