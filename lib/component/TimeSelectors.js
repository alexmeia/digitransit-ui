import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { intlShape } from 'react-intl';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';
import ItineraryTimePicker from './ItineraryTimePicker';

export default function TimeSelectors(_ref, _ref2) {
  var arriveBy = _ref.arriveBy,
      time = _ref.time,
      dates = _ref.dates,
      setArriveBy = _ref.setArriveBy,
      changeTime = _ref.changeTime,
      changeDate = _ref.changeDate;
  var intl = _ref2.intl;

  // const timeInputClass = `select-wrapper ${isMobile ? '' : 'time-box-shadow'}`;
  return React.createElement(
    'div',
    { className: 'time-selectors' },
    React.createElement(
      'div',
      { className: 'select-wrapper' },
      React.createElement(
        'select',
        { className: 'arrive', value: arriveBy, onChange: setArriveBy },
        React.createElement(
          'option',
          { value: 'false' },
          intl.formatMessage({
            id: 'leaving-at',
            defaultMessage: 'Leaving'
          })
        ),
        React.createElement(
          'option',
          { value: 'true' },
          intl.formatMessage({
            id: 'arriving-at',
            defaultMessage: 'Arriving'
          })
        )
      ),
      React.createElement(Icon, { className: 'fake-select-arrow', img: 'icon-icon_arrow-dropdown' })
    ),
    React.createElement(
      'div',
      { className: 'select-wrapper' },
      React.createElement(
        'select',
        {
          className: 'date',
          value: time.format('YYYY-MM-DD'),
          onChange: changeDate
        },
        dates
      ),
      React.createElement(Icon, { className: 'fake-select-arrow', img: 'icon-icon_arrow-dropdown' })
    ),
    React.createElement(ItineraryTimePicker, { initHours: time.format('HH'), initMin: time.format('mm'), changeTime: changeTime })
  );
}

TimeSelectors.propTypes = {
  arriveBy: PropTypes.bool.isRequired,
  time: PropTypes.instanceOf(moment).isRequired,
  setArriveBy: PropTypes.func.isRequired,
  changeTime: PropTypes.func.isRequired,
  changeDate: PropTypes.func.isRequired,
  dates: PropTypes.arrayOf(PropTypes.element).isRequired
};

TimeSelectors.contextTypes = {
  intl: intlShape.isRequired
};

TimeSelectors.displayName = 'TimeSelectors';

TimeSelectors.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'A toolbar for changing arriveBy/departAt, date and time'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(TimeSelectors, {
        arriveBy: false,
        time: moment('2016-05-18 09:30'),
        setArriveBy: function setArriveBy() {},
        changeTime: function changeTime() {},
        changeDate: function changeDate() {},
        dates: [React.createElement(
          'option',
          { value: '2016-05-18', key: '2016-05-18' },
          'Today'
        )]
      })
    )
  );
};