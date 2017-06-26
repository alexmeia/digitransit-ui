import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import RouteNumber from './RouteNumber';
import Icon from './Icon';
import { durationToString } from '../util/timeUtils';
import StopCode from './StopCode';
import LegAgencyInfo from './LegAgencyInfo';
import IntermediateLeg from './IntermediateLeg';
import PlatformNumber from './PlatformNumber';
import ItineraryCircleLine from './ItineraryCircleLine';

var TransitLeg = function (_React$Component) {
  _inherits(TransitLeg, _React$Component);

  function TransitLeg(props) {
    _classCallCheck(this, TransitLeg);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.stopCode = function (stopCode) {
      return stopCode && React.createElement(StopCode, { code: stopCode });
    };

    _this.toggleShowIntermediateStops = function () {
      _this.setState({ showIntermediateStops: !_this.state.showIntermediateStops });
    };

    _this.renderMain = function () {
      var originalTime = _this.props.leg.realTime && _this.props.leg.departureDelay >= _this.context.config.itinerary.delayThreshold && [React.createElement('br', { key: 'br' }), React.createElement(
        'span',
        { key: 'time', className: 'original-time' },
        moment(_this.props.leg.startTime).subtract(_this.props.leg.departureDelay, 's').format('HH:mm')
      )];

      var firstLegClassName = _this.props.index === 0 ? ' start' : '';
      /* const modeClassName =
        `${this.props.mode.toLowerCase()}${this.props.index === 0 ? ' from' : ''}`;
      */
      var modeClassName = _this.props.mode.toLowerCase();
      var StopInfo = function StopInfo(_ref) {
        var stops = _ref.stops,
            leg = _ref.leg,
            toggleFunction = _ref.toggleFunction;

        var stopCount = stops && stops.length || 0;
        var message = _this.state.showIntermediateStops && React.createElement(FormattedMessage, { id: 'itinerary-hide-stops', defaultMessage: 'Hide stops' }) || React.createElement(FormattedMessage, {
          id: 'number-of-intermediate-stops',
          values: {
            number: stops && stops.length || 0
          },
          defaultMessage: '{number, plural, =0 {No stops} one {1 stop} other {{number} stops} }'
        });
        return React.createElement(
          'div',
          { className: 'intermediate-stop-info-container' },
          stopCount === 0 ? React.createElement(
            'span',
            { className: 'intermediate-stop-no-stops' },
            message
          ) : React.createElement(
            'span',
            { className: 'intermediate-stops-link pointer-cursor', onClick: function onClick(event) {
                event.stopPropagation();toggleFunction();
              } },
            message
          ),
          ' ',
          React.createElement(
            'span',
            { className: 'intermediate-stops-duration' },
            '(',
            durationToString(leg.duration * 1000),
            ')'
          )
        );
      };

      return React.createElement(
        'div',
        {
          key: _this.props.index,
          className: 'row itinerary-row'
        },
        React.createElement(
          'div',
          { className: 'small-2 columns itinerary-time-column' },
          React.createElement(
            Link,
            {
              onClick: function onClick(e) {
                return e.stopPropagation();
              },
              to: '/linjat/' + _this.props.leg.route.gtfsId + '/pysakit/' + _this.props.leg.trip.pattern.code + '/' + _this.props.leg.trip.gtfsId
              // TODO: Create a helper function for generationg links

            },
            React.createElement(
              'div',
              { className: 'itinerary-time-column-time' },
              React.createElement(
                'span',
                { className: _this.props.leg.realTime ? 'realtime' : '' },
                _this.props.leg.realTime && React.createElement(Icon, { img: 'icon-icon_realtime', className: 'realtime-icon realtime' }),
                moment(_this.props.leg.startTime).format('HH:mm')
              ),
              originalTime
            ),
            React.createElement(RouteNumber, {
              mode: _this.props.mode.toLowerCase(),
              text: _this.props.leg.route && _this.props.leg.route.shortName,
              realtime: _this.props.leg.realTime,
              vertical: true,
              fadeLong: true
            })
          )
        ),
        React.createElement(ItineraryCircleLine, { index: _this.props.index, modeClassName: modeClassName }),
        React.createElement(
          'div',
          {
            onClick: _this.props.focusAction,
            className: 'small-9 columns itinerary-instruction-column ' + firstLegClassName + ' ' + modeClassName
          },
          React.createElement(
            'div',
            { className: 'itinerary-leg-first-row' },
            React.createElement(
              'div',
              null,
              _this.props.leg.from.name,
              _this.stopCode(_this.props.leg.from.stop && _this.props.leg.from.stop.code),
              React.createElement(PlatformNumber, { number: _this.props.leg.from.stop.platformCode, short: false })
            ),
            React.createElement(Icon, { img: 'icon-icon_search-plus', className: 'itinerary-search-icon' })
          ),
          React.createElement(
            'div',
            { className: 'itinerary-transit-leg-route' },
            _this.props.children
          ),
          React.createElement(LegAgencyInfo, { leg: _this.props.leg }),
          React.createElement(
            'div',
            null,
            React.createElement(StopInfo, {
              toggleFunction: _this.toggleShowIntermediateStops,
              leg: _this.props.leg,
              stops: _this.props.leg.intermediateStops
            })
          )
        )
      );
    };

    _this.state = {
      showIntermediateStops: false
    };
    return _this;
  }

  TransitLeg.prototype.renderIntermediate = function renderIntermediate() {
    var _this2 = this;

    if (this.props.leg.intermediateStops.length > 0 && this.state.showIntermediateStops === true) {
      var stopList = this.props.leg.intermediateStops.map(function (stop) {
        return React.createElement(IntermediateLeg, {
          key: stop.gtfsId,
          mode: _this2.props.mode,
          name: stop.name,
          stopCode: stop.code,
          focusFunction: _this2.context.focusFunction({ lat: stop.lat, lon: stop.lon })
        });
      });
      return React.createElement(
        'div',
        { className: 'itinerary-leg-container' },
        stopList
      );
    }
    return null;
  };

  TransitLeg.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      [].concat([this.renderMain()]).concat([this.renderIntermediate()])
    );
  };

  return TransitLeg;
}(React.Component);

TransitLeg.propTypes = {
  leg: PropTypes.object.isRequired,
  'leg.realTime': PropTypes.bool,
  index: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  focusAction: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

TransitLeg.contextTypes = {
  focusFunction: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired
};

export default TransitLeg;