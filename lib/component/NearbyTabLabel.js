import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Icon from './Icon';

export default function NearbyTabLabel(_ref) {
  var classes = _ref.classes,
      onClick = _ref.onClick;

  return React.createElement(
    'li',
    { className: classes, onClick: onClick },
    React.createElement(Icon, {
      className: 'prefix-icon nearby-icon',
      img: 'icon-icon_nearby'
    }),
    React.createElement(FormattedMessage, { id: 'near-you', defaultMessage: 'Near you' })
  );
}

NearbyTabLabel.propTypes = {
  classes: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};