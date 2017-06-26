import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { intlShape } from 'react-intl';

import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';

function DateSelect(props, context) {
  var dates = [];
  var date = moment(props.startDate, props.dateFormat);

  dates.push(React.createElement(
    'option',
    { value: date.format(props.dateFormat), key: date.format(props.dateFormat) },
    context.intl.formatMessage({ id: 'today', defaultMessage: 'Today' })
  ));

  dates.push(React.createElement(
    'option',
    { value: date.add(1, 'd').format(props.dateFormat), key: date.format(props.dateFormat) },
    context.intl.formatMessage({ id: 'tomorrow', defaultMessage: 'Tomorrow' })
  ));

  for (var i = 0; i < 28; i++) {
    dates.push(React.createElement(
      'option',
      { value: date.add(1, 'd').format(props.dateFormat), key: date.format(props.dateFormat) },
      date.format('dd D.M')
    ));
  }

  return React.createElement(
    'div',
    { className: 'route-schedule-date' },
    React.createElement(Icon, { img: 'icon-icon_time' }),
    React.createElement(
      'select',
      {
        value: props.selectedDate,
        onChange: props.onDateChange
      },
      dates
    )
  );
}
DateSelect.propTypes = {
  startDate: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  dateFormat: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired
};
DateSelect.contextTypes = {
  intl: intlShape.isRequired
};
DateSelect.displayName = 'DateSelect';

DateSelect.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Display a date selection using react components'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(DateSelect, {
        startDate: '19700101',
        selectedDate: '19700101',
        dateFormat: 'YYYYMMDD',
        onDateChange: function onDateChange(event) {
          return event.target.value;
        }
      })
    )
  );
};

export default DateSelect;