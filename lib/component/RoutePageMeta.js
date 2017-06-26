import Relay from 'react-relay';
import Helmet from 'react-helmet';
import mapProps from 'recompose/mapProps';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';
import { intlShape } from 'react-intl';

var RoutePageMeta = compose(getContext({ intl: intlShape }), mapProps(function (_ref) {
  var intl = _ref.intl,
      route = _ref.route;

  if (!route) return false;

  var title = intl.formatMessage({
    id: 'route-page.title',
    defaultMessage: 'Route - {shortName}'
  }, route);
  var description = intl.formatMessage({
    id: 'route-page.description',
    defaultMessage: 'Route - {shortName}, {longName}'
  }, route);
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

export default Relay.createContainer(RoutePageMeta, {
  fragments: {
    route: function route() {
      return function () {
        return {
          children: [{
            fieldName: 'shortName',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'longName',
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
          name: 'RoutePageMeta_RouteRelayQL',
          type: 'Route'
        };
      }();
    }
  }
});