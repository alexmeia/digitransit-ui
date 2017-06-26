import PropTypes from 'prop-types';
import React from 'react';
import RouteScheduleStopSelect from './RouteScheduleStopSelect';
import ComponentUsageExample from './ComponentUsageExample';
import { routeScheduleHeaderStops as exampleStops } from './ExampleData';

function RouteScheduleHeader(props) {
  var options = props.stops.map(function (stop, index) {
    var option = {
      displayName: stop.name,
      value: index
    };
    return option;
  });
  var fromOptions = options.slice(0, props.to);
  var toOptions = options.slice(props.from + 1);

  return React.createElement(
    'div',
    { className: 'route-schedule-header row padding-vertical-normal' },
    React.createElement(
      'div',
      { className: 'columns small-6' },
      React.createElement(RouteScheduleStopSelect, {
        onSelectChange: props.onFromSelectChange,
        selected: props.from,
        options: fromOptions
      })
    ),
    React.createElement(
      'div',
      { className: 'columns small-6' },
      React.createElement(RouteScheduleStopSelect, {
        onSelectChange: props.onToSelectChange,
        selected: props.to,
        options: toOptions
      })
    )
  );
}
RouteScheduleHeader.propTypes = {
  stops: PropTypes.array.isRequired,
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  onFromSelectChange: PropTypes.func.isRequired,
  onToSelectChange: PropTypes.func.isRequired
};

RouteScheduleHeader.displayName = 'RouteScheduleHeader';

RouteScheduleHeader.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Display a route schedule header using react components'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(RouteScheduleHeader, {
        stops: exampleStops,
        from: 0,
        to: 4,
        onFromSelectChange: function onFromSelectChange(event) {
          return event.target.value;
        },
        onToSelectChange: function onToSelectChange(event) {
          return event.target.value;
        }
      })
    )
  );
};

export default RouteScheduleHeader;