import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Relay from 'react-relay';

var TerminalRoute = function (_Relay$Route) {
  _inherits(TerminalRoute, _Relay$Route);

  function TerminalRoute() {
    _classCallCheck(this, TerminalRoute);

    return _possibleConstructorReturn(this, _Relay$Route.apply(this, arguments));
  }

  return TerminalRoute;
}(Relay.Route);

TerminalRoute.queries = {
  terminal: function terminal() {
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
            callVariableName: 'terminalId'
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
        fieldName: 'station',
        kind: 'Query',
        metadata: {
          identifyingArgName: 'id',
          identifyingArgType: 'String!'
        },
        name: 'TerminalRoute',
        type: 'Stop'
      };
    }();
  }
};
TerminalRoute.paramDefinitions = {
  terminalId: { required: true }
};
TerminalRoute.routeName = 'TerminalRoute';
export default TerminalRoute;