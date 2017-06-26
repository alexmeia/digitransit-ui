import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Relay from 'react-relay';

var ParkAndRideFacilityRoute = function (_Relay$Route) {
  _inherits(ParkAndRideFacilityRoute, _Relay$Route);

  function ParkAndRideFacilityRoute() {
    _classCallCheck(this, ParkAndRideFacilityRoute);

    return _possibleConstructorReturn(this, _Relay$Route.apply(this, arguments));
  }

  return ParkAndRideFacilityRoute;
}(Relay.Route);

ParkAndRideFacilityRoute.queries = {
  facility: function facility() {
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
        fieldName: 'carPark',
        kind: 'Query',
        metadata: {
          identifyingArgName: 'id',
          identifyingArgType: 'String!'
        },
        name: 'ParkAndRideFacilityRoute',
        type: 'CarPark'
      };
    }();
  }
};
ParkAndRideFacilityRoute.paramDefinitions = {
  id: { required: true }
};
ParkAndRideFacilityRoute.routeName = 'ParkAndRideFacilityRoute';
export default ParkAndRideFacilityRoute;