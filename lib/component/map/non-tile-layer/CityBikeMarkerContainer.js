import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';

import CityBikeMarker from './CityBikeMarker';
import ComponentUsageExample from '../../ComponentUsageExample';

var CityBikeMarkerWrapper = Relay.createContainer(function (_ref) {
  var root = _ref.root;
  return React.createElement(
    'div',
    null,
    root && Array.isArray(root.stations) && root.stations.map(function (station) {
      return React.createElement(CityBikeMarker, { station: station, key: station.stationId });
    })
  );
}, {
  fragments: {
    root: function root() {
      return function (RQL_0) {
        return {
          children: [{
            alias: 'stations',
            children: [].concat.apply([], [{
              fieldName: 'stationId',
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
            fieldName: 'bikeRentalStations',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id',
              isPlural: true
            },
            type: 'BikeRentalStation'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'CityBikeMarkerContainer_RootRelayQL',
          type: 'QueryType'
        };
      }(CityBikeMarker.getFragment('station'));
    }
  }
});

var CityBikeMarkerContainer = function (_React$Component) {
  _inherits(CityBikeMarkerContainer, _React$Component);

  function CityBikeMarkerContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, CityBikeMarkerContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onMapZoom = function () {
      return _this.forceUpdate();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CityBikeMarkerContainer.prototype.componentDidMount = function componentDidMount() {
    this.context.map.on('zoomend', this.onMapZoom);
  };

  CityBikeMarkerContainer.prototype.componentWillUnmount = function componentWillUnmount() {
    this.context.map.off('zoomend', this.onMapZoom);
  };

  CityBikeMarkerContainer.prototype.render = function render() {
    if (this.context.map.getZoom() < this.context.config.cityBike.cityBikeMinZoom) {
      return false;
    }
    return React.createElement(Relay.Renderer, {
      Container: CityBikeMarkerWrapper,
      queryConfig: {
        name: 'ViewerRoute',
        queries: {
          root: function root() {
            return function () {
              return {
                fieldName: 'viewer',
                kind: 'Query',
                metadata: {},
                name: 'CityBikeMarkerContainer',
                type: 'QueryType'
              };
            }();
          }
        },
        params: {}
      },
      environment: Relay.Store
    });
  };

  return CityBikeMarkerContainer;
}(React.Component);

CityBikeMarkerContainer.description = React.createElement(
  'div',
  null,
  React.createElement(
    'p',
    null,
    'Renders all citybike stations if zoom is over 14. Requires map to be found in props.'
  ),
  React.createElement(
    ComponentUsageExample,
    { description: '' },
    React.createElement(CityBikeMarkerContainer, null)
  )
);
CityBikeMarkerContainer.contextTypes = {
  map: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};


export default CityBikeMarkerContainer;