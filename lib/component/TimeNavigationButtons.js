import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import { route } from '../action/ItinerarySearchActions';

import ComponentUsageExample from './ComponentUsageExample';
import { plan as examplePlan } from './ExampleData';
import ItineraryFeedback from './itinerary-feedback';
import Icon from './Icon';

// TODO: sptlit into container and view

var TimeNavigationButtons = function (_React$Component) {
  _inherits(TimeNavigationButtons, _React$Component);

  function TimeNavigationButtons() {
    _classCallCheck(this, TimeNavigationButtons);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  TimeNavigationButtons.prototype.setEarlierSelectedTime = function setEarlierSelectedTime() {
    var earliestArrivalTime = this.props.itineraries.reduce(function (previous, current) {
      var endTime = moment(current.endTime);

      if (previous == null) {
        return endTime;
      } else if (endTime.isBefore(previous)) {
        return endTime;
      }
      return previous;
    }, null);

    earliestArrivalTime.subtract(1, 'minutes');

    this.context.executeAction(route, {
      location: _extends({}, this.context.location, {
        query: _extends({}, this.context.location.query, {
          time: earliestArrivalTime.unix(),
          arriveBy: true
        })
      }),
      router: this.context.router
    });
  };

  TimeNavigationButtons.prototype.setLaterSelectedTime = function setLaterSelectedTime() {
    var latestDepartureTime = this.props.itineraries.reduce(function (previous, current) {
      var startTime = moment(current.startTime);

      if (previous == null) {
        return startTime;
      } else if (startTime.isAfter(previous)) {
        return startTime;
      }
      return previous;
    }, null);

    latestDepartureTime.add(1, 'minutes');

    this.context.executeAction(route, {
      location: _extends({}, this.context.location, {
        query: _extends({}, this.context.location.query, {
          time: latestDepartureTime.unix(),
          arriveBy: false
        })
      }),
      router: this.context.router
    });
  };

  TimeNavigationButtons.prototype.setSelectedTimeToNow = function setSelectedTimeToNow() {
    this.context.executeAction(route, {
      location: _extends({}, this.context.location, {
        query: _extends({}, this.context.location.query, {
          time: moment().unix(),
          arriveBy: false
        })
      }),
      router: this.context.router
    });
  };

  TimeNavigationButtons.prototype.render = function render() {
    var _this2 = this;

    var config = this.context.config;

    if (!this.props.itineraries || !this.props.itineraries[0]) {
      return null;
    }
    var itineraryFeedback = config.itinerary.enableFeedback ? React.createElement(ItineraryFeedback, null) : null;
    var enableButtonArrows = config.itinerary.timeNavigation.enableButtonArrows;
    var leftArrow = enableButtonArrows ? React.createElement(Icon, { img: 'icon-icon_arrow-left', className: 'cursor-pointer back' }) : null;
    var rightArrow = enableButtonArrows ? React.createElement(Icon, { img: 'icon-icon_arrow-right', className: 'cursor-pointer back' }) : null;

    return React.createElement(
      'div',
      {
        className: cx('time-navigation-buttons', { 'bp-large': this.context.breakpoint === 'large' })
      },
      itineraryFeedback,
      React.createElement(
        'button',
        {
          className: 'standalone-btn time-navigation-earlier-btn',
          onClick: function onClick() {
            return _this2.setEarlierSelectedTime();
          }
        },
        leftArrow,
        React.createElement(FormattedMessage, { id: 'earlier', defaultMessage: 'Earlier' })
      ),
      React.createElement(
        'button',
        {
          className: 'standalone-btn time-navigation-now-btn',
          onClick: function onClick() {
            return _this2.setSelectedTimeToNow();
          }
        },
        React.createElement(FormattedMessage, { id: 'now', defaultMessage: 'Now' })
      ),
      React.createElement(
        'button',
        {
          className: 'standalone-btn time-navigation-later-btn',
          onClick: function onClick() {
            return _this2.setLaterSelectedTime();
          }
        },
        React.createElement(FormattedMessage, { id: 'later', defaultMessage: 'Later' }),
        rightArrow
      )
    );
  };

  return TimeNavigationButtons;
}(React.Component);

TimeNavigationButtons.propTypes = {
  itineraries: PropTypes.arrayOf(PropTypes.shape({
    endTime: PropTypes.number.isRequired,
    startTime: PropTypes.number.isRequired
  }).isRequired).isRequired
};
TimeNavigationButtons.contextTypes = {
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  breakpoint: PropTypes.string,
  executeAction: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired
};
TimeNavigationButtons.displayName = 'TimeNavigationButtons';

TimeNavigationButtons.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Shows buttons for changing the itinerary search time to show previous or next deaprtures or reset the time.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(TimeNavigationButtons, { itineraries: examplePlan.itineraries })
    )
  );
};

export default TimeNavigationButtons;