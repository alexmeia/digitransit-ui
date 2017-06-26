import _extends from 'babel-runtime/helpers/extends';
import reactCookie from 'react-cookie';
import moment from 'moment';
import { isBrowser } from './browser';
import { getFeedbackStorage, setFeedbackStorage } from '../store/localStorage';

function updateStorage(updates) {
  setFeedbackStorage(_extends({}, getFeedbackStorage(), updates));
}

function removeCookies(NOW) {
  updateStorage({ feedbackInteractionDate: reactCookie.load('fid') || NOW.valueOf(),
    appUseStarted: NOW.valueOf() });

  ['fid', 'vc'].forEach(function (name) {
    reactCookie.remove(name, {
      path: '/'
    });
  });
}

var shouldDisplayPopup = function shouldDisplayPopup(time) {
  if (isBrowser) {
    var NOW = moment(time);
    if (reactCookie.load('vc') !== undefined) {
      // previously data was in cookies, remove cookies TODO remove this at some point
      removeCookies(NOW);
    } else if (getFeedbackStorage().appUseStarted === undefined) {
      // initialize localstorage if needed
      updateStorage({ feedbackInteractionDate: 0, appUseStarted: NOW.valueOf() });
    }

    var appInUseDays = NOW.diff(moment(getFeedbackStorage().appUseStarted), 'days');
    var lastFeedbackDays = NOW.diff(moment(getFeedbackStorage().feedbackInteractionDate), 'days');

    if (appInUseDays >= 2 && lastFeedbackDays > 30) {
      return true;
    }
  }
  return false;
};

var recordResult = function recordResult(piwik, time, nps, preferNew, feedback) {
  updateStorage({ feedbackInteractionDate: time });

  if (nps !== undefined) {
    piwik.setCustomVariable(1, 'nps', nps, 'visit');
    piwik.trackEvent('Feedback', 'Set', 'nps', nps);
  }

  if (preferNew !== undefined) {
    piwik.setCustomVariable(2, 'prefer_new', preferNew, 'visit');
    piwik.trackEvent('Feedback', 'Set', 'prefer_new', preferNew);
  }

  if (feedback) {
    piwik.setCustomVariable(3, 'feedback', feedback, 'visit');
    piwik.trackEvent('Feedback', 'Set', 'feedback', feedback);
  }

  if (nps !== undefined || preferNew !== undefined || feedback !== undefined) {
    piwik.trackEvent('Feedback', 'Close');
  }
};

export { shouldDisplayPopup, recordResult };