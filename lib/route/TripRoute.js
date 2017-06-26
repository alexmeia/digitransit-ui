import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Relay, { Route } from 'react-relay';

var TripRoute = function (_Route) {
  _inherits(TripRoute, _Route);

  function TripRoute() {
    _classCallCheck(this, TripRoute);

    return _possibleConstructorReturn(this, _Route.apply(this, arguments));
  }

  return TripRoute;
}(Route);

TripRoute.queries = {
  pattern: function pattern() {
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
            callVariableName: 'id'
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
        fieldName: 'trip',
        kind: 'Query',
        metadata: {
          identifyingArgName: 'id',
          identifyingArgType: 'String!'
        },
        name: 'TripRoute',
        type: 'Trip'
      };
    }();
  }
};
TripRoute.paramDefinitions = {
  id: { required: true }
};
TripRoute.routeName = 'TripRoute';
export default TripRoute;