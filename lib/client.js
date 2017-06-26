import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Router, match } from 'react-router';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import provideContext from 'fluxible-addons-react/provideContext';
import tapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import debug from 'debug';
import { RelayNetworkLayer, urlMiddleware, gqErrorsMiddleware, retryMiddleware, batchMiddleware } from 'react-relay-network-layer/lib';
import OfflinePlugin from 'offline-plugin/runtime';

import Raven from './util/Raven';
import configureMoment from './util/configure-moment';
import StoreListeningIntlProvider from './util/StoreListeningIntlProvider';
import MUITheme from './MuiTheme';
import appCreator from './app';
import translations from './translations';
import { openFeedbackModal } from './action/feedbackActions';
import { shouldDisplayPopup } from './util/Feedback';
import { initGeolocation } from './action/PositionActions';
import historyCreator from './history';
import { COMMIT_ID, BUILD_TIME } from './buildInfo';
import Piwik from './util/piwik';

var plugContext = function plugContext(f) {
  return function () {
    return {
      plugComponentContext: f,
      plugActionContext: f,
      plugStoreContext: f
    };
  };
};

window.debug = debug; // Allow _debug.enable('*') in browser console

// Material-ui uses touch tap events
tapEventPlugin();

// TODO: this is an ugly hack, but required due to cyclical processing in app
var config = window.state.context.plugins['extra-context-plugin'].config;
var app = appCreator(config);

var piwik = Piwik.getTracker(config.PIWIK_ADDRESS, config.PIWIK_ID);

if (!config.PIWIK_ADDRESS || !config.PIWIK_ID || config.PIWIK_ID === '') {
  piwik.trackEvent = function () {};
  piwik.setCustomVariable = function () {};
  piwik.trackPageView = function () {};
}

var addPiwik = function addPiwik(c) {
  return c.piwik = piwik;
}; // eslint-disable-line no-param-reassign

var piwikPlugin = {
  name: 'PiwikPlugin',
  plugContext: plugContext(addPiwik)
};

var raven = Raven(config.SENTRY_DSN, piwik.getVisitorId());

// eslint-disable-next-line no-param-reassign
var addRaven = function addRaven(c) {
  return c.raven = raven;
};

var ravenPlugin = {
  name: 'RavenPlugin',
  plugContext: plugContext(addRaven)
};

// Add plugins
app.plug(ravenPlugin);
app.plug(piwikPlugin);

// Run application
var callback = function callback() {
  return app.rehydrate(window.state, function (err, context) {
    if (err) {
      throw err;
    }

    window.context = context;

    if (process.env.NODE_ENV === 'development') {
      try {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        require('../sass/themes/' + config.CONFIG + '/main.scss');
      } catch (error) {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        require('../sass/themes/default/main.scss');
      }
    }

    Relay.injectNetworkLayer(new RelayNetworkLayer([urlMiddleware({
      url: config.URL.OTP + 'index/graphql'
    }), batchMiddleware({
      batchUrl: config.URL.OTP + 'index/graphql/batch'
    }), gqErrorsMiddleware(), retryMiddleware({
      fetchTimeout: config.OTPTimeout + 1000
    }), function (next) {
      return function (req) {
        // eslint-disable-next-line no-param-reassign
        req.headers.OTPTimeout = config.OTPTimeout;
        return next(req);
      };
    }]));

    IsomorphicRelay.injectPreparedData(Relay.Store, JSON.parse(document.getElementById('relayData').textContent));

    context.getComponentContext().getStore('MessageStore').addConfigMessages(config);

    var language = context.getComponentContext().getStore('PreferencesStore').getLanguage();

    configureMoment(language, config);

    var history = historyCreator(config);

    function track() {
      // track "getting back to home"
      var newHref = this.props.router.createHref(this.state.location);

      if (this.href !== undefined && newHref === '/' && this.href !== newHref) {
        if (config.feedback.enable && shouldDisplayPopup(context.getComponentContext().getStore('TimeStore').getCurrentTime().valueOf())) {
          context.executeAction(openFeedbackModal);
        }
      }

      this.href = newHref;
      piwik.setCustomUrl(this.props.router.createHref(this.state.location));
      piwik.trackPageView();
    }

    var ContextProvider = provideContext(StoreListeningIntlProvider, {
      piwik: PropTypes.object,
      raven: PropTypes.object,
      url: PropTypes.string,
      config: PropTypes.object,
      headers: PropTypes.object
    });

    // init geolocation handling
    context.executeAction(initGeolocation).then(function () {
      match({ routes: app.getComponent(), history: history }, function (error, redirectLocation, renderProps) {
        IsomorphicRouter.prepareInitialRender(Relay.Store, renderProps).then(function (props) {
          ReactDOM.render(React.createElement(
            ContextProvider,
            { translations: translations, context: context.getComponentContext() },
            React.createElement(
              MuiThemeProvider,
              {
                muiTheme: getMuiTheme(MUITheme(config), { userAgent: navigator.userAgent })
              },
              React.createElement(Router, _extends({}, props, { onUpdate: track }))
            )
          ), document.getElementById('app'), function () {
            // Run only in production mode and when built in a docker container
            if (process.env.NODE_ENV === 'production' && BUILD_TIME !== 'unset') {
              OfflinePlugin.install();
            }
          });
        });
      });
    });

    // Listen for Web App Install Banner events
    window.addEventListener('beforeinstallprompt', function (e) {
      piwik.trackEvent('installprompt', 'fired');

      // e.userChoice will return a Promise. (Only in chrome, not IE)
      if (e.userChoice) {
        e.userChoice.then(function (choiceResult) {
          return piwik.trackEvent('installprompt', 'result', choiceResult.outcome);
        });
      }
    });

    piwik.enableLinkTracking();

    // Send perf data after React has compared real and shadow DOMs
    // and started positioning
    piwik.setCustomVariable(4, 'commit_id', COMMIT_ID, 'visit');
    piwik.setCustomVariable(5, 'build_time', BUILD_TIME, 'visit');
  });
};

// Guard againist Samsung et.al. which are not properly polyfilled by polyfill-service
if (typeof window.Intl !== 'undefined') {
  callback();
} else {
  var modules = [System.import('intl')];

  // TODO: re-enable this
  // config.availableLanguages.forEach((language) => {
  //  modules.push(System.import(`intl/locale-data/jsonp/${language}`));
  // });

  Promise.all(modules).then(callback);
}