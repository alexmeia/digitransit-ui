import PropTypes from 'prop-types';
import React from 'react';
import Tabs from 'material-ui/Tabs/Tabs';
import { intlShape } from 'react-intl';

import Icon from './Icon';

var SearchModal = function SearchModal(_ref, _ref2) {
  var modalIsOpen = _ref.modalIsOpen,
      closeModal = _ref.closeModal,
      selectedTab = _ref.selectedTab,
      children = _ref.children;
  var intl = _ref2.intl,
      config = _ref2.config;

  if (!modalIsOpen) {
    return false;
  }
  return React.createElement(
    'div',
    null,
    React.createElement('div', { className: 'search-modal-overlay', onClick: closeModal }),
    React.createElement(
      'div',
      { className: 'search-modal-container' },
      React.createElement(
        'div',
        { className: 'search-modal' },
        React.createElement(
          'div',
          { className: 'cursor-pointer search-header' },
          React.createElement(
            Tabs,
            {
              className: 'search-header__tabs-root',
              inkBarStyle: {
                backgroundColor: config.colors.primary,
                height: '4px'
              },
              value: selectedTab
            },
            children
          ),
          React.createElement(
            'div',
            { id: 'close-search-button-container' },
            React.createElement(
              'button',
              {
                onClick: closeModal, title: intl.formatMessage({
                  id: 'close',
                  defaultMessage: 'Close' }),
                className: 'noborder'
              },
              React.createElement(Icon, { img: 'icon-icon_close' })
            )
          )
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
  intl: intlShape.isRequired,
  config: PropTypes.object.isRequired
};

export default SearchModal;