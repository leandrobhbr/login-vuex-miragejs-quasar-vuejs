import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const state = {
  user: {
    email: null,
    name: null,
    token: null
  },
  users: []
}

const mutations = {
  SET_USER (state, form) {
    state.user.email = form.email
    state.user.name = form.name
    state.user.token = form.token
  },
  SET_USERS (state, dbusers) {
    state.users = dbusers
  },
  LOGOUT (state) {
    state.user = {
      email: null,
      name: null,
      token: null
    }
  }
}

const actions = {
  async auth (context, form) {
    await axios({
      method: 'post',
      url: '/api/login',
      data: form
    }).then((response) => {
      console.log(response.data.user)
      context.commit('SET_USER', response.data.user)
      this.$router.push({ name: 'index' })
    }).catch((error) => {
      alert('ERROR: USER OR PASSWORD')
      console.log(error)
    })
  },
  async listUsers (context) {
    await axios.get('/api/list_users')
      .then((response) => {
        console.log(response.data.users)
        context.commit('SET_USERS', response.data.users)
      })
      .catch((error) => {
        console.log(error)
        alert('ERROR: LIST USERS')
      })
  },
  logout (context) {
    context.commit('LOGOUT')
  }
}

const getters = {
  getuser (state) {
    return state.user
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  plugins: [createPersistedState()]
}
