import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import Icon from './Icon';

var Error404 = function Error404() {
  return React.createElement(
    'div',
    { className: 'page-not-found' },
    React.createElement(Icon, { img: 'icon-icon_error_page_not_found' }),
    React.createElement(
      'p',
      null,
      React.createElement(FormattedMessage, { id: 'page-not-found', defaultMessage: 'The page cannot be found.' })
    ),
    React.createElement(
      'p',
      null,
      React.createElement(
        Link,
        { to: '/' },
        React.createElement(FormattedMessage, { id: 'back-to-front-page', defaultMessage: 'Back to front page \u203A' })
      )
    )
  );
};

Error404.displayName = 'Error404';

export default Error404;