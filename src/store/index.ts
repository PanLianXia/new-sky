import { createStore } from 'vuex'
import appStore from './modules/app'
import permissionStore from './modules/permission'

import VuexPersistence from 'vuex-persist';
const vuexLocal = new VuexPersistence({
  key: 'store',
  storage: window.localStorage
});

export default createStore({
  modules: {
    appStore,
    permissionStore
  },
  plugins: [vuexLocal.plugin]
})