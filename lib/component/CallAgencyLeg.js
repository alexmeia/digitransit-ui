import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import ComponentUsageExample from './ComponentUsageExample';
import RouteNumber from './RouteNumber';
import Icon from './Icon';
import StopCode from './StopCode';
import LegAgencyInfo from './LegAgencyInfo';
import ItineraryCircleLine from './ItineraryCircleLine';

var CallAgencyLeg = function (_React$Component) {
  _inherits(CallAgencyLeg, _React$Component);

  function CallAgencyLeg() {
    var _temp, _this, _ret;

    _classCallCheck(this, CallAgencyLeg);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.stopCode = function (stopCode) {
      return stopCode && React.createElement(StopCode, { code: stopCode });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CallAgencyLeg.prototype.render = function render() {
    var originalTime = this.props.leg.realTime && this.props.leg.departureDelay >= this.context.config.itinerary.delayThreshold && [React.createElement('br', { key: 'br' }), React.createElement(
      'span',
      { key: 'time', className: 'original-time' },
      moment(this.props.leg.startTime).subtract(this.props.leg.departureDelay, 's').format('HH:mm')
    )];

    var firstLegClassName = this.props.index === 0 ? ' start' : '';
    var modeClassName = 'call';

    return React.createElement(
      'div',
      {
        className: 'row itinerary-row'
      },
      React.createElement('div', { className: 'itinerary-call-agency-warning' }),
      React.createElement(
        'div',
        { className: 'small-2 columns itinerary-time-column call' },
        React.createElement(
          Link,
          {
            onClick: function onClick(e) {
              return e.stopPropagation();
            },
            to: '/linjat/' + this.props.leg.route.gtfsId + '/pysakit/' + this.props.leg.trip.pattern.code + '/' + this.props.leg.trip.gtfsId
            // TODO: Create a helper function for generationg links

          },
          React.createElement(
            'div',
            { className: 'itinerary-time-column-time' },
            React.createElement(
              'span',
              { className: this.props.leg.realTime ? 'realtime' : '' },
              this.props.leg.realTime && React.createElement(Icon, { img: 'icon-icon_realtime', className: 'realtime-icon realtime' }),
              moment(this.props.leg.startTime).format('HH:mm')
            ),
            originalTime
          ),
          React.createElement(RouteNumber, {
            mode: 'call',
            className: 'leg-call',
            realtime: false,
            vertical: true,
            fadeLong: true
          })
        )
      ),
      React.createElement(ItineraryCircleLine, { index: this.props.index, modeClassName: modeClassName }),
      React.createElement(
        'div',
        {
          onClick: this.props.focusAction,
          className: 'small-9 columns itinerary-instruction-column ' + firstLegClassName + ' ' + modeClassName
        },
        React.createElement(
          'div',
          { className: 'itinerary-leg-first-row' },
          React.createElement(
            'div',
            null,
            this.props.leg.from.name,
            this.stopCode(this.props.leg.from.stop && this.props.leg.from.stop.code)
          ),
          React.createElement(Icon, { img: 'icon-icon_search-plus', className: 'itinerary-search-icon' })
        ),
        React.createElement(
          'div',
          { className: 'itinerary-transit-leg-route call' },
          React.createElement(
            'span',
            { className: 'warning-message' },
            React.createElement(FormattedMessage, {
              id: 'warning-call-agency',
              values: {
                routeName: React.createElement(
                  'span',
                  { className: 'route-name' },
                  this.props.leg.route.longName
                )
              },
              defaultMessage: 'Only on demand: {routeName}, which needs to be booked in advance.'
            }),
            React.createElement(
              'div',
              { className: 'itinerary-warning-agency-container' },
              React.createElement(LegAgencyInfo, { leg: this.props.leg })
            ),
            this.props.leg.route.agency.phone ? React.createElement(
              'div',
              { className: 'call-button' },
              React.createElement(
                Link,
                { href: 'tel:' + this.props.leg.route.agency.phone },
                React.createElement(FormattedMessage, {
                  id: 'call',
                  defaultMessage: 'Call'
                }),
                ' ',
                this.props.leg.route.agency.phone
              )
            ) : ''
          )
        )
      )
    );
  };

  return CallAgencyLeg;
}(React.Component);

var exampleData = function exampleData(t1) {
  return {
    realTime: false,
    transitLeg: true,
    startTime: t1 + 20000,
    endTime: t1 + 30000,
    mode: 'BUS',
    distance: 586.4621425755712,
    duration: 120,
    rentedBike: false,
    route: {
      longName: 'Leppävaara - Tapiola',
      agency: { phone: '09-555' },
      gtfsId: 'xxx',
      shortName: '57',
      mode: 'BUS' },
    from: { name: 'Ilmattarentie', stop: { gtfsId: 'start' } },
    to: { name: 'Joku Pysäkki', stop: { gtfsId: 'end' } },
    trip: {
      gtfsId: 'xxx',
      pattern: {
        code: 'xxx'
      },
      stoptimes: [{ pickupType: 'CALL_AGENCY',
        stop: { gtfsId: 'start' } }]
    }
  };
};

CallAgencyLeg.description = function () {
  var today = moment().hour(12).minute(34).second(0).valueOf();
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays an itinerary bus leg.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'normal' },
      React.createElement(CallAgencyLeg, { leg: exampleData(today), index: 1, focusAction: function focusAction() {} })
    ),
    'exampleData'
  );
};

CallAgencyLeg.propTypes = {
  leg: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  focusAction: PropTypes.func.isRequired
};

CallAgencyLeg.contextTypes = {
  config: PropTypes.object.isRequired
};

export default CallAgencyLeg;