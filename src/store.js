import Vue from 'vue'
import Vuex from 'vuex'
import api from './utils/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: []
  },
  mutations: {
    updateTags (state, tags) {
      state.tags = tags
    }
  },
  actions: {
    async deleteTag ({ commit }, tag) {
      const { tags } = await api.deleteTags(tag)
      commit('updateTags', tags)
    },
    async getTags ({ commit }) {
      const { tags } = await api.getTags()
      commit('updateTags', tags)
    },
    async addTag ({ commit }, tag) {
      const { tags } = await api.createTag(tag)
      commit('updateTags', tags)
    }
  }
})
