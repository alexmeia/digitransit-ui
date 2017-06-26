import PropTypes from 'prop-types';
import React from 'react';
import ComponentUsageExample from './ComponentUsageExample';
import FooterItem from './FooterItem';

var MainMenuLinks = function MainMenuLinks(_ref) {
  var content = _ref.content;
  return React.createElement(
    'div',
    { id: 'page-m-footer' },
    content.map(function (link) {
      return Object.keys(link).length === 0 ? React.createElement('span', { key: 'separator' }) : React.createElement(
        'div',
        { key: link.label || link.name, className: 'offcanvas-section' },
        React.createElement(FooterItem, link)
      );
    })
  );
};

MainMenuLinks.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape(FooterItem.propTypes))
};

MainMenuLinks.defaultProps = {
  content: []
};

MainMenuLinks.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Main menu links for mobile display'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(MainMenuLinks, {
        content: [{ name: 'Feedback', icon: 'icon-icon_speech-bubble', route: '/' }, {}, { name: 'Print', icon: 'icon-icon_print', route: '/' }, {}, { name: 'Home', icon: 'icon-icon_place', route: '/' }]
      })
    )
  );
};

export default MainMenuLinks;