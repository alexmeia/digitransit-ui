import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Relay from 'react-relay';

var FuzzyTripRoute = function (_Relay$Route) {
  _inherits(FuzzyTripRoute, _Relay$Route);

  function FuzzyTripRoute() {
    _classCallCheck(this, FuzzyTripRoute);

    return _possibleConstructorReturn(this, _Relay$Route.apply(this, arguments));
  }

  return FuzzyTripRoute;
}(Relay.Route);

FuzzyTripRoute.queries = {
  trip: function trip(Component, variables) {
    return function (RQL_0) {
      return {
        children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]),
        fieldName: 'viewer',
        kind: 'Query',
        metadata: {},
        name: 'FuzzyTripRoute',
        type: 'QueryType'
      };
    }(Component.getFragment('trip', {
      route: variables.route,
      direction: variables.direction,
      date: variables.date,
      time: variables.time
    }));
  }
};
FuzzyTripRoute.paramDefinitions = {
  route: { required: true },
  direction: { required: true },
  time: { required: true },
  date: { required: true }
};
FuzzyTripRoute.routeName = 'FuzzyTripRoute';
export default FuzzyTripRoute;