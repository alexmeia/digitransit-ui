import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Relay from 'react-relay';

var RoutesRoute = function (_Relay$Route) {
  _inherits(RoutesRoute, _Relay$Route);

  function RoutesRoute() {
    _classCallCheck(this, RoutesRoute);

    return _possibleConstructorReturn(this, _Relay$Route.apply(this, arguments));
  }

  return RoutesRoute;
}(Relay.Route);

RoutesRoute.queries = {
  routes: function routes(Component, variables) {
    return function (RQL_0) {
      return {
        calls: [{
          kind: 'Call',
          metadata: {
            type: '[String]'
          },
          name: 'ids',
          value: {
            kind: 'CallVariable',
            callVariableName: 'ids'
          }
        }],
        children: [].concat.apply([], [{
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }, Relay.QL.__frag(RQL_0)]),
        fieldName: 'routes',
        kind: 'Query',
        metadata: {
          isPlural: true,
          identifyingArgName: 'ids',
          identifyingArgType: '[String]'
        },
        name: 'RoutesRoute',
        type: 'Route'
      };
    }(Component.getFragment('routes', {
      ids: variables.ids
    }));
  }
};
RoutesRoute.paramDefinitions = {
  ids: { required: true }
};
RoutesRoute.routeName = 'RoutesRoute';
export default RoutesRoute;