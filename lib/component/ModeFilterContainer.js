import connectToStores from 'fluxible-addons-react/connectToStores';

import ModeFilter from './ModeFilter';
import * as ModeSelectedAction from '../action/modeSelectedActions';

export default connectToStores(ModeFilter, ['ModeStore'], function (context) {
  return {
    selectedModes: context.getStore('ModeStore').getMode(),
    buttonClass: 'btn mode-nearby',
    action: ModeSelectedAction
  };
});