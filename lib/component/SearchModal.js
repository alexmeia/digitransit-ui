import PropTypes from 'prop-types';
import React from 'react';
import Tabs from 'material-ui/Tabs/Tabs';

import Icon from './Icon';

var SearchModal = function SearchModal(props, context) {
  if (!props.modalIsOpen) {
    return false;
  }
  return React.createElement(
    'div',
    { className: 'search-modal' },
    React.createElement(
      'div',
      { className: 'row fullscreen' },
      React.createElement(
        'div',
        { className: 'small-12 columns cursor-pointer search-header' },
        React.createElement(
          'div',
          { className: 'search-header__back-arrow', onClick: props.closeModal },
          React.createElement(Icon, { img: 'icon-icon_arrow-left' }),
          React.createElement('span', { className: 'search-header-separator' })
        ),
        React.createElement(
          Tabs,
          {
            className: 'search-header__tabs-root',
            inkBarStyle: { backgroundColor: context.config.colors.primary, height: 4 },
            value: props.selectedTab
          },
          props.children
        )
      )
    )
  );
};

SearchModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
  children: PropTypes.node
};

SearchModal.contextTypes = {
  config: PropTypes.object.isRequired
};

export default SearchModal;