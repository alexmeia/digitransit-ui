import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Relay from 'react-relay';

var CityBikeRoute = function (_Relay$Route) {
  _inherits(CityBikeRoute, _Relay$Route);

  function CityBikeRoute() {
    _classCallCheck(this, CityBikeRoute);

    return _possibleConstructorReturn(this, _Relay$Route.apply(this, arguments));
  }

  return CityBikeRoute;
}(Relay.Route);

CityBikeRoute.queries = {
  station: function station() {
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
            callVariableName: 'stationId'
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
        fieldName: 'bikeRentalStation',
        kind: 'Query',
        metadata: {
          identifyingArgName: 'id',
          identifyingArgType: 'String!'
        },
        name: 'CityBikeRoute',
        type: 'BikeRentalStation'
      };
    }();
  }
};
CityBikeRoute.paramDefinitions = {
  stationId: { required: true }
};
CityBikeRoute.routeName = 'CityBikeRoute';
export default CityBikeRoute;