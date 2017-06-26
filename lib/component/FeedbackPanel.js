import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import MaterialModal from 'material-ui/Dialog';
import { FormattedMessage, intlShape } from 'react-intl';

import Icon from './Icon';
import ScoreTable from './ScoreTable';
import TextAreaWithCounter from './TextAreaWithCounter';
import { closeFeedbackModal } from '../action/feedbackActions';
import { recordResult } from '../util/Feedback';

var FEEDBACK_OPEN_AREA_MAX_CHARS = 200;

var FeedbackPanel = function (_React$Component) {
  _inherits(FeedbackPanel, _React$Component);

  function FeedbackPanel() {
    var _temp, _this, _ret;

    _classCallCheck(this, FeedbackPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      postFirstQuestion: false,
      modalIsOpen: false,
      charLeft: FEEDBACK_OPEN_AREA_MAX_CHARS
    }, _this.onFeedbackModalChange = function () {
      return _this.forceUpdate();
    }, _this.onOpenTextAreaChange = function (event) {
      var input = event.target.value;

      _this.setState({
        openText: input,
        charLeft: FEEDBACK_OPEN_AREA_MAX_CHARS - input.length
      });
    }, _this.answerFirstQuestion = function (answer) {
      _this.setState({
        postFirstQuestion: true,
        selectedNPS: answer
      });

      recordResult(_this.context.piwik, _this.context.getStore('TimeStore').getCurrentTime().valueOf(), answer);
    }, _this.answerSecondQuestion = function (answer) {
      _this.setState({
        useThisMoreLikely: answer
      });
    }, _this.sendAll = function () {
      recordResult(_this.context.piwik, _this.context.getStore('TimeStore').getCurrentTime().valueOf(), _this.state.selectedNPS, _this.state.useThisMoreLikely, _this.state.openText);

      _this.closeModal();
    }, _this.closeModal = function () {
      _this.context.executeAction(closeFeedbackModal);

      recordResult(_this.context.piwik, _this.context.getStore('TimeStore').getCurrentTime().valueOf());

      _this.props.onClose();
      return _this.setState({
        selectedNPS: undefined,
        useThisMoreLikely: undefined,
        openText: undefined,
        charLeft: FEEDBACK_OPEN_AREA_MAX_CHARS,
        postFirstQuestion: false
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  FeedbackPanel.isInitialState = function isInitialState(state) {
    return state.selectedNPS === undefined && state.useThisMoreLikely === undefined && state.openText === undefined && state.charLeft === FEEDBACK_OPEN_AREA_MAX_CHARS && state.postFirstQuestion === false;
  };

  FeedbackPanel.prototype.componentDidMount = function componentDidMount() {
    this.context.getStore('FeedbackStore').addChangeListener(this.onFeedbackModalChange);
  };

  FeedbackPanel.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return !FeedbackPanel.isInitialState(nextState);
  };

  FeedbackPanel.prototype.componentWillUnmount = function componentWillUnmount() {
    this.context.getStore('FeedbackStore').removeChangeListener(this.onFeedbackModalChange);
  };

  FeedbackPanel.prototype.render = function render() {
    var supplementaryQuestions = void 0;
    var isModalOpen = this.context.getStore('FeedbackStore').isModalOpen();

    var lowEndLabel = React.createElement(FormattedMessage, { id: 'very-unlikely', defaultMessage: 'Very unlikely' });

    var highEndLabel = React.createElement(FormattedMessage, { id: 'very-likely', defaultMessage: 'Very likely' });

    if (this.state.postFirstQuestion) {
      supplementaryQuestions = React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          { className: 'feedback-question auxiliary-feedback-question' },
          React.createElement(FormattedMessage, {
            id: 'likely-to-use',
            defaultMessage: 'How likely are you to use this service rather than the current Journey Planner?'
          })
        ),
        React.createElement(ScoreTable, {
          lowestScore: 0,
          highestScore: 10,
          handleClick: this.answerSecondQuestion,
          selectedScore: parseInt(this.state.useThisMoreLikely, 10),
          lowEndLabel: lowEndLabel,
          highEndLabel: highEndLabel,
          showLabels: true
        }),
        React.createElement(
          'p',
          { className: 'feedback-question--text-area auxiliary-feedback-question inline-block' },
          React.createElement(FormattedMessage, {
            id: 'how-to-rate-service',
            defaultMessage: 'How would you rate the service?'
          })
        ),
        React.createElement(TextAreaWithCounter, {
          showCounter: true,
          maxLength: FEEDBACK_OPEN_AREA_MAX_CHARS,
          charLeft: this.state.charLeft,
          handleChange: this.onOpenTextAreaChange,
          counterClassName: 'open-feedback-counter-text',
          areaClassName: 'open-feedback-text-area'
        }),
        React.createElement(
          'div',
          { className: 'send-feedback-button', onClick: this.sendAll },
          React.createElement(FormattedMessage, { id: 'send', defaultMessage: 'Send' })
        )
      );
    }

    return React.createElement(
      'div',
      null,
      React.createElement(
        MaterialModal,
        {
          className: 'feedback-modal',
          contentClassName: this.state.postFirstQuestion ? 'feedback-modal__container--post-first-question' : 'feedback-modal__container',
          bodyClassName: this.state.postFirstQuestion ? 'feedback-modal__body--post-first-question' : 'feedback-modal__body',
          autoScrollBodyContent: true,
          modal: true,
          overlayStyle: { background: 'rgba(0, 0, 0, 0.541176)' },
          open: isModalOpen
        },
        React.createElement(
          'div',
          {
            className: 'right cursor-pointer feedback-close-container',
            onClick: this.closeModal
          },
          React.createElement(Icon, { id: 'feedback-close-icon', img: 'icon-icon_close' })
        ),
        React.createElement(
          'div',
          { className: 'feedback-content-container' },
          React.createElement(
            'p',
            { className: 'feedback-question' },
            React.createElement(FormattedMessage, {
              id: 'likely-to-recommend',
              defaultMessage: 'How likely are you to recommend our service to your friends or colleagues?'
            })
          ),
          React.createElement(ScoreTable, {
            lowestScore: 0,
            highestScore: 10,
            handleClick: this.answerFirstQuestion,
            selectedScore: parseInt(this.state.selectedNPS, 10),
            lowEndLabel: lowEndLabel,
            highEndLabel: highEndLabel,
            showLabels: true
          }),
          supplementaryQuestions
        )
      )
    );
  };

  return FeedbackPanel;
}(React.Component);

FeedbackPanel.contextTypes = {
  getStore: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  piwik: PropTypes.object
};
FeedbackPanel.propTypes = {
  onClose: PropTypes.func
};
FeedbackPanel.defaultProps = {
  onClose: function onClose() {}
};


export default FeedbackPanel;