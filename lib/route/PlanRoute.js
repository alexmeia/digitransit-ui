import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Relay from 'react-relay';

var PlanRoute = function (_Relay$Route) {
  _inherits(PlanRoute, _Relay$Route);

  function PlanRoute() {
    _classCallCheck(this, PlanRoute);

    return _possibleConstructorReturn(this, _Relay$Route.apply(this, arguments));
  }

  return PlanRoute;
}(Relay.Route);

PlanRoute.queries = {
  plan: function plan(Component, variables) {
    return function (RQL_0) {
      return {
        children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]),
        fieldName: 'viewer',
        kind: 'Query',
        metadata: {},
        name: 'PlanRoute',
        type: 'QueryType'
      };
    }(Component.getFragment('plan', variables));
  }
};
PlanRoute.paramDefinitions = {};
PlanRoute.routeName = 'PlanRoute';
export default PlanRoute;