import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
import React from 'react';
import ComponentUsageExample from './ComponentUsageExample';
import FooterItem from './FooterItem';

var PageFooter = function PageFooter(_ref) {
  var content = _ref.content;
  return React.createElement(
    'div',
    { id: 'page-footer' },
    content.map(function (link, i) {
      return Object.keys(link).length === 0 ?
      // eslint-disable-next-line react/no-array-index-key
      React.createElement('span', { className: 'footer-separator', key: i }) : React.createElement(FooterItem, _extends({ key: link.label || link.name }, link));
    })
  );
};

PageFooter.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape(FooterItem.propTypes))
};

PageFooter.defaultProps = {
  content: []
};

PageFooter.displayName = 'PageFooter';

PageFooter.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Front page footer for large display'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(PageFooter, {
        content: [{ name: 'Feedback', icon: 'icon-icon_speech-bubble', route: '/' }, {}, { name: 'Print', icon: 'icon-icon_print', route: '/' }, {}, { name: 'Home', icon: 'icon-icon_place', route: '/' }]
      })
    )
  );
};

export default PageFooter;