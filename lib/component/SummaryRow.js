import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import cx from 'classnames';
import getContext from 'recompose/getContext';
import { FormattedMessage, intlShape } from 'react-intl';
import isEqual from 'lodash/isEqual';

import { sameDay, dateOrEmpty } from '../util/timeUtils';
import { displayDistance } from '../util/geo-utils';
import RouteNumber from './RouteNumber';
import RouteNumberContainer from './RouteNumberContainer';
import Icon from './Icon';
import RelativeDuration from './RelativeDuration';
import ComponentUsageExample from './ComponentUsageExample';
import { isCallAgencyPickupType } from '../util/legUtils';

var Leg = function Leg(_ref) {
  var routeNumber = _ref.routeNumber,
      leg = _ref.leg,
      large = _ref.large;
  return React.createElement(
    'div',
    { className: 'leg' },
    large && React.createElement(
      'div',
      { className: 'departure-stop overflow-fade' },
      '\xA0',
      (leg.transitLeg || leg.rentedBike) && leg.from.name
    ),
    routeNumber
  );
};

Leg.propTypes = {
  routeNumber: PropTypes.node.isRequired,
  leg: PropTypes.object.isRequired,
  large: PropTypes.bool.isRequired
};

var RouteLeg = function RouteLeg(_ref2) {
  var leg = _ref2.leg,
      large = _ref2.large,
      intl = _ref2.intl;

  var isCallAgency = isCallAgencyPickupType(leg);

  var routeNumber = void 0;
  if (isCallAgency) {
    var message = intl.formatMessage({
      id: 'pay-attention',
      defaultMessage: 'Pay Attention'
    });
    routeNumber = React.createElement(RouteNumber, {
      mode: 'call',
      text: message,
      className: cx('line', 'call'),
      vertical: true,
      withBar: true
    });
  } else {
    routeNumber = React.createElement(RouteNumberContainer, {
      route: leg.route,
      className: cx('line', leg.mode.toLowerCase()),
      vertical: true,
      withBar: true
    });
  }

  return React.createElement(Leg, { leg: leg, routeNumber: routeNumber, large: large });
};

RouteLeg.propTypes = {
  leg: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  large: PropTypes.bool.isRequired
};

var ModeLeg = function ModeLeg(_ref3) {
  var leg = _ref3.leg,
      mode = _ref3.mode,
      large = _ref3.large;

  var routeNumber = React.createElement(RouteNumber, {
    mode: mode,
    text: '',
    className: cx('line', mode.toLowerCase()),
    vertical: true,
    withBar: true
  });
  return React.createElement(Leg, { leg: leg, routeNumber: routeNumber, large: large });
};

ModeLeg.propTypes = {
  leg: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  large: PropTypes.bool.isRequired
};

var CityBikeLeg = function CityBikeLeg(_ref4) {
  var leg = _ref4.leg,
      large = _ref4.large;
  return React.createElement(ModeLeg, { leg: leg, mode: 'CITYBIKE', large: large });
};

CityBikeLeg.propTypes = {
  leg: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  large: PropTypes.bool.isRequired
};

var ViaLeg = function ViaLeg(_ref5) {
  var leg = _ref5.leg;
  return React.createElement(
    'div',
    { key: leg.mode + '_' + leg.startTime, className: 'leg via' },
    React.createElement(Icon, { img: 'icon-icon_place', className: 'itinerary-icon place' })
  );
};

ViaLeg.propTypes = {
  leg: PropTypes.object.isRequired
};

var SummaryRow = function SummaryRow(props, _ref6) {
  var intl = _ref6.intl,
      formatMessage = _ref6.intl.formatMessage,
      config = _ref6.config;

  var data = props.data;
  var refTime = moment(props.refTime);
  var startTime = moment(data.startTime);
  var endTime = moment(data.endTime);
  var duration = endTime.diff(startTime);
  var legs = [];
  var realTimeAvailable = false;
  var noTransitLegs = true;

  data.legs.forEach(function (leg) {
    if (leg.transitLeg || leg.rentedBike) {
      if (noTransitLegs && leg.realTime) {
        realTimeAvailable = true;
      }
      noTransitLegs = false;
    }
  });

  var lastLegRented = false;

  data.legs.forEach(function (leg) {
    if (leg.rentedBike && lastLegRented) {
      return;
    }

    lastLegRented = leg.rentedBike;

    var large = props.breakpoint === 'large';

    if (leg.transitLeg || leg.rentedBike || noTransitLegs || leg.intermediatePlace) {
      if (leg.rentedBike) {
        legs.push(React.createElement(ModeLeg, { key: leg.mode + '_' + leg.startTime, leg: leg, mode: 'CITYBIKE', large: large }));
      } else if (leg.intermediatePlace) {
        legs.push(React.createElement(ViaLeg, { key: leg.mode + '_' + leg.startTime, leg: leg }));
      } else if (leg.route) {
        if (props.intermediatePlaces && props.intermediatePlaces.length > 0 && isEqual([leg.from.lat, leg.from.lon], [props.intermediatePlaces[0].lat, props.intermediatePlaces[0].lon])) {
          legs.push(React.createElement(ViaLeg, { leg: leg }));
        }
        legs.push(React.createElement(RouteLeg, { key: leg.mode + '_' + leg.startTime, leg: leg, intl: intl, large: large }));
      } else {
        legs.push(React.createElement(ModeLeg, { key: leg.mode + '_' + leg.startTime, leg: leg, mode: leg.mode, large: large }));
      }
    }
  });

  var firstLegStartTime = null;

  if (!noTransitLegs) {
    var firstDeparture = false;
    if (data.legs[1] != null && !(data.legs[1].rentedBike || data.legs[0].transitLeg)) {
      firstDeparture = data.legs[1].startTime;
    }
    if (data.legs[0].transitLeg && !data.legs[0].rentedBike) {
      firstDeparture = data.legs[0].startTime;
    }
    if (firstDeparture) {
      firstLegStartTime = React.createElement(
        'div',
        { className: cx('itinerary-first-leg-start-time', { realtime: realTimeAvailable }) },
        realTimeAvailable && React.createElement(Icon, { img: 'icon-icon_realtime', className: 'realtime-icon realtime' }),
        moment(firstDeparture).format('HH:mm')
      );
    }
  }

  var classes = cx(['itinerary-summary-row', 'cursor-pointer', {
    passive: props.passive,
    'bp-large': props.breakpoint === 'large',
    open: props.open || props.children
  }]);

  var itineraryLabel = formatMessage({ id: 'itinerary-page.title', defaultMessage: 'Itinerary' });

  return React.createElement(
    'div',
    {
      className: classes,
      onClick: function onClick() {
        return props.onSelect(props.hash);
      }
    },
    React.createElement(
      'div',
      { className: 'itinerary-duration-and-distance' },
      React.createElement(
        'span',
        { className: 'itinerary-duration' },
        React.createElement(RelativeDuration, { duration: duration })
      ),
      React.createElement(
        'div',
        { className: 'itinerary-walking-distance' },
        React.createElement(Icon, { img: 'icon-icon_walk', viewBox: '6 0 40 40' }),
        displayDistance(data.walkDistance, config)
      )
    ),
    props.open || props.children ? [React.createElement(
      'div',
      { className: 'flex-grow itinerary-heading', key: 'title' },
      React.createElement(FormattedMessage, {
        id: 'itinerary-page.title',
        defaultMessage: 'Itinerary',
        tagName: 'h2'
      })
    ), React.createElement(
      'button',
      {
        title: itineraryLabel,
        key: 'arrow',
        className: 'action-arrow-click-area noborder flex-vertical',
        onClick: function onClick(e) {
          e.stopPropagation();
          props.onSelectImmediately(props.hash);
        }
      },
      React.createElement(
        'div',
        { className: 'action-arrow flex-grow' },
        React.createElement(Icon, { img: 'icon-icon_arrow-collapse--right' })
      )
    ), props.children && React.cloneElement(React.Children.only(props.children), { searchTime: props.refTime })] : [React.createElement(
      'div',
      {
        className: 'itinerary-start-time',
        key: 'startTime'
      },
      React.createElement(
        'span',
        { className: cx('itinerary-start-date', { nobg: sameDay(startTime, refTime) }) },
        React.createElement(
          'span',
          null,
          dateOrEmpty(startTime, refTime)
        )
      ),
      startTime.format('HH:mm'),
      firstLegStartTime
    ), React.createElement(
      'div',
      { className: 'itinerary-legs', key: 'legs' },
      legs
    ), React.createElement(
      'div',
      { className: 'itinerary-end-time', key: 'endtime' },
      endTime.format('HH:mm')
    ), React.createElement(
      'button',
      {
        title: itineraryLabel,
        key: 'arrow',
        className: 'action-arrow-click-area flex-vertical noborder',
        onClick: function onClick(e) {
          e.stopPropagation();
          props.onSelectImmediately(props.hash);
        }
      },
      React.createElement(
        'div',
        { className: 'action-arrow flex-grow' },
        React.createElement(Icon, { img: 'icon-icon_arrow-collapse--right' })
      )
    )]
  );
};

SummaryRow.propTypes = {
  refTime: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  passive: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onSelectImmediately: PropTypes.func.isRequired,
  hash: PropTypes.number.isRequired,
  children: PropTypes.node,
  open: PropTypes.bool,
  breakpoint: PropTypes.string.isRequired,
  intermediatePlaces: PropTypes.array
};

SummaryRow.contextTypes = {
  intl: intlShape.isRequired,
  config: PropTypes.object.isRequired
};

SummaryRow.displayName = 'SummaryRow';

var exampleData = function exampleData(t1) {
  return {
    startTime: t1,
    endTime: t1 + 10000,
    walkDistance: 770,
    legs: [{
      realTime: false,
      transitLeg: false,
      startTime: t1 + 10000,
      endTime: t1 + 20000,
      mode: 'WALK',
      distance: 483.84600000000006,
      duration: 438,
      rentedBike: false,
      route: null,
      from: { name: 'Messuaukio 1, Helsinki' }
    }, {
      realTime: false,
      transitLeg: true,
      startTime: t1 + 20000,
      endTime: t1 + 30000,
      mode: 'BUS',
      distance: 586.4621425755712,
      duration: 120,
      rentedBike: false,
      route: { shortName: '57', mode: 'BUS' },
      from: { name: 'Ilmattarentie' }
    }, {
      realTime: false,
      transitLeg: false,
      startTime: t1 + 30000,
      endTime: t1 + 40000,
      mode: 'WALK',
      distance: 291.098,
      duration: 259,
      rentedBike: false,
      route: null,
      from: { name: 'Veturitie' }
    }]
  };
};

var exampleDataVia = function exampleDataVia(t1) {
  return {
    startTime: t1,
    endTime: t1 + 10000,
    walkDistance: 770,
    legs: [{
      realTime: false,
      transitLeg: false,
      startTime: t1 + 10000,
      endTime: t1 + 20000,
      mode: 'WALK',
      distance: 483.84600000000006,
      duration: 438,
      rentedBike: false,
      route: null,
      from: { name: 'Messuaukio 1, Helsinki' }
    }, {
      realTime: false,
      transitLeg: true,
      startTime: t1 + 20000,
      endTime: t1 + 30000,
      mode: 'BUS',
      distance: 586.4621425755712,
      duration: 120,
      rentedBike: false,
      route: { shortName: '57', mode: 'BUS' },
      from: { name: 'Ilmattarentie' }
    }, {
      realTime: false,
      transitLeg: true,
      startTime: t1 + 30000,
      endTime: t1 + 40000,
      mode: 'WALK',
      intermediatePlace: true,
      distance: 586.4621425755712,
      duration: 600,
      rentedBike: false,
      route: null,
      from: { name: 'Ilmattarentie' }
    }, {
      realTime: false,
      transitLeg: true,
      startTime: t1 + 40000,
      endTime: t1 + 50000,
      mode: 'BUS',
      distance: 586.4621425755712,
      duration: 120,
      rentedBike: false,
      route: { shortName: '57', mode: 'BUS' },
      from: { name: 'Messuaukio 1, Helsinki' }
    }, {
      realTime: false,
      transitLeg: false,
      startTime: t1 + 50000,
      endTime: t1 + 60000,
      mode: 'WALK',
      distance: 291.098,
      duration: 259,
      rentedBike: false,
      route: null,
      from: { name: 'Messuaukio 1, Helsinki' }
    }]
  };
};

var exampleDataCallAgency = function exampleDataCallAgency(t1) {
  return {
    startTime: t1,
    endTime: t1 + 10000,
    walkDistance: 770,
    legs: [{
      realTime: false,
      transitLeg: false,
      startTime: t1 + 10000,
      endTime: t1 + 20000,
      mode: 'WALK',
      distance: 483.84600000000006,
      duration: 438,
      rentedBike: false,
      route: null,
      from: { name: 'Messuaukio 1, Helsinki' }
    }, {
      realTime: false,
      transitLeg: true,
      startTime: t1 + 20000,
      endTime: t1 + 30000,
      mode: 'BUS',
      distance: 586.4621425755712,
      duration: 120,
      rentedBike: false,
      route: { shortName: '57', mode: 'BUS' },
      from: { name: 'Ilmattarentie', stop: { gtfsId: 'start' } },
      to: { name: 'Joku Pysäkki', stop: { gtfsId: 'end' } },
      trip: {
        stoptimes: [{ pickupType: 'CALL_AGENCY',
          stop: { gtfsId: 'start' } }]
      }
    }, {
      realTime: false,
      transitLeg: false,
      startTime: t1 + 30000,
      endTime: t1 + 40000,
      mode: 'WALK',
      distance: 291.098,
      duration: 259,
      rentedBike: false,
      route: null,
      from: { name: 'Veturitie' }
    }]
  };
};

var nop = function nop() {};

SummaryRow.description = function () {
  var today = moment().hour(12).minute(34).second(0).valueOf();
  var date = 1478611781000;
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays a summary of an itinerary.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'passive-small-today' },
      React.createElement(SummaryRow, {
        refTime: today,
        breakpoint: 'small',
        data: exampleData(today),
        passive: true,
        onSelect: nop,
        onSelectImmediately: nop,
        hash: 1
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'active-small-today' },
      React.createElement(SummaryRow, {
        refTime: today,
        breakpoint: 'small',
        data: exampleData(today),
        onSelect: nop,
        onSelectImmediately: nop,
        hash: 1
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'passive-large-today' },
      React.createElement(SummaryRow, {
        refTime: today,
        breakpoint: 'large',
        data: exampleData(today),
        passive: true,
        onSelect: nop,
        onSelectImmediately: nop,
        hash: 1
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'active-large-today' },
      React.createElement(SummaryRow, {
        refTime: today,
        breakpoint: 'large',
        data: exampleData(today),
        onSelect: nop,
        onSelectImmediately: nop,
        hash: 1
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'passive-small-tomorrow' },
      React.createElement(SummaryRow, {
        refTime: today,
        breakpoint: 'small',
        data: exampleData(date),
        passive: true,
        onSelect: nop,
        onSelectImmediately: nop,
        hash: 1
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'active-small-tomorrow' },
      React.createElement(SummaryRow, {
        refTime: today,
        breakpoint: 'small',
        data: exampleData(date),
        onSelect: nop,
        onSelectImmediately: nop,
        hash: 1
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'passive-large-tomorrow' },
      React.createElement(SummaryRow, {
        refTime: today,
        breakpoint: 'large',
        data: exampleData(date),
        passive: true,
        onSelect: nop,
        onSelectImmediately: nop,
        hash: 1
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'active-large-tomorrow' },
      React.createElement(SummaryRow, {
        refTime: today,
        breakpoint: 'large',
        data: exampleData(date),
        onSelect: nop,
        onSelectImmediately: nop,
        hash: 1
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'open-large-today' },
      React.createElement(SummaryRow, {
        refTime: today,
        breakpoint: 'large',
        data: exampleData(today),
        onSelect: nop,
        onSelectImmediately: nop,
        hash: 1,
        open: true
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'open-large-tomorrow' },
      React.createElement(SummaryRow, {
        refTime: today,
        breakpoint: 'large',
        data: exampleData(date),
        onSelect: nop,
        onSelectImmediately: nop,
        hash: 1,
        open: true
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'passive-small-via' },
      React.createElement(SummaryRow, {
        refTime: today,
        breakpoint: 'small',
        data: exampleDataVia(today),
        passive: true,
        onSelect: nop,
        onSelectImmediately: nop,
        hash: 1
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'active-large-via' },
      React.createElement(SummaryRow, {
        refTime: today,
        breakpoint: 'large',
        data: exampleDataVia(today),
        onSelect: nop,
        onSelectImmediately: nop,
        hash: 1
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'passive-small-call-agency' },
      React.createElement(SummaryRow, {
        refTime: today,
        breakpoint: 'small',
        data: exampleDataCallAgency(today),
        passive: true,
        onSelect: nop,
        onSelectImmediately: nop,
        hash: 1
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'active-large-call-agency' },
      React.createElement(SummaryRow, {
        refTime: today,
        breakpoint: 'large',
        data: exampleDataCallAgency(today),
        onSelect: nop,
        onSelectImmediately: nop,
        hash: 1
      })
    )
  );
};

var withBreakPoint = getContext({
  breakpoint: PropTypes.string.isRequired })(SummaryRow);

export { SummaryRow as component, withBreakPoint as default };