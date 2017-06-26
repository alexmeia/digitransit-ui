import PropTypes from 'prop-types';
import React from 'react';
import ComponentUsageExample from './ComponentUsageExample';

function GenericTable(props) {
  var highEndLabel = void 0;
  var lowEndLabel = void 0;

  if (props.showLabels) {
    lowEndLabel = React.createElement(
      'span',
      { className: 'left' },
      props.lowEndLabel
    );

    highEndLabel = React.createElement(
      'span',
      { className: 'right' },
      props.highEndLabel
    );
  }

  return React.createElement(
    'div',
    { className: 'generic-table' },
    React.createElement(
      'div',
      { className: 'row' },
      props.children
    ),
    React.createElement(
      'div',
      { className: 'generic-table__label-container' },
      lowEndLabel,
      highEndLabel
    )
  );
}

GenericTable.displayName = 'GenericTable';

GenericTable.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Renders a score table'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(GenericTable, null)
    )
  );
};

GenericTable.propTypes = {
  showLabels: PropTypes.bool,
  lowEndLabel: PropTypes.object,
  highEndLabel: PropTypes.object,
  children: PropTypes.node
};

export default GenericTable;