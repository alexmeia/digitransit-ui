import PropTypes from 'prop-types';
import React from 'react';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';
import { routeScheduleStopSelectOptions as exampleOptions } from './ExampleData';

function RouteScheduleStopSelect(props) {
  var options = props.options.map(function (option) {
    return React.createElement(
      'option',
      { key: option.displayName + option.value, value: option.value },
      option.displayName
    );
  });

  return React.createElement(
    'div',
    { className: 'route-schedule-stop-select' },
    React.createElement(Icon, { img: 'icon-icon_arrow-dropdown' }),
    React.createElement(
      'select',
      { onChange: props.onSelectChange, value: props.selected },
      options
    ),
    React.createElement('div', { className: 'caret' })
  );
}

RouteScheduleStopSelect.propTypes = {
  selected: PropTypes.number.isRequired,
  options: PropTypes.array.isRequired,
  onSelectChange: PropTypes.func.isRequired
};
RouteScheduleStopSelect.displayName = 'RouteScheduleStopSelect';

RouteScheduleStopSelect.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Display a route schedule stop select using react components'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(RouteScheduleStopSelect, {
        selected: 1,
        options: exampleOptions,
        onSelectChange: function onSelectChange(event) {
          return event.target.value;
        }
      })
    )
  );
};

export default RouteScheduleStopSelect;