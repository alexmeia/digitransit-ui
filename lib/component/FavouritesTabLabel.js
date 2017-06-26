import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Icon from './Icon';
import IconWithCaution from './IconWithCaution';

export default function FavouritesTabLabel(_ref) {
  var hasDisruption = _ref.hasDisruption,
      classes = _ref.classes,
      onClick = _ref.onClick;

  return React.createElement(
    'li',
    { className: classes, onClick: onClick },
    hasDisruption ? React.createElement(IconWithCaution, {
      className: 'prefix-icon favourites-icon',
      img: 'icon-icon_star'
    }) : React.createElement(Icon, {
      className: 'prefix-icon favourites-icon',
      img: 'icon-icon_star'
    }),
    React.createElement(FormattedMessage, { id: 'your-favourites', defaultMessage: 'Favourites' })
  );
}

FavouritesTabLabel.propTypes = {
  hasDisruption: PropTypes.bool,
  classes: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};