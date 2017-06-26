import PropTypes from 'prop-types';
import React from 'react';
import PrintLink from './PrintLink';
import DateSelect from './DateSelect';

var DATE_FORMAT = 'YYYYMMDD';

var StopPageActionBar = function StopPageActionBar(_ref) {
  var printUrl = _ref.printUrl,
      startDate = _ref.startDate,
      selectedDate = _ref.selectedDate,
      onDateChange = _ref.onDateChange;
  return printUrl && React.createElement(
    'div',
    { id: 'stop-page-action-bar' },
    React.createElement(DateSelect, {
      startDate: startDate,
      selectedDate: selectedDate,
      dateFormat: DATE_FORMAT,
      onDateChange: onDateChange
    }),
    React.createElement(PrintLink, { className: 'action-bar', href: printUrl })
  ) || null;
};

StopPageActionBar.displayName = 'StopPageActionBar';

StopPageActionBar.propTypes = {
  printUrl: PropTypes.string,
  startDate: PropTypes.string,
  selectedDate: PropTypes.string,
  dateFormat: PropTypes.string,
  onDateChange: PropTypes.func
};

export default StopPageActionBar;