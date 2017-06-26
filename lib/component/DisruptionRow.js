import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import RouteList from './RouteList';

function DisruptionRow(_ref) {
  var routes = _ref.routes,
      startTime = _ref.startTime,
      endTime = _ref.endTime,
      description = _ref.description,
      cause = _ref.cause;

  return React.createElement(
    'div',
    { className: 'row' },
    React.createElement(
      'section',
      { className: 'grid-content' },
      React.createElement(
        'div',
        { className: 'disruption-header disruption' },
        React.createElement(RouteList, { className: 'left', routes: routes.filter(function (route) {
            return route;
          }) }),
        React.createElement(
          'span',
          { className: 'time bold' },
          startTime.format('HH:mm'),
          ' - ',
          endTime.format('HH:mm')
        )
      ),
      React.createElement(
        'div',
        { className: 'disruption-content' },
        React.createElement(
          'p',
          null,
          description
        )
      ),
      React.createElement(
        'div',
        { className: 'disruption-details hide' },
        React.createElement(
          'span',
          null,
          React.createElement(
            'b',
            { className: 'uppercase' },
            React.createElement(FormattedMessage, { id: 'cause', defaultMessage: 'cause' }),
            ':'
          ),
          cause
        )
      )
    )
  );
}

DisruptionRow.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  startTime: PropTypes.instanceOf(moment).isRequired,
  endTime: PropTypes.instanceOf(moment).isRequired,
  description: PropTypes.node,
  cause: PropTypes.node
};

export default DisruptionRow;