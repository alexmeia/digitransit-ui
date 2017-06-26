import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { intlShape, FormattedMessage } from 'react-intl';

import Icon from './Icon';

var ItineraryFeedback = function (_React$Component) {
  _inherits(ItineraryFeedback, _React$Component);

  function ItineraryFeedback() {
    var _temp, _this, _ret;

    _classCallCheck(this, ItineraryFeedback);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      feedbackFormOpen: false,
      feedbackText: ''
    }, _this.sendFeedback = function () {
      _this.context.piwik.setCustomVariable(3, 'feedback', _this.state.feedbackText, 'page');
      _this.context.piwik.trackEvent('Feedback', 'Itinerary', 'Feedback', 'submitted');
      _this.setState({ feedbackText: '', feedbackFormOpen: false });
    }, _this.updateText = function (event) {
      _this.setState({ feedbackText: event.target.value });
    }, _this.toggleFeedbackForm = function () {
      _this.setState({ feedbackFormOpen: !_this.state.feedbackFormOpen });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ItineraryFeedback.prototype.render = function render() {
    var placeholder = this.context.intl.formatMessage({ id: 'itinerary-feedback-placeholder', defaultMessage: 'Description (optional)' });
    var buttonText = this.context.intl.formatMessage({ id: 'itinerary-feedback-button', defaultMessage: 'Send feedback' });
    return React.createElement(
      'span',
      { className: 'itinerary-feedback-container' },
      React.createElement(
        'button',
        {
          className: cx('standalone-btn itinerary-feedback-btn', { active: this.state.feedbackFormOpen }),
          onClick: this.toggleFeedbackForm
        },
        React.createElement(Icon, { img: 'icon-icon_speech-bubble' })
      ),
      React.createElement(
        'div',
        {
          className: cx('form-container', { open: this.state.feedbackFormOpen })
        },
        React.createElement(
          'div',
          { className: 'form' },
          React.createElement(
            'div',
            { className: 'form-message' },
            React.createElement(FormattedMessage, {
              id: 'itinerary-feedback-message',
              defaultMessage: 'Couldn\u2019t find what you were looking for?'
            })
          ),
          React.createElement('textarea', {
            className: 'feedback-text',
            placeholder: placeholder,
            rows: 3,
            maxLength: 200,
            value: this.state.feedbackText,
            onChange: this.updateText
          }),
          React.createElement('input', {
            type: 'button',
            className: 'standalone-btn',
            value: buttonText,
            onClick: this.sendFeedback
          })
        )
      )
    );
  };

  return ItineraryFeedback;
}(React.Component);

ItineraryFeedback.contextTypes = {
  getStore: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  piwik: PropTypes.object
};
export default ItineraryFeedback;