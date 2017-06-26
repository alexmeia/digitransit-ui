import PropTypes from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import Favourite from './Favourite';
import { addFavouriteRoute } from '../action/FavouriteActions';

var FavouriteRouteContainer = connectToStores(Favourite, ['FavouriteRoutesStore'], function (context, _ref) {
  var gtfsId = _ref.gtfsId;
  return {
    favourite: context.getStore('FavouriteRoutesStore').isFavourite(gtfsId),
    addFavourite: function addFavourite() {
      return context.executeAction(addFavouriteRoute, gtfsId);
    }
  };
});

FavouriteRouteContainer.contextTypes = {
  getStore: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired
};

export default FavouriteRouteContainer;