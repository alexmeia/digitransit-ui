import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
/* eslint-disable react/no-array-index-key */

import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import WalkLeg from './WalkLeg';
import WaitLeg from './WaitLeg';
import BicycleLeg from './BicycleLeg';
import EndLeg from './EndLeg';
import AirportCheckInLeg from './AirportCheckInLeg';
import AirportCollectLuggageLeg from './AirportCollectLuggageLeg';
import StopCode from './StopCode';
import BusLeg from './BusLeg';
import AirplaneLeg from './AirplaneLeg';
import SubwayLeg from './SubwayLeg';
import TramLeg from './TramLeg';
import RailLeg from './RailLeg';
import FerryLeg from './FerryLeg';
import CarLeg from './CarLeg';
import ViaLeg from './ViaLeg';
import CallAgencyLeg from './CallAgencyLeg';
import { isCallAgencyPickupType } from '../util/legUtils';

var ItineraryLegs = function (_React$Component) {
  _inherits(ItineraryLegs, _React$Component);

  function ItineraryLegs() {
    var _temp, _this, _ret;

    _classCallCheck(this, ItineraryLegs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.focus = function (position) {
      return function (e) {
        e.stopPropagation();
        _this.props.focusMap(position.lat, position.lon);
      };
    }, _this.stopCode = function (stop) {
      return stop && stop.code && React.createElement(StopCode, { code: stop.code });
    }, _this.continueWithBicycle = function (leg1, leg2) {
      return leg1 != null && (leg1.mode === 'BICYCLE' || leg1.mode === 'WALK') && leg2 != null && (leg2.mode === 'BICYCLE' || leg2.mode === 'WALK');
    }, _this.continueWithRentedBicycle = function (leg1, leg2) {
      return leg1 != null && leg1.rentedBike && leg2 != null && leg2.rentedBike;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ItineraryLegs.prototype.getChildContext = function getChildContext() {
    return { focusFunction: this.focus };
  };

  ItineraryLegs.prototype.render = function render() {
    var _this2 = this;

    var waitTime = void 0;
    var startTime = void 0;
    var previousLeg = void 0;
    var nextLeg = void 0;
    var waitThreshold = this.context.config.itinerary.waitThreshold * 1000;
    var legs = [];
    var usingOwnBicycle = this.props.itinerary.legs[0] != null && this.props.itinerary.legs[0].mode === 'BICYCLE' && !this.props.itinerary.legs[0].rentedBike;
    var originalLegs = this.props.itinerary.legs;
    var compressedLegs = [];
    var compressLeg = false;

    originalLegs.forEach(function (cleg) {
      if (compressLeg) {
        if (usingOwnBicycle && _this2.continueWithBicycle(compressLeg, cleg)) {
          compressLeg.duration += cleg.duration;
          compressLeg.distance += cleg.distance;
          compressLeg.to = cleg.to;
          compressLeg.endTime = cleg.endTime;
          compressLeg.mode = 'BICYCLE';
        } else if (cleg.rentedBike && _this2.continueWithRentedBicycle(compressLeg, cleg)) {
          compressLeg.duration += cleg.duration;
          compressLeg.distance += cleg.distance;
          compressLeg.to = cleg.to;
          compressLeg.endTime += cleg.endTime;
          compressLeg.mode = 'CITYBIKE';
        } else {
          if (usingOwnBicycle && compressLeg.mode === 'WALK') {
            compressLeg.mode = 'BICYCLE_WALK';
          }

          compressedLegs.push(compressLeg);
          compressLeg = cloneDeep(cleg);
        }
      } else {
        compressLeg = cloneDeep(cleg);
      }
    });

    if (compressLeg) {
      compressedLegs.push(compressLeg);
    }

    var numberOfLegs = compressedLegs.length;

    compressedLegs.forEach(function (leg, j) {
      if (j + 1 < compressedLegs.length) {
        nextLeg = compressedLegs[j + 1];
      }

      if (j > 0) {
        previousLeg = compressedLegs[j - 1];
      }

      if (isCallAgencyPickupType(leg)) {
        legs.push(React.createElement(CallAgencyLeg, {
          key: j,
          index: j,
          leg: leg,
          focusAction: _this2.focus(leg.from)
        }));
      } else if (leg.mode === 'BUS') {
        legs.push(React.createElement(BusLeg, {
          key: j,
          index: j,
          leg: leg,
          focusAction: _this2.focus(leg.from)
        }));
      } else if (leg.mode === 'TRAM') {
        legs.push(React.createElement(TramLeg, {
          key: j,
          index: j,
          leg: leg,
          focusAction: _this2.focus(leg.from)
        }));
      } else if (leg.mode === 'FERRY') {
        legs.push(React.createElement(FerryLeg, {
          key: j,
          index: j,
          leg: leg,
          focusAction: _this2.focus(leg.from)
        }));
      } else if (leg.mode === 'RAIL') {
        legs.push(React.createElement(RailLeg, {
          key: j,
          index: j,
          leg: leg,
          focusAction: _this2.focus(leg.from)
        }));
      } else if (leg.mode === 'SUBWAY') {
        legs.push(React.createElement(SubwayLeg, {
          key: j,
          index: j,
          leg: leg,
          focusAction: _this2.focus(leg.from)
        }));
      } else if (leg.mode === 'AIRPLANE') {
        startTime = previousLeg && previousLeg.endTime || leg.startTime;

        legs.push(React.createElement(AirportCheckInLeg, {
          key: j + 'ci',
          leg: leg,
          startTime: startTime,
          focusAction: _this2.focus(leg.from)
        }));

        legs.push(React.createElement(AirplaneLeg, {
          key: j,
          index: j,
          leg: leg,
          focusAction: _this2.focus(leg.from)
        }));

        legs.push(React.createElement(AirportCollectLuggageLeg, {
          key: j + 'cl',
          leg: leg,
          focusAction: _this2.focus(leg.from)
        }));
      } else if (leg.rentedBike || leg.mode === 'BICYCLE' || leg.mode === 'BICYCLE_WALK') {
        legs.push(React.createElement(BicycleLeg, {
          key: j,
          index: j,
          leg: leg,
          focusAction: _this2.focus(leg.from)
        }));
      } else if (leg.mode === 'CAR') {
        legs.push(React.createElement(
          CarLeg,
          {
            key: j,
            index: j,
            leg: leg,
            focusAction: _this2.focus(leg.from)
          },
          _this2.stopCode(leg.from.stop)
        ));
      } else if (leg.intermediatePlace) {
        legs.push(React.createElement(ViaLeg, {
          key: j + 'via',
          leg: leg,
          arrivalTime: compressedLegs[j - 1].endTime,
          focusAction: _this2.focus(leg.from)
        }));
      } else {
        legs.push(React.createElement(
          WalkLeg,
          {
            key: j,
            index: j,
            leg: leg,
            focusAction: _this2.focus(leg.from)
          },
          _this2.stopCode(leg.from.stop)
        ));
      }

      if (nextLeg) {
        waitTime = nextLeg.startTime - leg.endTime;
        if (waitTime > waitThreshold && (nextLeg != null ? nextLeg.mode : null) !== 'AIRPLANE' && leg.mode !== 'AIRPLANE' && !nextLeg.intermediatePlace) {
          legs.push(React.createElement(
            WaitLeg,
            {
              key: j + 'w',
              leg: leg,
              startTime: leg.endTime,
              waitTime: waitTime,
              focusAction: _this2.focus(leg.to)
            },
            _this2.stopCode(leg.to.stop)
          ));
        }
      }
    });

    legs.push(React.createElement(EndLeg, {
      key: numberOfLegs,
      index: numberOfLegs,
      endTime: this.props.itinerary.endTime,
      focusAction: this.focus(compressedLegs[numberOfLegs - 1].to),
      to: compressedLegs[numberOfLegs - 1].to.name
    }));

    return React.createElement(
      'div',
      null,
      legs
    );
  };

  return ItineraryLegs;
}(React.Component);

ItineraryLegs.childContextTypes = {
  focusFunction: PropTypes.func
};


ItineraryLegs.propTypes = {
  itinerary: PropTypes.object,
  focusMap: PropTypes.func
};

ItineraryLegs.contextTypes = {
  config: PropTypes.object.isRequired
};

export default ItineraryLegs;