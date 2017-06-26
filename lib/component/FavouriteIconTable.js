import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import ComponentUsageExample from './ComponentUsageExample';
import GenericTable from './GenericTable';
import Icon from './Icon';

var FavouriteIconTable = function FavouriteIconTable(_ref) {
  var favouriteIconIds = _ref.favouriteIconIds,
      selectedIconId = _ref.selectedIconId,
      handleClick = _ref.handleClick;

  var columnWidth = {
    width: 100 / favouriteIconIds.length + '%'
  };

  var columns = favouriteIconIds.map(function (value) {
    return React.createElement(
      'div',
      {
        key: value,
        className: cx('favourite-icon-table-column', { 'selected-icon': value === selectedIconId }),
        style: columnWidth,
        onClick: function onClick() {
          return handleClick(value);
        }
      },
      React.createElement(Icon, { img: value })
    );
  });

  return React.createElement(
    GenericTable,
    { showLabels: false },
    columns
  );
};

FavouriteIconTable.displayName = 'FavouriteIconTable';

FavouriteIconTable.description = function () {
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
      React.createElement(FavouriteIconTable, { handleClick: function handleClick() {} })
    )
  );
};

FavouriteIconTable.propTypes = {
  handleClick: PropTypes.func.isRequired,
  favouriteIconIds: PropTypes.array,
  selectedIconId: PropTypes.string
};

export default FavouriteIconTable;