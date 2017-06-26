import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import { intlShape } from 'react-intl';

import Icon from './Icon';

export default function DesktopView(_ref, _ref2) {
  var title = _ref.title,
      header = _ref.header,
      map = _ref.map,
      content = _ref.content;
  var formatMessage = _ref2.intl.formatMessage;

  return React.createElement(
    'div',
    { className: 'desktop' },
    React.createElement(
      'div',
      { className: 'main-content' },
      React.createElement(
        'div',
        { className: 'desktop-title' },
        React.createElement(
          'h2',
          null,
          React.createElement(
            Link,
            { title: formatMessage({ id: 'back-to-front-page', defaultMessage: 'Back to the front page' }), to: '/' },
            React.createElement(Icon, { img: 'icon-icon_home', className: 'home-icon' })
          ),
          React.createElement(Icon, { img: 'icon-icon_arrow-collapse--right', className: 'arrow-icon' }),
          title
        )
      ),
      header,
      content
    ),
    React.createElement(
      'div',
      { className: 'map-content' },
      map
    )
  );
}

DesktopView.propTypes = {
  title: PropTypes.node,
  header: PropTypes.node,
  map: PropTypes.node,
  content: PropTypes.node
};

DesktopView.contextTypes = {
  intl: intlShape.isRequired
};