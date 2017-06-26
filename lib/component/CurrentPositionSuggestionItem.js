import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import pure from 'recompose/pure';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';

var Locate = function Locate() {
  return React.createElement(
    'span',
    { className: 'use-own-position' },
    '\xA0-\xA0',
    React.createElement(
      'span',
      { className: 'search-position' },
      React.createElement(FormattedMessage, { id: 'search-position', defaultMessage: 'Detect location' })
    )
  );
};

var CurrentPositionSuggestionItemComponent = pure(function (_ref) {
  var item = _ref.item,
      havePosition = _ref.havePosition;
  return React.createElement(
    'div',
    { className: cx('search-result', item.type) },
    React.createElement(
      'span',
      { className: 'autosuggestIcon' },
      React.createElement(Icon, { img: 'icon-icon_position', className: 'havePosition' })
    ),
    React.createElement(
      FormattedMessage,
      {
        id: 'use-own-position',
        defaultMessage: 'Use current location'
      },
      function (message) {
        return React.createElement(
          'span',
          { className: 'use-own-position' },
          message
        );
      }
    ),
    !havePosition && React.createElement(Locate, null)
  );
});

var CurrentPositionSuggestionItem = connectToStores(CurrentPositionSuggestionItemComponent, ['PositionStore'], function (context) {
  return { havePosition: context.getStore('PositionStore').getLocationState().hasLocation };
});

CurrentPositionSuggestionItem.displayName = 'CurrentPositionSuggestionItem';

var exampleItem = {
  type: 'CurrentLocation',
  properties: { labelId: 'own-position', layer: 'currentPosition' }
};

CurrentPositionSuggestionItem.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      ComponentUsageExample,
      { description: 'With position' },
      React.createElement(CurrentPositionSuggestionItemComponent, { havePosition: true, item: exampleItem })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'No position' },
      React.createElement(CurrentPositionSuggestionItemComponent, { item: exampleItem })
    )
  );
};

export default CurrentPositionSuggestionItem;