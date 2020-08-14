import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'
import user from './modules/user'
import index from './modules/index.js'
import table from './modules/table.js'
import dingdan from './modules/dingdan.js'
import gouwuche from './modules/gouwuche.js'
import shangpin from './modules/shangpin.js'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    settings,
    index,
    tagsView,
    user,
    table,
    dingdan,
    shangpin,
    gouwuche,
  },
  getters
})

export default store
