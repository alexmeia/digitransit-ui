import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ExternalLink from './ExternalLink';
import Icon from './Icon';

var PrintLink = function PrintLink(_ref) {
  var className = _ref.className,
      href = _ref.href;
  return href && React.createElement(
    ExternalLink,
    { className: className, href: href },
    React.createElement(Icon, { img: 'icon-icon_print' }),
    ' ',
    React.createElement(FormattedMessage, { id: 'print', defaultMessage: 'Print' })
  );
};

PrintLink.displayName = 'PrintLink';

PrintLink.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string
};
export default PrintLink;