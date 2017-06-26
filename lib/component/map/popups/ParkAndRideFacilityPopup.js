import Relay from 'react-relay';
import withProps from 'recompose/withProps';
import ParkAndRidePopup from './ParkAndRidePopup';

export default Relay.createContainer(withProps(function (props) {
  return {
    realtime: props.facility.realtime,
    maxCapacity: props.facility.maxCapacity,
    spacesAvailable: props.facility.spacesAvailable
  };
})(ParkAndRidePopup), {
  fragments: {
    facility: function facility() {
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
          metadata: {},
          name: 'ParkAndRideFacilityPopup_FacilityRelayQL',
          type: 'CarPark'
        };
      }();
    }
  }
});