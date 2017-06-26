import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Relay from 'react-relay';

var ParkAndRideHubRoute = function (_Relay$Route) {
  _inherits(ParkAndRideHubRoute, _Relay$Route);

  function ParkAndRideHubRoute() {
    _classCallCheck(this, ParkAndRideHubRoute);

    return _possibleConstructorReturn(this, _Relay$Route.apply(this, arguments));
  }

  return ParkAndRideHubRoute;
}(Relay.Route);

ParkAndRideHubRoute.queries = {
  facilities: function facilities() {
    return function () {
      return {
        calls: [{
          kind: 'Call',
          metadata: {
            type: '[String]'
          },
          name: 'ids',
          value: {
            kind: 'CallVariable',
            callVariableName: 'stationIds'
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
        fieldName: 'carParks',
        kind: 'Query',
        metadata: {
          isPlural: true,
          identifyingArgName: 'ids',
          identifyingArgType: '[String]'
        },
        name: 'ParkAndRideHubRoute',
        type: 'CarPark'
      };
    }();
  }
};
ParkAndRideHubRoute.paramDefinitions = {
  stationIds: { required: true }
};
ParkAndRideHubRoute.routeName = 'ParkAndRideHubRoute';
export default ParkAndRideHubRoute;