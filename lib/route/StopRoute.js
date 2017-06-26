import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Relay from 'react-relay';

var StopRoute = function (_Relay$Route) {
  _inherits(StopRoute, _Relay$Route);

  function StopRoute() {
    _classCallCheck(this, StopRoute);

    return _possibleConstructorReturn(this, _Relay$Route.apply(this, arguments));
  }

  return StopRoute;
}(Relay.Route);

StopRoute.queries = {
  stop: function stop() {
    return function () {
      return {
        calls: [{
          kind: 'Call',
          metadata: {
            type: 'String!'
          },
          name: 'id',
          value: {
            kind: 'CallVariable',
            callVariableName: 'stopId'
          }
        }],
        children: [{
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }],
        fieldName: 'stop',
        kind: 'Query',
        metadata: {
          identifyingArgName: 'id',
          identifyingArgType: 'String!'
        },
        name: 'StopRoute',
        type: 'Stop'
      };
    }();
  }
};
StopRoute.paramDefinitions = {
  stopId: { required: true }
};
StopRoute.routeName = 'StopRoute';
export default StopRoute;