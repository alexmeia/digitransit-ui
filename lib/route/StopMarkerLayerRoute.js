import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Relay from 'react-relay';

var StopMarkerLayerRoute = function (_Relay$Route) {
  _inherits(StopMarkerLayerRoute, _Relay$Route);

  function StopMarkerLayerRoute() {
    _classCallCheck(this, StopMarkerLayerRoute);

    return _possibleConstructorReturn(this, _Relay$Route.apply(this, arguments));
  }

  return StopMarkerLayerRoute;
}(Relay.Route);

StopMarkerLayerRoute.queries = {
  stopsInRectangle: function stopsInRectangle(Component, variables) {
    return function (RQL_0) {
      return {
        children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]),
        fieldName: 'viewer',
        kind: 'Query',
        metadata: {},
        name: 'StopMarkerLayerRoute',
        type: 'QueryType'
      };
    }(Component.getFragment('stopsInRectangle', {
      minLat: variables.minLat,
      minLon: variables.minLon,
      maxLat: variables.maxLat,
      maxLon: variables.maxLon,
      agency: variables.agency
    }));
  }
};
StopMarkerLayerRoute.paramDefinitions = {
  minLat: { required: true },
  minLon: { required: true },
  maxLat: { required: true },
  maxLon: { required: true },
  agency: { required: false }
};
StopMarkerLayerRoute.routeName = 'StopMarkerLayerRoute';
export default StopMarkerLayerRoute;