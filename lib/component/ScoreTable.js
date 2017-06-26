var _this = this;

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import range from 'lodash/range';
import ComponentUsageExample from './ComponentUsageExample';
import GenericTable from './GenericTable';

var Column = function Column(_ref) {
  var i = _ref.i,
      columnWidth = _ref.columnWidth,
      handleClick = _ref.handleClick,
      selectedScore = _ref.selectedScore;
  return React.createElement(
    'div',
    {
      className: cx('score-table-column', { 'selected-score': i === selectedScore }),
      style: { width: columnWidth + '%' },
      onClick: handleClick.bind(_this, i) // eslint-disable-line react/jsx-no-bind
    },
    i
  );
};

Column.propTypes = {
  i: PropTypes.number.isRequired,
  columnWidth: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedScore: PropTypes.number
};

function ScoreTable(props) {
  var columnWidth = 100 / (props.highestScore - props.lowestScore + 1);

  var columns = range(props.lowestScore, props.highestScore + 1).map(function (i) {
    return React.createElement(Column, {
      i: i, key: i, columnWidth: columnWidth,
      selectedScore: props.selectedScore, handleClick: props.handleClick
    });
  });

  return React.createElement(
    GenericTable,
    {
      showLabels: props.showLabels,
      lowEndLabel: props.lowEndLabel,
      highEndLabel: props.highEndLabel
    },
    columns
  );
}

ScoreTable.displayName = 'ScoreTable';

ScoreTable.description = function () {
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
      React.createElement(ScoreTable, { lowestScore: 0, highestScore: 5, handleClick: function handleClick() {} })
    )
  );
};

ScoreTable.propTypes = {
  lowestScore: PropTypes.number.isRequired,
  highestScore: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  showLabels: PropTypes.bool,
  lowEndLabel: PropTypes.object,
  highEndLabel: PropTypes.object
};

export default ScoreTable;