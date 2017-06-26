import Relay from 'react-relay';
import withProps from 'recompose/withProps';
import compact from 'lodash/compact';
import every from 'lodash/every';
import sumBy from 'lodash/sumBy';
import ParkAndRidePopup from './ParkAndRidePopup';

export default Relay.createContainer(withProps(function (_ref) {
  var facilities = _ref.facilities;
  return {
    // compact removes any falseisch values from the array
    // (bike parks are included in the hub but return null from graphQL carParks)
    realtime: every(compact(facilities), 'realtime'),
    maxCapacity: sumBy(compact(facilities), 'maxCapacity'),
    spacesAvailable: sumBy(compact(facilities), 'spacesAvailable')
  };
})(ParkAndRidePopup), {
  fragments: {
    facilities: function facilities() {
      return function () {
        return {
          children: [{
            fieldName: 'spacesAvailable',
            kind: 'Field',
            metadata: {},
            type: 'Int'
          }, {
            fieldName: 'maxCapacity',
            kind: 'Field',
            metadata: {},
            type: 'Int'
          }, {
            fieldName: 'realtime',
            kind: 'Field',
            metadata: {},
            type: 'Boolean'
          }, {
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'ID'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {
            plural: true
          },
          name: 'ParkAndRideHubPopup_FacilitiesRelayQL',
          type: 'CarPark'
        };
      }();
    }
  }
});