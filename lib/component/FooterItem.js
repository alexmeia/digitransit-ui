import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ComponentUsageExample from './ComponentUsageExample';
import Icon from './Icon';
import { openFeedbackModal } from '../action/feedbackActions';

var mapToLink = function mapToLink(href, children) {
  return React.createElement(
    'span',
    { className: 'cursor-pointer' },
    React.createElement(
      'a',
      { href: href },
      children
    )
  );
};

var mapToFn = function mapToFn(fn, children) {
  return React.createElement(
    'span',
    { className: 'cursor-pointer' },
    React.createElement(
      'a',
      { onClick: function onClick() {
          fn();return false;
        } },
      children
    )
  );
};

var mapToRoute = function mapToRoute(router, route, children) {
  return React.createElement(
    'button',
    {
      className: 'noborder button cursor-pointer',
      onClick: function onClick() {
        router.push(route);
      }
    },
    children
  );
};

var getFuntionForType = function getFuntionForType(type, executeAction) {
  switch (type) {
    case 'feedback':
      return function () {
        return executeAction(openFeedbackModal);
      };
    default:
      return function () {
        return console.log('No function defined for type', type);
      };
  }
};

var FooterItem = function FooterItem(_ref, _ref2) {
  var name = _ref.name,
      href = _ref.href,
      label = _ref.label,
      nameEn = _ref.nameEn,
      route = _ref.route,
      icon = _ref.icon,
      type = _ref.type;
  var router = _ref2.router,
      executeAction = _ref2.executeAction;

  var displayIcon = icon && React.createElement(Icon, { className: 'footer-icon', img: icon }) || undefined;
  var displayLabel = label || React.createElement(FormattedMessage, { id: name, defaultMessage: nameEn || name });
  var item = React.createElement(
    'span',
    { id: name },
    displayIcon,
    displayLabel
  );
  if (type) {
    item = mapToFn(getFuntionForType(type, executeAction), item);
  } else if (href) {
    item = mapToLink(href, item);
  } else if (route) {
    item = mapToRoute(router, route, item);
  } else {
    item = React.createElement(
      'span',
      { className: 'footer-text' },
      item
    );
  }
  return React.createElement(
    'span',
    { className: 'footer-item' },
    item
  );
};

FooterItem.propTypes = {
  name: PropTypes.string,
  nameEn: PropTypes.string,
  icon: PropTypes.string,
  href: PropTypes.string,
  route: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string
};

FooterItem.contextTypes = {
  router: PropTypes.object.isRequired,
  executeAction: PropTypes.func.isRequired
};

FooterItem.defaultProps = {
  links: []
};

FooterItem.displayName = 'FooterItem';

FooterItem.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Front page footer item'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'external' },
      React.createElement(FooterItem, { name: 'Palaute', href: 'http://www.hsl.fi/' })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'with icon' },
      React.createElement(FooterItem, { icon: 'icon-icon_speech-bubble', name: 'Feedback', route: '/' })
    )
  );
};

export default FooterItem;