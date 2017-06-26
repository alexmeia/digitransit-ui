import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Relay from 'react-relay';

var StopListRoute = function (_Relay$Route) {
  _inherits(StopListRoute, _Relay$Route);

  function StopListRoute() {
    _classCallCheck(this, StopListRoute);

    return _possibleConstructorReturn(this, _Relay$Route.apply(this, arguments));
  }

  return StopListRoute;
}(Relay.Route);

StopListRoute.queries = {
  stops: function stops(Component, variables) {
    return function (RQL_0) {
      return {
        children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]),
        fieldName: 'viewer',
        kind: 'Query',
        metadata: {},
        name: 'StopListRoute',
        type: 'QueryType'
      };
    }(Component.getFragment('stops', {
      lat: variables.lat,
      lon: variables.lon,
      date: variables.date
    }));
  }
};
StopListRoute.paramDefinitions = {
  lat: { required: true },
  lon: { required: true },
  date: { required: true }
};
StopListRoute.routeName = 'StopListRoute';
export default StopListRoute;