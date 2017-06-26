import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

import DisruptionInfoButtonContainer from './DisruptionInfoButtonContainer';
import Icon from './Icon';
import LangSelect from './LangSelect';
import MainMenuLinks from './MainMenuLinks';

function MainMenu(props, context) {
  var inquiry = React.createElement(
    'p',
    { style: { fontSize: '20px', backgroundColor: '#888888', padding: '20px' } },
    React.createElement(
      'span',
      { onClick: props.openFeedback },
      React.createElement(FormattedMessage, { id: 'inquiry', defaultMessage: 'How did you find the new Journey Planner? Please tell us!' }),
      React.createElement(Icon, { img: 'icon-icon_arrow-right', className: 'small' })
    )
  );

  var config = context.config;

  return React.createElement(
    'div',
    { 'aria-hidden': !props.visible, className: 'main-menu no-select' },
    React.createElement(
      'div',
      { onClick: props.toggleVisibility, className: 'close-button cursor-pointer' },
      React.createElement(Icon, { img: 'icon-icon_close', className: 'medium' })
    ),
    React.createElement(
      'header',
      { className: 'offcanvas-section' },
      React.createElement(LangSelect, null),
      config.mainMenu.showInquiry && inquiry
    ),
    React.createElement(
      'div',
      { className: 'offcanvas-section' },
      React.createElement(
        Link,
        { id: 'frontpage', to: '/' },
        React.createElement(FormattedMessage, { id: 'frontpage', defaultMessage: 'Frontpage' })
      )
    ),
    React.createElement(
      'div',
      { className: 'offcanvas-section' },
      config.mainMenu.showDisruptions && props.showDisruptionInfo && React.createElement(DisruptionInfoButtonContainer, null)
    ),
    React.createElement(MainMenuLinks, {
      content: ([config.appBarLink].concat(config.footer && config.footer.content) || []).filter(function (item) {
        return item.href || item.route;
      })
    })
  );
}

MainMenu.propTypes = {
  openFeedback: PropTypes.func.isRequired,
  showDisruptionInfo: PropTypes.bool,
  toggleVisibility: PropTypes.func.isRequired,
  visible: PropTypes.bool
};

MainMenu.defaultProps = {
  visible: true
};

MainMenu.contextTypes = {
  getStore: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired
};

export default MainMenu;