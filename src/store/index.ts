import Vuex from 'vuex';

import game from './modules/game';
import images from './modules/images';
import sellers from './modules/sellers';
import client from './modules/client';


export default new Vuex.Store({
  modules: {
    game,
    images,
    sellers,
    client
  },
  
});