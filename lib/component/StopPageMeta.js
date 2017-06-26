import Relay from 'react-relay';
import Helmet from 'react-helmet';
import mapProps from 'recompose/mapProps';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';
import { intlShape } from 'react-intl';

var StopPageMeta = compose(getContext({ intl: intlShape }), mapProps(function (_ref) {
  var intl = _ref.intl,
      params = _ref.params,
      stop = _ref.stop;

  if (!stop) return false;

  var title = intl.formatMessage({
    id: params.stopId ? 'stop-page.title' : 'terminal-page.title',
    defaultMessage: params.stopId ? 'Stop - {name} {code}' : 'Terminal - {name}'
  }, stop);
  var description = intl.formatMessage({
    id: params.stopId ? 'stop-page.description' : 'terminal-page.description',
    defaultMessage: params.stopId ? 'Stop - {name} {code}, {desc}' : 'Terminal - {name} {code}, {desc}'
  }, stop);
  return {
    title: title,
    meta: [{
      name: 'description',
      content: description
    }, {
      property: 'og:title',
      content: title
    }, {
      property: 'og:description',
      content: description
    }, {
      property: 'twitter:title',
      content: title
    }, {
      property: 'twitter:description',
      content: description
    }]
  };
}))(Helmet);

export default Relay.createContainer(StopPageMeta, {
  fragments: {
    stop: function stop() {
      return function () {
        return {
          children: [{
            fieldName: 'name',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'code',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'desc',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'ID'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'StopPageMeta_StopRelayQL',
          type: 'Stop'
        };
      }();
    }
  }
});