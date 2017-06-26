import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import pure from 'recompose/pure';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';

import Icon from './Icon';
import { getLabel, getIcon, isStop, getGTFSId } from '../util/suggestionUtils';
import ComponentUsageExample from './ComponentUsageExample';

var SuggestionItem = pure(function (_ref) {
  var item = _ref.item,
      useTransportIcons = _ref.useTransportIcons,
      doNotShowLinkToStop = _ref.doNotShowLinkToStop;

  var icon = void 0;
  if (item.properties.mode && useTransportIcons) {
    icon = React.createElement(Icon, {
      img: 'icon-icon_' + item.properties.mode,
      className: item.properties.mode
    });
  } else {
    icon = React.createElement(Icon, {
      img: getIcon(item.properties.layer),
      className: item.iconClass || ''
    });
  }

  var label = getLabel(item.properties, false);

  var ri = React.createElement(
    'div',
    {
      className: cx('search-result', item.type, { favourite: item.type.startsWith('Favourite') })
    },
    React.createElement(
      'span',
      { className: 'autosuggestIcon' },
      icon
    ),
    React.createElement(
      'div',
      null,
      React.createElement(
        'p',
        { className: 'suggestion-name' },
        label[0]
      ),
      React.createElement(
        'p',
        { className: 'suggestion-label' },
        label[1]
      )
    )
  );
  if (doNotShowLinkToStop === false && isStop(item.properties) && getGTFSId(item.properties) !== undefined && (get(item, 'properties.id') || get(item, 'properties.code')) !== undefined) {
    /* eslint no-param-reassign: ["error", { "props": false }]*/
    return React.createElement(
      'div',
      { className: 'suggestion-item-stop' },
      React.createElement(
        'div',
        null,
        React.createElement(
          Link,
          {
            onClick: function onClick() {
              item.timetableClicked = false;
            }
          },
          ri
        )
      ),
      React.createElement(
        'div',
        { className: 'suggestion-item-timetable' },
        React.createElement(
          Link,
          {
            onClick: function onClick() {
              item.timetableClicked = true;
            }
          },
          React.createElement(Icon, { img: 'icon-icon_schedule' }),
          React.createElement(
            'div',
            { className: 'suggestion-item-timetable-label' },
            React.createElement(FormattedMessage, { id: 'timetable', defaultMessage: 'Timetable' })
          )
        )
      )
    );
  }
  return ri;
});

SuggestionItem.propTypes = {
  item: PropTypes.object,
  useTransportIcons: PropTypes.bool,
  doNotShowLInkToStop: PropTypes.bool
};

SuggestionItem.displayName = 'SuggestionItem';

var exampleFavourite = {
  type: 'FavouritePlace',
  properties: { locationName: 'HSL', address: 'Opastinsilta 6, Helsinki', layer: 'favouritePlace' }
};

var exampleAddress = {
  type: 'Feature',
  properties: {
    id: 'fi/uusimaa:103267060F-3',
    layer: 'address',
    source: 'openaddresses',
    name: 'Opastinsilta 6',
    housenumber: '6',
    street: 'Opastinsilta',
    postalcode: '00520',
    confidence: 1,
    accuracy: 'point',
    region: 'Uusimaa',
    localadmin: 'Helsinki',
    locality: 'Helsinki',
    neighbourhood: 'Itä-Pasila',
    label: 'Opastinsilta 6, Helsinki'
  }
};

var exampleRoute = {
  type: 'Route',
  properties: {
    gtfsId: 'HSL:1019',
    agency: { name: 'Helsingin seudun liikenne' },
    shortName: '19',
    mode: 'FERRY',
    longName: 'Kauppatori - Suomenlinna',
    layer: 'route-FERRY',
    link: '/linjat/HSL:1019'
  }
};

var exampleStop = {
  type: 'Stop',
  properties: {
    source: 'gtfsHSL',
    gtfsId: 'HSL:1130446',
    id: 'HSL:1130446#0221',
    name: 'Caloniuksenkatu',
    desc: 'Mechelininkatu 21',
    code: '0221',
    mode: 'tram',
    layer: 'stop',
    link: '/pysakit/HSL:1130446'
  }
};

SuggestionItem.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      ComponentUsageExample,
      { description: 'Favourite' },
      React.createElement(SuggestionItem, { item: exampleFavourite })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Address' },
      React.createElement(SuggestionItem, { item: exampleAddress })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Route' },
      React.createElement(SuggestionItem, { item: exampleRoute })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Stop' },
      React.createElement(SuggestionItem, { item: exampleStop, doNotShowLinkToStop: false })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Stop' },
      React.createElement(SuggestionItem, { item: exampleStop, doNotShowLinkToStop: true })
    )
  );
};

export default SuggestionItem;