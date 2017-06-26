import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import cx from 'classnames';

var LONG_LINE_NAME = 5;

var TimetableRow = function TimetableRow(_ref) {
  var title = _ref.title,
      stoptimes = _ref.stoptimes,
      showRoutes = _ref.showRoutes,
      timerows = _ref.timerows;
  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      {
        className: 'timetable-row',
        style: {
          display: timerows.filter(function (o) {
            return o === title;
          }).length === 0 && showRoutes.length > 0 && 'none'
        }
      },
      React.createElement(
        'h1',
        { className: 'title bold' },
        title,
        ':'
      ),
      React.createElement(
        'div',
        { className: 'timetable-rowcontainer' },
        stoptimes.sort(function (time1, time2) {
          return time1.scheduledDeparture - time2.scheduledDeparture;
        }).map(function (time) {
          return React.createElement(
            'div',
            {
              className: 'timetablerow-linetime',
              key: time.name + time.scheduledDeparture
            },
            React.createElement(
              'span',
              {
                className: cx({ 'overflow-fade': time.name && time.name.length > LONG_LINE_NAME })
              },
              showRoutes.filter(function (o) {
                return o === time.id;
              }).length > 0 && showRoutes.length > 0 || showRoutes.length === 0 ? React.createElement(
                'div',
                { className: cx({ 'overflow-fade': time.name && time.name.length > LONG_LINE_NAME }) },
                React.createElement(
                  'span',
                  { className: 'bold' },
                  moment.unix(time.serviceDay + time.scheduledDeparture).format('mm')
                ),
                React.createElement(
                  'span',
                  { className: 'line-name', title: time.name },
                  '/',
                  time.name
                )
              ) : null
            )
          );
        })
      )
    )
  );
};

TimetableRow.propTypes = {
  title: PropTypes.string.isRequired,
  stoptimes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    serviceDay: PropTypes.number.isRequired,
    scheduledDeparture: PropTypes.number.isRequired
  })).isRequired,
  showRoutes: PropTypes.array,
  timerows: PropTypes.array
};

export default TimetableRow;