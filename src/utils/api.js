import axios from 'axios'
import uuid from 'uuid/v4'

export default {
  async createTag (tag) {
    const result = await axios.post('/api/tags', { tag })
    return result.data
  },

  async getTags () {
    const result = await axios.get('/api/tags')
    return result.data
  },

  async deleteTags (tag) {
    const result = await axios.delete(`/api/tags/${tag}`)
    return result.data
  },

  async getCandidates () {
    const result = await axios.get('/api/candidates')
    return result.data
  },

  async vote (candidateId) {
    const result = await axios.put(`/api/candidates/${candidateId}`)
    return result.data
  },

  async deleteCandidate (candidateId) {
    const result = await axios.delete(`/api/candidates/${candidateId}`)
    return result.data
  },

  async createCandidate (candidate) {
    const today = new Date()
    Object.assign(
      candidate,
      { id: uuid(), votes: 0, deleted: false, date: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}` })
    const result = await axios.post('/api/candidates', { candidate })
    return result.data
  }
}
