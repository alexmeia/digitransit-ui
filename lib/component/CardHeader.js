import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import ComponentUsageExample from './ComponentUsageExample';
import Icon from './Icon';
import SplitBars from './SplitBars';
import Favourite from './Favourite';

var CardHeader = function CardHeader(_ref) {
  var className = _ref.className,
      children = _ref.children,
      headingStyle = _ref.headingStyle,
      name = _ref.name,
      description = _ref.description,
      code = _ref.code,
      icon = _ref.icon,
      icons = _ref.icons,
      unlinked = _ref.unlinked;
  return React.createElement(
    'div',
    { className: cx('card-header', className) },
    children,
    icon ? React.createElement(
      'div',
      {
        className: 'left',
        style: { fontSize: 32, paddingRight: 10, height: 32 }
      },
      React.createElement(Icon, { img: icon })
    ) : null,
    className === 'stop-page header' && React.createElement(
      'div',
      { className: 'stop-page-header_icon-container' },
      React.createElement(Icon, { img: 'icon-icon_bus-stop', className: 'stop-page-header_icon' })
    ),
    React.createElement(
      'div',
      { className: 'card-header-wrapper' },
      React.createElement(
        'span',
        { className: headingStyle || 'h4' },
        name,
        unlinked ? null : React.createElement(
          'span',
          { className: 'link-arrow' },
          ' \u203A'
        )
      ),
      React.createElement(
        'div',
        { className: 'card-sub-header' },
        code != null ? React.createElement(
          'p',
          { className: 'card-code' },
          code
        ) : null,
        React.createElement(
          'p',
          { className: 'sub-header-h4' },
          description
        )
      )
    ),
    icons ? React.createElement(
      SplitBars,
      null,
      icons
    ) : null
  );
};

var emptyFunction = function emptyFunction() {};
var exampleIcons = [React.createElement(Favourite, { key: 'favourite', favourite: false, addFavourite: emptyFunction })];

CardHeader.displayName = 'CardHeader';

CardHeader.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Generic card header, which displays card name, description, favourite star and optional childs'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(CardHeader, {
        name: 'Testipys\xE4kki',
        description: 'Testipys\xE4kki 2',
        code: '7528',
        icons: exampleIcons,
        headingStyle: 'header-primary'
      })
    )
  );
};

CardHeader.propTypes = {
  className: PropTypes.string,
  headingStyle: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  code: PropTypes.string,
  icon: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.node,
  unlinked: PropTypes.bool
};

export default CardHeader;