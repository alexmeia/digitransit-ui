import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { intlShape } from 'react-intl';

import Distance from './Distance';
import RouteNumber from './RouteNumber';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';

var bicycleRentalRowContainerFragment = function bicycleRentalRowContainerFragment() {
  return function () {
    return {
      children: [{
        fieldName: 'name',
        kind: 'Field',
        metadata: {},
        type: 'String'
      }, {
        fieldName: 'stationId',
        kind: 'Field',
        metadata: {},
        type: 'String'
      }, {
        fieldName: 'bikesAvailable',
        kind: 'Field',
        metadata: {},
        type: 'Int'
      }, {
        fieldName: 'spacesAvailable',
        kind: 'Field',
        metadata: {},
        type: 'Int'
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
      name: 'BicycleRentalStationRowContainerRelayQL',
      type: 'BikeRentalStation'
    };
  }();
};

var BicycleRentalStationRow = function BicycleRentalStationRow(props, context) {
  var availabilityIcon = null;

  if (props.station.bikesAvailable === 0 && props.station.spacesAvailable === 0) {
    availabilityIcon = React.createElement(Icon, { img: 'icon-icon_not-in-use' });
  } else if (props.station.bikesAvailable > context.config.cityBike.fewAvailableCount) {
    availabilityIcon = React.createElement(Icon, { img: 'icon-icon_good-availability' });
  } else if (props.station.bikesAvailable > 0) {
    availabilityIcon = React.createElement(Icon, { img: 'icon-icon_poor-availability' });
  } else {
    availabilityIcon = React.createElement(Icon, { img: 'icon-icon_no-availability' });
  }

  // TODO implement disruption checking

  return React.createElement(
    'div',
    { className: 'next-departure-row padding-vertical-normal border-bottom' },
    React.createElement(Distance, { distance: props.distance }),
    React.createElement(
      'div',
      { className: 'bicycle-rental-station' },
      React.createElement(RouteNumber, {
        mode: 'citybike',
        text: props.station.stationId,
        hasDisruption: false
      }),
      React.createElement(
        'span',
        { className: 'city-bike-station-name overflow-fade' },
        props.station.name
      ),
      React.createElement(
        'span',
        { className: 'city-bike-station-availability' },
        React.createElement(
          'span',
          { className: 'bikes-label' },
          context.intl.formatMessage({ id: 'bike-availability-short', defaultMessage: 'Bikes' })
        ),
        React.createElement(
          'span',
          { className: 'bikes-available' },
          props.station.bikesAvailable
        ),
        '/',
        props.station.bikesAvailable + props.station.spacesAvailable,
        availabilityIcon
      )
    )
  );
};

BicycleRentalStationRow.propTypes = {
  station: PropTypes.object.isRequired,
  distance: PropTypes.number.isRequired
};

BicycleRentalStationRow.contextTypes = {
  intl: intlShape.isRequired,
  config: PropTypes.object.isRequired
};

BicycleRentalStationRow.displayName = 'BicycleRentalStationRow';

var exampleStation1 = {
  stationId: 'A27',
  name: 'Mannerheimintie',
  bikesAvailable: 12,
  spacesAvailable: 16
};

var exampleStation2 = {
  stationId: 'A27',
  name: 'Mannerheimintie',
  bikesAvailable: 2,
  spacesAvailable: 16
};

var exampleStation3 = {
  stationId: 'A27',
  name: 'Mannerheimintie',
  bikesAvailable: 0,
  spacesAvailable: 16
};

BicycleRentalStationRow.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      ComponentUsageExample,
      { description: 'plenty of bikes available' },
      React.createElement(BicycleRentalStationRow, {
        station: exampleStation1,
        distance: 256,
        currentTime: 1473676196
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'few bikes available' },
      React.createElement(BicycleRentalStationRow, {
        station: exampleStation2,
        distance: 256,
        currentTime: 1473676196
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'no bikes available' },
      React.createElement(BicycleRentalStationRow, {
        station: exampleStation3,
        distance: 256,
        currentTime: 1473676196
      })
    )
  );
};

export { BicycleRentalStationRow };

export default Relay.createContainer(BicycleRentalStationRow, {
  fragments: {
    station: bicycleRentalRowContainerFragment
  },

  initialVariables: {
    currentTime: 0
  }
});