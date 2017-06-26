import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';

var Favourite = function Favourite(_ref) {
  var addFavourite = _ref.addFavourite,
      favourite = _ref.favourite,
      className = _ref.className;
  return React.createElement(
    'span',
    { className: cx('cursor-pointer favourite-icon', className), onClick: addFavourite },
    React.createElement(Icon, { className: cx('favourite', { selected: favourite }), img: 'icon-icon_star' })
  );
};

Favourite.propTypes = {
  addFavourite: PropTypes.func.isRequired,
  favourite: PropTypes.bool,
  className: PropTypes.string
};

Favourite.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'This component shows whether an entity is a favourite\n        and allows the user to toggle the favourite status on/off.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'entity is favourite' },
      React.createElement(Favourite, { addFavourite: function addFavourite() {}, favourite: true })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'entity is not favourite' },
      React.createElement(Favourite, { addFavourite: function addFavourite() {} })
    )
  );
};

Favourite.displayName = 'Favourite';

export default Favourite;